import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { LoginModal } from './components/LoginModal';
import { Download, LogOut, Check } from 'lucide-react';

const AdminBar = () => {
  const { isAdmin, logout, content } = useContent();
  const [copied, setCopied] = React.useState(false);

  if (!isAdmin) return null;

  const handleExport = () => {
    const json = JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-amanda-dark text-white text-xs md:text-sm py-3 px-6 fixed top-0 w-full z-[110] shadow-lg flex justify-between items-center border-b border-white/10">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        <span className="font-bold tracking-wide">MODO EDIÇÃO ATIVO</span>
        <span className="hidden md:inline text-gray-400 text-xs px-2 border-l border-white/20">
          Clique nos textos e imagens para editar
        </span>
      </div>
      
      <div className="flex gap-4 items-center">
        <button 
          onClick={handleExport}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all font-bold ${copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          title="Copia o JSON para o clipboard. Cole em ContentContext.tsx para salvar permanentemente."
        >
          {copied ? <Check size={14} /> : <Download size={14} />}
          {copied ? "Configuração Copiada!" : "Exportar Configuração"}
        </button>

        <button 
          onClick={logout} 
          className="flex items-center gap-2 text-red-300 hover:text-white transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-amanda-rose selection:text-amanda-dark">
        <AdminBar />
        <LoginModal />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          {/* Call to Action Section Interstitial */}
          <section className="bg-amanda-accent py-20">
            <div className="container mx-auto px-6 text-center text-white">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Vamos treinar juntas?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Se me ver na academia, não hesite em me chamar! Adoro ajudar e trocar ideias sobre treino e saúde.
              </p>
              <a 
                href="https://wa.me/553584248109" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-white text-amanda-accent px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Entrar em Contato
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}

export default App;