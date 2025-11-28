import React from 'react';
import { Instagram, Lock, Unlock, MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Footer: React.FC = () => {
  const { setLoginModalOpen, isAdmin, logout } = useContent();

  return (
    <footer id="contact" className="bg-amanda-dark text-white pt-24 pb-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-2">
              Amanda Guimarães
            </h2>
            <p className="text-gray-400 max-w-sm mb-8 text-lg leading-relaxed">
              Transformando a vida de mulheres através do movimento consciente e da saúde integrativa.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/a_guimaraes_dias_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-amanda-accent hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/553584248109" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-amanda-accent hover:scale-110 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8 border-b border-gray-700 pb-2 inline-block">Navegação</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-amanda-accent hover:translate-x-1 transition-all inline-block">Início</a></li>
              <li><a href="#about" className="hover:text-amanda-accent hover:translate-x-1 transition-all inline-block">Sobre Mim</a></li>
              <li><a href="#services" className="hover:text-amanda-accent hover:translate-x-1 transition-all inline-block">Serviços</a></li>
              <li><a href="#testimonials" className="hover:text-amanda-accent hover:translate-x-1 transition-all inline-block">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8 border-b border-gray-700 pb-2 inline-block">Localização</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                 <div className="p-2 bg-white/5 rounded-lg mt-1">
                   <span className="text-xs font-bold block">MG</span>
                 </div>
                 <span className="mt-1">Piranguinho - MG e Região<br/>Atendimento Online Global</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Amanda Guimarães. Todos os direitos reservados.</p>
          
          <button 
            onClick={isAdmin ? logout : () => setLoginModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isAdmin ? 'text-red-400 hover:bg-white/5' : 'text-gray-700 hover:text-gray-500'}`}
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3 h-3" />
                Sair da Área Restrita
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                Área Restrita
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};