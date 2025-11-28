import React from 'react';
import { Eye, Activity, HeartPulse, ArrowRight } from 'lucide-react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 hover:shadow-lg hover:border-amanda-rose transition-all duration-300 group flex flex-col h-full">
    <div className="w-14 h-14 bg-amanda-light rounded-2xl flex items-center justify-center text-amanda-accent mb-6 group-hover:bg-amanda-accent group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-bold text-amanda-dark mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{description}</p>
    
    <a 
      href={`https://wa.me/553584248109?text=Olá Amanda, vi no site sobre "${title}" e gostaria de saber mais.`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-amanda-accent font-bold hover:text-amanda-dark transition-colors mt-auto"
    >
      Tenho interesse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      title: "Correção de Movimento",
      description: "Ajuste fino da sua técnica durante os exercícios para garantir segurança articular e maior ativação muscular.",
      icon: <Eye className="w-7 h-7" />
    },
    {
      title: "Acompanhamento no Salão",
      description: "Suporte durante seu treino na academia, auxiliando na montagem dos aparelhos e controle de carga.",
      icon: <Activity className="w-7 h-7" />
    },
    {
      title: "Dicas de Treino",
      description: "Orientações sobre como organizar sua rotina de exercícios e manter a constância para alcançar seus objetivos.",
      icon: <HeartPulse className="w-7 h-7" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-amanda-light/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-amanda-dark mb-4">Como posso te ajudar hoje?</h2>
          <p className="text-gray-600">Estou à disposição na academia para tirar dúvidas e auxiliar no seu desenvolvimento.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};