import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// We assume process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAmandaAI = async (userQuestion: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuestion,
      config: {
        systemInstruction: `
          Você é a "Amanda AI", uma assistente virtual da Personal Trainer Amanda Guimarães.
          Seu tom de voz é motivador, feminino, empático e profissional.
          O público-alvo são mulheres que buscam emagrecimento, definição muscular e saúde.
          
          Diretrizes:
          1. Responda de forma concisa (máximo 3 parágrafos curtos).
          2. Use emojis ocasionalmente para manter o tom leve (🌸, 💪, ✨).
          3. Nunca prescreva dietas médicas específicas ou treinos complexos sem avaliação, sempre sugira agendar uma consultoria para algo personalizado.
          4. Foco em dicas gerais de saúde, bem-estar e dúvidas sobre como funciona uma consultoria online.
          5. Se perguntarem preços, diga que depende do plano e sugira clicar no botão de WhatsApp.
        `,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui processar sua dúvida agora. Tente novamente mais tarde! ✨";
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Ocorreu um erro momentâneo. Por favor, verifique sua conexão ou tente mais tarde.";
  }
};
