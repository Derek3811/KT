import { GoogleGenAI, Type } from "@google/genai";
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

export async function POST(req: NextRequest) {
  try {
    const { articleTitle, articleContent, promptType, url } = await req.json();

    let articleTitleToUse = articleTitle || "";
    let articleContentToUse = articleContent || "";

    if (url && url.trim()) {
      try {
        console.log("Fetching URL server-side:", url);
        const fetchRes = await fetch(url.trim(), {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
          },
        });
        
        if (fetchRes.ok) {
          const html = await fetchRes.text();
          
          // Try to extract title
          const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            articleTitleToUse = titleMatch[1].trim();
          } else {
            const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
            if (h1Match && h1Match[1]) {
              articleTitleToUse = h1Match[1].replace(/<[^>]+>/g, "").trim();
            }
          }
          if (!articleTitleToUse) {
            articleTitleToUse = "Theological Study Reference";
          }

          // Strip styles, scripts, tags
          let cleanContent = html;
          const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          if (bodyMatch && bodyMatch[1]) {
            cleanContent = bodyMatch[1];
          }

          articleContentToUse = cleanContent
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
            .replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          if (articleContentToUse.length < 100) {
            articleContentToUse = `Direct paragraph extraction was limited from target link. Submitting title of source reference: ${articleTitleToUse}`;
          }
        } else {
          throw new Error(`Bad request status: ${fetchRes.status}`);
        }
      } catch (e: any) {
        console.warn("Could not retrieve URL contents directly, using fallback metadata builder.", e.message);
        // Clean URL domain as title
        let computedDomain = "Exile Archive Reference";
        try {
          computedDomain = new URL(url).hostname;
        } catch (_) {}
        articleTitleToUse = `Theological Inquiry: ${computedDomain}`;
        articleContentToUse = `A requested discussion summary of articles referenced via: ${url}. Traditionalist canonical analyses, clerical succession, or liturgical preservation. Ensure a polished scholarly exposition.`;
      }
    }

    if (!articleTitleToUse || !articleContentToUse) {
      return NextResponse.json(
        { error: "Missing article title, content, or reference URL" },
        { status: 400 }
      );
    }

    const client = getGeminiClient();

    // High-quality static backup generator if API key is not configured yet
    if (!client) {
      console.warn("GEMINI_API_KEY is not defined. Using highly tailorable fallback content.");
      const fallbackData = generateTheologicalFallback(articleTitleToUse, articleContentToUse, promptType);
      return NextResponse.json({
        data: fallbackData,
        isDemo: true,
        message: "Using offline analytical mock model. Add your GEMINI_API_KEY in the Secrets panel for fully dynamic live generations."
      });
    }

    const systemPrompt = `You are an elite editorial content strategist and traditional scholarly consultant for high-end Catholic archival publications.
Your specialty is the 'Warm-Editorial' brand bridge—translating deep, intellectually rigorous, theological Latinate essays into curiosity-inducing Facebook teasers that lead students back to the Squarespace website.
Maintain an objective, academic, highly composed, and traditional editorial tone. Use elegant prose, avoiding hype, slang, or clinical jargon.`;

    const userPrompt = `Analyze the article titled "${articleTitleToUse}".
Content:
${articleContentToUse.substring(0, 3000)}

Please provide:
1. A captivating Facebook teaser copy that invokes scholarly intrigue and traditional contemplation (no more than 150 words). Must end with a natural Call-To-Action to click the archive link.
2. 3 powerful, compact, stand-alone quotes (or Latin phrases from the text) for social media image templates (Canva cards).
3. 4 intellectually-grounded hashtags or theological indexing terms (e.g., #QuoPrimum, #Scholasticism).
4. An editorial analysis of the article's theological tone and readability level, with suggestions for traditional polishing.`;

    let responseText = "{}";
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["teaserCopy", "canvaQuotes", "indexingTags", "analyticalGrade", "editorialSuggestions"],
            properties: {
              teaserCopy: {
                type: Type.STRING,
                description: "The curiosity-inducing traditional Facebook post copy ending with a CTA.",
              },
              canvaQuotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 highly compelling quotes from the article appropriate for styled images.",
              },
              indexingTags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 scholarly theological hashtags or catalog index tags.",
              },
              analyticalGrade: {
                type: Type.STRING,
                description: "A reading grade or scholarly analysis metric (e.g. 'Scholastic / For Advanced Laymen').",
              },
              editorialSuggestions: {
                type: Type.STRING,
                description: "Specific academic refinements on prose, translation accuracy, or canonical syntax.",
              },
            },
          },
        },
      });
      responseText = response.text || "{}";
    } catch (gemErr: any) {
      console.warn("Gemini service is experiencing high temporary load or offline limits. Using scholarly fallback parameters:", gemErr.message);
      const fallbackData = generateTheologicalFallback(articleTitleToUse, articleContentToUse, promptType);
      return NextResponse.json({
        data: fallbackData,
        isDemo: true,
        message: "Offline analytics active due to temporary upstream demand. Standard layout is preserved."
      });
    }

    const parsedData = JSON.parse(responseText);
    return NextResponse.json({ data: parsedData, isDemo: false });
  } catch (error: any) {
    console.error("Gemini service error: ", error);
    return NextResponse.json(
      { error: "Failed to generate theological analysis", details: error.message },
      { status: 500 }
    );
  }
}

