// "use client";
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Crown, Lock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

// export const PremiumFeatureWall = ({ featureName = "Analisi Avanzata" }) => (
//   <div className="w-full min-h-[500px] flex items-center justify-center p-6 bg-slate-50/50 rounded-[3.5rem] border-2 border-dashed border-slate-200">
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-2xl w-full bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl text-center relative overflow-hidden"
//     >
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-blue-50/30 pointer-events-none" />

//       <div className="relative z-10 flex flex-col items-center">
//         <div className="w-20 h-20 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-violet-200 mb-8">
//           <Crown size={36} strokeWidth={2.5} />
//         </div>

//         <div className="space-y-4 mb-10">
//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Passa a <span className="text-violet-600">TasteBoard Pro</span>
//           </h2>
//           <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">
//             La funzione <span className="text-slate-900 font-bold">"{featureName}"</span> è riservata ai nostri partner premium.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10 text-left">
//           {["Report dettagliati", "Multi-locale illimitato", "Supporto 24/7", "Personalizzazione Web"].map((item, i) => (
//             <div key={i} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
//               <CheckCircle2 size={16} className="text-violet-500" />
//               <span className="text-xs font-bold text-slate-600">{item}</span>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 w-full">
//           <button className="flex-1 h-16 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-violet-100 transition-all flex items-center justify-center gap-2 group">
//             Sblocca ora <Zap size={16} className="fill-current group-hover:scale-125 transition-transform" />
//           </button>
//           <button className="flex-1 h-16 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl font-bold text-sm transition-all">
//             Scopri i piani
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   </div>
// );
