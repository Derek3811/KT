import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

// Maps image concepts to beautiful, high-quality, relevant traditional Catholic public domain masterpieces served locally
function getImageFallbackUrl(concept: string): string {
  const lower = concept.toLowerCase();
  if (lower.includes("medard") || lower.includes("noyon") || lower.includes("bishop") || lower.includes("roses")) {
    return "/medard_new.png";
  }
  if (lower.includes("columba") || lower.includes("iona") || lower.includes("monk") || lower.includes("abbot")) {
    return "/columba_new.png";
  }
  if (lower.includes("margaret") || lower.includes("queen") || lower.includes("scotland")) {
    return "/margaret_new.png";
  }
  if (lower.includes("mary") || lower.includes("virgin") || lower.includes("marian") || lower.includes("madonna") || lower.includes("mother of god")) {
    return "/madonna_new.png";
  }
  if (lower.includes("sacrament") || lower.includes("eucharist") || lower.includes("altar") || lower.includes("communion") || lower.includes("precious blood")) {
    return "/eucharist_new.png";
  }
  if (lower.includes("cross") || lower.includes("crucifix") || lower.includes("passion") || lower.includes("ecce homo")) {
    return "/crucifix_new.png";
  }
  // Default fallback local image
  return "/sacred_heart_new.png";
}

