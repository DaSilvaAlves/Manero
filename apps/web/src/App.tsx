
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Community from './pages/Community';
import { PROGRAMS } from './constants';
import { Link } from 'react-router-dom';
import { LeadForm } from './components/LeadForm';

const AboutPage = () => (
  <div className="pt-32 pb-20">
    {/* Hero */}
    <section className="container mx-auto px-6 text-center mb-20">
      <div className="inline-block px-4 py-1 mb-6 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">
        A História
      </div>
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
        Sobre <span className="gold-gradient">Manuel Manero</span>
      </h1>
      <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-lg">
        Com mais de 15 anos no mercado da comunicação e marketing digital, Manuel Manero tornou-se a referência
        em Personal Branding para o mercado lusófono.
      </p>
    </section>

    {/* Journey */}
    <section className="container mx-auto px-6 mb-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold mb-6">A Missão</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            Ajudar empreendedores a desbloquearem o seu verdadeiro potencial através de uma marca autêntica,
            forte e milionária. Acredito que a abundância é o direito de nascimento de cada pessoa.
          </p>
          <p className="text-slate-400 leading-relaxed mb-6">
            Comecei a minha jornada no mundo da comunicação ainda jovem, e ao longo de 15 anos desenvolvi
            um método único que combina estratégia de marca, comunicação persuasiva e mindset de abundância.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Já impactei mais de 10.000 empreendedores e profissionais no mercado lusófono, ajudando-os
            a construir marcas pessoais que geram autoridade, influência e resultados financeiros exponenciais.
          </p>
        </div>
        <div className="glass-card p-10 rounded-3xl border border-amber-500/20">
          <div className="space-y-8">
            {[
              { year: '2011', event: 'Início no marketing digital e comunicação estratégica' },
              { year: '2016', event: 'Criação do Método PRIME de Personal Branding' },
              { year: '2019', event: 'Lançamento da Comunidade Milionária' },
              { year: '2022', event: 'Personal Branding MASTERY — programa flagship' },
              { year: '2025', event: '10.000+ empreendedores impactados no mercado lusófono' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-amber-500 font-bold font-display text-lg min-w-[60px]">{item.year}</div>
                <div className="text-slate-300 border-l border-slate-800 pl-6">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Valores Fundamentais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Autenticidade', desc: 'A sua marca é o reflexo de quem você realmente é. Sem máscaras, sem imitações.', icon: '🎯' },
            { title: 'Excelência', desc: 'Cada detalhe conta. Desde a comunicação até ao posicionamento, tudo deve ser de elite.', icon: '⭐' },
            { title: 'Abundância', desc: 'O mundo tem recursos ilimitados para quem se posiciona com propósito e estratégia.', icon: '💰' },
          ].map((v, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl border border-slate-900 text-center">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold font-display mb-3">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ProgramsPage = () => (
  <div className="pt-32 pb-20">
    {/* Hero */}
    <section className="container mx-auto px-6 text-center mb-20">
      <div className="inline-block px-4 py-1 mb-6 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">
        O Ecossistema
      </div>
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
        Nossos <span className="gold-gradient">Programas</span>
      </h1>
      <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-lg">
        Soluções para todos os estágios do seu crescimento. Do início ao topo, temos o caminho mapeado para si.
      </p>
    </section>

    {/* Programs Grid */}
    <section className="container mx-auto px-6 mb-20">
      <div className="grid md:grid-cols-3 gap-8">
        {PROGRAMS.map((prog) => (
          <div key={prog.id} className="glass-card p-10 rounded-3xl border border-amber-500/20 flex flex-col h-full">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">{prog.level}</span>
            <h2 className="text-3xl font-display font-bold mb-3">{prog.title}</h2>
            <p className="text-slate-500 text-sm italic mb-6">{prog.tagline}</p>
            <p className="text-slate-400 mb-8 flex-grow">{prog.description}</p>
            <div className="space-y-3 mb-8">
              {prog.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-500">✓</span> {f}
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-600 transition-all">
              {prog.cta}
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* Mentorship Card */}
    <section className="container mx-auto px-6 mb-20">
      <div className="glass-card p-10 rounded-3xl border border-amber-500/20 md:flex md:items-center md:gap-12">
        <div className="flex-1 mb-8 md:mb-0">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Exclusivo</span>
          <h2 className="text-3xl font-display font-bold mt-3 mb-4">Mentorias Individuais</h2>
          <p className="text-slate-400 mb-6">
            Acompanhamento 1:1 direto com Manuel para aceleração radical da sua marca pessoal.
            Vagas extremamente limitadas.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Auditoria Completa de Marca</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Plano de Escala Customizado</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Acesso Direto via WhatsApp</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Sessões Semanais de 60 minutos</li>
          </ul>
        </div>
        <div className="md:w-80">
          <LeadForm source="mentorship-page" />
        </div>
      </div>
    </section>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/programas" element={<ProgramsPage />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
      <AIChat />
    </Router>
  );
};

export default App;
