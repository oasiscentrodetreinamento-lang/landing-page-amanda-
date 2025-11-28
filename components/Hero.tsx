import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EditableText } from './Editable';

export const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Define a duração da animação (em pixels de scroll)
      const animationDistance = 400; 
      const currentScroll = window.scrollY;
      
      // Calcula o progresso de 0 a 1
      const progress = Math.min(currentScroll / animationDistance, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Cálculos de Animação ---
  
  // Scale: Reduz o tamanho do texto conforme rola
  // Começa em 1 e vai até 0.35 (tamanho aproximado de logo)
  const scale = 1 - (scrollProgress * 0.65); 
  
  // Opacidade do texto principal:
  // Ele permanece visível (1) durante a maior parte da rolagem,
  // mas faz um "fade out" rápido no final (entre 80% e 100% do scroll)
  // para dar lugar à logo fixa da Navbar que aparece nesse momento.
  const textOpacity = 1 - Math.max(0, (scrollProgress - 0.8) * 5);

  // Opacidade do conteúdo secundário (badge, descrição, botões): 
  // Desaparece mais rápido para limpar a tela
  const contentOpacity = 1 - (scrollProgress * 2.5); 
  const contentDisplay = contentOpacity <= 0 ? 'none' : 'block';

  // Movimento (Translação)
  // Y: Move para cima. Alvo: alinhar verticalmente com a navbar.
  const translateY = -(scrollProgress * 45); 
  
  // X: Move para esquerda. Alvo: alinhar com a posição da logo na navbar.
  // Ajustado para -38vw para mover do centro para o canto esquerdo.
  const translateX = -(scrollProgress * 40); 

  return (
    // Section alta para permitir o scroll da animação ("Scrollytelling")
    <section id="home" className="relative h-[150vh] bg-amanda-dark">
      
      {/* Container Sticky: O conteúdo fica preso na tela enquanto o usuário rola */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background com Gradiente */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b21] via-[#1a1013] to-black"></div>
            {/* Textura sutil */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            {/* Glow effect atrás do nome */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amanda-rose/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center h-full justify-center">
          
          {/* NOME DA PERSONAL (HERO TITLE) */}
          {/* Este bloco é animado: encolhe e move para o canto superior esquerdo */}
          <div 
            className="origin-center will-change-transform z-50 mb-8 flex flex-col items-center"
            style={{
              transform: `translate(${translateX}vw, ${translateY}vh) scale(${scale})`,
              opacity: textOpacity
            }}
          >
            <h1 className="font-serif font-bold text-white whitespace-nowrap leading-tight drop-shadow-2xl flex flex-col items-center">
              {/* Primeiro nome */}
              <span className="block text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-white">
                <EditableText section="hero" field="titlePart1" tag="span" />
              </span>
              
              {/* Sobrenome (Itálico e Colorido) */}
              <span className="block text-6xl md:text-8xl lg:text-[10rem] text-amanda-rose italic -mt-2 md:-mt-6 lg:-mt-10 font-medium">
                <EditableText section="hero" field="titlePart2" tag="span" />
              </span>
            </h1>
          </div>

          {/* Conteúdo Secundário (Some ao rolar) */}
          <div 
            className="max-w-2xl transition-opacity duration-300 flex flex-col items-center"
            style={{ opacity: contentOpacity, display: contentDisplay }}
          >
             <div className="mb-8 py-2 px-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-amanda-rose text-xs md:text-sm font-bold tracking-[0.3em] uppercase shadow-lg">
                <EditableText section="hero" field="badge" tag="span" />
             </div>

            <div className="text-lg md:text-xl text-gray-400 mb-10 font-light leading-relaxed drop-shadow-md max-w-lg">
              <EditableText section="hero" field="description" tag="p" />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
              <a href="https://wa.me/553584248109" target="_blank" rel="noreferrer">
                <Button className="h-14 px-12 text-lg shadow-rose-900/20 hover:shadow-rose-900/40">
                  <EditableText section="hero" field="buttonText" tag="span" /> 
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce transition-opacity duration-300"
            style={{ opacity: contentOpacity }}
        >
            <ChevronDown className="w-10 h-10" />
        </div>
      </div>
    </section>
  );
};