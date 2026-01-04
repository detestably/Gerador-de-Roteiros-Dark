
import { GoogleGenAI } from "@google/genai";
import type { GeneratedScript, SeoMetadata, NarrationScript } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createGeminiPrompt = (theme: string): string => `
Role: Você é um roteirista sênior especializado em canais Dark de Storytelling (estilo Reddit Stories) para TikTok e YouTube Shorts. Seu foco total é retenção extrema e engajamento emocional. Você cria histórias em primeira pessoa que parecem confissões reais, bizarras ou aterrorizantes.

Diretrizes de Escrita (Tom e Voz):
- Voz: Narrador em primeira pessoa ("Eu"). Tom tenso, misterioso e urgente.
- Ritmo: Frases curtas para facilitar a leitura do TTS (Text-to-Speech). Sem introduções genéricas ("Olá pessoal"). Comece direto no conflito.
- Duração: O roteiro completo deve ter entre 280 a 350 palavras.
- Gatilhos: Use ganchos de curiosidade a cada 15 segundos para evitar que o usuário dê scroll.

Tarefa: Usando o tema "${theme}", gere um roteiro completo.

Estrutura de Saída Obrigatória (use EXATAMENTE estes cabeçalhos com colchetes e NUNCA adicione formatação markdown como negrito ou itálico nos títulos ou descrições, apenas no roteiro):

[METADADOS SEO]
10 Títulos "Clickbait Psicológico":
(Liste 10 títulos, cada um em uma nova linha, começando com "1. ", "2. ", etc.)

Descrição Curta:
(Escreva uma descrição curta aqui)

15 Tags virais:
(Liste 15 tags, separadas por vírgula)

[SUGESTÃO VISUAL]
(Descreva o fundo a ser usado aqui)

[ROTEIRO DE NARRAÇÃO]
O Gancho (0-5s):
\`\`\`
(Texto do gancho aqui)
\`\`\`

O Incidente:
\`\`\`
(Texto do incidente aqui)
\`\`\`

A Reviravolta:
\`\`\`
(Texto da reviravolta aqui)
\`\`\`

O Desfecho/Pergunta de Engajamento:
\`\`\`
(Texto do desfecho aqui, terminando com uma pergunta para engajamento)
\`\`\`
`;

const parseResponse = (text: string): GeneratedScript => {
    const seoSection = text.split('[METADADOS SEO]')[1]?.split('[SUGESTÃO VISUAL]')[0] || '';
    const visualSection = text.split('[SUGESTÃO VISUAL]')[1]?.split('[ROTEIRO DE NARRAÇÃO]')[0] || '';
    const narrationSection = text.split('[ROTEIRO DE NARRAÇÃO]')[1] || '';

    const titlesText = seoSection.split('10 Títulos "Clickbait Psicológico":')[1]?.split('Descrição Curta:')[0] || '';
    const titles = titlesText.trim().split('\n').map(t => t.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);

    const description = seoSection.split('Descrição Curta:')[1]?.split('15 Tags virais:')[0]?.trim() || 'N/A';
    
    const tagsText = seoSection.split('15 Tags virais:')[1] || '';
    const tags = tagsText.trim().split(',').map(tag => tag.trim()).filter(Boolean);

    const seo: SeoMetadata = { titles, description, tags };

    const hook = narrationSection.split('O Gancho (0-5s):')[1]?.split('O Incidente:')[0]?.replace(/```/g, '').trim() || 'N/A';
    const incident = narrationSection.split('O Incidente:')[1]?.split('A Reviravolta:')[0]?.replace(/```/g, '').trim() || 'N/A';
    const twist = narrationSection.split('A Reviravolta:')[1]?.split('O Desfecho/Pergunta de Engajamento:')[0]?.replace(/```/g, '').trim() || 'N/A';
    const conclusion = narrationSection.split('O Desfecho/Pergunta de Engajamento:')[1]?.replace(/```/g, '').trim() || 'N/A';

    const narration: NarrationScript = { hook, incident, twist, conclusion };

    return {
        seo,
        visualSuggestion: visualSection.trim(),
        narration
    };
}


export const generateScript = async (prompt: string): Promise<GeneratedScript> => {
  try {
    const fullPrompt = createGeminiPrompt(prompt);
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
    });
    
    const text = response.text;
    if (!text) {
        throw new Error('No text returned from API');
    }
    
    return parseResponse(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate script from Gemini API.");
  }
};
