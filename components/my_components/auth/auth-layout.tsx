export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LATO SINISTRO: Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-400px space-y-8">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
            <p className="text-slate-500 font-medium">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* LATO DESTRO: Visual (nascosto su mobile) */}
      <div className="hidden lg:flex bg-red-600 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://unsplash.com')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="bg-yellow-400 w-16 h-1 rounded-full mb-6" />
          <h2 className="text-4xl font-bold mb-4">&ldquo;Tasteboard ha cambiato il modo in cui gestiamo la nostra sala.&rdquo;</h2>
          <p className="text-red-100 text-lg italic">— Chef Mario, Ristorante Roma</p>
        </div>
      </div>
    </div>
  );
}
