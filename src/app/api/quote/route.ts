import { NextResponse } from "next/server";

type QuotePayload = {
  quote: string;
  author: string;
  source: "internet" | "ai-fallback";
};

type GolfQuote = {
  quote: string;
  author: string;
};

const golfQuotes: GolfQuote[] = [
  { quote: "Golf is a game that is played on a five-inch course - the distance between your ears.", author: "Bobby Jones" },
  { quote: "The more I practice, the luckier I get.", author: "Gary Player" },
  { quote: "No matter how good you get you can always get better, and that's the exciting part.", author: "Tiger Woods" },
  { quote: "Golf is deceptively simple and endlessly complicated.", author: "Arnold Palmer" },
  { quote: "Success in golf depends less on strength of body than strength of mind and character.", author: "Arnold Palmer" },
  { quote: "I never learned anything from a match that I won.", author: "Bobby Jones" },
  { quote: "Concentration comes out of a combination of confidence and hunger.", author: "Arnold Palmer" },
  { quote: "The harder you work, the harder it is to surrender.", author: "Vince Lombardi" }
];

function getRandomGolfQuote(): QuotePayload {
  const selected = golfQuotes[Math.floor(Math.random() * golfQuotes.length)];
  return {
    quote: selected.quote,
    author: selected.author,
    source: "ai-fallback"
  };
}

export async function GET() {
  return NextResponse.json(getRandomGolfQuote());
}
