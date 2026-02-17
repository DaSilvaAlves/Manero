
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

const isAvailable = (): boolean => {
  return !!apiKey && apiKey !== 'undefined' && apiKey !== '';
};

const getAI = () => {
  if (!isAvailable()) return null;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

export const getAIResponse = async (userMessage: string, history: { role: string, parts: { text: string }[] }[]) => {
  const ai = getAI();
  if (!ai) {
    return "O assistente AI está temporariamente indisponível. Por favor, entre em contacto diretamente.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: "Você é o Assistente Virtual do Manuel Manero, especialista em Marca Pessoal Milionária. Seu tom é inspirador, direto, confiante e focado em abundância. Você deve ajudar os usuários a entenderem o Método PRIME, o MASTERY e a Comunidade Milionária. Se alguém perguntar como começar, sugira o Método PRIME. Se for alguém já experiente querendo escala, sugira o MASTERY. Sempre termine com uma frase motivadora de Manuel Manero sobre legado ou abundância.",
      },
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, estou em mentoria agora. Pode tentar novamente em instantes?";
  }
};

export const getAssessmentDiagnosis = async (answers: string[]) => {
  const ai = getAI();
  if (!ai) {
    return "Com base nas suas respostas, recomendamos o Método PRIME como ponto de partida ideal para construir a sua marca pessoal milionária. Entre em contacto para uma consulta personalizada.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Com base nestas respostas de um diagnóstico de marca pessoal: ${answers.join(", ")}, forneça um diagnóstico de 3 frases curtas e impactantes. No final, recomende o programa ideal do Manuel Manero entre: Método PRIME, Personal Branding MASTERY ou Comunidade Milionária.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Diagnosis Error:", error);
    return "O seu perfil tem grande potencial. Recomendamos começar pelo Método PRIME para construir uma base sólida de marca pessoal. Entre em contacto para uma avaliação personalizada.";
  }
};
