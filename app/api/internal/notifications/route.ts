import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NotificationType } from "@prisma/client";

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-internal-secret") === process.env.INTERNAL_API_SECRET;
}

// Crea una nuova notifica (chiamato da Nuviio Hub)
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.message) {
    return NextResponse.json({ error: "title e message sono obbligatori" }, { status: 400 });
  }

  const notification = await prisma.notification.create({
    data: {
      title: body.title,
      message: body.message,
      type: (body.type as NotificationType) ?? "INFO",
      targetServiceSlug: body.targetServiceSlug ?? null,
      active: body.active ?? true,
    },
  });

  return NextResponse.json({ success: true, id: notification.id });
}

// Aggiorna una notifica esistente (es. disattivarla o correggere testo)
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "id obbligatorio" }, { status: 400 });
  }

  const { id, ...data } = body;

  const notification = await prisma.notification.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.message !== undefined && { message: data.message }),
      ...(data.type !== undefined && { type: data.type as NotificationType }),
      ...(data.targetServiceSlug !== undefined && { targetServiceSlug: data.targetServiceSlug }),
      ...(data.active !== undefined && { active: data.active }),
    },
  });

  return NextResponse.json({ success: true, id: notification.id });
}

// Elimina definitivamente una notifica (e le relative letture via cascade)
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "id obbligatorio" }, { status: 400 });
  }

  await prisma.notification.delete({ where: { id: body.id } });

  return NextResponse.json({ success: true });
}
