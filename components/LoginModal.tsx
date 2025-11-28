import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Lock, X, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, login } = useContent();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-amanda-dark/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amanda-rose to-amanda-accent"></div>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-amanda-light rounded-full opacity-50"></div>

        <button 
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-amanda-accent transition-colors bg-gray-50 p-2 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-amanda-light/50 rounded-full flex items-center justify-center text-amanda-accent mb-4 border-4 border-white shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-amanda-dark">Área da Personal</h2>
          <p className="text-gray-500 text-center text-sm mt-2 max-w-[250px]">
            Acesso exclusivo para gerenciamento de conteúdo do site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Senha de Acesso</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-4 rounded-xl border-2 ${error ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'} focus:ring-4 focus:ring-amanda-rose/20 focus:border-amanda-accent outline-none transition-all text-center text-xl tracking-widest text-amanda-dark`}
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-sm animate-shake">
              <AlertCircle size={16} />
              <span>Senha incorreta.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amanda-dark text-white font-bold py-4 rounded-xl hover:bg-black transition-all transform active:scale-95 shadow-lg hover:shadow-xl"
          >
            Acessar Painel
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Senha demo: <span className="font-mono font-bold text-amanda-accent bg-amanda-light px-2 py-1 rounded">amanda123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
