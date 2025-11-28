import React from 'react';
import { CheckCircle2, Award, BookOpen, ArrowDown } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';
import { Button } from './Button';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amanda-light/30 skew-x-12 translate-x-20 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Coluna da Esquerda: Texto */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
             <div className="inline-block mb-4 px-4 py-1 rounded-full bg-amanda-rose/10 text-amanda-accent font-bold text-xs tracking-widest uppercase">
                <EditableText section="about" field="subtitle" tag="span" />
             </div>
            
            <h2 className="text-4xl lg:text-5xl font-serif text-amanda-dark font-bold mb-8 leading-tight">
              <EditableText section="about" field="title" tag="span" />
            </h2>
            
            <div className="text-gray-600 text-lg leading-relaxed mb-6">
               <EditableText section="about" field="p1" tag="p" />
            </div>
            
            <div className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-amanda-rose pl-6 italic">
               <EditableText section="about" field="p2" tag="p" />
            </div>

            {/* Ícones de Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="bg-amanda-dark text-white p-3 rounded-lg">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amanda-dark">Estudante</h4>
                        <p className="text-sm text-gray-500">Educação Física Bacharelado</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="bg-amanda-accent text-white p-3 rounded-lg">
                        <Award size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amanda-dark">Estágio</h4>
                        <p className="text-sm text-gray-500">Vivência Prática em Musculação</p>
                    </div>
                </div>
            </div>

            {/* Botão de Navegação Funcional */}
            <a href="#services">
              <Button variant="secondary" className="group">
                Ver como posso ajudar
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Coluna da Direita: Imagem de Corpo Inteiro */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Círculo orgânico atrás da imagem para dar destaque ao recorte */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-amanda-rose/20 to-amanda-light rounded-full blur-3xl -z-10"></div>
            
            <div className="relative w-full max-w-md h-[500px] lg:h-[600px]">
                 {/* 
                    Atenção: A classe 'object-cover' preenche tudo, mas para fotos sem fundo (PNG), 
                    'object-contain' + 'object-bottom' funciona melhor para não cortar a cabeça.
                    Deixei configurado para ajustar bem imagens mistas.
                 */}
                 <EditableImage 
                    section="about" 
                    field="imageMain" 
                    alt="Amanda Guimarães" 
                    className="w-full h-full object-cover lg:object-contain object-bottom drop-shadow-2xl rounded-[40px]"
                 />
                 
                 {/* Card Flutuante Decorativo */}
                 <div className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-3 animate-bounce-slow">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Foco</p>
                        <p className="text-sm font-bold text-amanda-dark">Biomecânica & Saúde</p>
                    </div>
                 </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};