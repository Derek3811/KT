"use client";

import React, { useState } from "react";
import { 
  Facebook, Loader2, RefreshCw, Copy, Download, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  // Facebook Daily Sync States
  const [facebookUrl1, setFacebookUrl1] = useState<string>("https://www.facebook.com/people/Peregrinatio-Sacra-Gratiae/100077721485830/");
  const [facebookUrl2, setFacebookUrl2] = useState<string>("https://www.facebook.com/MariaAngelAgnesGrow?mibextid=wwXIfr");
  const [customTopic, setCustomTopic] = useState<string>("");
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

  // Run History State
  const [historyResult, setHistoryResult] = useState<{
    id: string;
    timestamp: string;
    sourceFound: boolean;
    sourceSummary: string;
    title: string;
    caption: string;
    imageUrl: string;
    imagePrompt: string;
    referenceImageName: string;
  }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("catholic_sync_history");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn("Could not load sync history from local storage.", e);
        }
      }
    }
    return [];
  });

  // Success messaging
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleRunFacebookSync = async () => {
    setIsSyncing(true);
    setSyncLogs([]);
    setSyncResult(null);

    const logs = customTopic.trim()
      ? [
          `Initializing custom draft for: "${customTopic.trim()}"...`,
          "Loading hagiography and historical archives...",
          "Consulting prioritized traditional references...",
          "Reading style references from sample/001 folder...",
          "Running Gemini image style-transfer model...",
          "Generating style-matched pious photo...",
          "Post compiled successfully!"
        ]
      : [
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
        body: JSON.stringify({ 
          url1: facebookUrl1, 
          url2: facebookUrl2,
          customTopic: customTopic.trim()
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSyncResult(data);
        setCustomTopic(""); // Reset the custom topic override input
        
        const newHistoryItem = {
          id: `sync-${Date.now()}`,
          timestamp: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          sourceFound: data.sourceFound,
          sourceSummary: data.sourceSummary,
          title: data.title,
          caption: data.caption,
          imageUrl: data.imageUrl,
          imagePrompt: data.imagePrompt,
          referenceImageName: data.referenceImageName,
        };

        setHistoryResult((prev) => {
          const updated = [newHistoryItem, ...prev].slice(0, 10); // Keep at most last 10 runs
          localStorage.setItem("catholic_sync_history", JSON.stringify(updated));
          return updated;
        });

        showToast("Devotional post completed successfully!");
      } else {
        showToast("Generation failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      showToast("Network error: " + err.message);
    } finally {
      setIsSyncing(false);
    }
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
            One-Click Daily Auto-Copier: Automatically check, sync daily posts, and generate style-matching graphics from sample references.
          </p>
        </div>
      </header>

      {/* Main Single-Screen Workspace */}
      <main className="max-w-3xl w-full mx-auto px-4 md:px-6 pt-8 space-y-8 flex-grow">
        
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

        {/* Facebook Sync Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-[4px] h-full bg-[#3b5998]" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
            <div className="space-y-0.5">
              <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-[#3b5998]" />
                Facebook Daily Auto-Copier & Sync
              </h2>
              <p className="text-xs text-gray-500 font-body">Input Facebook URLs to pull the latest posts and generate custom styled devotional content.</p>
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

            {/* Custom Topic Override (Optional) */}
            <div className="space-y-1 pt-1.5">
              <label htmlFor="fb-custom-topic" className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                Custom Topic / Saint / Devotion (Optional Override)
              </label>
              <input 
                id="fb-custom-topic"
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:bg-white transition-colors placeholder:text-gray-300"
                placeholder="e.g. Saint Joseph, Mother of Sorrows, Guardian Angels..."
              />
              <p className="text-[10px] text-gray-400 font-body">If provided, the system will bypass Facebook scanning and write a custom post about this topic instead.</p>
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{customTopic.trim() ? "GENERATE CUSTOM POST" : "RUN DAILY AUTO-COPIER"}</span>
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
                  {syncResult.sourceFound ? "Real Post Found" : "Liturgical Reference"}
                </span>
              </div>

              {/* Title & Caption */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold">Title/Subject (Editable)</span>
                  <input
                    type="text"
                    value={syncResult.title}
                    onChange={(e) => setSyncResult({ ...syncResult, title: e.target.value })}
                    className="w-full text-xs font-editorial-heading font-bold text-gray-900 bg-white border border-gray-150 p-2.5 rounded-lg focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold">Facebook Post Caption (Editable)</span>
                  <textarea
                    rows={8}
                    value={syncResult.caption}
                    onChange={(e) => setSyncResult({ ...syncResult, caption: e.target.value })}
                    className="w-full text-xs font-body leading-relaxed text-gray-850 bg-white border border-gray-150 p-2.5 rounded-lg focus:ring-1 focus:ring-[#C29C53] focus:border-[#C29C53] focus:outline-none"
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
                      {syncResult.referenceImageName || "Liturgical fallback"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Ledger Card */}
        {historyResult.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
              <div className="space-y-0.5">
                <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C29C53]" />
                  Sync Run History (Last {historyResult.length} Runs)
                </h2>
                <p className="text-xs text-gray-500 font-body">Review and retrieve previously generated content and images from local memory.</p>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    historyResult.forEach((run, index) => {
                      setTimeout(() => {
                        const link = document.createElement("a");
                        link.href = run.imageUrl;
                        const cleanTitle = run.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                        link.download = `sacred-photo-${cleanTitle}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }, index * 250); // Stagger downloads by 250ms to prevent browser blocking
                    });
                    showToast(`Downloading all ${historyResult.length} photos...`);
                  }}
                  className="text-[10px] font-mono font-bold text-[#800020] hover:underline cursor-pointer"
                >
                  Download All Photos
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your run history?")) {
                      setHistoryResult([]);
                      localStorage.removeItem("catholic_sync_history");
                      showToast("History cleared successfully!");
                    }
                  }}
                  className="text-[10px] font-mono font-bold text-red-700 hover:underline cursor-pointer"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1">
              {historyResult.map((run) => (
                <div key={run.id} className="p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl flex flex-col md:flex-row justify-between gap-4 hover:border-[#C29C53] transition-all">
                  <div className="flex items-start gap-3 flex-grow min-w-0">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-stone-100 shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={run.imageUrl} alt={run.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>

                    {/* Metadata & Title */}
                    <div className="space-y-1 min-w-0 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[8px] font-mono bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded-sm uppercase font-bold">
                          {run.timestamp}
                        </span>
                        <span className="text-[8.5px] font-mono text-gray-400">
                          {run.sourceSummary}
                        </span>
                      </div>
                      <h4 className="font-editorial-heading text-xs font-bold text-gray-900 truncate">
                        {run.title}
                      </h4>
                      <p className="text-[10px] text-gray-600 line-clamp-2 leading-relaxed italic">
                        &ldquo;{run.caption}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSyncResult(run);
                        showToast("Loaded run into main view!");
                      }}
                      className="text-[10px] font-mono font-bold bg-[#1C1B19] text-white px-2.5 py-1 rounded-md hover:bg-[#C29C53] hover:text-[#1C1B19] transition-all cursor-pointer"
                    >
                      Load View
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(run.caption);
                        showToast("Copied caption to clipboard!");
                      }}
                      className="text-[10px] font-mono font-bold text-[#800020] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy Text
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reference Websites Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 text-left">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-md font-editorial-heading font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C29C53] shrink-0" />
              Active Editorial Reference Sources
            </h2>
            <p className="text-xs text-gray-500 font-body">Gemini uses Google Search grounding prioritised on these 6 target historical and liturgical resource websites to cross-verify feasts, saints' lives, and traditional prayers:</p>
          </div>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-body text-gray-700">
            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">1. Salve Maria Regina</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Seasonal prayers & traditional Roman liturgy</span>
              <a href="https://www.salvemariaregina.info/Prayers/Seasonal.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                salvemariaregina.info/Prayers/Seasonal.html
              </a>
            </li>

            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">2. Butler's Lives of the Saints</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Bartleby literary & historical references</span>
              <a href="https://www.bartleby.com/lit-hub/lives-of-the-saints/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                bartleby.com/lit-hub/lives-of-the-saints
              </a>
            </li>

            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">3. Sanctoral Lives of the Saints</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Full traditional Roman martyrology logs</span>
              <a href="https://sanctoral.com/en/saints/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                sanctoral.com/en/saints/index.html
              </a>
            </li>

            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">4. Lives of the Saints (Sacred Texts)</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Complete classic hagiography repository</span>
              <a href="https://www.sacred-texts.com/chr/lots/index.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                sacred-texts.com/chr/lots/index.htm
              </a>
            </li>

            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">5. Catholic Harbor of Faith and Morals</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Catechetical guides and traditional devotions</span>
              <a href="https://catholicharboroffaithandmorals.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                catholicharboroffaithandmorals.com
              </a>
            </li>

            <li className="flex flex-col p-3 bg-[#FAF9F5] border border-gray-150 rounded-xl space-y-1 hover:border-[#C29C53] transition-all">
              <span className="font-mono text-[9px] font-bold text-[#800020] uppercase">6. SSPX Asia (The Church Year)</span>
              <span className="text-[10px] text-gray-400 font-mono truncate">Liturgical explanations and encyclical records</span>
              <a href="https://www.sspxasia.com/Documents/The_Church_Year/index.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block mt-1 font-mono text-[10px] truncate">
                sspxasia.com/Documents/The_Church_Year
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="mt-16 text-center text-xs text-gray-400 font-mono select-none">
        <p>© 2026 Peregrinatio Sacra Gratiae • Canonical Editorial Bureau</p>
        <p className="text-[9px] text-[#C29C53]/50 mt-1 uppercase tracking-widest font-extrabold">Faithful to the Unaltered Tradition of Rome</p>
      </footer>
      
    </div>
  );
}