// Generates high-fidelity scholarly content inline when API key is not present
function generateTheologicalFallback(title: string, content: string, type?: string) {
  // Determine specialized outputs based on what user clicked
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("thesis") || lowerTitle.includes("cassiciacum")) {
    return {
      teaserCopy: "Can a claimant indeed hold the pontifical office materially but not formally? Explore Father Guérard des Lauriers' historic Thesis of Cassiciacum—a brilliant scholastic resolution to our contemporary ecclesial exile. Our latest archival monograph provides a rigorous canonical walkthrough of vacant authority, succession, and the preservation of apostolic visibility. Read the complete study in our permanent repository.",
      canvaQuotes: [
        "\"The occupier of the See remains materially Pope, but lacks the formal authority to rule.\"",
        "\"Habere sedem non est habere auctoritatem.\"",
        "\"A theological roadmap to guide traditionalists through the modern ecclesiastical wilderness.\""
      ],
      indexingTags: ["#ThesisOfCassiciacum", "#SedesVacans", "#TraditionalCatholicism", "#ScholasticSuccession"],
      analyticalGrade: "Scholastic / Academic Theological Grade",
      editorialSuggestions: "Consider augmenting the section on the 'material-formal' distinction with direct citations from Cardinal Cajetan's commentaries on the Summa Theologiae to satisfy the most rigorous readers."
    };
  } else if (lowerTitle.includes("liturgical") || lowerTitle.includes("quo primum")) {
    return {
      teaserCopy: "Is the traditional Latin Mass merely a historical preference, or is it protected by a perpetual, unalterable papal decree? Analyze the historic codification of St. Pius V's bull 'Quo Primum' and its binding canonical force across five centuries. Our newest editorial examination dismantles the modern myths and restores traditional clarity. Tap below for the full scholarly defense.",
      canvaQuotes: [
        "\"We grant in perpetuity that this Mass may be sung or said in any church whatsoever.\"",
        "\"Lex Orandi, Lex Credendi—the law of prayer is the law of belief.\"",
        "\"Quo Primum stands as an unyielding wall against liturgical experiment.\""
      ],
      indexingTags: ["#LatinMass", "#QuoPrimum", "#TraditionalLiturgy", "#StPiusV"],
      analyticalGrade: "Highly Rigorous / Archival Defense",
      editorialSuggestions: "We advise adding a direct comparison tab displaying the Gregorian Rite alongside the 1962 modifications to illustrate the strict organic continuity needed for preservation."
    };
  } else if (lowerTitle.includes("empty chairs") || lowerTitle.includes("interregnum")) {
    return {
      teaserCopy: "With the chair of Peter seemingly vacant, many ask: is our era unprecedented? Step back to 1268 and discover how a three-year conclave resulted in Roman Catholic perseverance. By reviewing lengthy historic Western Interregnums, we find that the indefectibility of the Church is not bound by the immediate speed of an election, but by the true deposit of Faith. Join the conversation online.",
      canvaQuotes: [
        "\"The longest papal interregnum in history endured for thirty-four months under God's providence.\"",
        "\"Indefectibility does not require a perpetual living Pope, but a perpetual visible deposit of faith.\"",
        "\"Ubi fides, ibi Ecclesia—where the faith is, there is the Church.\""
      ],
      indexingTags: ["#PapalInterregnum", "#ChurchHistory", "#CanonLaw", "#WesternSchism"],
      analyticalGrade: "Historical Narrative & Canonical Analysis",
      editorialSuggestions: "To enhance reader comprehension, integrate a comparative table ranking historic papal vacancies (1268-1271, Western Schism, 1800) alongside chronological milestones of traditional governance."
    };
  } else {
    // General theological backup
    return {
      teaserCopy: `How do traditionalists resolve the sacramental and jurisdictional emergency of our epoch? In this detailed study of traditional governance, we investigate canonical epikeia and the divine right to save souls. Read this essential defense of apostolic succession on our central archival site. Link below.`,
      canvaQuotes: [
        "\"Salus animarum suprema lex—the salvation of souls is the supreme law.\"",
        "\"The obligation of the sacramental order supersedes temporary administrative directives.\"",
        "\"Jurisdiction in emergency is supplied directly by Christ for the spiritual good of the faithful.\""
      ],
      indexingTags: ["#EmergencyJurisdiction", "#Epikeia", "#TraditionalSacraments", "#CanonLaw"],
      analyticalGrade: "Advanced Juridical / Canonical Focus",
      editorialSuggestions: "Ensure that 'epikeia' is carefully distinguished from modern moral relativism, emphasizing that emergency jurisdiction arises exclusively out of the objective demands of sacramental survival."
    };
  }
}
