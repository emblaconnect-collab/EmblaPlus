import React, { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [year, setYear] = useState('2025');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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
    <footer className="bg-slate-950/80 pt-20 pb-10 border-t border-white/5 relative z-20 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <a 
              href="#inicio" 
              onClick={(e) => handleNavClick(e, 'inicio')}
              className="flex items-center gap-3 mb-8 group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg"
              aria-label="Embla - Voltar ao início"
            >
              <div className="tech-scan-logo">
                <Logo className="h-7 w-auto transition-all duration-700 group-hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
              </div>
            </a>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
              Transformando empresas em presenças digitais que comunicam com clareza e autoridade através de estratégia profunda.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/emblaconnect" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400 transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Seguir a Embla no Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 md:grid-cols-3 gap-12" aria-label="Navegação do rodapé">
            <div>
              <h2 className="text-white text-[10px] uppercase tracking-widest font-bold mb-6">Navegação</h2>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#inicio" 
                    onClick={(e) => handleNavClick(e, 'inicio')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Início"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a 
                    href="#solucoes" 
                    onClick={(e) => handleNavClick(e, 'solucoes')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Soluções"
                  >
                    Soluções
                  </a>
                </li>
                <li>
                  <a 
                    href="#metodo" 
                    onClick={(e) => handleNavClick(e, 'metodo')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Método"
                  >
                    Método
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white text-[10px] uppercase tracking-widest font-bold mb-6">Estúdio</h2>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#sobre" 
                    onClick={(e) => handleNavClick(e, 'sobre')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Sobre Nós"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a 
                    href="#portfolio" 
                    onClick={(e) => handleNavClick(e, 'portfolio')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Portfólio"
                  >
                    Portfólio
                  </a>
                </li>
                <li>
                  <a 
                    href="#contato" 
                    onClick={(e) => handleNavClick(e, 'contato')} 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Ir para Contato"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-white text-[10px] uppercase tracking-widest font-bold mb-6">Legal</h2>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:emblaconnect@gmail.com?subject=Política de Privacidade" 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium text-nowrap focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Solicitar Política de Privacidade por e-mail"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:emblaconnect@gmail.com?subject=Termos de Uso" 
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors font-medium text-nowrap focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
                    aria-label="Solicitar Termos de Uso por e-mail"
                  >
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-400 text-[9px] uppercase font-bold tracking-[0.2em]">
            © {year} Embla Estúdio Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
