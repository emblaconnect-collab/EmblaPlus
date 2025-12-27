import React, { useState, useEffect, useRef } from 'react';
import { Stat } from '../types';

const stats: Stat[] = [
  { value: "100%", label: "Foco Estratégico", delay: 0 },
  { value: "0", label: "Frases Vazias", delay: 100 },
  { value: "10s", label: "Clareza Imediata", delay: 200 },
  { value: "24/7", label: "Autoridade Digital", delay: 300 }
];

const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  const numberMatch = value.match(/\d+/);
  const numericTarget = numberMatch ? parseInt(numberMatch[0]) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          setIsVisible(true);
          animatedRef.current = true;
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let frameId: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayValue(Math.floor(easedProgress * numericTarget));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, numericTarget]);

  return (
    <span ref={containerRef} aria-label={`${value}${suffix ? ' ' + suffix : ''}`}>
      {displayValue}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 md:py-32 overflow-hidden bg-transparent relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1">
            <span className="text-teal-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Sobre a Embla
            </span>
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-10 leading-tight">
              Clareza acima <br />
              <span className="text-teal-600">da decoração.</span>
            </h2>
            <div className="space-y-6 text-slate-200 text-lg leading-relaxed font-light">
              <p>
                Nós acreditamos que um site é uma ferramenta de negócios, não uma galeria de arte. Se o seu visitante não entende o seu valor nos primeiros segundos, você o perdeu.
              </p>
              <p>
                A <strong className="text-white font-semibold">Embla</strong> elimina o ruído corporativo e as mensagens genéricas. Substituímos "excelência" por resultados tangíveis.
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 w-full" role="list" aria-label="Estatísticas da Embla">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                role="listitem"
                className="bg-slate-900/20 border border-white/5 p-6 md:p-10 rounded-3xl text-center backdrop-blur-md group hover:border-teal-500/30 transition-all duration-700"
              >
                <div 
                  className="text-4xl md:text-6xl font-serif font-bold text-teal-400 mb-2 group-hover:scale-110 transition-transform duration-500"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;