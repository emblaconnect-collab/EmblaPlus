
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, RefreshCcw } from 'lucide-react';
import { getStrategicInsight } from '../services/geminiService';

const AIStrategist: React.FC = () => {
  const [input, setInput] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const result = await getStrategicInsight(input);
    setInsight(result);
    setIsLoading(false);
  };

  const handleReset = () => {
    setInsight(null);
    setInput('');
  };

  useEffect(() => {
    if (insight && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [insight]);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Glass decoration */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl transition-all group-hover:bg-teal-500/20"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-teal-600/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400">
                    <Sparkles size={28} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-1">Estrategista IA</h3>
                    <p className="text-slate-400 text-sm font-light">Validação estratégica em tempo real pela nossa IA.</p>
                  </div>
                </div>
                {insight && (
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors text-xs uppercase tracking-widest font-bold"
                  >
                    <RefreshCcw size={14} /> Novo Insight
                  </button>
                )}
              </div>

              {!insight ? (
                <form onSubmit={handleGenerate} className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center ml-2">
                      <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Descreva seu negócio ou proposta</label>
                      <span className="text-[10px] text-slate-600 tracking-widest font-bold">{input.length}/300</span>
                    </div>
                    <textarea 
                      placeholder="Ex: Consultoria jurídica focada em startups de tecnologia que buscam escala internacional rápida..."
                      maxLength={300}
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-teal-500/50 text-white p-7 rounded-[2rem] outline-none transition-all min-h-[160px] md:min-h-[200px] resize-none text-lg font-light leading-relaxed focus:bg-slate-950 shadow-inner"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end items-center">
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-full md:w-auto bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-8 py-5 rounded-2xl transition-all shadow-xl shadow-teal-950/20 group/btn flex items-center justify-center gap-4 transform active:scale-95"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="animate-spin" size={20} />
                          <span className="text-sm font-bold uppercase tracking-widest">Analisando...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-bold uppercase tracking-widest">Gerar Diagnóstico</span>
                          <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div 
                  ref={resultRef}
                  className="bg-slate-950/80 border border-teal-500/10 p-10 rounded-[2.5rem] animate-in fade-in zoom-in-95 duration-500 shadow-inner"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                    <h4 className="text-teal-400 font-bold uppercase tracking-[0.3em] text-[10px]">Diagnóstico Estratégico</h4>
                  </div>
                  <p className="text-slate-100 leading-[1.8] text-xl font-light italic opacity-90">
                    "{insight}"
                  </p>
                  <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest">Baseado no modelo Gemini 3 Pro</span>
                    <a href="#contato" className="text-teal-400 hover:text-white transition-colors text-sm font-bold underline underline-offset-8 decoration-2">Discutir este insight com o time</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStrategist;