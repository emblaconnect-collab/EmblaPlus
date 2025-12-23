import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const projects: Project[] = [
  { 
    category: "Conversão", 
    title: "D'corart Móveis Planejados", 
    image: "https://res.cloudinary.com/dnmnluf97/image/upload/f_webp,q_80,w_800/v1766409408/D_corart_1200x1600_v5w48l.png", 
    delay: 0,
    link: "https://legendary-begonia-acc67a.netlify.app/",
    features: [
      "Formulário de Captura Estratégica",
      "Funil de Vendas Otimizado",
      "Galeria de Projetos com CTAs",
      "Navegação Mobile Fluida"
    ]
  },
  { 
    category: "Autoridade", 
    title: "Agrovale Soluções Agrícolas", 
    image: "https://res.cloudinary.com/dnmnluf97/image/upload/f_webp,q_80,w_800/v1766410460/agrovale_tecnologia_1200x1600_esflbx.png", 
    delay: 100,
    link: "https://stellular-swan-91800e.netlify.app/",
    features: [
      "Assistente IA Contextual",
      "Motor Multilíngue Dinâmico",
      "Estrutura de SEO de Alta Intenção",
      "Arquitetura de Credibilidade"
    ]
  },
  { 
    category: "Básica", 
    title: "Estúdio de Design", 
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=60&w=800&fm=webp", 
    delay: 200,
    features: [
      "Layout Minimalista Focado",
      "Performance Web Core Vitals",
      "Experiência Adaptativa Premium"
    ]
  }
];

const Portfolio: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-48 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 md:mb-40 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-md">
          <Sparkles size={14} className="text-teal-400" aria-hidden="true" />
          <span className="text-teal-500 font-bold uppercase tracking-[0.4em] text-[10px]">Excelência Estratégica</span>
        </div>
        <h2 className="text-5xl md:text-9xl font-serif font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Projetos <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Conceituais.</span>
        </h2>
        
        {/* Mobile Scroll Indicators - Moved up to be below the title */}
        <div className="md:hidden flex flex-col items-center gap-4 mt-6 mb-12">
          <p className="text-[10px] text-teal-400 font-black uppercase tracking-[0.4em] animate-pulse">Arraste para o lado</p>
          <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-300 ease-out" 
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto rounded-full opacity-50" aria-hidden="true"></div>
      </div>

      <div className="relative z-10">
        {/* Mobile Horizontal Carousel / Desktop Grid Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar gap-6 md:gap-12 px-6 md:px-12 lg:px-24 pb-12 md:pb-0"
        >
          {projects.map((project, idx) => (
            <article 
              key={idx}
              className="group relative h-[500px] md:h-[750px] shrink-0 w-[85vw] md:w-auto snap-center overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 border border-white/5 hover:border-teal-500/50 transition-all duration-1000 shadow-2xl"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={project.image} 
                  alt={`Prévia do projeto ${project.title}`}
                  width="800"
                  height="1067"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent transition-opacity duration-700 group-hover:opacity-0" aria-hidden="true"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 z-10 transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="h-[1px] w-8 md:w-10 bg-teal-500" aria-hidden="true"></span>
                  <span className="text-teal-400 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-none mb-4 md:mb-6">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-slate-300 text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                  <span>Explorar Detalhes</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-center items-start opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 bg-slate-950/95 md:bg-slate-950/90 backdrop-blur-2xl">
                <div className="mb-8 md:mb-10">
                  <span className="text-teal-500 font-black uppercase tracking-[0.4em] text-[9px] mb-2 md:mb-4 block">Ficha Técnica</span>
                  <h4 className="text-white text-3xl md:text-5xl font-serif font-bold leading-tight">{project.title}</h4>
                </div>
                
                {project.features && (
                  <ul className="space-y-4 md:space-y-6 mb-8 md:mb-12 w-full" aria-label={`Recursos do projeto ${project.title}`}>
                    {project.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4 md:gap-5 text-slate-100 text-sm md:text-base font-light group/feature border-b border-white/5 pb-3 md:pb-4 last:border-0">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-teal-500/30 flex items-center justify-center shrink-0 group-hover/feature:bg-teal-500 group-hover/feature:border-teal-500 transition-all duration-500" aria-hidden="true">
                          <CheckCircle2 size={10} className="text-teal-400 group-hover/feature:text-slate-950 transition-colors" />
                        </div>
                        <span className="leading-tight group-hover/feature:translate-x-1 transition-transform duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.link ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto flex items-center justify-center gap-4 bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 md:px-12 py-4 md:py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all shadow-[0_20px_40px_rgba(20,184,166,0.2)] active:scale-95 btn-active-state focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                    aria-label={`Visitar site do projeto ${project.title}`}
                  >
                    Visitar Experiência <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <div className="w-full text-center py-4 px-6 rounded-2xl border border-white/10 text-slate-400 text-[10px] uppercase font-bold tracking-[0.3em] backdrop-blur-sm">
                    Estudo de Caso Restrito
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 md:mt-48 flex flex-col items-center max-w-4xl mx-auto text-center px-6">
          <div className="w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-12 flex items-center justify-center rounded-full bg-teal-500/5 border border-teal-500/20" aria-hidden="true">
            <Sparkles size={28} className="text-teal-400 opacity-50" />
          </div>
          <blockquote className="text-slate-200 text-xl md:text-4xl font-serif italic leading-relaxed mb-12 md:mb-16">
            "Não criamos sites. Criamos <span className="text-white font-bold not-italic border-b-2 border-teal-500/30">ativos digitais</span> que trabalham pela autoridade da sua marca enquanto você dorme."
          </blockquote>
          
          <a 
            href="https://wa.me/5519997791763?text=Olá%20Equipe%20Embla,%20gostaria%20de%20começar%20um%20projeto!!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-6 md:gap-8 px-10 md:px-14 py-6 md:py-7 bg-slate-900 border border-teal-500/30 text-teal-400 rounded-full font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] transition-all duration-500 overflow-hidden hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 w-full md:w-auto"
            aria-label="Iniciar estratégia digital pelo WhatsApp"
          >
            <div className="absolute inset-0 w-0 bg-teal-500 transition-all duration-700 ease-in-out group-hover:w-full -z-10" aria-hidden="true"></div>
            <span>Iniciar Estratégia</span>
            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" aria-hidden="true" />
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Portfolio;