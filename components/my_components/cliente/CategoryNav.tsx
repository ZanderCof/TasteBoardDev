export function CategoryNav({ categories }: { categories: { id: string, name: string }[] }) {
  return (
    <nav className="sticky top-18.25 z-40 bg-white border-b border-slate-50 flex overflow-x-auto py-4 px-6 gap-6 no-scrollbar shadow-sm">
      {categories.map((cat) => (
        <a 
          key={cat.id} 
          href={`#${cat.id}`} 
          className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 focus:text-red-600 active:text-red-600 transition-colors"
        >
          {cat.name}
        </a>
      ))}
    </nav>
  );
}
