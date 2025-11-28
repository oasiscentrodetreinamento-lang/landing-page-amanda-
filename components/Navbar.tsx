import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`flex items-center gap-2 font-serif font-bold text-2xl ${isScrolled ? 'text-amanda-dark' : 'text-amanda-dark md:text-white'}`}>
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
            href="#contact"
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              isScrolled 
                ? 'bg-amanda-accent text-white hover:bg-rose-700' 
                : 'bg-white text-amanda-dark hover:bg-rose-50'
            }`}
          >
            Começar Agora
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-amanda-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-gray-800 md:text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-down">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-600 font-medium text-lg border-b border-gray-100 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center bg-amanda-accent text-white py-3 rounded-lg font-bold"
          >
            Começar Agora
          </a>
        </div>
      )}
    </nav>
  );
};