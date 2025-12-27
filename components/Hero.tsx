import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[85vh] md:min-h-screen flex items-center pt-24 md:pt-48 bg-transparent">
      {/* Decorative Glow - Otimizado com transform3d */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-1/4 -left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-500/10 rounded-full blur-[120px]"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
            willChange: scrollY > 0 ? 'transform' : 'auto'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-12 md:pb-20">
        <div className="max-w-4xl">
          {/* Badge com melhor semântica */}
          <div 
            className="inline-flex items-center gap-4 mb-6 md:mb-10 pl-1 pr-6 py-1.5 rounded-full border border-teal-500/10 bg-teal-500/5 backdrop-blur-xl"
            role="status"
            aria-label="Estúdio ativo de Estratégia Digital"
          >
            <div className="bg-teal-500/20 p-2 rounded-full" aria-hidden="true">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
            </div>
            <span className="text-teal-300 font-black uppercase tracking-[0.4em] text-[8px] md:text-[9px] whitespace-nowrap">
              Estúdio de Estratégia Digital
            </span>
          </div>

          {/* Heading principal - melhor contraste */}
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black text-white mb-6 md:mb-10 leading-[1.1] tracking-tight">
            Sites que não são <br className="hidden md:block" />
            apenas <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-blue-400">decorativos.</span>
          </h1>

          {/* Descrição com melhor contraste */}
          <div className="border-l-2 border-teal-500/30 pl-6 md:pl-8 mb-10 md:mb-14 max-w-2xl">
            <p className="text-lg md:text-2xl text-slate-100 leading-relaxed font-light">
              Na Embla, <span className="text-teal-300 font-semibold">eliminamos o ruído</span>. Criamos experiências digitais onde a <span className="text-teal-300 font-semibold">clareza da sua mensagem</span> é o ativo mais valioso para converter visitantes em clientes.
            </p>
          </div>

          {/* CTAs com labels descritivos */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a 
              href="#metodo" 
              onClick={(e) => handleScrollToSection(e, 'metodo')}
              className="px-10 md:px-12 py-5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-2xl md:rounded-full font-bold text-center transition-all shadow-lg active:scale-95 btn-active-state"
              aria-label="Conhecer a Metodologia Embla"
            >
              Metodologia Embla
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;