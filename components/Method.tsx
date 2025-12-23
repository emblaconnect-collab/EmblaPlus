import React, { useEffect, useRef, useState } from 'react';
import { Step } from '../types';

const steps: Step[] = [
  { number: "01", title: "Imersão", description: "Mergulhamos no seu mercado para entender a dor real do cliente.", delay: 0 },
  { number: "02", title: "Narrativa", description: "Construímos uma mensagem clara que elimina objeções imediatamente.", delay: 150 },
  { number: "03", title: "Arquitetura", description: "Desenhamos fluxos de conversão baseados em psicologia digital.", delay: 300 },
  { number: "04", title: "Execução", description: "Desenvolvimento técnico impecável com design profissional.", delay: 450 },
  { number: "05", title: "Sucesso", description: "Lançamento estratégico e otimização contínua baseada em dados.", delay: 600 }
];

const Method: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="metodo" className="py-16 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 md:mb-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-2xl">
            <span className="text-teal-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Metodologia Embla
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">
              O Caminho para <br />
              <span className="text-teal-600">Resultados Claros.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-200 text-lg leading-relaxed font-light border-l-2 border-teal-500/30 pl-6">
              Nosso processo é linear, estratégico e focado em eliminar o ruído visual e textual.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <article 
              key={idx}
              className={`group relative h-full transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ transitionDelay: `${step.delay}ms` }}
              aria-label={`Etapa ${step.number}: ${step.title}`}
            >
              <div className="bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-[2.5rem] group-hover:border-teal-500/30 transition-all duration-700 h-full flex flex-col hover:shadow-2xl backdrop-blur-sm">
                <span 
                  className="text-5xl md:text-6xl font-serif font-black mb-6 md:mb-8 block bg-gradient-to-br from-slate-100 via-slate-500 to-slate-300 bg-clip-text text-transparent drop-shadow-md transition-all duration-700 group-hover:from-white"
                  aria-label={`Etapa ${step.number}`}
                >
                  {step.number}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-100 transition-colors font-light">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
