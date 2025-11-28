import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType } from '../types';

// CONTEÚDO PADRÃO
// Atualizado para focar no nome da Personal como marca principal e perfil de Estagiária
const defaultContent: SiteContent = {
  hero: {
    badge: "ESTUDANTE DE EDUCAÇÃO FÍSICA",
    titlePart1: "Amanda",
    titlePart2: "Guimarães",
    description: "Apaixonada pelo movimento e dedicada a ajudar você a executar seu treino com segurança e eficiência máxima.",
    buttonText: "Entrar em Contato",
    bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    subtitle: "SOBRE A AMANDA",
    title: "Em formação constante pela excelência",
    p1: "Minha jornada na Educação Física é movida pela paixão em entender como o corpo humano funciona. Atualmente estou no período de estágio, onde transformo teoria em prática todos os dias no salão de musculação.",
    p2: "Acredito que um bom profissional se faz com estudo contínuo e atenção aos detalhes. Meu foco é corrigir sua biomecânica e garantir que cada exercício seja executado com a máxima segurança para gerar resultados reais.",
    imageMain: "https://images.unsplash.com/photo-1574680096141-1c57c6a90dad?q=80&w=1000&auto=format&fit=crop" // Placeholder. Usuário deve subir PNG sem fundo.
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Versão do conteúdo para forçar atualização
  // Mudei para v5 para aplicar as mudanças de layout da seção Sobre
  const CONTENT_VERSION = 'site_content_v5';

  // Carrega configurações salvas no navegador ao iniciar
  useEffect(() => {
    const savedContent = localStorage.getItem(CONTENT_VERSION);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(prev => ({...prev, ...parsed}));
      } catch (e) {
        console.error("Erro ao carregar conteúdo salvo", e);
      }
    } else {
      // Se não tiver salvo (ou for versão antiga), salva o novo padrão
      localStorage.setItem(CONTENT_VERSION, JSON.stringify(defaultContent));
    }
    
    const savedAuth = localStorage.getItem('is_admin');
    if (savedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const updateContent = (section: keyof SiteContent, key: string, value: string) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [key]: value
      }
    };
    setContent(newContent);
    localStorage.setItem(CONTENT_VERSION, JSON.stringify(newContent));
  };

  const login = (password: string) => {
    // Senha simples para demonstração: 'amanda123'
    if (password === 'amanda123') {
      setIsAdmin(true);
      localStorage.setItem('is_admin', 'true');
      setLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_admin');
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      isAdmin, 
      login, 
      logout,
      isLoginModalOpen,
      setLoginModalOpen
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};