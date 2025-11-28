import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ name, result, quote, image }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
    <div className="w-20 h-20 mb-6 relative">
      <img src={image} alt={name} className="w-full h-full rounded-full object-cover border-4 border-amanda-light" />
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
      result: "Aluna da Academia",
      quote: "A Amanda é super atenciosa! Me ajudou a corrigir minha postura no agachamento que eu estava fazendo errado há meses.",
      image: "https://picsum.photos/100/100?random=10"
    },
    {
      name: "Carla Mendes",
      result: "Aluna da Academia",
      quote: "Adoro a energia dela. Sempre disposta a ajudar a montar os aparelhos e motivar a gente a não desistir na última repetição.",
      image: "https://picsum.photos/100/100?random=11"
    },
    {
      name: "Beatriz Oliveira",
      result: "Aluna da Academia",
      quote: "Muito simpática e técnica. Explicou super bem o porquê de cada movimento. Me sinto muito mais segura treinando com ela por perto.",
      image: "https://picsum.photos/100/100?random=12"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-amanda-dark text-center mb-4">
          Feedbacks de Atendimentos
        </h2>
        <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
          O reconhecimento de quem eu auxilio no dia a dia é minha maior motivação para continuar estudando.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};