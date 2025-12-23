
import { GoogleGenAI } from "@google/genai";

export const getStrategicInsight = async (businessDescription: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "O serviço de IA está temporariamente indisponível. Por favor, tente novamente mais tarde.";
  }

  // Initializing within the function right before use to ensure the most up-to-date environment variables
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analise este negócio e forneça um insight estratégico curto (máximo 3 sentenças) focado em clareza de mensagem e autoridade digital: ${businessDescription}`,
      config: {
        systemInstruction: "Você é um estrategista digital sênior da Embla. Sua marca foca em clareza absoluta, eliminando ruído corporativo e termos genéricos. Seu tom é sofisticado, direto e altamente analítico.",
        // Fix: Removed maxOutputTokens because it must be larger than thinkingBudget to allow for response content.
        // Guidelines recommend omitting maxOutputTokens if not required to prevent blocking.
        thinkingConfig: { thinkingBudget: 2000 },
        temperature: 0.7,
      },
    });

    return response.text || "Não foi possível gerar um insight estratégico no momento.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      return "Erro de configuração do modelo. Por favor, verifique a chave de API.";
    }
    return "Ocorreu um erro ao processar seu insight. Tente ser mais específico na descrição do seu negócio.";
  }
};