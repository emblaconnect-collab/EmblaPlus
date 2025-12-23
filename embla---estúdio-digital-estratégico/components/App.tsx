import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Hero from './Hero';
import Solutions from './Solutions';
import About from './About';
import Method from './Method';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    // Listener de scroll para o botão "Voltar ao topo" (funciona em ambos)
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });

    // Guard: Se for mobile, não inicializa o motor gráfico
    const isMobileInitial = window.innerWidth < 768;
    
    // Intersection Observer para seções (funciona em ambos)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));

    if (isMobileInitial) {
      return () => {
        window.removeEventListener('scroll', handleScrollVisibility);
        observer.disconnect();
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Configurações do motor (mantidas como "perfeitas" para desktop)
    const COLORS = {
      stars: ['#ffffff', '#99f6e4', '#5eead4', '#7dd3fc', '#f8fafc'],
      nebulae: [
        { color: 'rgba(20, 184, 166, 0.12)', r: 0.6 },
        { color: 'rgba(15, 23, 42, 0.2)', r: 0.8 },
        { color: 'rgba(56, 189, 248, 0.08)', r: 0.5 },
        { color: 'rgba(139, 92, 246, 0.04)', r: 0.4 }
      ]
    };

    class Nebula {
      x: number; y: number; r: number; color: string;
      vx: number; vy: number;
      constructor(color: string, radiusFactor: number, w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = radiusFactor * w * 0.7;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }
      update(deltaTime: number, w: number, h: number) {
        const normalizedDelta = deltaTime / 16.67;
        this.x += this.vx * normalizedDelta;
        this.y += this.vy * normalizedDelta;
        if (this.x < -this.r) this.x = w + this.r;
        if (this.x > w + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = h + this.r;
        if (this.y > h + this.r) this.y = -this.r;
      }
      draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'screen';
        ctx.fillRect(0, 0, w, h);
      }
    }

    class Star {
      x: number; y: number; z: number; size: number; color: string; brightness: number; flare: boolean;
      constructor(initial = false) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1500;
        this.x = Math.cos(angle) * radius;
        this.y = (Math.random() - 0.5) * 300;
        this.z = initial ? Math.random() * 2000 : 2000;
        this.size = Math.random() * 1.5 + 0.1;
        this.color = COLORS.stars[Math.floor(Math.random() * COLORS.stars.length)];
        this.brightness = Math.random() * 0.8 + 0.2;
        this.flare = Math.random() > 0.98;
      }
      update(deltaTime: number) {
        const normalizedDelta = deltaTime / 16.67;
        const speed = 0.0008 * normalizedDelta;
        const cos = Math.cos(speed);
        const sin = Math.sin(speed);
        const nx = this.x * cos - this.z * sin;
        const nz = this.x * sin + this.z * cos;
        this.x = nx;
        this.z = nz;
        if (this.z > 3000) this.z = -1000;
        if (this.z < -1000) this.z = 3000;
      }
      draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const fov = 1000;
        if (this.z <= -fov) return;
        const scale = fov / (fov + this.z);
        const radius = this.size * scale;
        const tiltY = this.y + (this.x * 0.2); 
        const x2d = this.x * scale + w / 2;
        const y2d = tiltY * scale + h / 2;
        if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
          const depthOpacity = Math.max(0, Math.min(1, 1 - (this.z / 2000)));
          ctx.globalAlpha = depthOpacity * this.brightness;
          ctx.fillStyle = this.color;
          if (this.flare && scale > 0.8) {
            ctx.shadowBlur = 15 * scale;
            ctx.shadowColor = this.color;
          }
          ctx.beginPath();
          ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    let stars: Star[] = [];
    let nebulae: Nebula[] = [];

    const initMotor = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      stars = Array.from({ length: 1200 }, () => new Star(true));
      nebulae = COLORS.nebulae.map(n => new Nebula(n.color, n.r, w, h));
    };

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTimeRef.current, 100);
      lastTimeRef.current = currentTime;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      nebulae.forEach(n => { n.update(deltaTime, w, h); n.draw(ctx, w, h); });
      ctx.globalCompositeOperation = 'lighter';
      stars.forEach(s => { s.update(deltaTime); s.draw(ctx, w, h); });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    initMotor();
    animationFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      } else {
        if (!animationFrameRef.current) {
          initMotor();
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          initMotor();
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative bg-slate-950 overflow-x-hidden min-h-screen flex flex-col">
      {/* O Canvas é exibido apenas em telas desktop. No mobile, prevalece o bg-slate-950 sólido do container. */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none hidden md:block"
        style={{ filter: 'contrast(1.1) brightness(0.9)', width: '100%', height: '100%' }}
        aria-hidden="true"
      />
      
      <Header />
      <main className="flex-grow relative z-10">
        <Hero />
        <div className="reveal-section"><Solutions /></div>
        <div className="reveal-section"><About /></div>
        <div className="reveal-section"><Method /></div>
        <div className="reveal-section"><Portfolio /></div>
        <div className="reveal-section"><Contact /></div>
      </main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[40] w-14 h-14 md:w-16 md:h-16 bg-teal-500/10 backdrop-blur-md border border-teal-500/30 text-teal-400 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
          showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50 pointer-events-none'
        }`}
        aria-label="Voltar ao topo da página"
      >
        <ArrowUp size={28} />
      </button>
    </div>
  );
};

export default App;