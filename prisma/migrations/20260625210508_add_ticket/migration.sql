-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('ORDINE', 'PAGAMENTO', 'RITIRO_CONSEGNA', 'QUALITA', 'ALTRO');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "userEmail" TEXT,
    "restaurantId" TEXT,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL DEFAULT 'ALTRO',
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "hubTicketId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
