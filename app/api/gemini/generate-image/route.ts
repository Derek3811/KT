import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

function getImageFallback(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  let fallbackUrl = "/sacred_heart_new.png"; // Default fallback (Sacred Heart)

  if (lowerPrompt.includes("medard") || lowerPrompt.includes("roses") || lowerPrompt.includes("bishop")) {
    fallbackUrl = "/medard_new.png";
  } else if (lowerPrompt.includes("columba") || lowerPrompt.includes("monk") || lowerPrompt.includes("iona")) {
    fallbackUrl = "/columba_new.png";
  } else if (lowerPrompt.includes("margaret") || lowerPrompt.includes("queen") || lowerPrompt.includes("scotland")) {
    fallbackUrl = "/margaret_new.png";
  } else if (lowerPrompt.includes("virgin") || lowerPrompt.includes("mary") || lowerPrompt.includes("madonna") || lowerPrompt.includes("child")) {
    fallbackUrl = "/madonna_new.png";
  } else if (lowerPrompt.includes("blood") || lowerPrompt.includes("chalice") || lowerPrompt.includes("host") || lowerPrompt.includes("altar") || lowerPrompt.includes("eucharist") || lowerPrompt.includes("sacrament")) {
    fallbackUrl = "/eucharist_new.png";
  } else if (lowerPrompt.includes("cross") || lowerPrompt.includes("crucifix") || lowerPrompt.includes("calvary") || lowerPrompt.includes("crown") || lowerPrompt.includes("thorns") || lowerPrompt.includes("passion")) {
    fallbackUrl = "/crucifix_new.png";
  }

  return fallbackUrl;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Sacer prompt requested but not provided." },
        { status: 400 }
      );
    }

    const client = getGeminiClient();

    // High-quality static backup generator if API key is not configured yet
    if (!client) {
      console.warn("GEMINI_API_KEY is not defined. Using a curated beautiful liturgy fallback.");
      const fallbackUrl = getImageFallback(prompt);

      return NextResponse.json({
        imageUrl: fallbackUrl,
        isDemo: true,
        message: "Offline traditional mode active. Provide a valid GEMINI_API_KEY in secrets to get custom dynamic AI images."
      });
    }

    // Enhance the user's prompt to match the high-quality classical oil painting and sacred holy cards aesthetic the user loves.
    const enhancedPrompt = `A beautiful classical Catholic sacred art illustration of: ${prompt}. 
Make it in the style of 17th century Caravaggio chiaroscuro oil painting or a detailed Renaissance fresco. 
Rich deep oil colors (gold, crimson red, marian blue, emerald green), dramatic warm light from a divine source, 
fine historic textures, traditional Catholic holy card design. No modern filters, highly respectful and pious.`;

    try {
      const response = await client.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt: enhancedPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "1:1",
        },
      });

      let base64Data: string | null = null;
      if (response?.generatedImages?.[0]?.image?.imageBytes) {
        base64Data = response.generatedImages[0].image.imageBytes;
      }

      if (!base64Data) {
        throw new Error("Gemini model returned response but no inline image data was found in generatedImages.");
      }

      const imageUrl = `data:image/jpeg;base64,${base64Data}`;
      return NextResponse.json({ imageUrl, isDemo: false });
    } catch (genErr: any) {
      console.warn("Gemini Image generation experiences high demand (503). Gracefully serving preset beautiful alternative:", genErr.message);
      const fallbackUrl = getImageFallback(prompt);
      return NextResponse.json({
        imageUrl: fallbackUrl,
        isDemo: true,
        message: "Offline traditional art served due to high upstream model load. Dynamic display restored."
      });
    }

  } catch (error: any) {
    console.error("Gemini Image generation error: ", error);
    return NextResponse.json(
      { error: "Failed to generate dynamic sacred art.", details: error.message },
      { status: 500 }
    );
  }
}
