import React from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center group/hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <EditableImage 
          section="hero" 
          field="bgImage" 
          alt="Background fitness" 
          className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-900/40 to-amanda-dark/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl text-white">
          <div className="inline-block mb-6">
            <div className="py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-widest uppercase shadow-lg">
              <EditableText section="hero" field="badge" tag="span" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight drop-shadow-lg">
            <div className="flex flex-col">
              <EditableText section="hero" field="titlePart1" tag="span" />
              <span className="text-amanda-rose italic font-serif">
                <EditableText section="hero" field="titlePart2" tag="span" />
              </span>
            </div>
          </h1>

          <div className="text-lg md:text-2xl text-gray-100 mb-10 font-light leading-relaxed max-w-2xl drop-shadow-md">
            <EditableText section="hero" field="description" tag="p" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-14 px-8 text-lg">
              <EditableText section="hero" field="buttonText" tag="span" /> 
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg border-2">
              Ver Resultados
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
