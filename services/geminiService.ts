import { GoogleGenAI, Chat } from '@google/genai';

// Vite-compatible way to access environment variable
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error('VITE_API_KEY environment variable not set');
}

const ai = new GoogleGenAI({ apiKey });

function fileToGenerativePart(file: File) {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file as base64 string.'));
      }
      const parts = reader.result.split(';base64,');
      const mimeType = parts[0]?.split(':')[1] || 'image/jpeg';
      const data = parts[1];
      resolve({
        inlineData: {
          data,
          mimeType,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateDesignIdeas(
  imageFile: File,
  roomType: string,
  style: string
): Promise<{ description: string; imageUrl: string }> {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const textPart = {
      text: `Analyze the attached image of a ${roomType}. Based on this room's layout (including windows, doors, and structural elements), generate a detailed, descriptive prompt for an image generation AI. The goal is to create a photorealistic image of the same ${roomType} redesigned in a "${style}" style. The prompt should vividly describe new furniture, a cohesive color palette, appropriate lighting, textures, and decor elements appropriate for a ${roomType}. The prompt must be creative, detailed, and focus on creating an aspirational yet achievable design. Output ONLY the generated prompt, with no extra text, labels or introduction.`,
    };

    const descriptionResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });

    const designDescription = descriptionResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!designDescription) {
      throw new Error('Failed to generate a design description.');
    }

    const imageResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: designDescription,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (!imageResponse.generatedImages || imageResponse.generatedImages.length === 0) {
      throw new Error('Failed to generate an image.');
    }

    const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

    return { description: designDescription, imageUrl };
  } catch (error) {
    console.error('Error in generateDesignIdeas:', error);
    throw new Error('Failed to generate design ideas. Please check the console for more details.');
  }
}

export function createChatSession(): Chat {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Decora, a friendly and knowledgeable AI interior design assistant from Exceldes. Your tone is warm, professional, creative, and encouraging. Your primary goal is to provide helpful, inspiring, and practical advice on interior design.

1. **Pricing:** Provide estimated prices in Indian Rupees (INR). Always explicitly state that these are *estimates* and actual prices can vary based on brand, material, and retailer. For example, say "A sofa like that could range from ₹30,000 to ₹70,000..."
2. **Sourcing (India-Centric):** Provide suggestions for where users can find similar items. Your recommendations should be tailored to India and, if possible, specific major cities like Delhi, Mumbai, and Bangalore.
   - **Online Stores:** Mention popular Indian online furniture stores like Pepperfry, Urban Ladder, WoodenStreet, Amazon India, and Flipkart.
   - **Physical Stores:**
     - **Delhi:** Kirti Nagar for variety, Fabindia/Westside for decor, DLF Emporio for luxury.
     - **Mumbai:** Raghuvanshi Mills for high-end, Bandra boutiques, or chains like Home Centre.
     - **Bangalore:** Infantry Road showrooms, Jayanagar for variety, and IKEA.
3. **Disclaimer:** Always end pricing/sourcing advice with: "Remember, these are just suggestions to get you started! I recommend checking the stores' websites or visiting them for the latest prices and availability."

Do not mention you are a language model. Focus on being a helpful design assistant for an Indian audience.`,
    },
  });

  return chat;
}

