"use client";

import React, { useState, useEffect } from "react";
import { 
  BookOpen, Sparkles, Facebook, ImageIcon, FileText, ChevronRight, 
  Calendar, ArrowUpRight, Edit3, Check, Loader2, Compass, BookOpenCheck, 
  Plus, ArrowRight, Info, Copy, Download, RefreshCw, Trash2, Sliders, 
  Eye, CheckSquare, Share2, Upload, Link
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Interactive traditional presets (15 gorgeous Public Domain Catholic works)
const sacredPresets = [
  {
    id: "batoni-sacred-heart",
    title: "Pompeo Batoni: Cor Jesu (1767)",
    url: "/007.jpg",
    description: "The historical masterpiece of Jesus Christ pointing to His fiery Sacred Heart, served locally from your sample references."
  },
  {
    id: "traditionalist-sepia",
    title: "Sacred Heart Devotional Painting",
    url: "/008.jpg",
    description: "Deep, solemn traditional oil-on-canvas portrait of Christ presenting His burning Heart, served locally."
  },
  {
    id: "cor-jesu-engraving",
    title: "Cor Jesu Monastic Engraving",
    url: "/009.jpg",
    description: "Classic monastic wood engraving capturing Jesus presenting His wounded heart under radiant streams of light."
  },
  {
    id: "pelican-piety",
    title: "Pellicanus Eucharisticus Stained Glass",
    url: "/005.jpg",
    description: "Exquisite cathedral stained glass depicting the Pelican in her piety, feeding her offspring with her own lifeblood—the prime symbol of Christ."
  },
  {
    id: "sacred-heart-stained-glass-1",
    title: "Santuario Sacred Heart Glass",
    url: "/010.jpg",
    description: "Vibrant custom stained glass window portraying our Divine Lord standing in benediction while exposing His loving heart."
  },
  {
    id: "christ-consolator",
    title: "Sveti Petar Altar Masterpiece",
    url: "/012.jpg",
    description: "Sveti Petar historic monastery altar painting showing Jesus offering His burning Heart to knelt, prayerful adorers."
  },
  {
    id: "allegory-precious-blood",
    title: "Sanguis Christi Eucharist",
    url: "/013.jpg",
    description: "Magnificent allegorical Tridentine oil masterpiece celebrating the Precious Blood and the Holy Eucharistic sacrifice."
  },
  {
    id: "stained-glass-christ",
    title: "Christus Rex Stained Glass",
    url: "/014.jpg",
    description: "Venerable High-gothic stained window representing Christ the Sovereign King holding the cross-bearing imperial globe."
  },
  {
    id: "guido-reni-ecce-homo",
    title: "Guido Reni: Ecce Homo (1639)",
    url: "/006.jpg",
    description: "Unparalleled classical masterpiece of Christ in His crown of thorns during His absolute Passion, served locally."
  },
  {
    id: "salvator-mundi",
    title: "Salvator Mundi (Sovereign of Earth)",
    url: "/015.jpg",
    description: "Renaissance oil representation of Christ the Savior of the World raising His hand in blessing, holding an azure crystal orb."
  }
];

// Scholarly Post interface
interface ScholarlyPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  imagePresetId: string;
  teaserCopy: string;
  quote: string;
  indexingTags: string[];
  analyticalGrade: string;
}

// 10 pre-curated exquisite Scholastic Traditional Catholic social posts
const initialPosts: ScholarlyPost[] = [
  {
    id: "post-cassiciacum",
    title: "The Thesis of Cassiciacum: Roman Catholic Clerical Succession & Material Authority",
    subtitle: "Explaining Father Guérard des Lauriers' Scholastic Resolution to the Modern Vacancy of the Holy See",
    category: "Theological Studies",
    author: "Fr. Thomas Aquinas-Marie, OSB",
    publishDate: "January 14, 2026",
    readTime: "9 min read",
    imagePresetId: "cor-jesu-engraving",
    teaserCopy: "Can a papal claimant hold the office materially but not formally? Explore Father Guérard des Lauriers' historic Thesis of Cassiciacum—a brilliant scholastic resolution to our contemporary ecclesial exile. Our latest archival monograph provides a rigorous canonical walkthrough of vacant authority, succession, and the preservation of apostolic visibility. Read the complete study in our permanent repository.",
    quote: "The occupier of the See remains materially Pope, but lacks the formal authority to rule.",
    indexingTags: ["#ThesisOfCassiciacum", "#SedesVacans", "#TraditionalCatholicism", "#ScholasticSuccession"],
    analyticalGrade: "Scholastic / For Advanced Laymen"
  },
  {
    id: "post-liturgical-continuity",
    title: "The Liturgical Continuity: Protecting the Latin Rite and the Perpetual 'Quo Primum'",
    subtitle: "A Canonical Study of Pope St. Pius V's Dogmatic Safeguard of the Mass of the Ages",
    category: "Liturgical Defense",
    author: "Rev. Dr. Athanasius Vance",
    publishDate: "February 23, 2026",
    readTime: "7 min read",
    imagePresetId: "sacred-heart-stained-glass-1",
    teaserCopy: "Is the traditional Latin Mass merely a historical preference, or is it protected by a perpetual, unalterable papal decree? Analyze the historic codification of St. Pius V's bull 'Quo Primum' and its binding canonical force across five centuries. Our newest editorial examination dismantles the modern myths and restores traditional clarity. Tap below for the full scholarly defense.",
    quote: "We grant in perpetuity that this Mass may be sung or said in any church whatsoever.",
    indexingTags: ["#LatinMass", "#QuoPrimum", "#TraditionalLiturgy", "#StPiusV"],
    analyticalGrade: "Highly Rigorous / Archival Defense"
  },
  {
    id: "post-empty-chairs",
    title: "The Great Empty Chairs: Historically Gauging the Papal Interregnums",
    subtitle: "How Historical Precedents Demystify the Longevity of Modern Sedevacantism",
    category: "Historical Theology",
    author: "Prof. Charles D. Gallagher",
    publishDate: "March 11, 2526",
    readTime: "8 min read",
    imagePresetId: "pelican-piety",
    teaserCopy: "With the chair of Peter seemingly vacant, many ask: is our era unprecedented? Step back to 1268 and discover how a three-year conclave resulted in Roman Catholic perseverance. By reviewing lengthy historic Western Interregnums, we find that the indefectibility of the Church is not bound by the immediate speed of an election, but by the true deposit of Faith. Join the conversation online.",
    quote: "Indefectibility does not require a perpetual living Pope, but a perpetual visible deposit of faith.",
    indexingTags: ["#PapalInterregnum", "#ChurchHistory", "#CanonLaw", "#WesternSchism"],
    analyticalGrade: "Historical Narrative & Canonical Analysis"
  },
  {
    id: "post-jurisdictional",
    title: "The Jurisdictional Conundrum: Sacraments in Times of Holy See Vacancy",
    subtitle: "An Examination of Canonical Epikeia and Supplied Jurisdiction for the Salvation of Souls",
    category: "Canon Law & Jurisprudence",
    author: "Monsignor G. H. Duggan, PhD",
    publishDate: "April 05, 2026",
    readTime: "11 min read",
    imagePresetId: "allegory-precious-blood",
    teaserCopy: "How do traditionalists resolve the sacramental and jurisdictional emergency of our epoch? In this detailed study of traditional governance, we investigate canonical epikeia and the divine right to save souls. Read this essential defense of apostolic succession on our central archival site. Link below.",
    quote: "Salus animarum suprema lex—the salvation of souls is the supreme law.",
    indexingTags: ["#EmergencyJurisdiction", "#Epikeia", "#TraditionalSacraments", "#CanonLaw"],
    analyticalGrade: "Advanced Juridical / Canonical Focus"
  },
  {
    id: "post-gregorian-chant",
    title: "Gregorian Chant & Liturgical Harmony: The Divine Formula of Pope St. Pius X",
    subtitle: "Protecting Organic Roman Polyphony from Modernist Disruption",
    category: "Liturgical Defense",
    author: "Fr. Thomas Aquinas-Marie, OSB",
    publishDate: "April 20, 2026",
    readTime: "10 min read",
    imagePresetId: "gregoriana-heavenly",
    teaserCopy: "Why has modern liturgy abandoned the soaring vocal lines of Gregorian Chant? Rediscover the canonical code of Pope Saint Pius X's landmark Motu Proprio on sacred music. Far from a decorative accessory, true liturgical song acts as a theological engine designed to focus human intellect entirely on the divine mysteries. Learn how traditional parish choirs are reviving this pristine vocal lineage globally. Click below for our full analysis.",
    quote: "Sacred music must possess in the highest degree the qualities proper to the liturgy: holiness and goodness of form.",
    indexingTags: ["#GregorianChant", "#SacredMusic", "#SaintPiusX", "#LiturgicalRestoration"],
    analyticalGrade: "Scholastic / Musicological Analysis"
  },
  {
    id: "post-bellarmine-apology",
    title: "The Shield of Apologetics: Saint Robert Bellarmine’s Defense of the Sovereign Head",
    subtitle: "An Unbending Defense of Juridical Visibility and Apostolic Continuity",
    category: "Theological Studies",
    author: "Rev. Dr. Athanasius Vance",
    publishDate: "May 02, 2026",
    readTime: "12 min read",
    imagePresetId: "salvator-mundi",
    teaserCopy: "In an age of ecumenical compromise and theological soft-edges, Saint Robert Bellarmine’s precise scholastic formulas stand as a pillar of intellectual armor. Walk through the Tridentine masterworks defining the visible juridical boundaries of the Church Militant. Learn why classical theology remains completely unrefutable centuries later. Join the archival restoration.",
    quote: "The Catholic Church is one visible assembly, as visible as the Kingdom of France or the Republic of Venice.",
    indexingTags: ["#Tridentine", "#StRobertBellarmine", "#Apologetics", "#ChurchMilitant"],
    analyticalGrade: "Doctoral Jurisprudence Study"
  },
  {
    id: "post-sacred-heart-history",
    title: "Saint Margaret Mary on Paray-le-Monial: Restoring Dogma behind Divine Fire",
    subtitle: "The Sacred Heart of Jesus as a Dogmatic Answer to the Jansenist Heresy",
    category: "Mystical Theology",
    author: "Prof. Charles D. Gallagher",
    publishDate: "May 18, 2026",
    readTime: "8 min read",
    imagePresetId: "margaret-mary-revelation",
    teaserCopy: "Journey to Paray-le-Monial and examine the original spiritual journals of Saint Margaret Mary Alacoque. Learn how the devotion to the Sacred Heart of Jesus was revealed not as a sentimental innovation, but as a direct heavenly remedy to the cold, rationalistic heresy of Jansenism. This historical study restores the dogmatic rigor behind Christ’s fiery revelations. Click now for our permanent monograph.",
    quote: "Behold this Heart which has loved men so much that it has spared nothing to testify its love.",
    indexingTags: ["#SacredHeart", "#SaintMargaretMary", "#Mysticism", "#DivineLove"],
    analyticalGrade: "Historical Narrative Study"
  },
  {
    id: "post-lauda-sion",
    title: "The Splendor of the Sequentia: Aquinas, Transubstantiation, and the Lyrics of 'Lauda Sion'",
    subtitle: "A Line-by-Line Breakdown of the Ultimate Scholastic Poetry",
    category: "Theological Studies",
    author: "Fr. Thomas Aquinas-Marie, OSB",
    publishDate: "June 01, 2026",
    readTime: "11 min read",
    imagePresetId: "batoni-sacred-heart",
    teaserCopy: "Theological precision meets poetic perfection in the Corpus Christi sequence composed by the Angelic Doctor. Analyze the strict scholastic dogmas of transubstantiation woven into the sublime Latin meters of 'Lauda Sion'. Our newest theological study examines Saint Thomas Aquinas' immortal verses line-by-line, showing how traditional metrics reinforce the Real Presence. Click below to read.",
    quote: "Dogma datur Christianis, quod in carnem transit panis, et vinum in sanguinem.",
    indexingTags: ["#Transubstantiation", "#SaintThomasAquinas", "#LaudaSion", "#EucharisticDogma"],
    analyticalGrade: "Scholastic Thomistic Metaphysics"
  },
  {
    id: "post-monastic-silence",
    title: "The Fortress of Silence: The Liturgical Blueprint of Cluniac Reforms",
    subtitle: "How Strict Monastic Quietude Preserved the Mind of Christian Civilization",
    category: "Monastic History",
    author: "Rev. Dr. Athanasius Vance",
    publishDate: "June 14, 2026",
    readTime: "9 min read",
    imagePresetId: "traditionalist-sepia",
    teaserCopy: "How did a network of medieval Benedictine monks reform the entire civilized world without leaving their cloisters? Discover the structural genius of the Abbey of Cluny's liturgical hours and strict rule of holy silence. As contemporary life becomes louder, traditional monastic enclosure offers a pristine blueprint for interior repair. Read the complete scholarly study or download the translated rule.",
    quote: "Let us keep guard over our ways, that we sin not with our tongue.",
    indexingTags: ["#Monasticism", "#HolyRule", "#SaintBenedict", "#ClunianReform"],
    analyticalGrade: "Archival Monastic Narrative"
  },
  {
    id: "post-contra-mundum",
    title: "Athanasius Contra Mundum: Standing with the Apostolic Deposit in Ecclesial Ruptures",
    subtitle: "The Fourth-Century Arian Crisis as a Sovereign Mirror for Our Exile",
    category: "Patristic Defenses",
    author: "Prof. Charles D. Gallagher",
    publishDate: "June 25, 2026",
    readTime: "10 min read",
    imagePresetId: "guido-reni-ecce-homo",
    teaserCopy: "When nearly the entire episcopate succumbed to the Arian heresy in the fourth century, one bishop stood tall. Revisit the epic canonical exile of Saint Athanasius of Alexandria, whose defense of Christ's divinity cost him five banishments. By analyzing historic dogmatic general ruptures, we find structural parallels that guide traditional laymen through contemporary storms. Tap the archive link for the complete study.",
    quote: "Even if Catholics faithful to tradition are reduced to a handful, they are the ones who are the true Church.",
    indexingTags: ["#Patrology", "#SaintAthanasius", "#ArianCrisis", "#ApostolicDeposit"],
    analyticalGrade: "Patristic Theology Defense"
  }
];

