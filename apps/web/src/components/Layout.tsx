
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Programas', path: '/programas' },
  { name: 'Comunidade', path: '/comunidade' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled || mobileOpen ? 'bg-slate-950/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Manuel Manero Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold font-display tracking-tighter">
            MANUEL<span className="text-amber-500">MANERO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium hover:text-amber-500 transition-colors ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/programas" className="bg-amber-500 text-slate-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-600 transition-all transform hover:scale-105">
            Começar Agora
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-2 ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-300'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/programas" className="bg-amber-500 text-slate-950 px-6 py-3 rounded-full text-center font-bold mt-2">
              Começar Agora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-2">
        <h2 className="text-3xl font-display font-bold mb-6">MANUEL MANERO</h2>
        <p className="text-slate-400 max-w-md leading-relaxed mb-8">
          Transformando empreendedores em autoridades através de uma marca pessoal milionária.
          A abundância é o seu direito de nascimento.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com/manuelmanero" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">Instagram</a>
          <a href="https://youtube.com/@manuelmanero" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">YouTube</a>
          <a href="https://linkedin.com/in/manuelmanero" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">LinkedIn</a>
          <a href="https://open.spotify.com/show/manuelmanero" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">Spotify</a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Programas</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/programas" className="hover:text-amber-500">Método PRIME</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500">Personal Branding MASTERY</Link></li>
          <li><Link to="/comunidade" className="hover:text-amber-500">Comunidade Milionária</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500">Mentorias Individuais</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Explorar</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/sobre" className="hover:text-amber-500">Minha História</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500">Nossos Programas</Link></li>
          <li><Link to="/comunidade" className="hover:text-amber-500">Comunidade</Link></li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 pt-10 border-t border-slate-900 text-center text-slate-600 text-xs">
      &copy; 2026 Manuel Manero. Todos os direitos reservados. Design de Elite.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);
