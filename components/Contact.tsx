import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xjgbaqyd");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    phone: false
  });

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: value.length < 10 && value.length > 0 });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setErrors({ ...errors, email: !validateEmail(value) && value.length > 0 });
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div 
      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-950 text-white text-[10px] uppercase font-bold tracking-widest rounded-md shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 border border-slate-800 whitespace-nowrap z-30 hidden md:block"
      role="tooltip"
      aria-hidden="true"
    >
      {text}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-r border-b border-slate-800 rotate-45"></div>
    </div>
  );

  return (
    <section id="contato" className="py-16 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-teal-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Contato</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">
              Vamos elevar <br />sua presença.
            </h2>
            
            <div className="space-y-6 mt-8 md:mt-12">
              <a 
                href="https://wa.me/5519997791763" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex gap-5 items-center group relative w-fit focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-2xl"
                aria-label="Falar conosco pelo WhatsApp: (19) 99779-1763"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-all btn-active-state">
                  <Phone size={26} />
                  <Tooltip text="WhatsApp" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">WhatsApp</p>
                  <p className="text-white text-lg font-medium">(19) 99779-1763</p>
                </div>
              </a>

              <a 
                href="mailto:Emblaconnect@gmail.com" 
                className="flex gap-5 items-center group relative w-fit focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-2xl"
                aria-label="Enviar e-mail para Emblaconnect@gmail.com"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-all btn-active-state">
                  <Mail size={26} />
                  <Tooltip text="E-mail" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Email</p>
                  <p className="text-white text-lg font-medium">Emblaconnect@gmail.com</p>
                </div>
              </a>

              <div className="flex gap-5 items-center group relative w-fit">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-all" aria-hidden="true">
                  <MapPin size={26} />
                  <Tooltip text="Localização" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Onde estamos</p>
                  <p className="text-white text-base md:text-lg font-medium">R. Vicente Bombini, 462 - São Paulo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative">
            {state.succeeded ? (
              <div className="py-20 text-center animate-in zoom-in-95 duration-500" role="status" aria-live="polite">
                <div className="w-20 h-20 bg-teal-600/20 rounded-full flex items-center justify-center text-teal-500 mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Mensagem Recebida!</h3>
                <p className="text-slate-300">Em menos de 24h entraremos em contato.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">
                      Nome *
                    </label>
                    <input 
                      id="name"
                      required
                      maxLength={80}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: João Silva"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white p-5 rounded-2xl outline-none transition-all placeholder:text-slate-700 text-base"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1 flex justify-between">
                      E-mail *
                      {errors.email && (
                        <span className="text-rose-400 text-[9px]" role="alert">E-mail inválido</span>
                      )}
                    </label>
                    <input 
                      id="email"
                      required
                      maxLength={100}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      placeholder="joao@empresa.com"
                      className={`w-full bg-slate-900 border ${errors.email ? 'border-rose-500/50' : 'border-slate-800'} focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white p-5 rounded-2xl outline-none transition-all placeholder:text-slate-700 text-base`}
                      aria-required="true"
                      aria-invalid={errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1 flex justify-between">
                    Celular *
                    {errors.phone && (
                      <span className="text-rose-400 text-[9px]" role="alert">Mínimo 10 dígitos</span>
                    )}
                  </label>
                  <input 
                    id="phone"
                    required
                    maxLength={15}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="19997791763"
                    className={`w-full bg-slate-900 border ${errors.phone ? 'border-rose-500/50' : 'border-slate-800'} focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white p-5 rounded-2xl outline-none transition-all placeholder:text-slate-700 text-base`}
                    aria-required="true"
                    aria-invalid={errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">
                    Mensagem *
                  </label>
                  <textarea 
                    id="message"
                    required
                    maxLength={600}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Conte-nos sobre seu projeto ou desafio..."
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white p-5 rounded-2xl outline-none transition-all resize-none placeholder:text-slate-700 text-base"
                    aria-required="true"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={state.submitting || errors.email || errors.phone || !formData.name || !formData.message}
                  className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs btn-active-state focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                  aria-label={state.submitting ? 'Enviando mensagem' : 'Solicitar diagnóstico gratuito'}
                >
                  {state.submitting ? 'Enviando...' : 'Solicitar Diagnóstico'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;