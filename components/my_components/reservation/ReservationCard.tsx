import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Phone } from "lucide-react"
import { format } from "date-fns" // Utility per formattare l'ora

// Definiamo il tipo basandoci sul tuo schema Prisma
interface ReservationProps {
  reservation: {
    id: string;
    customerName: string;
    phone: string;
    date: Date;
    guests: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
  }
}

export function ReservationCard({ reservation }: ReservationProps) {
  return (
    <Card className="border-l-4 border-l-red-600 hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-lg text-slate-900">{reservation.customerName}</h4>
          <div className="flex items-center text-sm text-muted-foreground gap-3">
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-red-600"/> 
              {/* Formattiamo l'ora dalla data di Prisma */}
              {format(new Date(reservation.date), "HH:mm")}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} className="text-red-600"/> 
              {reservation.guests} {reservation.guests === 1 ? 'persona' : 'persone'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <Badge 
            variant="outline"
            className={
              reservation.status === 'PENDING' 
                ? "bg-yellow-400 text-black border-none font-bold" 
                : reservation.status === 'CONFIRMED'
                ? "bg-red-600 text-white border-none font-bold"
                : "bg-slate-200 text-slate-600 border-none font-bold"
            }
          >
            {reservation.status}
          </Badge>
          <span className="text-xs font-bold flex items-center gap-1 text-slate-500">
            <Phone size={12} className="text-red-600"/> {reservation.phone}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
