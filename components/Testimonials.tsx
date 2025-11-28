import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ name, result, quote, image }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
    <div className="w-20 h-20 mb-6 relative">
      <img src={image} alt={name} className="w-full h-full rounded-full object-cover border-4 border-amanda-light" />
      <div className="absolute -bottom-2 -right-2 bg-amanda-accent text-white text-[10px] font-bold px-2 py-1 rounded-full">
        VERIFICADO
      </div>
    </div>
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-gray-600 italic mb-6">"{quote}"</p>
    <div>
      <h4 className="font-serif font-bold text-lg text-amanda-dark">{name}</h4>
      <span className="text-sm text-amanda-accent font-medium">{result}</span>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Juliana Costa",
      result: "-12kg em 3 meses",
      quote: "Nunca achei que conseguiria gostar de treinar. A metodologia da Amanda respeitou meu ritmo e hoje não vivo sem!",
      image: "https://picsum.photos/100/100?random=10"
    },
    {
      name: "Carla Mendes",
      result: "Definição Muscular",
      quote: "A consultoria online funciona mesmo. Os vídeos são super explicativos e o suporte no WhatsApp faz toda a diferença.",
      image: "https://picsum.photos/100/100?random=11"
    },
    {
      name: "Beatriz Oliveira",
      result: "Recuperação Pós-Parto",
      quote: "Voltei a usar minhas roupas de antes da gravidez com saúde e sem loucuras. Obrigada por tudo, Amanda!",
      image: "https://picsum.photos/100/100?random=12"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-amanda-dark text-center mb-16">
          Histórias Reais
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};