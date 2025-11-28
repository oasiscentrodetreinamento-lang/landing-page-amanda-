import React from 'react';
import { Smartphone, Users, Utensils, Zap } from 'lucide-react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 hover:shadow-lg hover:border-amanda-rose transition-all duration-300 group">
    <div className="w-14 h-14 bg-amanda-light rounded-2xl flex items-center justify-center text-amanda-accent mb-6 group-hover:bg-amanda-accent group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-bold text-amanda-dark mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      title: "Consultoria Online",
      description: "Treinos personalizados entregues via aplicativo. Vídeos explicativos, suporte via WhatsApp e ajustes mensais conforme sua evolução.",
      icon: <Smartphone className="w-7 h-7" />
    },
    {
      title: "Personal Presencial",
      description: "Acompanhamento exclusivo na academia. Correção postural, motivação constante e extração máxima do seu potencial em cada série.",
      icon: <Users className="w-7 h-7" />
    },
    {
      title: "Desafio 30 Dias",
      description: "Um programa intensivo focado em queima de gordura rápida e mudança de hábitos. Ideal para quem precisa de um 'start' urgente.",
      icon: <Zap className="w-7 h-7" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-amanda-light/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-amanda-dark mb-4">Como posso te ajudar?</h2>
          <p className="text-gray-600">Escolha o plano ideal para o seu momento e comece sua transformação.</p>
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