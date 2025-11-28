import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-amanda-rose/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-amanda-accent/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="h-[20rem] rounded-2xl overflow-hidden shadow-2xl transform lg:translate-y-12">
                 <EditableImage 
                    section="about" 
                    field="image1" 
                    alt="Amanda Guimarães Treinando" 
                    className="w-full h-full object-cover"
                 />
              </div>
              <div className="h-[20rem] rounded-2xl overflow-hidden shadow-2xl transform lg:-translate-y-4">
                 <EditableImage 
                    section="about" 
                    field="image2" 
                    alt="Amanda Guimarães Portrait" 
                    className="w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-serif text-amanda-dark font-bold mb-8">
              <EditableText section="about" field="title" tag="span" />
            </h2>
            <div className="text-gray-600 text-lg leading-relaxed mb-6">
               <EditableText section="about" field="p1" tag="p" />
            </div>
            <div className="text-gray-600 text-lg leading-relaxed mb-8">
               <EditableText section="about" field="p2" tag="p" />
            </div>

            <div className="space-y-4 bg-amanda-light/30 p-8 rounded-2xl border border-amanda-rose/20">
              {[
                "Especialista em Biomecânica Feminina",
                "Foco em Hipertrofia de Glúteos e Pernas",
                "Acompanhamento via App Exclusivo"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-amanda-accent w-6 h-6 flex-shrink-0" />
                  <span className="text-amanda-dark font-bold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
