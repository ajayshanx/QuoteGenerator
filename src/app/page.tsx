"use client";

import { useCallback, useEffect, useState } from "react";

type QuoteResponse = {
  quote: string;
  author: string;
  source: "internet" | "ai-fallback";
};

const clientFallbackQuotes = [
  "Golf is a game that is played on a five-inch course - the distance between your ears.",
  "The more I practice, the luckier I get.",
  "No matter how good you get you can always get better, and that's the exciting part.",
  "Golf is deceptively simple and endlessly complicated."
];

const unsplashBackgrounds = [
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1950&q=80"
];

export default function HomePage() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const getRandomBackgroundUrl = () =>
    unsplashBackgrounds[Math.floor(Math.random() * unsplashBackgrounds.length)];

  const getClientFallbackQuote = (): QuoteResponse => ({
    quote: clientFallbackQuotes[Math.floor(Math.random() * clientFallbackQuotes.length)],
    author: "Golf Wisdom",
    source: "ai-fallback"
  });

  const loadQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    setBackgroundUrl(getRandomBackgroundUrl());

    try {
      const response = await fetch("/api/quote", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch quote.");
      }

      const data = (await response.json()) as QuoteResponse;
      setQuote(data);
    } catch {
      // Keep the UI usable even when API/network calls fail.
      setQuote(getClientFallbackQuote());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuote();
  }, [loadQuote]);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: backgroundUrl
          ? `url('${backgroundUrl}')`
          : "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1950&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-slate-900/45" aria-hidden="true" />
      <section className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
          Golf Quote
        </p>

        <div className="mt-6 min-h-32">
          {loading ? (
            <p className="text-slate-500">Loading quote...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <blockquote className="text-2xl leading-relaxed text-slate-800">
                &ldquo;{quote?.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-slate-500">- {quote?.author}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
                Source: {quote?.source === "internet" ? "Internet API" : "AI-generated fallback"}
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => void loadQuote()}
          disabled={loading}
          className="mt-8 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "New Quote"}
        </button>
      </section>
    </main>
  );
}
