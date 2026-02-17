import React, { useEffect } from 'react';
import { PROGRAMS, TESTIMONIALS } from '../constants';
import LeadForm from '../components/LeadForm';

const HOTMART_URL = 'https://hotmart.com/product/comunidade-milionaria?utm_source=manuel-manero&utm_medium=web&utm_campaign=community&utm_content=cta';

const handleCTAClick = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'community_cta_click', {
      event_category: 'conversion',
      event_label: 'community_page'
    });
  }
  window.open(HOTMART_URL, '_blank');
};

const Community: React.FC = () => {
  const communityProgram = PROGRAMS.find(p => p.id === 'comunidade');

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Comunidade Milionária',
        page_path: '/comunidade'
      });
    }
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: '👥',
      title: 'Masterminds Mensais',
      description: 'Sessões exclusivas com empreendedores de elite para accelerar seu crescimento'
    },
    {
      icon: '🌐',
      title: 'Networking de Elite',
      description: 'Conecte-se com os melhores nomes do mercado e crie parcerias estratégicas'
    },
    {
      icon: '🤖',
      title: 'Recursos IA Personalizados',
      description: 'Ferramentas de IA avançadas para otimizar sua marca e aumentar sua presença'
    },
    {
      icon: '📈',
      title: 'Desafios de Escala',
      description: 'Programas estruturados para escalar seu faturamento exponencialmente'
    }
  ];

  const forWho = {
    is: [
      'Empreendedores com faturamento de 5k+ mensais',
      'Pessoas dispostas a investir na sua evolução',
      'Quem quer fazer networking com os melhores',
      'Aqueles que buscam crescimento exponencial',
      'Pessoas com mentalidade de escala'
    ],
    isNot: [
      'Quem não está disposto a agir',
      'Quem busca solução mágica',
      'Aqueles sem disciplina ou compromisso',
      'Pessoas que não investem em si mesmas',
      'Quem espera resultados imediatos'
    ]
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold font-display mb-6 text-white">
            A Comunidade <span className="gold-gradient">Milionária</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            {communityProgram?.tagline}
          </p>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            {communityProgram?.description}
          </p>
          <button
            onClick={handleCTAClick}
            className="gold-gradient text-slate-950 px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all transform hover:scale-105"
          >
            {communityProgram?.cta}
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
            O que você ganha
          </h2>
          <p className="text-center text-slate-400 mb-16">
            Acesso exclusivo a recursos e comunidade de empreendedores visionários
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl hover:border-amber-500/30 transition-all transform hover:scale-105 duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-16">
            Para quem é (e não é)
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Who Is */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-amber-500 mb-8">✅ Para quem É</h3>
              <ul className="space-y-4">
                {forWho.is.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-amber-500 font-bold text-xl mt-1">✓</span>
                    <p className="text-slate-300">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Who Is Not */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-500 mb-8">❌ Para quem NÃO É</h3>
              <ul className="space-y-4">
                {forWho.isNot.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-slate-500 font-bold text-xl mt-1">×</span>
                    <p className="text-slate-400">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
            O que dizem os membros
          </h2>
          <p className="text-center text-slate-400 mb-16">
            Histórias de sucesso de empreendedores que transformaram suas marcas
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-8 rounded-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-amber-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold font-display text-center mb-4">
            Tem interesse? Deixe seu email
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Enviaremos informações exclusivas sobre como entrar na Comunidade Milionária
          </p>
          <LeadForm source="community_page" />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto max-w-4xl">
          <div className="gold-gradient rounded-3xl p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-950 mb-6">
              Pronto para entrar?
            </h2>
            <p className="text-lg text-slate-900 mb-10 max-w-2xl mx-auto">
              Junte-se aos empreendedores que estão transformando suas vidas e negócios. Vagas limitadas para manter a qualidade da comunidade.
            </p>
            <button
              onClick={handleCTAClick}
              className="bg-slate-950 text-amber-500 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-900 transition-all transform hover:scale-105 border-2 border-amber-500"
            >
              Entre na Comunidade Milionária
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
