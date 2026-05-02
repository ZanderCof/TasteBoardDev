"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AppearanceSettings() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/50 border border-white">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">Tema Dark</h4>
            <p className="text-xs text-slate-500 font-medium">Attiva il menu in modalità scura per la sera.</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/50 border border-white">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">Mostra Allergeni</h4>
            <p className="text-xs text-slate-500 font-medium">Visualizza le icone degli allergeni sotto ogni piatto.</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="space-y-4">
          <Label className="font-bold text-slate-900">Colore Brand (Menu Digitale)</Label>
          <div className="flex gap-4">
            {['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#000000'].map((color) => (
              <button 
                key={color} 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
