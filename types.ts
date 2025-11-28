import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TestimonialProps {
  name: string;
  result: string;
  quote: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Estrutura do conteúdo editável do site
export interface SiteContent {
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string; // The italic part
    description: string;
    buttonText: string;
    bgImage: string;
  };
  about: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    imageMain: string;
  };
}

export interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, key: string, value: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}