import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const NAV_LINKS = [
  { to: '/repetiteurs', label: 'Répétiteurs' },
  { to: '/groupes', label: 'Groupes' },
  { to: '/tarifs', label: 'Comment ça marche' },
  { to: '#avantages', label: 'À propos' },
];

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase =
    'relative text-sm font-medium tracking-wide transition-colors py-2 ' +
    'after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-gold ' +
    'after:transition-transform after:duration-300 after:origin-left';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300
        ${scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/10 py-3'
          : 'bg-gradient-to-b from-navy/50 via-navy/10 to-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg
                            bg-gold/15 text-gold group-hover:bg-gold/25 transition-colors">
            <GraduationCap size={20} strokeWidth={2.25} />
          </span>
          <span className="text-white font-bold text-lg tracking-tight">
            Tutor<span className="text-gold">Link</span>
          </span>
        </Link>

        {/* Menu central — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkBase} text-white/80 hover:text-white
                 after:w-full ${isActive ? 'after:scale-x-100 text-white' : 'after:scale-x-0 hover:after:scale-x-100'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/connexion"
            className="text-sm font-medium text-white/90 border border-white/30
                       hover:border-white hover:bg-white/5 px-4 py-2 rounded-lg
                       transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            Connexion
          </Link>
          <Link
            to="/inscription"
            className="text-sm font-semibold bg-gold hover:bg-gold/90 text-navy
                       px-4 py-2 rounded-lg transition-colors shadow-sm shadow-gold/30
                       focus-visible:outline-2 focus-visible:outline-white"
          >
            S'inscrire
          </Link>
        </div>

        {/* Bouton hamburger — mobile */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-white p-2 -mr-2 focus-visible:outline-2 focus-visible:outline-gold rounded-md"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Panneau mobile */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300
          ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-navy/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-3 text-base border-b border-white/5 last:border-none
                 ${isActive ? 'text-gold font-semibold' : 'text-white/85'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-4">
            <Link
              to="/connexion"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-medium text-white border border-white/30
                         px-4 py-2.5 rounded-lg"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-semibold bg-gold text-navy
                         px-4 py-2.5 rounded-lg"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;