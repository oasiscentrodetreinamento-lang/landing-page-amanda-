import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType } from '../types';

// CONTEÚDO PADRÃO
// Se você usar o botão "Exportar Configuração" na área restrita, 
// substitua este objeto abaixo pelo JSON copiado para atualizar o site para todos.
const defaultContent: SiteContent = {
  hero: {
    badge: "PERSONAL TRAINER EXCLUSIVA PARA MULHERES",
    titlePart1: "Revele a sua",
    titlePart2: "melhor versão",
    description: "Metodologia única focada em emagrecimento, definição e resgate da autoestima feminina. Treinos personalizados que se adaptam à sua rotina.",
    buttonText: "Consultoria Online",
    bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    title: "Olá, eu sou a Amanda",
    p1: "Com mais de 8 anos de experiência transformando vidas, minha missão vai além da estética. Eu ajudo mulheres a se reconectarem com seus corpos através de uma rotina de exercícios equilibrada e eficiente.",
    p2: "Acredito que o treino deve ser um momento de autocuidado, não de punição. Minha metodologia combina ciência do treinamento com a sensibilidade necessária para entender o corpo feminino.",
    image1: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Carrega configurações salvas no navegador ao iniciar
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge shallowly to ensure structure consistency if fields are added later
        setContent(prev => ({...prev, ...parsed}));
      } catch (e) {
        console.error("Erro ao carregar conteúdo salvo", e);
      }
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
    localStorage.setItem('site_content', JSON.stringify(newContent));
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