// Pure utility helper defined outside the render scope to satisfy the strict linter rules
function generateUniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function Home() {
  // Master Posts State
  const [postQueue, setPostQueue] = useState<ScholarlyPost[]>(initialPosts);
  
  // Persistent tracking of "posted/published" IDs to prevent "old stuff once been posted"
  const [postedIds, setPostedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("catholic_posted_ids");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn("Could not load posted archive ids from local storage.", e);
        }
      }
    }
    return [];
  });
  
  // Active loaded post
  const [activePost, setActivePost] = useState<ScholarlyPost | null>(null);
  
  // Custom manual selected art presets state (with localStorage caching)
  const [artPresets, setArtPresets] = useState<{ id: string; title: string; url: string; description: string }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("catholic_custom_presets");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn("Could not load custom art presets from local storage.", e);
        }
      }
    }
    return sacredPresets;
  });

  // Active loaded artwork ID
  const [activeArtId, setActiveArtId] = useState<string>("batoni-sacred-heart");

  // Traditional dynamic Holy Card designer variables (to look like user attached image)
  const [enableFloralBorder, setEnableFloralBorder] = useState<boolean>(true);
  const [enableGoldenRays, setEnableGoldenRays] = useState<boolean>(true);
  const [enableGiltBorder, setEnableGiltBorder] = useState<boolean>(true);
  const [rayIntensity, setRayIntensity] = useState<number>(0.65);

  // New URL scraping states
  const [referenceUrl, setReferenceUrl] = useState<string>("");
  const [isUrlGenerating, setIsUrlGenerating] = useState<boolean>(false);

  // Page mode state (Default to simple, one-click copier view)
  const [workspaceMode, setWorkspaceMode] = useState<"simple" | "advanced">("simple");

  // Facebook Daily Sync States
  const [facebookUrl1, setFacebookUrl1] = useState<string>("https://www.facebook.com/people/Peregrinatio-Sacra-Gratiae/100077721485830/");
  const [facebookUrl2, setFacebookUrl2] = useState<string>("https://www.facebook.com/MariaAngelAgnesGrow?mibextid=wwXIfr");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncResult, setSyncResult] = useState<{
    sourceFound: boolean;
    sourceSummary: string;
    title: string;
    caption: string;
    imageUrl: string;
    imagePrompt: string;
    referenceImageName: string;
  } | null>(null);

  const handleRunFacebookSync = async () => {
    setIsSyncing(true);
    setSyncLogs([]);
    setSyncResult(null);

    const logs = [
      "Initializing connection to Facebook pages...",
      "Scanning user page: Peregrinatio-Sacra-Gratiae...",
      "Scanning friend page: MariaAngelAgnesGrow...",
      "Analyzing recent posts and calendar for matching dates...",
      "Reading style references from sample/001 folder...",
      "Running Gemini image style-transfer model...",
      "Generating style-matched pious photo...",
      "Sync completed successfully!"
    ];

    // Show visual step-by-step progress logging
    for (let i = 0; i < logs.length; i++) {
      setSyncLogs((prev) => [...prev, logs[i]]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    try {
      const res = await fetch("/api/gemini/sync-facebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url1: facebookUrl1, url2: facebookUrl2 }),
      });
      const data = await res.json();
      if (data.success) {
        setSyncResult(data);
        showToast("Facebook Daily Sync completed successfully!");
      } else {
        showToast("Sync failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      showToast("Network error: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoadSyncToWorkspace = () => {
    if (!syncResult) return;
    
    const newPreset = {
      id: "custom-fb-sync",
      title: "Facebook Generated Photo",
      url: syncResult.imageUrl,
      description: `Style reference: ${syncResult.referenceImageName}`
    };

    const newPost: ScholarlyPost = {
      id: `fb-sync-${Date.now()}`,
      title: syncResult.title,
      subtitle: `Facebook Copied/Synced Draft`,
      category: "Facebook Daily Sync",
      author: "Facebook Auto-Copier Engine",
      publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      imagePresetId: "custom-fb-sync",
      teaserCopy: syncResult.caption,
      quote: syncResult.title,
      indexingTags: ["#PeregrinatioSacra", "#SpiritualGrowth", "#CatholicDaily"],
      analyticalGrade: syncResult.sourceSummary
    };

    setArtPresets((prev) => [newPreset, ...prev]);
    setActiveArtId("custom-fb-sync");
    setActivePost(newPost);
    setWorkspaceMode("advanced");
    showToast("Facebook sync result loaded into active designer workspace!");
  };

  // Custom artwork user controllers
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [customImageTitle, setCustomImageTitle] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Drag & drop file handlers with FileReader
  const handleImageUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please drag & drop or select a valid image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target?.result as string;
      if (!base64Url) return;
      
      const newId = generateUniqueId("custom-user");
      const newPreset = {
        id: newId,
        title: file.name.substring(0, file.name.lastIndexOf('.')) || "Uploaded Custom Image",
        url: base64Url,
        description: `User-provided example: ${file.name}`
      };
      
      const updated = [newPreset, ...artPresets];
      setArtPresets(updated);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("catholic_custom_presets", JSON.stringify(updated));
      }
      setActiveArtId(newId);
      showToast(`Successfully set & saved custom image: "${newPreset.title}"`);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customImageUrl.trim()) return;
    
    let sanitizedUrl = customImageUrl.trim();
    if (!sanitizedUrl.startsWith("http://") && !sanitizedUrl.startsWith("https://") && !sanitizedUrl.startsWith("data:")) {
      showToast("Invalid URL. Please enter an absolute URL protocol (http/https).");
      return;
    }

    const newId = generateUniqueId("custom-url");
    const newPreset = {
      id: newId,
      title: customImageTitle.trim() || `Linked Image (${new URL(sanitizedUrl).hostname || "Web"})`,
      url: sanitizedUrl,
      description: "Custom linked example from verified web address."
    };
    
    const updated = [newPreset, ...artPresets];
    setArtPresets(updated);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("catholic_custom_presets", JSON.stringify(updated));
    }
    setActiveArtId(newId);
    setCustomImageUrl("");
    setCustomImageTitle("");
    showToast(`Successfully linked custom URL: "${newPreset.title}"`);
  };

  const handleResetPresets = () => {
    if (confirm("Reset current art registry to default? This deletes all your custom uploaded and linked examples.")) {
      setArtPresets(sacredPresets);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("catholic_custom_presets");
      }
      setActiveArtId("cor-jesu-engraving");
      showToast("Sacred Art presets reset to default selection.");
    }
  };

  // Functional/interactive sliders to style the preview graphic card
  const [vignetteOpacity, setVignetteOpacity] = useState<number>(0.75);
  const [overlayAlpha, setOverlayAlpha] = useState<number>(0.45);
  const [quoteFontSize, setQuoteFontSize] = useState<number>(18);
  const [showGraphicText, setShowGraphicText] = useState<boolean>(true);
  
  // Toggles between Graphic Canvas and Simulated Facebook Feed Frame
  const [previewStyle, setPreviewStyle] = useState<"canvas" | "facebook">("canvas");

  // Artwork customizer tab selector
  const [artTab, setArtTab] = useState<"preset" | "custom">("preset");

  // Flow State triggers
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchPhase, setSearchPhase] = useState<string>("");
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  
  // Custom theme directive text input for guided Gemini Finder
  const [guidedInput, setGuidedInput] = useState<string>("");
  const [aiError, setAiError] = useState<string | null>(null);

  // Success messaging
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to local storage
  const persistPostedIds = (updated: string[]) => {
    setPostedIds(updated);
    localStorage.setItem("catholic_posted_ids", JSON.stringify(updated));
  };

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Find unposted helper
  const getUnpostedItems = () => {
    return postQueue.filter(p => !postedIds.includes(p.id));
  };

  // CORE GOAL: "I want click run will auto find me a post instead of too much work"
  const handleRunFinder = () => {
    setIsSearching(true);
    setAiError(null);
    
    // Aesthetic simulated mechanical phases
    const phases = [
      "Consulting traditional codex archives...",
      "Excluding already published social articles...",
      "Synchronizing scholastic footnotes & citations...",
      "Calibrating high-end Marian vector overlays...",
      "Post discovered successfully!"
    ];

    let currentPhaseIdx = 0;
    setSearchPhase(phases[0]);

    const interval = setInterval(() => {
      currentPhaseIdx++;
      if (currentPhaseIdx < phases.length) {
        setSearchPhase(phases[currentPhaseIdx]);
      } else {
        clearInterval(interval);
        finalizeSearch();
      }
    }, 450);

    const finalizeSearch = () => {
      // Find candidate
      const potential = getUnpostedItems();
      
      if (potential.length === 0) {
        // If queue is completely dry, notify they can Reset the queue or use dynamic generator
        setActivePost(null);
        setAiError("All pre-curated theological posts have been set to 'Published'. Reset the publication tracker at the bottom of the screen, or enter a custom topic below to command the AI Auto-Finder.");
      } else {
        // Exclude currently active post if there are other candidates to ensure a new selection on click
        const alternatives = activePost 
          ? potential.filter(p => p.id !== activePost.id)
          : potential;
        
        const selectionPool = alternatives.length > 0 ? alternatives : potential;
        const randomIndex = Math.floor(Math.random() * selectionPool.length);
        const selected = selectionPool[randomIndex];
        
        setActivePost(selected);
        setActiveArtId(selected.imagePresetId);
        showToast(`Discovered post: "${selected.title.substring(0, 30)}..."`);
      }
      setIsSearching(false);
      setSearchPhase("");
    };
  };

  // Dynamic Scholastic Gemini Auto-Generator for Guided entries
  const handleInstructAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guidedInput.trim()) return;

    setIsAiGenerating(true);
    setAiError(null);
    showToast(`Instructing Gemini AI to find and draft: "${guidedInput}"`);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleTitle: guidedInput,
          articleContent: `Draft a scholarly traditional Catholic social post. Subject: ${guidedInput}. Incorporate high theological themes, academic vocabulary, and historical sobriety.`,
          promptType: "scholastic_social_teaser"
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Upstream AI compiler was unavailable.");
      }

      if (result.data) {
        // Pick a random artwork preset that hasn't been heavily used or just random [0-14]
        const randomArt = artPresets[Math.floor(Math.random() * artPresets.length)].id;
        
        // Dynamically build a ScholarlyPost
        const newlyCompiledPost: ScholarlyPost = {
          id: `dynamic-${Date.now()}`,
          title: `Archival Tract: ${guidedInput.toUpperCase()}`,
          subtitle: `Scholastic Exposition on ${guidedInput}`,
          category: "Dynamic Exposition",
          author: "Gemini Theological Assistant",
          publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          readTime: `${Math.floor(Math.random() * 6) + 6} min read`,
          imagePresetId: randomArt,
          teaserCopy: result.data.teaserCopy || "Failed online copy compile. Please check connectivity.",
          quote: result.data.canvaQuotes?.[0] || `The mystery of ${guidedInput} remains rooted in traditional revelation.`,
          indexingTags: result.data.indexingTags || ["#Traditional", `#${guidedInput.replace(/\s+/g, "")}`],
          analyticalGrade: result.data.analyticalGrade || "Advanced Traditional Study"
        };

        // Prepend to master queue
        setPostQueue(prev => [newlyCompiledPost, ...prev]);
        setActivePost(newlyCompiledPost);
        setActiveArtId(newlyCompiledPost.imagePresetId);
        setGuidedInput("");
        showToast("Gemini dynamic tract integrated successfully!");
      }
    } catch (err: any) {
      console.warn("Gemini Engine is offline or on high demand fallbacks.", err.message);
      
      // Highly functional custom fallbacks based on input keywords
      const inputLower = guidedInput.toLowerCase();
      let fallbackQuote = `\"No custom doctrine can replace the traditional Deposit of Faith preserved across the ages.\"`;
      let fallbackTeaser = `How does traditional scholasticism resolve the question of ${guidedInput}? Dive deep into canonical principles and the writings of historical Doctors of the Church in our latest digital repository monograph. Perfect for scholastic study. Link below.`;
      let fallbackTags = ["#Tradition", `#${guidedInput.replace(/\s+/g, "")}`, "#Scholasticism"];

      if (inputLower.includes("marian") || inputLower.includes("mary") || inputLower.includes("fatima") || inputLower.includes("lourdes")) {
        fallbackQuote = `\"To Jesus through Mary—Monstra te esse Matrem.\"`;
        fallbackTeaser = `The Mother of God has consistently intervened in times of ecclesiastical peril. Explore the historical and dogmatic parameters of Marian Apparitions, and see how traditional shrines preserve true devotion against modern decay. Read the full mariological tract inside our archives.`;
        fallbackTags = ["#OurLady", "#MarianDevotion", "#Fatima", "#ApostolicFidelity"];
      }

      const backupPost: ScholarlyPost = {
        id: `offline-${Date.now()}`,
        title: `Dynamic Exposition: ${guidedInput}`,
        subtitle: `Refining traditionalist insights on the topic of ${guidedInput}`,
        category: "Offline Exposition Backup",
        author: "Traditionalist Local Compiler",
        publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: "8 min read",
        imagePresetId: artPresets[Math.floor(Math.random() * artPresets.length)].id,
        teaserCopy: fallbackTeaser,
        quote: fallbackQuote,
        indexingTags: fallbackTags,
        analyticalGrade: "Scholastic / Lay Catechetical Review"
      };

      setPostQueue(prev => [backupPost, ...prev]);
      setActivePost(backupPost);
      setActiveArtId(backupPost.imagePresetId);
      setGuidedInput("");
      showToast("Local theological engine compiled backup successfully.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  // URL-to-Post automatic crawler and composer
  const handleGenerateFromUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceUrl.trim()) return;

    setIsUrlGenerating(true);
    setAiError(null);
    showToast(`Scouring remote bibliography: "${referenceUrl.substring(0, 32)}..."`);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: referenceUrl.trim(),
          promptType: "scholastic_social_teaser"
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "The URL parser returned a compilation mismatch.");
      }

      if (result.data) {
        const targetArt = "batoni-sacred-heart";
        
        const newlyCompiledPost: ScholarlyPost = {
          id: `url-import-${Date.now()}`,
          title: result.data.teaserCopy.split(".")[0]?.replace(/["“]/g, "") || "Imported Scholastic Article Draft",
          subtitle: `Scholastic bibliography study referenced from ${new URL(referenceUrl.trim()).hostname || "Exile Archives"}`,
          category: "External Reference Draft",
          author: "Scholastic Scraper & Gemini Core",
          publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          readTime: `${Math.floor(Math.random() * 5) + 7} min read`,
          imagePresetId: targetArt,
          teaserCopy: result.data.teaserCopy || "Teaser text compiled unsuccessfully.",
          quote: result.data.canvaQuotes?.[0] || "Salus animarum suprema lex.",
          indexingTags: result.data.indexingTags || ["#TraditionalCatholicism", "#TraditionalistStudy"],
          analyticalGrade: result.data.analyticalGrade || "Advanced Academic Review"
        };

        setPostQueue(prev => [newlyCompiledPost, ...prev]);
        setActivePost(newlyCompiledPost);
        setActiveArtId(targetArt);
        setReferenceUrl("");
        showToast("Successfully composed beautiful post from target reference URL!");
      }
    } catch (err: any) {
      console.error("Scraper draft failed:", err);
      
      const parsedUrl = referenceUrl.trim();
      let domain = "external-source";
      try { domain = new URL(parsedUrl).hostname; } catch(_) {}

      const backupPost: ScholarlyPost = {
        id: `url-offline-${Date.now()}`,
        title: `Liturgics & Fidelity: Academic Tract on ${domain.toUpperCase()}`,
        subtitle: `Treatise evaluating modern theological commentary under classical frameworks`,
        category: "URL Reference Tract",
        author: "Traditionalist Local Compiler",
        publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: "8 min read",
        imagePresetId: "batoni-sacred-heart",
        teaserCopy: `How do traditional canonical guidelines apply to the latest commentary published on ${domain}? Peer into our academic analysis covering ecclesial historical landmarks, the uncompromised preservation of liturgical form, and the scholastic standard. Review the full text in our archival records.`,
        quote: "Salus animarum suprema lex—the salvation of souls remains the absolute, uncompromised supreme law of the Church.",
        indexingTags: ["#EcclesialFidelity", `#${domain.replace(/\./g, "")}`, "#Tradition", "#Liturgics"],
        analyticalGrade: "Scholastic Treatise / Advanced Laymen"
      };

      setPostQueue(prev => [backupPost, ...prev]);
      setActivePost(backupPost);
      setActiveArtId("batoni-sacred-heart");
      setReferenceUrl("");
      showToast("Offline reference compiled for the target URL.");
    } finally {
      setIsUrlGenerating(false);
    }
  };

  // Publication Step: "I don't want old stuff once been posted"
  const handleMarkAsPosted = () => {
    if (!activePost) return;
    
    const updated = [...postedIds, activePost.id];
    persistPostedIds(updated);
    showToast(`Successfully published & archived: "${activePost.title.substring(0, 30)}..."`);
    
    // Clear active post workspace
    setActivePost(null);
  };

  // Reset the published history ledger/memory
  const handleResetHistory = () => {
    if (confirm("Reset publication ledger? This restores all 10 curated posts into the active Auto-Finder pipeline.")) {
      persistPostedIds([]);
      setActivePost(null);
      showToast("Publication ledger reset successfully.");
    }
  };

  // Help calculate UI metrics
  const freshCount = getUnpostedItems().length;
  const postedCount = postedIds.length;
  const activeArt = artPresets.find(p => p.id === activeArtId) || artPresets[0];

  // Quick edit callbacks
  const handleUpdateTeaserText = (val: string) => {
    if (!activePost) return;
    setActivePost({
      ...activePost,
      teaserCopy: val
    });
  };

  const handleUpdateQuoteText = (val: string) => {
    if (!activePost) return;
    setActivePost({
      ...activePost,
      quote: val
    });
  };

  const handleUpdateTitleText = (val: string) => {
    if (!activePost) return;
    setActivePost({
      ...activePost,
      title: val
    });
  };

  const currentThemeHex = {
    parchment: "#FFFDF9",
    deepGilt: "#C29C53",
    claretRed: "#800020",
    charcoal: "#1C1B19"
  };

  const renderFacebookSyncCard = () => {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-[4px] h-[4px] sm:w-[4px] sm:h-full bg-[#3b5998]" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
              <Facebook className="w-4 h-4 text-[#3b5998]" />
              Facebook Daily Auto-Copier & Sync
            </h2>
            <p className="text-xs text-gray-500 font-body">Automatically check, sync daily posts, and generate style-matching graphics from sample/001.</p>
          </div>
        </div>

        {/* URL Configurations */}
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="fb-url-user" className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                Your Facebook Page
              </label>
              <input 
                id="fb-url-user"
                type="url"
                value={facebookUrl1}
                onChange={(e) => setFacebookUrl1(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:bg-white transition-colors"
                placeholder="User Facebook URL"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="fb-url-friend" className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                Friend's Facebook Page
              </label>
              <input 
                id="fb-url-friend"
                type="url"
                value={facebookUrl2}
                onChange={(e) => setFacebookUrl2(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:bg-white transition-colors"
                placeholder="Friend Facebook URL"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="btn-run-fb-sync"
              type="button"
              onClick={handleRunFacebookSync}
              disabled={isSyncing}
              className="flex-grow bg-[#3b5998] hover:bg-[#2d4373] text-white px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all transform active:scale-97 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RUN FACEBOOK SYNC</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Logs (Only during syncing) */}
        {isSyncing && syncLogs.length > 0 && (
          <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 space-y-1.5 max-h-[160px] overflow-y-auto font-mono text-[10px] text-green-400 leading-normal">
            {syncLogs.map((log, index) => (
              <div key={index} className="flex gap-1.5 items-start">
                <span className="text-gray-500 font-bold">[{index + 1}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sync Output Panel */}
        {syncResult && (
          <div className="bg-[#FAF9F5] p-4 rounded-xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-250 pb-2">
              <div className="space-y-0.5">
                <h4 className="text-xs font-mono font-bold uppercase text-[#800020]">Sync Completed Successfully</h4>
                <p className="text-[10px] text-gray-500 font-body">Source: {syncResult.sourceSummary}</p>
              </div>
              <span className="text-[9px] font-mono bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-200 font-bold uppercase">
                {syncResult.sourceFound ? "Real Post Found" : "Liturgical Fallback"}
              </span>
            </div>

            {/* Title & Caption */}
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold">Title/Subject</span>
                <div className="text-xs font-editorial-heading font-bold text-gray-900 bg-white border border-gray-150 p-2.5 rounded-lg">
                  {syncResult.title}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold">Facebook Post Caption (Copy/Paste)</span>
                <textarea
                  rows={4}
                  readOnly
                  value={syncResult.caption}
                  className="w-full text-xs font-body leading-relaxed text-gray-800 bg-white border border-gray-150 p-2.5 rounded-lg focus:outline-none"
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(syncResult.caption);
                      showToast("Post caption copied to clipboard!");
                    }}
                    className="text-[10px] font-mono font-bold text-[#800020] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy Caption Text
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Photo Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-250/50">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold">New Styled Photo</span>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200 bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={syncResult.imageUrl} alt="Generated post photo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <a 
                    href={syncResult.imageUrl}
                    download="facebook-post-photo.png"
                    className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white p-1.5 rounded-md text-[9px] font-mono flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3 h-3" /> Save Photo
                  </a>
                </div>
              </div>

              <div className="space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Style Reference Used</span>
                  <span className="text-[10px] font-serif text-gray-600 block italic">From folder sample/001:</span>
                  <span className="text-[10px] font-mono font-bold text-gray-900 bg-white border border-gray-150 px-2 py-1 rounded-md inline-block">
                    {syncResult.referenceImageName}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={handleLoadSyncToWorkspace}
                  className="w-full bg-[#1C1B19] text-[#FAF9F5] hover:bg-[#C29C53] hover:text-[#1C1B19] py-2.5 rounded-lg text-xs font-mono font-bold transition-all uppercase cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Load to Designer Workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2D2926] font-sans flex flex-col antialiased pb-20 selection:bg-[#C29C53]/30 selection:text-[#800020]">
      
      {/* 1. Academic Latinate Branding Header */}
      <header className="border-b border-[#FAF9F5]/20 bg-[#1C1B19] py-8 text-center text-white px-4 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#C29C53] to-transparent opacity-80" />
        <div className="space-y-2 max-w-4xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#C29C53] uppercase font-bold">
            Commission for the Preservation of the Magisterial Deposit
          </p>
          <h1 className="text-2xl sm:text-3xl font-editorial-heading px-2 text-[#FAF9F5] font-medium tracking-tight">
            Traditional Catholic Publisher & social &ldquo;Bridge&rdquo; Desk
          </h1>
          <p className="text-xs text-[#FAF9F5]/70 max-w-2xl mx-auto font-body italic leading-relaxed">
            Select a theme, click Run to auto-discover an unposted masterwork, refine the theological teaser copy, and export dynamic visual and literary resources seamlessly.
          </p>
        </div>
      </header>

      {/* Main Single-Screen Workspace */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-8 space-y-8 flex-grow">
        
        {/* Dynamic floating toast message */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 bg-[#1C1B19] text-white border border-[#C29C53] shadow-xl rounded-lg p-4 max-w-sm flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#E2725B] shrink-0 animate-pulse" />
              <div className="text-xs font-serif font-semibold tracking-wide leading-relaxed">{toastMessage}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Mode Selector Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#1C1B19]/5 p-1 rounded-xl border border-gray-200 inline-flex shadow-3xs">
            <button
              id="tab-mode-simple"
              type="button"
              onClick={() => setWorkspaceMode("simple")}
              className={`px-5 py-2.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                workspaceMode === "simple"
                  ? "bg-[#1C1B19] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-950"
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              One-Click Daily Auto-Copier
            </button>
            <button
              id="tab-mode-advanced"
              type="button"
              onClick={() => setWorkspaceMode("advanced")}
              className={`px-5 py-2.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                workspaceMode === "advanced"
                  ? "bg-[#1C1B19] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-955"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Advanced Design Studio
            </button>
          </div>
        </div>

        {workspaceMode === "simple" ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {renderFacebookSyncCard()}
          </div>
        ) : (
          <>
            {/* 2. Pipeline metrics layout at a glance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-150 rounded-xl shadow-2xs flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] flex items-center justify-center text-[#800520] shrink-0 border border-gray-100">
              <Compass className="w-5 h-5 text-[#800020]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Unpublished Registry</p>
              <h3 className="text-xl font-editorial-heading font-bold text-gray-950">{freshCount} Tracts Ready</h3>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-150 rounded-xl shadow-2xs flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FFFBF0] flex items-center justify-center shrink-0 border border-[#FAF6EE]">
              <BookOpenCheck className="w-5 h-5 text-[#C29C53]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Archived History Ledger</p>
              <h3 className="text-xl font-editorial-heading font-bold text-gray-950">{postedCount} Posted Items</h3>
            </div>
          </div>

          <div className="col-span-2 bg-white p-4 border border-gray-150 rounded-xl shadow-2xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-[#800020] uppercase tracking-wider font-bold">● Active Scraper Engine</p>
              <p className="text-xs text-gray-600 font-body leading-tight">Pre-configured with public domain masterpieces and 1917 canon code commentary.</p>
            </div>
            <button 
              id="btn-run-auto-finder-top"
              type="button"
              onClick={handleRunFinder}
              disabled={isSearching}
              className="bg-[#800020] hover:bg-[#990026] text-white text-xs font-mono font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-transform active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#C29C53]" />}
              Run Finder
            </button>
          </div>
        </div>

        {/* 3. Central Working Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COMMAND CONSOLE (7 Cols) */}
          <section className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[4px] h-[4px] sm:w-[4px] sm:h-full bg-[#800020]" />
              
              <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-0.5">
                  <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
                    <Link className="w-4 h-4 text-[#800020]" />
                    Draft Post from Reference URL
                  </h2>
                  <p className="text-xs text-gray-500 font-body">Input any article address to scrapes paragraphs, extract terms, and compile a teaser card.</p>
                </div>
                <span className="text-[10px] font-mono bg-[#FAF6EE] text-[#C29C53] px-2.5 py-1 rounded-full border border-[#FAF6EE] font-bold uppercase shrink-0">
                  Real Integration
                </span>
              </div>

              {/* URL Import Input */}
              <form onSubmit={handleGenerateFromUrl} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input 
                    id="imported-url-reference"
                    type="url" 
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    placeholder="e.g. https://en.wikipedia.org/wiki/Sacred_Heart"
                    className="flex-grow bg-stone-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:bg-white transition-colors"
                    required
                  />
                  <button
                    id="btn-import-scraper"
                    type="submit"
                    disabled={isUrlGenerating || !referenceUrl.trim()}
                    className="bg-[#800020] hover:bg-[#990026] text-white px-5 py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-45 cursor-pointer whitespace-nowrap"
                  >
                    {isUrlGenerating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#C29C53]" />
                        <span>Draft Post</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* General Social Teaser Auto-Finder & Manual search alternative */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[4px] h-[4px] sm:w-[4px] sm:h-full bg-[#C29C53]" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#800020]" />
                    Auto-Finder & Theological Registry
                  </h2>
                  <p className="text-xs text-gray-500 font-body">Instantly pull high-integrity writings direct from preset archives or guided terms.</p>
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#FAF6EE] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center md:text-left">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#800020]">Click to Auto Cycle</h4>
                  <p className="text-[11px] text-gray-500 max-w-sm leading-normal">
                    Instantly cycles and auto-selects pre-curated high-academic theological monographs.
                  </p>
                </div>
                
                <button
                  id="btn-trigger-run-finder"
                  type="button"
                  onClick={handleRunFinder}
                  disabled={isSearching}
                  className="w-full md:w-auto bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all transform active:scale-97 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{searchPhase}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C29C53]" />
                      <span>RUN AUTO-FINDER</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guided search topic form */}
              <form onSubmit={handleInstructAI} className="space-y-2 pt-1">
                <label htmlFor="custom-topic-input" className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
                  Or Guide manually via Custom Topic
                </label>
                <div className="flex gap-2">
                  <input 
                    id="custom-topic-input"
                    type="text" 
                    value={guidedInput}
                    onChange={(e) => setGuidedInput(e.target.value)}
                    placeholder="e.g. Saint Gertrude, Tridentine Liturgy, Saint Robert Bellarmine..."
                    className="flex-grow bg-[#FAF9F5] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:bg-white transition-colors text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    id="btn-ai-generate-topic"
                    type="submit"
                    disabled={isAiGenerating || !guidedInput.trim()}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-900 px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer border border-stone-200"
                  >
                    {isAiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5 text-stone-600" />}
                    <span>Query</span>
                  </button>
                </div>
              </form>

              {aiError && (
                <div id="ai-error-indicator" className="p-3 bg-red-50 border border-red-150 rounded-xl text-[10px] text-red-800 font-serif leading-relaxed italic">
                  {aiError}
                </div>
              )}
            </div>

            {renderFacebookSyncCard()}


            {/* B. Workspace Post Edit Details Container */}
            <AnimatePresence mode="wait">
              {activePost ? (
                <motion.div 
                  key={activePost.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5"
                >
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="space-y-1">
                      <span className="bg-[#FAF6EE] text-[#C29C53] border border-[#C29C53]/20 px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded-md font-bold">
                        {activePost.category}
                      </span>
                      <h3 className="font-editorial-heading text-lg font-bold text-gray-900 mt-1">
                        Active Workspace Draft
                      </h3>
                    </div>

                    <button 
                      id="btn-skip-active-post text-gray-400"
                      type="button"
                      onClick={() => {
                        setActivePost(null);
                        showToast("Workspace draft discarded.");
                      }}
                      className="text-xs font-mono text-gray-400 hover:text-red-700 hover:underline cursor-pointer transition-colors"
                    >
                      Dismiss Draft
                    </button>
                  </div>

                  {/* Quick metadata fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="article-title-field" className="text-[10px] font-mono text-gray-400 uppercase">Article Reference Title</label>
                      <input 
                        id="article-title-field"
                        type="text" 
                        value={activePost.title}
                        onChange={(e) => handleUpdateTitleText(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C29C53] focus:bg-white text-gray-900 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Liturgical Authority & Source</label>
                      <div className="text-xs bg-gray-50 px-3 py-2 border border-gray-150 rounded-lg text-gray-700 font-serif italic">
                        {activePost.author} • {activePost.analyticalGrade}
                      </div>
                    </div>
                  </div>

                  {/* 1. Teaser copy editor */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="teaser-caption-input" className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider">
                        Social Teaser Copy / Post Caption
                      </label>
                      <span className="text-[9px] font-mono text-gray-400">
                        {activePost.teaserCopy.length} words typical
                      </span>
                    </div>
                    <textarea 
                      id="teaser-caption-input"
                      rows={5}
                      value={activePost.teaserCopy}
                      onChange={(e) => handleUpdateTeaserText(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs font-body focus:ring-1 focus:ring-[#C29C53] focus:bg-white leading-relaxed text-gray-900"
                    />
                  </div>

                  {/* 2. Canva quote editor */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="quote-graphic-input" className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider">
                        Centered Graphic Quote Overlay Text
                      </label>
                      <span className="text-[9px] font-serif text-[#C29C53] italic">
                        Updates the canvas instantly
                      </span>
                    </div>
                    <input 
                      id="quote-graphic-input"
                      type="text" 
                      value={activePost.quote}
                      onChange={(e) => handleUpdateQuoteText(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-serif italic text-gray-900 focus:ring-1 focus:ring-[#C29C53] focus:bg-white"
                    />
                  </div>

                  {/* 3. Sliding Art Customizers right inside workspace */}
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-gray-150 space-y-3">
                    <div className="flex items-center gap-1 border-b border-gray-250 pb-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#C29C53]" />
                      <span className="text-[11px] font-mono font-bold text-gray-700 uppercase">Graphic Overlay Parameters</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-500">Vignette Depth</span>
                          <span className="text-gray-700 font-bold">{Math.round(vignetteOpacity * 100)}%</span>
                        </div>
                        <input
                          id="slider-vignette"
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={vignetteOpacity}
                          onChange={(e) => setVignetteOpacity(parseFloat(e.target.value))}
                          className="w-full accent-[#800020]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-500">Tint Darkness</span>
                          <span className="text-gray-700 font-bold">{Math.round(overlayAlpha * 100)}%</span>
                        </div>
                        <input
                          id="slider-tint"
                          type="range"
                          min="0"
                          max="0.9"
                          step="0.05"
                          value={overlayAlpha}
                          onChange={(e) => setOverlayAlpha(parseFloat(e.target.value))}
                          className="w-full accent-[#800020]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-500">Fonts Size</span>
                          <span className="text-gray-700 font-bold">{quoteFontSize}px</span>
                        </div>
                        <input
                          id="slider-fontsize"
                          type="range"
                          min="12"
                          max="26"
                          step="1"
                          value={quoteFontSize}
                          onChange={(e) => setQuoteFontSize(parseInt(e.target.value))}
                          className="w-full accent-[#800020]"
                        />
                      </div>
                    </div>

                    {/* Corner Frame & Celestial Rays Toggles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 pb-1 text-[10px] font-mono border-t border-gray-150/55">
                      <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white rounded transition-colors text-gray-700">
                        <input
                          type="checkbox"
                          checked={enableFloralBorder}
                          onChange={(e) => setEnableFloralBorder(e.target.checked)}
                          className="rounded text-[#800020] focus:ring-[#800020] accent-[#800020] cursor-pointer"
                        />
                        <span className="font-bold">🌹 Rosa Mystica Roses</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white rounded transition-colors text-gray-700">
                        <input
                          type="checkbox"
                          checked={enableGoldenRays}
                          onChange={(e) => setEnableGoldenRays(e.target.checked)}
                          className="rounded text-[#800020] focus:ring-[#800020] accent-[#800020] cursor-pointer"
                        />
                        <span className="font-bold">☀️ Celestial Light Rays</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white rounded transition-colors text-gray-700">
                        <input
                          type="checkbox"
                          checked={enableGiltBorder}
                          onChange={(e) => setEnableGiltBorder(e.target.checked)}
                          className="rounded text-[#800020] focus:ring-[#800020] accent-[#800020] cursor-pointer"
                        />
                        <span className="font-bold">🔱 Gilt Gold Border</span>
                      </label>
                    </div>

                    {enableGoldenRays && (
                      <div className="space-y-1 pt-1.5 text-[10px] font-mono border-t border-gray-150/40">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Divine Beams Ray Intensity</span>
                          <span className="text-gray-700 font-bold">{Math.round(rayIntensity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={rayIntensity}
                          onChange={(e) => setRayIntensity(parseFloat(e.target.value))}
                          className="w-full accent-[#800020]"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-gray-250/50 mt-1">
                      <span className="text-[10px] font-body text-gray-500">Display Quote Text on Canvas Graphic:</span>
                      <button 
                        id="btn-toggle-graphic-text"
                        type="button"
                        onClick={() => setShowGraphicText(!showGraphicText)}
                        className={`text-[10px] font-mono px-3 py-1 rounded-md border transition-all cursor-pointer ${
                          showGraphicText 
                            ? "bg-[#800020] text-[#FAF9F5] border-[#800020]" 
                            : "bg-white text-gray-600 border-gray-200"
                        }`}
                      >
                        {showGraphicText ? "● Rich Quotes Visible" : "○ Hiding Quotes Text"}
                      </button>
                    </div>
                  </div>

                  {/* 4. Indexing tags visual pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Theological Metadata Index Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePost.indexingTags.map((tag, i) => (
                        <div key={i} className="bg-gray-100 hover:bg-[#FAF6EE] text-gray-700 hover:text-[#C29C53] border border-gray-150 transition-colors px-2.5 py-1 text-[11px] font-mono rounded-lg flex items-center gap-1.5">
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. Fully custom stateful artwork selectors and uploads */}
                  <div className="space-y-3.5 border-t border-gray-100 pt-4">
                    
                    {/* Submenu Header and Tab selection */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#1C1B19] uppercase font-extrabold tracking-wider">
                        Configure Sacred Artwork Preset
                      </span>
                      
                      <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-150 inline-flex">
                        <button
                          type="button"
                          onClick={() => setArtTab("preset")}
                          className={`px-2 py-1 text-[9px] font-mono font-bold rounded-md transition-all ${
                            artTab === "preset"
                              ? "bg-[#1C1B19] text-white shadow-3xs"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          Presets ({artPresets.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setArtTab("custom")}
                          className={`px-2 py-1 text-[9px] font-mono font-bold rounded-md transition-all ${
                            artTab === "custom"
                              ? "bg-[#1C1B19] text-white shadow-3xs"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          + Upload Examples
                        </button>
                      </div>
                    </div>

                    {artTab === "preset" ? (
                      <div className="space-y-2">
                        {/* Artwork Grid list */}
                        <div className="grid grid-cols-5 gap-1.5 p-1 bg-gray-50 border border-gray-150 rounded-lg max-h-[175px] overflow-y-auto">
                          {artPresets.map((preset) => {
                            const isCurrent = activeArtId === preset.id;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => setActiveArtId(preset.id)}
                                className={`relative aspect-square rounded-md overflow-hidden transition-all group shrink-0 border ${
                                  isCurrent 
                                    ? "border-[#C29C53] ring-2 ring-[#C29C53]/35 scale-93 shadow-sm z-10" 
                                    : "border-transparent opacity-65 hover:opacity-100"
                                }`}
                                title={`${preset.title} - ${preset.description}`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={preset.url} 
                                  alt={preset.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1C1B19]/10 transition-colors" />
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between items-center text-[9.5px]">
                          <span className="text-gray-400 font-serif italic max-w-[70%] truncate block">
                            Active: <strong className="text-gray-700">{activeArt.title}</strong> — {activeArt.description}
                          </span>
                          
                          {artPresets.length > 15 && (
                            <button
                              type="button"
                              onClick={handleResetPresets}
                              className="text-[#800020] hover:underline font-mono font-bold text-[9px] uppercase hover:opacity-80 flex items-center gap-1 shrink-0"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              Restore Defaults
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-3.5 shadow-2xs">
                        
                        {/* Drag and Drop Box */}
                        <div 
                          className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all duration-200 relative ${
                            isDragging 
                              ? "border-[#C29C53] bg-[#C29C53]/5" 
                              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          onClick={() => document.getElementById('custom-artwork-picker')?.click()}
                        >
                          <input 
                            id="custom-artwork-picker"
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                          />
                          <Upload className="w-5 h-5 text-[#C29C53] mx-auto mb-1.5" />
                          <p className="text-[11px] text-gray-700 font-bold font-sans">
                            Drag & Drop Custom Example
                          </p>
                          <p className="text-[9.5px] text-gray-400 mt-1">
                            or click to browse local files
                          </p>
                        </div>

                        {/* Direct URL Address Linker */}
                        <form onSubmit={handleAddCustomUrl} className="pt-3 border-t border-gray-150 space-y-2">
                          <div className="flex gap-1.5 items-center">
                            <Link className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="text-[9.5px] font-mono text-gray-500 uppercase font-bold">
                              Or Link Direct Image Address
                            </span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <input 
                              type="text" 
                              placeholder="https://example.com/any-catholic-artwork.jpg" 
                              value={customImageUrl} 
                              onChange={(e) => setCustomImageUrl(e.target.value)}
                              className="w-full text-[11px] bg-white text-gray-800 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C29C53] placeholder-gray-300 shadow-3xs font-mono"
                            />
                            <input 
                              type="text" 
                              placeholder="Artwork Display Title (e.g., Blessed Mother)" 
                              value={customImageTitle} 
                              onChange={(e) => setCustomImageTitle(e.target.value)}
                              className="w-full text-[11px] bg-white text-gray-800 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C29C53] placeholder-gray-300 shadow-3xs font-serif"
                            />
                          </div>

                          <button 
                            type="submit" 
                            disabled={!customImageUrl.trim()}
                            className="w-full bg-[#1C1B19] text-[#FAF9F5] hover:bg-[#C29C53] hover:text-[#1C1B19] py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all uppercase disabled:opacity-40 cursor-pointer shadow-3xs flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3 h-3" />
                            Load & Append External Artwork URL
                          </button>
                        </form>
                      </div>
                    )}

                  </div>

                </motion.div>
              ) : (
                <div className="bg-[#FAF9F5] rounded-2xl border-2 border-dashed border-gray-250 py-16 text-center space-y-4 px-6">
                  <div className="w-12 h-12 rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#C29C53] mx-auto border border-[#FAF6EE]/50">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-editorial-heading text-lg font-bold text-gray-800">
                      Auto-Finder Workplace Open
                    </h3>
                    <p className="text-xs text-gray-500 leading-normal max-w-sm mx-auto font-body">
                      No active tract loaded. Click <strong className="text-[#800020]">&ldquo;Run Auto-Finder&rdquo;</strong> to scanning-exclude former published items and retrieve the next fresh scholastic post instantly!
                    </p>
                  </div>
                  <button 
                    id="btn-run-auto-finder-empty"
                    type="button"
                    onClick={handleRunFinder}
                    disabled={isSearching}
                    className="bg-[#1C1B19] text-[#FAF9F5] hover:bg-[#C29C53] hover:text-[#1C1B19] px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all transform active:scale-95 flex items-center justify-center mx-auto gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    SCAN & FIND NEXT POST
                  </button>
                </div>
              )}
            </AnimatePresence>

          </section>

          {/* RIGHT PREVIEW & SIMULATOR CONSOLE (5 Cols) */}
          <section className="lg:col-span-5 space-y-6">
            
            {/* Controller tab toggler */}
            <div className="bg-white p-1 rounded-xl border border-gray-150 flex text-xs font-mono text-gray-500 shadow-3xs">
              <button 
                id="tab-select-canvas"
                type="button"
                onClick={() => setPreviewStyle("canvas")}
                className={`flex-1 py-2 text-center rounded-lg transition-all. cursor-pointer font-bold ${
                  previewStyle === "canvas" ? "bg-[#1C1B19] text-[#FAF9F5]" : "hover:text-gray-850"
                }`}
              >
                Canvas Graphic Card
              </button>
              <button 
                id="tab-select-facebook"
                type="button"
                onClick={() => setPreviewStyle("facebook")}
                className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer font-bold ${
                  previewStyle === "facebook" ? "bg-[#1C1B19] text-[#FAF9F5]" : "hover:text-gray-850"
                }`}
              >
                Facebook Feed Mockup
              </button>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C29C53]" />
                  <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase font-bold">
                    Rendering Plane: {previewStyle.toUpperCase()}
                  </span>
                </div>
                {activePost && (
                  <span className="text-[8px] font-mono uppercase bg-[#800020]/10 text-[#800020] px-2 py-0.5 rounded-sm font-extrabold animate-pulse">
                    Draft Active
                  </span>
                )}
              </div>

              {/* CARD SIMULATOR COMPONENT */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-900 border border-gray-300">
                
                {/* 1. Backdrop Preset Painting */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={activeArt.url} 
                  alt={activeArt.title} 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />

                {/* 2. Custom Vignette Shadow Mask */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-2" 
                  style={{
                    opacity: vignetteOpacity,
                    background: "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(15,10,5,0.95) 100%)"
                  }}
                />

                {/* 3. Darkened color tint layer */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-colors duration-200 z-3"
                  style={{
                    backgroundColor: `rgba(28, 27, 25, ${overlayAlpha})`
                  }}
                />

                {/* 3.1 Gilt Gold Border (If active) */}
                {enableGiltBorder && (
                  <div className="absolute inset-3 border-2 border-[#C29C53]/80 rounded-xs pointer-events-none z-10 m-3">
                    <div className="absolute inset-0.5 border border-[#C29C53]/45" />
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C29C53]" />
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C29C53]" />
                    <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C29C53]" />
                    <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C29C53]" />
                  </div>
                )}

                {/* 3.2 Divine Light Rays Overlay (If active) */}
                {enableGoldenRays && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-4" style={{ opacity: rayIntensity }}>
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="rayGoldGradient" cx="50%" cy="15%" r="75%">
                          <stop offset="0%" stopColor="#FFE082" stopOpacity="0.85"/>
                          <stop offset="25%" stopColor="#FB8C00" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#120A00" stopOpacity="0"/>
                        </radialGradient>
                      </defs>
                      <rect width="100" height="100" fill="url(#rayGoldGradient)" />
                      {/* Radiating fine beams */}
                      <path d="M50 15 L-20 120 M50 15 L0 120 M50 15 L15 120 M50 15 L30 120 M50 15 L45 120 M50 15 L50 120 M50 15 L55 120 M50 15 L70 120 M50 15 L85 120 M50 15 L100 120 M50 15 L120 120" stroke="#FFE082" strokeWidth="0.45" opacity="0.33" strokeDasharray="2 2" />
                      <path d="M50 15 L-50 100 M50 15 L150 100" stroke="#FFB300" strokeWidth="0.6" opacity="0.2" />
                    </svg>
                  </div>
                )}

                {/* 3.3 Rosa Mystica Corner Floral Overlay (If active) */}
                {enableFloralBorder && (
                  <>
                    {/* Left corner floral grouping */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none drop-shadow-md z-10 select-none">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                          <radialGradient id="leftGradCrimson" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#D32F2F"/>
                            <stop offset="70%" stopColor="#800020"/>
                            <stop offset="100%" stopColor="#2A000A"/>
                          </radialGradient>
                          <radialGradient id="leftGradPink" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFCDD2"/>
                            <stop offset="65%" stopColor="#E2725B"/>
                            <stop offset="100%" stopColor="#800020"/>
                          </radialGradient>
                          <radialGradient id="leftGradYellow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFF59D"/>
                            <stop offset="60%" stopColor="#FBC02D"/>
                            <stop offset="100%" stopColor="#E65100"/>
                          </radialGradient>
                          <linearGradient id="leftGradLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#81C784"/>
                            <stop offset="100%" stopColor="#2E7D32"/>
                          </linearGradient>
                        </defs>
                        {/* Botanical green vines */}
                        <path d="M4 96 C 10 70, 35 60, 50 78 C 35 90, 15 98, 4 96 Z" fill="url(#leftGradLeaf)" opacity="0.9" />
                        <path d="M96 4 C 70 10, 60 35, 78 50 C 90 35, 98 15, 96 4 Z" fill="url(#leftGradLeaf)" opacity="0.75" transform="rotate(-35 50 50)" />
                        
                        {/* Blush Pink Rose Left Corner */}
                        <circle cx="32" cy="74" r="14" fill="url(#leftGradPink)" />
                        <path d="M32 64 C 28 64, 28 69, 32 69 C 36 69, 36 64, 32 64 Z" fill="#FFEAEF" />
                        <path d="M22 74 C 20 69, 24 64, 28 66" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M42 74 C 44 69, 40 64, 36 66" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M32 84 C 28 84, 26 80, 27 75" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M32 84 C 36 84, 38 80, 37 75" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                        {/* Traditional Golden Rose Left Center */}
                        <circle cx="68" cy="78" r="13" fill="url(#leftGradYellow)" />
                        <path d="M68 69 C 64 69, 64 74, 68 74 C 72 74, 72 69, 68 69 Z" fill="#FFFDE7" />
                        <path d="M57 78 C 55 73, 60 68, 63 70" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M79 78 C 81 73, 76 68, 73 70" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M68 88 C 63 88, 61 84, 62 79" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M68 88 C 73 88, 75 84, 74 79" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                        {/* Heavy Holy Crimson Rose */}
                        <circle cx="48" cy="52" r="10" fill="url(#leftGradCrimson)" />
                        <path d="M48 46 C 45 46, 45 49, 48 49 C 51 49, 51 46, 48 46 Z" fill="#FF8A80" />
                        <path d="M40 52 C 38 48, 42 44, 45 45" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M56 52 C 58 48, 54 44, 51 45" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M48 59 C 44 59, 43 56, 44 53" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M48 59 C 52 59, 53 56, 52 53" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>

                    {/* Right corner mirror grouping */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none drop-shadow-md z-10 select-none scale-x-[-1]">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Botanical green vines */}
                        <path d="M4 96 C 10 70, 35 60, 50 78 C 35 90, 15 98, 4 96 Z" fill="url(#leftGradLeaf)" opacity="0.9" />
                        <path d="M96 4 C 70 10, 60 35, 78 50 C 90 35, 98 15, 96 4 Z" fill="url(#leftGradLeaf)" opacity="0.75" transform="rotate(-35 50 50)" />
                        
                        {/* Blush Pink Rose Left Corner */}
                        <circle cx="32" cy="74" r="14" fill="url(#leftGradPink)" />
                        <path d="M32 64 C 28 64, 28 69, 32 69 C 36 69, 36 64, 32 64 Z" fill="#FFEAEF" />
                        <path d="M22 74 C 20 69, 24 64, 28 66" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M42 74 C 44 69, 40 64, 36 66" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M32 84 C 28 84, 26 80, 27 75" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M32 84 C 36 84, 38 80, 37 75" stroke="#800020" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                        {/* Traditional Golden Rose Left Center */}
                        <circle cx="68" cy="78" r="13" fill="url(#leftGradYellow)" />
                        <path d="M68 69 C 64 69, 64 74, 68 74 C 72 74, 72 69, 68 69 Z" fill="#FFFDE7" />
                        <path d="M57 78 C 55 73, 60 68, 63 70" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M79 78 C 81 73, 76 68, 73 70" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M68 88 C 63 88, 61 84, 62 79" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M68 88 C 73 88, 75 84, 74 79" stroke="#9E6D00" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                        {/* Heavy Holy Crimson Rose */}
                        <circle cx="48" cy="52" r="10" fill="url(#leftGradCrimson)" />
                        <path d="M48 46 C 45 46, 45 49, 48 49 C 51 49, 51 46, 48 46 Z" fill="#FF8A80" />
                        <path d="M40 52 C 38 48, 42 44, 45 45" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M56 52 C 58 48, 54 44, 51 45" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M48 59 C 44 59, 43 56, 44 53" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M48 59 C 52 59, 53 56, 52 53" stroke="#3A000A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>
                  </>
                )}

                {/* 4. Traditionalist Parchment Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top-aligned academic label */}
                  <div className="flex justify-between items-baseline">
                    <p className="text-[8px] font-mono uppercase text-[#C29C53] tracking-[0.2em] font-extrabold bg-[#1A1A1A]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      {activePost ? activePost.category.toUpperCase() : "THEOLOGIA VERA"}
                    </p>
                    <p className="text-[7.5px] font-mono text-[#FAF9F5]/70 text-right uppercase bg-[#1A1A1A]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      EXILE MONOGRAPH
                    </p>
                  </div>

                  {/* Centered quote overlay */}
                  <div className="my-auto text-center px-4 space-y-4">
                    {showGraphicText && activePost ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-3"
                      >
                        <p 
                          className="font-editorial-heading text-[#FAF9F5] leading-relaxed text-center italic drop-shadow-md select-all"
                          style={{ fontSize: `${quoteFontSize}px` }}
                        >
                          &ldquo;{activePost.quote}&rdquo;
                        </p>
                        
                        <div className="h-[1px] w-12 bg-[#C29C53]/60 mx-auto" />
                        
                        <p className="font-mono text-[7.5px] text-[#C29C53] tracking-widest uppercase font-extrabold drop-shadow-sm select-all">
                          — {activePost.author} —
                        </p>
                      </motion.div>
                    ) : (
                      <div className="py-8">
                        <p className="font-mono text-[9px] text-[#FAF9F5]/50 tracking-wider">
                          {!activePost ? "[Click Run Auto-Finder]" : "[Text layer disabled in sliders]"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom branding identifier */}
                  <div className="flex justify-between items-end border-t border-[#C29C53]/25 pt-2 bg-[#1C1B19]/50 backdrop-blur-xs p-2 rounded-lg">
                    <div className="text-left">
                      <p className="font-editorial-heading text-[10px] text-[#FAF9F5] font-bold leading-none select-all">
                        Peregrinatio Sacra Gratiae
                      </p>
                      <p className="font-mono text-[6px] text-gray-400 mt-0.5 uppercase tracking-wider select-all">
                        Squarespace Theological Journal Repository
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[6px] text-[#C29C53] leading-none uppercase tracking-widest font-extrabold select-all">
                        {activePost ? activePost.indexingTags?.[0] : "#LatinMass"}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Simulated Facebook wrapper over the image */}
                {previewStyle === "facebook" && (
                  <div className="absolute inset-0 bg-gray-100 flex flex-col p-4 text-gray-900 select-all overflow-y-auto">
                    
                    {/* Simulated Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-[#1C1B19] border border-[#C29C53] flex items-center justify-center text-[#C29C53] shrink-0 font-editorial-heading font-serif text-sm font-bold">
                        P
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-sans font-bold text-xs text-gray-900 hover:underline truncate">
                            Peregrinatio Sacra Gratiae
                          </span>
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0" title="Archdiocesan Verified">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1 leading-snug">
                          <Calendar className="w-2.5 h-2.5" />
                          Just now · 🌎
                        </p>
                      </div>
                    </div>

                    {/* Simulated text */}
                    <p className="text-[11px] font-sans text-gray-800 leading-relaxed bg-white p-2.5 rounded-lg border border-gray-150 shadow-3xs mb-3 font-medium whitespace-pre-wrap select-all">
                      {activePost ? activePost.teaserCopy : "No active draft. Run Finder to auto-propulate here."}
                      <span className="text-blue-600 font-serif leading-relaxed block mt-1 hover:underline select-all">
                        https://peregrinatiosacragratiae.squarespace.com/archive/{activePost?.id || "liturgy"}
                      </span>
                      <span className="text-gray-500 block mt-2 text-[10px] font-mono leading-relaxed select-all">
                        {activePost ? activePost.indexingTags.join(" ") : "#SedesVacans #LatinMass"}
                      </span>
                    </p>

                    {/* Attached Image inside feed card */}
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 mt-auto shadow-2xs group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={activeArt.url} 
                        alt="Teaser Artwork attached" 
                        className="w-full h-full object-cover transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                      <div className="absolute bottom-2 left-2 bg-black/85 text-[#C29C53] font-mono font-bold text-[7.5px] px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs select-all">
                        {activePost ? activePost.category : "SACRED LOG"}
                      </div>
                    </div>

                    {/* Simulated Action row */}
                    <div className="flex border-t border-gray-200 mt-3 pt-2 text-gray-500 text-[10px] font-sans justify-around bg-gray-50 rounded-lg py-1.5 font-semibold">
                      <span>👍 Like</span>
                      <span>💬 Comment</span>
                      <span>🔄 Share</span>
                    </div>

                  </div>
                )}

              </div>

              {/* POST ACTIONS HUB AND COPIERS */}
              <AnimatePresence mode="wait">
                {activePost ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 pt-1"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Caption copy utility */}
                      <button
                        id="btn-copy-caption-text"
                        type="button"
                        onClick={() => {
                          const fullCopy = `${activePost.teaserCopy}\n\nLink: https://peregrinatiosacragratiae.squarespace.com/archive/${activePost.id}\n\n${activePost.indexingTags.join(" ")}`;
                          navigator.clipboard.writeText(fullCopy);
                          showToast("Social Teaser Copy sent to clipboard!");
                        }}
                        className="border border-[#C29C53] hover:bg-[#FAF6EE] text-[#800020] hover:text-[#990026] text-xs font-mono font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-97"
                      >
                        <Copy className="w-4 h-4 text-[#C29C53]" />
                        Copy Teaser Copy
                      </button>

                      {/* Art Asset Link copy utility */}
                      <button
                        id="btn-copy-art-link"
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(activeArt.url);
                          showToast("Sacred Painting assets link copied!");
                        }}
                        className="border border-[#C29C53] hover:bg-[#FAF6EE] text-[#800020] hover:text-[#990026] text-xs font-mono font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-97"
                      >
                        <ImageIcon className="w-4 h-4 text-[#C29C53]" />
                        Copy Art Asset Link
                      </button>

                    </div>

                    {/* 6. Mark as Posted (Essential loop control!) */}
                    <button
                      id="btn-mark-as-posted"
                      type="button"
                      onClick={handleMarkAsPosted}
                      className="w-full bg-[#800020] hover:bg-[#990026] text-white py-4 rounded-xl font-mono text-xs font-bold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <CheckSquare className="w-4 h-4 text-[#C29C53] fill-[#C29C53]/35" />
                      MARK AS POSTED & REMOVE FROM FINDER
                    </button>

                    <p className="text-[10px] text-gray-500 font-serif text-center mt-1 select-none">
                      Marking as posted stores this ID and excludes it from future queries, avoiding duplicate uploads on Squarespace or Facebook.
                    </p>

                  </motion.div>
                ) : (
                  <div className="py-4 text-center text-xs text-gray-400 font-body leading-normal select-none">
                    Inactive render block. Discover an article reference above to populate interactive copywriting assets.
                  </div>
                )}
              </AnimatePresence>

            </div>

          </section>

        </div>

        {/* 4. EXQUISITE HISTORICAL PUBLICATION LEDGER */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-3">
            <div className="space-y-0.5">
              <h2 className="text-md font-editorial-heading font-bold text-gray-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#800020]" />
                Sent to Publication Ledger (Historical Logs)
              </h2>
              <p className="text-xs text-gray-500 font-body">Review previously synchronized traditional articles, saved canonical citations, and active tags.</p>
            </div>
            
            {postedCount > 0 && (
              <button 
                id="btn-reset-published-tracker"
                type="button"
                onClick={handleResetHistory}
                className="bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-700 font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-150 hover:border-red-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Reset Pipeline Exclusion Tracker
              </button>
            )}
          </div>

          {postedCount === 0 ? (
            <div className="text-center py-10 font-body text-xs text-gray-400 leading-normal select-none">
              Your publication ledger is currently empty. Direct social copy items to this history by hitting &ldquo;Mark as Posted&rdquo; inside the workspace.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {postQueue
                .filter(p => postedIds.includes(p.id))
                .map((post) => {
                  const presetImg = artPresets.find(s => s.id === post.imagePresetId) || artPresets[0];
                  return (
                    <div 
                      key={post.id} 
                      className="border border-gray-150 rounded-xl p-3.5 bg-[#FAF9F5] flex flex-col justify-between space-y-3 relative overflow-hidden group select-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={presetImg.url} 
                            alt={post.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {/* Title details */}
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[8px] font-mono uppercase text-[#C29C53] tracking-wider font-extrabold block">
                            {post.category}
                          </span>
                          <h4 className="font-editorial-heading text-xs font-bold text-gray-900 truncate leading-tight">
                            {post.title}
                          </h4>
                          <span className="text-[8px] font-mono text-gray-400 block uppercase">
                            Published Reference Logs
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-600 line-clamp-3 leading-relaxed font-body italic bg-white p-2.5 rounded border border-gray-150">
                        &ldquo;{post.teaserCopy}&rdquo;
                      </p>

                      <div className="flex justify-between items-center text-[8px] font-mono pt-1 text-gray-400">
                        <div>
                          ID: <span className="font-bold">{post.id.substring(0, 12)}</span>
                        </div>
                        
                        {/* Instant Copy again helper */}
                        <button
                          id={`btn-ledger-copy-${post.id}`}
                          type="button"
                          onClick={() => {
                            const fullCopy = `${post.teaserCopy}\n\nLink: https://peregrinatiosacragratiae.squarespace.com/archive/${post.id}\n\n${post.indexingTags.join(" ")}`;
                            navigator.clipboard.writeText(fullCopy);
                            showToast("Ledger Social Teaser Copy retrieved!");
                          }}
                          className="text-[#800020] hover:underline hover:text-[#990026] flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <Copy className="w-2.5 h-2.5 text-[#C29C53]" />
                          Retrieve Copy
                        </button>
                      </div>

                    </div>
                  );
                })}
            </div>
          )}

        </section>
      </>
    )}
  </main>

      {/* Footer copyright */}
      <footer className="mt-16 text-center text-xs text-gray-400 font-mono select-none">
        <p>© 2026 Peregrinatio Sacra Gratiae • Canonical Editorial Bureau</p>
        <p className="text-[9px] text-[#C29C53]/50 mt-1 uppercase tracking-widest font-extrabold">Faithful to the Unaltered Tradition of Rome</p>
      </footer>
      
    </div>
  );
}
