import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, MessageCircle, ChevronRight } from 'lucide-react';
import { NavLink } from '../types';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navLinks: NavLink[] = [
    { name: 'Início', href: '#inicio', id: 'inicio' },
    { name: 'Soluções', href: '#solucoes', id: 'solucoes' },
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Método', href: '#metodo', id: 'metodo' },
    { name: 'Portfólio', href: '#portfolio', id: 'portfolio' },
    { name: 'Contato', href: '#contato', id: 'contato' }
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      if (scrollY < 100) {
        setActiveSection('inicio');
        return;
      }

      const sections = navLinks.map(l => l.id);
      let currentSection = activeSection;
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' 
          : 'bg-transparent py-8 md:py-10 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => handleNavClick(e, 'inicio')} 
          className="relative group flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg"
          aria-label="Embla - Voltar ao início"
        >
          <div className="tech-scan-logo rounded-lg relative px-2 py-1">
            <Logo className="h-10 md:h-16 w-auto transition-all duration-700 group-hover:scale-105" />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12" aria-label="Navegação principal">
          <ul className="flex gap-10 relative">
            {navLinks.map((link) => (
              <li key={link.id} className="relative group/item">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-[9px] uppercase tracking-[0.4em] font-black transition-all duration-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-2 py-1 ${
                    activeSection === link.id ? 'text-teal-400' : 'text-slate-300'
                  }`}
                  aria-label={`Ir para ${link.name}`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, 'contato')}
            className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
              isScrolled 
                ? 'bg-teal-600/10 text-teal-400 border-teal-500/20' 
                : 'bg-white/5 text-white border-white/10'
            }`}
            aria-label="Conectar com a Embla"
          >
            Conectar
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className={`lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-2xl transition-all duration-500 border z-[10001] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
            isMobileMenuOpen 
              ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' 
              : 'bg-slate-900/50 border-white/10 text-white'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <>
              <span className="w-6 h-0.5 bg-current rounded-full"></span>
              <span className="w-5 h-0.5 bg-current rounded-full ml-1"></span>
              <span className="w-6 h-0.5 bg-current rounded-full"></span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div 
        className={`embla-overlay lg:hidden ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Clean Side Menu Drawer */}
      <nav 
        id="mobile-menu"
        className={`embla-mobile-menu lg:hidden ${isMobileMenuOpen ? 'active' : ''}`}
        aria-label="Navegação mobile"
      >
        {/* Navigation Links - Centered/Distributed */}
        <ul className="flex flex-col justify-center flex-grow py-4">
          {navLinks.map((link, idx) => (
            <li 
              key={link.id}
              className="transform transition-all duration-500"
              style={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: `${idx * 0.05}s` 
              }}
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300 font-serif font-bold text-3xl group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset ${
                  activeSection === link.id 
                    ? 'text-teal-400' 
                    : 'text-slate-200'
                }`}
                aria-label={`Ir para ${link.name}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <div 
                    className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                    aria-hidden="true"
                  ></div>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Area - Bottom */}
        <div 
          className="space-y-6 pt-6 border-t border-white/5"
          style={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.35s'
          }}
        >
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, 'contato')}
            className="w-full bg-teal-500 text-slate-950 flex items-center justify-center py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95 btn-active-state focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-label="Iniciar diagnóstico gratuito"
          >
            Iniciar Diagnóstico
          </a>

          <div className="flex justify-between items-center gap-4">
            <a 
              href="https://wa.me/5519997791763" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center text-teal-400 btn-active-state focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label="Falar no WhatsApp com a Embla"
            >
              <MessageCircle size={24} />
            </a>
            <a 
              href="https://www.instagram.com/emblaconnect" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center text-teal-400 btn-active-state focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label="Seguir a Embla no Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
          
          <div className="text-center">
            <span className="text-[8px] uppercase tracking-[0.3em] text-slate-500 font-bold">© {new Date().getFullYear()} Embla Studio</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;