// Highly tailored traditional fallbacks for when the Gemini API is rate-limited or out of quota (status 429)
// Provides long, rich, and deeply theological articles (approx. 250-350 words) to prevent short placeholders
function getDailyFallback(currentDateStr: string) {
  const lowerDate = currentDateStr.toLowerCase();
  
  let title = "Devotional Reflection: The Sacred Heart of Jesus and the Fire of His Divine Love";
  let caption = "During this beautiful month of June, traditionally dedicated to the Most Sacred Heart of Jesus, we raise our minds and hearts to the contemplation of the infinite charity of our Divine Savior. It was to Saint Margaret Mary Alacoque at Paray-le-Monial that our Lord chose to reveal the burning furnace of His Heart, expressing His deep sorrow for the coldness, indifference, and outrages with which mankind so often repays His boundless love. 'Behold this Heart,' He said, 'which has loved men so much that it has spared nothing to testify its love.' In a world increasingly marked by secular distraction and moral confusion, the Sacred Heart remains our absolute sanctuary of peace, mercy, and grace. Let us offer our daily acts of devotion, holy prayers, and sincere reparation for the offenses committed against the Blessed Sacrament. By consecrating our families, our trials, and our daily labors to His Heart, we allow His divine fire to purify our souls and strengthen our resolve to remain steadfast in the Deposit of Faith. Cor Jesu Sacratissimum, miserere nobis.";
  let imageConcept = "Traditional oil painting of the Sacred Heart of Jesus, glowing divine light, caravaggio style";
  let sourceSummary = "Monthly Devotional Calendar (Rate Limit Fallback)";

  if (lowerDate.includes("june 8")) {
    title = "Feast of Saint Medard, Bishop of Noyon: Patron of the Harvest and Steadfast Shepherd";
    caption = "On this eighth day of June, we commemorate the solemn Feast of Saint Medard (c. 456–545), the holy Bishop of Noyon, whose life stands as a testament to the power of boundless charity and apostolic zeal. Born into a noble Frankish family, Saint Medard was distinguished from his youth by a tender concern for the poor, often giving away his own garments and possessions to relieve the suffering of the destitute. Upon his elevation to the episcopacy, he became a vigilant defender of Christian orthodoxy, converting pagans, protecting the vulnerable, and instituting the famous 'Feast of the Roses' to honor purity and virtue among the maidenhood of Noyon. Renowned in tradition as a protector against storms and a patron of the harvest, he is depicted in sacred art as protected from torrential rains by a hovering eagle—a symbol of the divine shield that envelopes those who walk in holy obedience. As we navigate our contemporary exile and face the storms of modernism, let us invoke Saint Medard's powerful intercession. Let us pray for the grace to cultivate a deep spirit of penance, to practice active charity towards our neighbors, and to stand uncompromised in our fidelity to the Holy Magisterium. Holy Saint Medard, pray for us that we may be crowned with the roses of divine grace and remain forever anchored in the eternal truths of our Holy Mother Church.";
    imageConcept = "Saint Medard holding a crown of roses, bishop vestments, Noyon cathedral backdrop, baroque painting style";
    sourceSummary = "Liturgical Calendar (June 8 - Rate Limit Fallback)";
  } else if (lowerDate.includes("june 9")) {
    title = "Feast of Saint Columba, Abbot of Iona: The Apostle of Scotland and Guardian of Monastic Piety";
    caption = "On this ninth day of June, we honor the memory of Saint Columba of Iona (521–597), the illustrious monk, missionary, and Abbot who became the great Apostle of Scotland. Sailing from Ireland with twelve companions, Saint Columba established the monastic fortress of Iona on a rocky, windswept island in the Hebrides. From this sacred outpost, the light of Christian civilization was preserved and spread throughout the northern kingdoms, even as the dark clouds of early medieval confusion threatened the continent. Saint Columba was a man of intense prayer, rigorous fasting, and meticulous scholarship, renowned for copying hundreds of sacred manuscripts by his own hand. His monastic rule demanded an unyielding commitment to silence, liturgical precision, and the preservation of the Holy Scriptures. Today, as we witness the intellectual and spiritual desert of our secular age, the legacy of Iona calls us back to the roots of contemplative prayer and monastic enclosure. Let us pray for the restoration of traditional religious life and the courage to preach the Gospel contra mundum. Holy Abbot Columba, pray for us that we may keep the flame of the true Catholic faith alive in our hearts, standing as beacons of sacred truth amidst the shifting currents of this world.";
    imageConcept = "Saint Columba in Benedictine monk robes standing on the rocky shore of Iona holding a wooden cross, dramatic sea waves, Rubens style";
    sourceSummary = "Liturgical Calendar (June 9 - Rate Limit Fallback)";
  } else if (lowerDate.includes("june 10")) {
    title = "Feast of Saint Margaret, Queen of Scotland: Model of Motherhood, Royal Charity, and Liturgical Fidelity";
    caption = "On this tenth day of June, we commemorate the holy memory of Saint Margaret, Queen of Scotland (1045–1093), a noble princess whose life beautifully synthesized regal authority, maternal devotion, and uncompromised Catholic piety. As the wife of King Malcolm III, Queen Margaret transformed the royal court of Scotland into a sanctuary of Christian virtue and cultural refinement. With her own hands, she fed hundreds of orphans and beggars daily, built hostels for pilgrims, and washed the feet of the poor in imitation of our Divine Lord. Deeply devoted to the sacred liturgy of Rome, she worked untiringly to reform the ecclesial customs of Scotland, aligning them with the universal Church and promoting the proper observance of the Holy Sacrifice of the Mass. Her private life was anchored in intense prayer, spiritual reading, and austere mortification, inspiring her children to walk in the paths of holiness. In an era when the family is under fierce attack and the sacredness of motherly duty is marginalized, Saint Margaret stands as a shining beacon of domestic grace and public integrity. Let us pray today for our families, that mothers may find in her a model of holy guidance, and that we may build domestic churches dedicated to the praise of God. Holy Queen Margaret, pray for us.";
    imageConcept = "Saint Margaret Queen of Scotland distributing food to poor children near a medieval castle chapel, renaissance style";
    sourceSummary = "Liturgical Calendar (June 10 - Rate Limit Fallback)";
  }

  return {
    sourceFound: false,
    sourceSummary,
    title,
    caption,
    imageConcept
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url1, url2 } = await req.json();

    const targetUrl1 = url1 || "https://www.facebook.com/people/Peregrinatio-Sacra-Gratiae/100077721485830/";
    const targetUrl2 = url2 || "https://www.facebook.com/MariaAngelAgnesGrow?mibextid=wwXIfr";

    const client = getGeminiClient();

    // Get current local date
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let sourceFound = false;
    let sourceSummary = "";
    let title = "";
    let caption = "";
    let imageConcept = "";

    // Check if client is initialized
    if (!client) {
      console.warn("GEMINI_API_KEY is not defined. Using offline static liturgical calendar fallback.");
      const fallback = getDailyFallback(currentDate);
      sourceFound = fallback.sourceFound;
      sourceSummary = fallback.sourceSummary;
      title = fallback.title;
      caption = fallback.caption;
      imageConcept = fallback.imageConcept;
    } else {
      // Step 1: Query Gemini using Search Grounding to find Facebook posts or fallback
      const systemPrompt = `You are a traditional Catholic editorial strategist. You are helping compile a daily Facebook post copy that mirrors the devotional depth, themes, and tone of two specific traditional Facebook pages.
Your tone should be objective, piously composed, academic, and warm-editorial. No hashtags in the caption itself.`;

      const userPrompt = `Today's Date is: ${currentDate}.
Please perform a web search to check for the most recent public posts from these two Facebook pages:
1. Peregrinatio Sacra Gratiae: ${targetUrl1}
2. Maria Angel Agnes Grow: ${targetUrl2}

Specifically check for any posts published on the same day (${currentDate}) or within the last 24-48 hours.

If you find real posts from today or very recently:
- Summarize what they wrote about.
- Draft a NEW, unique but similar devotional Facebook post caption (approx. 250-350 words) that shares a similar message, incorporating traditional Catholic quotes or teachings. Make it deep, detailed, and theological.

If you DO NOT find any recent or same-day posts (or if they are not indexed/blocked):
- Fall back to the Traditional Roman Catholic Liturgical Calendar for today (${currentDate}).
- Identify the feast day of today (for example, on June 8, it is the Feast of St. Medard, Bishop of Noyon).
- Synthesize a beautiful, traditional post caption (approx. 250-350 words) based on today's feast day. Make sure it echoes the styles of the two pages:
  - Peregrinatio Sacra Gratiae: focuses on holy pilgrimages, sacred grace, Marian devotions.
  - Maria Angel Agnes Grow: focuses on spiritual growth, angels, Saint Agnes, and traditional family devotions.

Please return a JSON response containing:
1. "sourceFound": boolean (true if actual recent posts from the pages were found and utilized, false if the liturgical calendar fallback was used).
2. "sourceSummary": string (a concise description of what was checked/found or the name of the liturgical feast used as fallback).
3. "title": string (suggested title of the generated post).
4. "caption": string (the drafted Facebook post caption, ending with a pious reflection).
5. "imageConcept": string (a clear, descriptive 1-sentence prompt for image generation, representing the subject, e.g. "St. Medard standing in Noyon cathedral holding a rose crown").

IMPORTANT: Output ONLY the raw JSON object. Do not wrap it in markdown code blocks or add any other text outside the JSON.`;

      try {
        console.log("Step 1: Searching Facebook pages or Liturgical Calendar fallback...");
        const textResponse = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            tools: [{ googleSearch: {} }],
          },
        });

        let responseText = textResponse.text || "{}";
        // Clean up any potential markdown code blocks if the model still generated them
        responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
        
        const parsedData = JSON.parse(responseText);
        sourceFound = parsedData.sourceFound;
        sourceSummary = parsedData.sourceSummary;
        title = parsedData.title;
        caption = parsedData.caption;
        imageConcept = parsedData.imageConcept;
      } catch (err: any) {
        console.warn("Step 1: Gemini API call failed (quota limit or rate limit). Reverting to local calendar fallback. Error:", err.message);
        const fallback = getDailyFallback(currentDate);
        sourceFound = fallback.sourceFound;
        sourceSummary = fallback.sourceSummary;
        title = fallback.title;
        caption = fallback.caption;
        imageConcept = fallback.imageConcept;
      }
    }

    // Step 2: Read reference images from sample/001
    const sampleDir = path.join(process.cwd(), "sample", "001");
    let selectedImageFile = "";
    let base64Image = "";

    try {
      if (fs.existsSync(sampleDir)) {
        const files = fs.readdirSync(sampleDir).filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
        });

        if (files.length > 0) {
          // Select a random reference image
          const randomFile = files[Math.floor(Math.random() * files.length)];
          selectedImageFile = randomFile;
          const imagePath = path.join(sampleDir, randomFile);
          const imgBuffer = fs.readFileSync(imagePath);
          base64Image = imgBuffer.toString("base64");
        }
      }
    } catch (fsErr) {
      console.warn("Failed to read sample/001 images directory:", fsErr);
    }

    // Step 3: Analyze the image style and write an enhanced image prompt
    let styledImagePrompt = `A beautiful traditional Catholic sacred art oil painting representing ${imageConcept}. Classical 17th century baroque style, Pompeo Batoni, Caravaggio, Peter Paul Rubens, deep rich colors, gold leaf highlights, dramatic chiaroscuro, divine rays of light, kneeling angels, cherubs, pious, highly detailed, masterwork.`;
    
    if (client && base64Image) {
      console.log(`Step 2: Analyzing style from reference image ${selectedImageFile}...`);
      try {
        const styleResponse = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              inlineData: {
                data: base64Image,
                mimeType: "image/jpeg",
              },
            },
            `You are a professional image stylist. Analyze the attached traditional Catholic artwork.
Write a highly detailed, descriptive prompt (under 120 words) for a text-to-image generator to create a new, unique image in this EXACT style.
The new image should represent the concept: "${imageConcept}".
Incorporate style features like the 17th century baroque/renaissance oil painting medium, deep rich colors (gold, crimson, marian blue, warm ivory), chiaroscuro light from a divine source, angel forms, and any gold scroll/gilt borders.
Output ONLY the resulting prompt, without any extra text or markdown formatting.`,
          ],
        });
        let rawPrompt = styleResponse.text?.trim() || "";
        rawPrompt = rawPrompt.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
        if (rawPrompt) {
          styledImagePrompt = `${rawPrompt}. Traditional Catholic sacred art painting, beautiful 17th century baroque oil painting style, Pompeo Batoni, Caravaggio, Peter Paul Rubens, deep rich colors, gold leaf highlights, dramatic chiaroscuro, divine rays of light, pious, high details, masterpieces, 8k.`;
        }
      } catch (styleErr) {
        console.warn("Failed to generate style description, using default styled prompt:", styleErr);
      }
    }

    // Step 4: Generate the style-matched image
    let imageUrl = "";
    if (client) {
      console.log("Step 3: Generating new image using styled prompt...");
      try {
        const imageResponse = await client.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: styledImagePrompt,
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
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
        } else {
          throw new Error("No image data found in candidate parts.");
        }
      } catch (imgErr: any) {
        console.error("Failed to generate styled image via Gemini:", imgErr.message);
        // Fallback: If image generation fails, serve a context-relevant beautiful public domain masterpiece URL
        imageUrl = getImageFallbackUrl(imageConcept || title || "Sacred Heart");
      }
    } else {
      // Fallback: If client is not initialized, serve a context-relevant beautiful public domain masterpiece URL
      imageUrl = getImageFallbackUrl(imageConcept || title || "Sacred Heart");
    }

    return NextResponse.json({
      success: true,
      sourceFound,
      sourceSummary,
      title,
      caption,
      imageUrl,
      imagePrompt: styledImagePrompt,
      referenceImageName: selectedImageFile,
    });

  } catch (error: any) {
    console.error("Facebook Sync API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to perform Facebook Daily Sync",
      details: error.message,
    }, { status: 500 });
  }
}
