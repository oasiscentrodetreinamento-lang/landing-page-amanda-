import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Ativa o fundo branco do menu logo no início
      setIsScrolled(scrollY > 50);
      
      // Só mostra a logo fixa na navbar depois que a animação da Hero "termina" (aprox 400px)
      // Isso cria a ilusão que o texto grande se encaixou ali
      setShowLogo(scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre Mim', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Depoimentos', href: '#testimonials' },
  ];

  const whatsappLink = "https://wa.me/553584248109";

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area - Inicialmente invisível, aparece via Fade In */}
        <div 
          className={`flex items-center gap-2 font-serif font-bold text-2xl transition-opacity duration-500 ${
            showLogo ? 'opacity-100' : 'opacity-0'
          } ${isScrolled ? 'text-amanda-dark' : 'text-white'}`}
        >
          <Dumbbell className="w-8 h-8 text-amanda-accent" />
          <span>Amanda G.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`font-medium hover:text-amanda-accent transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              isScrolled 
                ? 'bg-amanda-accent text-white hover:bg-rose-700' 
                : 'bg-white text-amanda-dark hover:bg-rose-50'
            }`}
          >
            Falar Comigo
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-amanda-dark z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-800' : 'text-white'} /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl shadow-xl py-20 px-6 flex flex-col gap-6 animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-amanda-dark font-serif text-3xl font-bold border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center bg-amanda-accent text-white py-4 rounded-xl font-bold text-xl mt-4"
          >
            Falar Comigo
          </a>
        </div>
      )}
    </nav>
  );
};