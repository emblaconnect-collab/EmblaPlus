import React, { useState } from 'react';
import { Monitor, TrendingUp, Award, CheckCircle, ArrowUpRight, ChevronUp, Sparkles } from 'lucide-react';
import { Solution } from '../types';

const solutions: Solution[] = [
  {
    icon: <Monitor />,
    title: "Presença Digital Básica",
    description: "Existir com clareza absoluta. Não é sobre vender agora, é sobre ser encontrado e validado instantaneamente por quem te procura.",
    features: ["Website/Landing Page", "UX Otimizado", "Identidade visual digital", "SEO Básico"],
    delay: 0
  },
  {
    icon: <TrendingUp />,
    title: "Presença de Conversão",
    description: "Transformar tráfego em ativo financeiro. Cada elemento visual é desenhado para conduzir o olhar e a ação do visitante.",
    features: ["Landing Page de Alta Perfomance", "Funis de Vendas Estruturados", "Analytics de Comportamento", "Response copywriting"],
    delay: 100
  },
  {
    icon: <Award />,
    title: "Presença de Autoridade",
    description: "Posicionamento premium inquestionável. Criamos uma percepção de valor que permite cobrar o quanto você realmente vale.",
    features: ["Narrativa de Marca Soberana", "SEO de Intenção Comercial", "Design de Exclusividade", "Ecossistema de Confiança"],
    delay: 200
  }
];

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <section id="solucoes" className="py-24 md:py-48 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 mb-20 md:mb-40 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-md">
          <Sparkles size={14} className="text-teal-400" aria-hidden="true" />
          <span className="text-teal-500 font-bold uppercase tracking-[0.3em] text-[10px]">Modelos de Entrega</span>
        </div>
        <h2 className="text-5xl md:text-9xl font-serif font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Arquitetura de <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Resultados.</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto rounded-full opacity-50" aria-hidden="true"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {solutions.map((item, idx) => (
            <article 
              key={idx}
              className={`relative bg-slate-900/20 backdrop-blur-xl border rounded-[3.5rem] group overflow-hidden h-[550px] md:h-[650px] transition-all duration-700 shadow-2xl ${
                activeTab === idx ? 'border-teal-500/50 shadow-teal-500/10' : 'border-white/5 hover:border-teal-500/30'
              }`}
            >
              {/* Animated Glow Back */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-[80px] group-hover:bg-teal-500/10 transition-all duration-1000" aria-hidden="true"></div>
              
              {/* Standard Content Face */}
              <button
                onClick={() => setActiveTab(activeTab === idx ? null : idx)}
                className={`p-10 md:p-14 h-full flex flex-col w-full text-left transition-opacity duration-300 ${
                  activeTab === idx ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-expanded={activeTab === idx}
              >
                <div className="relative mb-12 h-[80px]">
                  <div className="w-20 h-20 bg-slate-800/40 rounded-[2.5rem] flex items-center justify-center border border-white/10 relative z-10">
                    {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<any>, { 
                      size: 38, 
                      className: "text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]",
                      'aria-hidden': true
                    })}
                  </div>
                  <div className="absolute -inset-2 bg-teal-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
                </div>

                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight tracking-tight min-h-[90px] md:min-h-[120px]">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light mb-10 min-h-[120px] md:min-h-[140px]">
                  {item.description}
                </p>
                
                <div className="mt-auto flex items-center gap-5 text-teal-400 font-black uppercase tracking-[0.3em] text-[10px] group-hover:text-white transition-colors">
                  <div className="w-10 h-[1px] bg-teal-500 flex-shrink-0" aria-hidden="true"></div>
                  <span className="whitespace-nowrap">Ver Especificações</span>
                  <ArrowUpRight size={18} className="flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </div>
              </button>

              {/* Specification Layer Face */}
              <div className={`absolute inset-0 bg-slate-950/95 backdrop-blur-[40px] p-10 md:p-16 flex flex-col transition-all duration-300 border-t-2 border-teal-500/20 ${
                activeTab === idx ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
              }`}>
                {/* Visual Pull Bar for context */}
                <div className="flex justify-center mb-12">
                  <div className="w-20 h-1.5 rounded-full bg-teal-500/20" aria-hidden="true"></div>
                </div>

                <div className="flex items-start justify-between mb-12">
                  <div>
                    <span className="text-teal-500 font-black uppercase tracking-[0.5em] text-[9px] mb-3 block">Engenharia de Valor</span>
                    <h4 className="text-white text-3xl md:text-4xl font-serif font-bold tracking-tight">Checklist Técnico</h4>
                  </div>
                  <button 
                    onClick={() => setActiveTab(null)}
                    className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Fechar especificações"
                  >
                    <ChevronUp size={28} className="rotate-180" aria-hidden="true" />
                  </button>
                </div>

                <ul className="space-y-6 flex-grow overflow-y-auto pr-4 custom-scrollbar" aria-label={`Recursos de ${item.title}`}>
                  {item.features.map((feature, fIdx) => (
                    <li 
                      key={fIdx} 
                      className="flex items-start gap-6 group/feature border-b border-white/5 pb-6 last:border-0 transition-all hover:translate-x-1"
                      style={{ transitionDelay: `${fIdx * 50}ms` }}
                    >
                      <div className="mt-1.5 shrink-0 w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center" aria-hidden="true">
                        <CheckCircle size={14} className="text-teal-400" />
                      </div>
                      <span className="text-slate-100 text-xl md:text-2xl font-light leading-snug group-hover/feature:text-white transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 pt-10 border-t border-white/10 text-center">
                   <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-black animate-pulse">Toque em qualquer área para voltar</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;