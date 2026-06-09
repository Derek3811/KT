import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/lib/articles";

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

// Simple HTML text extractor to pull out page titles and raw paragraphs
function extractContentFromHtml(html: string): { title: string; body: string } {
  try {
    // 1. Title extractor
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "Unknown Article";

    // 2. Body paragraph scanner (simply captures content inside <p>...</p>)
    const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let paragraphs: string[] = [];
    let match;
    while ((match = paragraphRegex.exec(html)) !== null && paragraphs.length < 25) {
      const cleanPara = match[1]
        .replace(/<[^>]+>/g, "") // remove nested tags
        .replace(/\s+/g, " ")     // normalize spacing
        .trim();
      if (cleanPara.length > 20) {
        paragraphs.push(cleanPara);
      }
    }

    // Combine them
    const body = paragraphs.join("\n\n");
    return { title, body };
  } catch (error) {
    console.error("HTML parse error:", error);
    return { title: "Archival Webpage", body: "" };
  }
}

// High-fidelity fallback logic for offline generation or upstream model load spikes
function getExpressFallback(articleTitle: string, url: string) {
  const lowerTitle = articleTitle.toLowerCase();
  
  let fallbackText = `Here is an insightful read from our digital footprints archives on "${articleTitle}". We invite all faithful laymen and scholarly students of scholastic liturgy to study these canonical parameters as we navigate this challenging interregnum. Read the full archival monograph at: ${url}`;
  let fallbackTags = ["#ChurchHistory", "#TraditionalLiturgy", "#CanonLaw", "#ArchivalMonograph"];
  let fallbackPrompt = "elevation of the holy host amidst burning candles behind a high gothic altar, chiaroscuro golden rays and holy smoke";

  // Tailor slightly to URL contents
  if (lowerTitle.includes("mass") || lowerTitle.includes("liturg") || lowerTitle.includes("priest")) {
    fallbackText = `The transcendent, timeless beauty of the traditional Roman Liturgy continues to capture hearts and guide souls. We are pleased to present this study of canonical preservation regarding traditional Rubrics. Discover the permanent defenses. Read now at: ${url}`;
    fallbackTags = ["#TraditionalLatinMass", "#QuoPrimum", "#Rubrics", "#Liturgy"];
    fallbackPrompt = "golden heavy chalice standing on a white linen altar under a mystical direct beam of light, caravaggio style";
  } else if (lowerTitle.includes("pope") || lowerTitle.includes("thesis") || lowerTitle.includes("authority")) {
    fallbackText = `How are we to clarify the formal spiritual authority of the chair of saint Peter in this historic interregnum? Study this comprehensive canonical synthesis regarding the material-formal vacancy, published today. Links below: ${url}`;
    fallbackTags = ["#SedesVacans", "#ThesisOfCassiciacum", "#CatholicTheology", "#ArchivalMonograph"];
    fallbackPrompt = "an ancient heavy theologian wood study desk with stacks of leather scholastic books, lit by a single glowing candle";
  }

  return {
    teaserCopy: fallbackText,
    indexingTags: fallbackTags,
    imagePrompt: fallbackPrompt
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "Please provide a valid website URL to scrape." },
        { status: 400 }
      );
    }

    // Attempt to scrape
    let articleTitle = "";
    let articleContent = "";
    let fetchSuccess = false;

    const urlLower = url.toLowerCase();
    
    // Intercept known simulated/preset URLs to prevent outbound sandboxed fetch failures
    if (urlLower.includes("thesis-of-cassiciacum") || urlLower.includes("traditionalist-cooperative")) {
      const art = articles.find(a => a.id === "thesis-of-cassiciacum");
      if (art) {
        articleTitle = art.title;
        articleContent = art.content.join("\n\n");
        fetchSuccess = true;
      }
    } else if (urlLower.includes("saint-pius-v-quo-primum") || urlLower.includes("gregorian-continuity")) {
      const art = articles.find(a => a.id === "liturgical-continuity");
      if (art) {
        articleTitle = art.title;
        articleContent = art.content.join("\n\n");
        fetchSuccess = true;
      }
    } else if (urlLower.includes("conclave-vacancy-of-1268") || urlLower.includes("archival-history")) {
      const art = articles.find(a => a.id === "great-empty-chairs");
      if (art) {
        articleTitle = art.title;
        articleContent = art.content.join("\n\n");
        fetchSuccess = true;
      }
    } else if (urlLower.includes("jurisdictional-conundrum") || urlLower.includes("emergency-jurisdiction")) {
      const art = articles.find(a => a.id === "jurisdictional-conundrum");
      if (art) {
        articleTitle = art.title;
        articleContent = art.content.join("\n\n");
        fetchSuccess = true;
      }
    }

    // Otherwise, perform real scrape unless it is a mock domain
    if (!fetchSuccess && !urlLower.includes(".org") && !urlLower.includes(".net") && !urlLower.includes(".edu") && !urlLower.includes(".gov") && !urlLower.includes(".com")) {
      // For any non-real domains or simple testing strings, treat as a simulation candidate
      articleTitle = "Simulated Article";
      articleContent = "This is a simulated scholarly research paper regarding the defense of traditionalist liturgy.";
      fetchSuccess = true;
    }

    if (!fetchSuccess) {
      try {
        console.log(`Express generator is fetching: ${url}`);
        const fetchResponse = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
          },
          next: { revalidate: 0 } // Bypass standard caching for real results
        });

        if (fetchResponse.ok) {
          const rawHtml = await fetchResponse.text();
          const extracted = extractContentFromHtml(rawHtml);
          articleTitle = extracted.title;
          articleContent = extracted.body;
          fetchSuccess = articleContent.length > 50;
        }
      } catch (fetchErr: any) {
        // Swallow typical sandbox system fetch failures silently, logging only a brief dev trace
        console.log(`Note: Server-to-server fetch bypassed or failed for ${url} (Standard behavior in offline sandboxes).`);
      }
    }

    // Parse URL domains or names for fallback simulation if fetch fails
    if (!fetchSuccess) {
      // Create readable title based on URL slug
      try {
        const parsedUrl = new URL(url);
        let pathParts = parsedUrl.pathname.split("/").filter(Boolean);
        let slug = pathParts[pathParts.length - 1] || parsedUrl.hostname;
        articleTitle = slug
          .replace(/[-_]/g, " ")
          .replace(/\.[a-z]+$/i, "")
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        articleContent = `This is a request to analyze the publication from ${parsedUrl.hostname} titled "${articleTitle}". Synthesize a traditionalist academic summary based on the domain content.`;
      } catch {
        articleTitle = "Traditional Study";
        articleContent = "Analysis of theological parameters from a modern traditional web link.";
      }
    }

    const client = getGeminiClient();

    // 1. Text Analysis (Post draft + Hashtags + Sacred Art prompt)
    let teaserCopy = "";
    let indexingTags: string[] = [];
    let imagePrompt = "";
    let isDemo = !client;

    if (!client) {
      // offline fallback builder
      console.warn("GEMINI_API_KEY is not defined. Using offline analyzer.");
      const fallback = getExpressFallback(articleTitle, url);
      teaserCopy = fallback.teaserCopy;
      indexingTags = fallback.indexingTags;
      imagePrompt = fallback.imagePrompt;
    } else {
      // Online analysis using Gemini 3.5 Flash
      try {
        const systemPrompt = `You are a high-end scholarly social media content strategist specializing in traditional Catholic publications and ecclesiastical archives. 
Your goal is to parse raw webpage content and craft highly engaging, scholarly, intellectually sound Facebook teasers that include a clear CTA back to the original URL.
Be reverent, elegant, and academic. Do not use hashtags inside the caption—return them separately. Provide a matching image generation prompt for a beautifully pious sacred art canvas (Caravaggio oil painting style, high cathedral sanctuary, candles, or angels).`;

        const userPrompt = `Scraped Webpage Content:
URL: ${url}
Title Node: ${articleTitle}
Extracted Text:
${articleContent.substring(0, 3500)}

Please analyze this webpage context and return a structured JSON response containing:
1. "teaserCopy": An intellectual, highly engaging teaser caption for a Facebook post (approx. 100-130 words). It MUST integrate a natural Call-To-Action (specifically mentioning the URL: ${url}) to click and read the full archives.
2. "indexingTags": An array of exactly 4 specialized traditional theological hashtags or index tags (e.g. #GregorianChant, #CanonLaw).
3. "imagePrompt": A vivid, beautiful, descriptive image generation prompt of high-resolution sacred art (1-2 sentences). Style: classical Catholic Caravaggio chiaroscuro style, renaissance fresco, or traditional holy photography with dramatic candle lighting. Perfect for set backdrops.`;

        const textResponse = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              required: ["teaserCopy", "indexingTags", "imagePrompt"],
              properties: {
                teaserCopy: { type: Type.STRING },
                indexingTags: { type: Type.ARRAY, items: { type: Type.STRING } },
                imagePrompt: { type: Type.STRING }
              }
            }
          }
        });

        const parsed = JSON.parse(textResponse.text || "{}");
        teaserCopy = parsed.teaserCopy || "Failed to generate teaser.";
        indexingTags = parsed.indexingTags || ["#TraditionalCatholicism"];
        imagePrompt = parsed.imagePrompt || "sacred high altar with burning gold chalice and flickering white candles, renaissance style";
      } catch (geminiErr: any) {
        console.warn("Gemini Service is currently unavailable (High Demand/503). Gracefully reverting to high-fidelity offline publisher fallback:", geminiErr.message);
        isDemo = true;
        const fallback = getExpressFallback(articleTitle, url);
        teaserCopy = fallback.teaserCopy;
        indexingTags = fallback.indexingTags;
        imagePrompt = fallback.imagePrompt;
      }
    }

    // 2. Sacred Image Generation (Gemini Image model / Fallback)
    let imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pompeo_Batoni_-_Sacred_Heart_of_Jesus_-_Google_Art_Project.jpg/640px-Pompeo_Batoni_-_Sacred_Heart_of_Jesus_-_Google_Art_Project.jpg"; // Pompeo Batoni Cor Jesu

    if (!client || isDemo) {
      // Preset selector for demo fallback image matching keywords
      const lowerPrompt = imagePrompt.toLowerCase();
      if (lowerPrompt.includes("monstrance") || lowerPrompt.includes("adoration") || lowerPrompt.includes("sacrament")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pelican_in_her_piety_window_%28cropped%29.jpg"; // Pelican piety window
      } else if (lowerPrompt.includes("mary") || lowerPrompt.includes("virgin") || lowerPrompt.includes("madonna") || lowerPrompt.includes("child")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Saint_Gertrude_kneeling_before_Mary_and_Christ_child.jpg/640px-Saint_Gertrude_kneeling_before_Mary_and_Christ_child.jpg"; // Saint Gertrude kneeling
      } else if (lowerPrompt.includes("desk") || lowerPrompt.includes("book") || lowerPrompt.includes("library") || lowerPrompt.includes("theologian") || lowerPrompt.includes("saint") || lowerPrompt.includes("scholar")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Shield_of_the_Trinity_or_Sacred_Heart_theology_diagram.jpg/640px-Shield_of_the_Trinity_or_Sacred_Heart_theology_diagram.jpg"; // Shield of Trinity
      } else if (lowerPrompt.includes("angel")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/A_Charta_of_the_Sacred_Heart_with_Angels_Worshipping.jpg/640px-A_Charta_of_the_Sacred_Heart_with_Angels_Worshipping.jpg"; // Angels worshiping
      } else if (lowerPrompt.includes("incense") || lowerPrompt.includes("thurible") || lowerPrompt.includes("smoke") || lowerPrompt.includes("fresco")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/The_Visitation_Saint_Margaret_Mary_Alacoque.jpg/640px-The_Visitation_Saint_Margaret_Mary_Alacoque.jpg"; // Visitation heart fresco
      } else if (lowerPrompt.includes("cross") || lowerPrompt.includes("crucifix") || lowerPrompt.includes("calvary") || lowerPrompt.includes("crown") || lowerPrompt.includes("thorns")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Ecce_Homo_by_Guido_Reni_%281639%29_-_Louvre.jpg/640px-Ecce_Homo_by_Guido_Reni_%281639%29_-_Louvre.jpg"; // Guido Reni Ecce Homo
      } else if (lowerPrompt.includes("blood") || lowerPrompt.includes("chalice") || lowerPrompt.includes("host") || lowerPrompt.includes("altar")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Allegory_of_the_Eucharist_and_Precious_Blood.jpg/640px-Allegory_of_the_Eucharist_and_Precious_Blood.jpg"; // Allegory of Eucharist
      } else if (lowerPrompt.includes("stained") || lowerPrompt.includes("glass") || lowerPrompt.includes("cathedral")) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Stained_glass_window_of_Christ%27s_Sacred_Heart.jpg/640px-Stained_glass_window_of_Christ%27s_Sacred_Heart.jpg"; // Stained glass
      }
    } else {
      try {
        console.log(`Generating sacred image based on prompt: ${imagePrompt}`);
        const enhancedPrompt = `A beautiful classical Catholic sacred art illustration of: ${imagePrompt}. 
Make it in the style of 17th century Caravaggio chiaroscuro oil painting or a detailed Renaissance fresco. 
Rich deep oil colors (gold, crimson red, marian blue, emerald green), dramatic warm light from a divine source, 
fine historic textures, traditional Catholic holy card design. No modern filters, highly respectful and pious.`;

        const imageResponse = await client.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: enhancedPrompt,
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            }
          },
        });

        let base64Data: string | null = null;
        if (imageResponse?.candidates?.[0]?.content?.parts) {
          for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              base64Data = part.inlineData.data;
              break;
            }
          }
        }

        if (base64Data) {
          imageUrl = `data:image/png;base64,${base64Data}`;
        }
      } catch (imageErr: any) {
        console.error("Express Image Generation failed:", imageErr.message);
        // Soft fallback to Batoni's Pompeo Cor Jesu artwork URL
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pompeo_Batoni_-_Sacred_Heart_of_Jesus_-_Google_Art_Project.jpg/640px-Pompeo_Batoni_-_Sacred_Heart_of_Jesus_-_Google_Art_Project.jpg";
      }
    }

    return NextResponse.json({
      title: articleTitle,
      teaserCopy,
      indexingTags,
      imageUrl,
      imagePrompt,
      isDemo,
      fetchSuccess
    });

  } catch (error: any) {
    console.error("General Express Generator error: ", error);
    return NextResponse.json(
      { error: "Post generation failed.", details: error.message },
      { status: 500 }
    );
  }
}
