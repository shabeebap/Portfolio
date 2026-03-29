import { NextResponse } from 'next/server';

// Realistic mock responses for the predefined prompts, used as a secure fallback
// if the OPENAI_API_KEY is not configured in the portfolio environment.
const MOCK_RESPONSES: Record<string, string> = {
  "Tell me about Shabeeb": "Shabeeb AP is a Software Developer with over 4 years of experience building scalable, user-centric web and mobile applications using React, React Native and Next.js. Currently at Oligo IT Solutions, he specializes in building enterprise-grade tools and integrating powerful AI workflows to optimize developer operations!",
  "Optimize React code": "To optimize React code, you should prioritize memoization using `useMemo` and `useCallback` for expensive calculations. Additionally, separating your state vertically into smaller contextual components prevents massive re-renders across your DOM tree!",
  "Explain API design": "Great API design relies on RESTful nouns, clear HTTP verbs (GET, POST, PUT, DELETE), and predictable response shapes. Always version your API routes (e.g., `/v1/users`) and return descriptive error payloads so frontend developers can gracefully handle edge cases.",
  "Debug error": "When debugging, the stack trace is your best friend. First, isolate the crash line. If it's a 'Hydration Mismatch' in Next.js, check if you are rendering browser-only APIs (like `window.innerWidth`) on the server without wrapping it in a `useEffect`!",
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ---------------------------------------------------------
    // HYBRID FALLBACK:
    // If there is no API key (e.g. running locally without .env),
    // smoothly simulate the AI to keep the portfolio beautiful.
    // ---------------------------------------------------------
    if (!apiKey) {
      // Simulate network latency (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Try to match a predefined prompt, otherwise return a generic smart response
      const defaultResponse = MOCK_RESPONSES[prompt] ||
        "That's a fantastic question! Since I am currently running in Portfolio Demo Mode (without an API key attached), I can't query the neural net directly right now. But Shabeeb would love to discuss this with you directly!";

      return NextResponse.json({ response: defaultResponse });
    }

    // ---------------------------------------------------------
    // REAL OPENAI CALL:
    // We use native fetch to eliminate an entire SDK dependency!
    // ---------------------------------------------------------
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Cost-effective, fast model
        messages: [
          { role: "system", content: "You are an elite, highly concise AI assistant embedded in Shabeeb AP's developer portfolio. Reply technically but briefly (under 3 sentences). Shabeeb is a Software Developer with 4+ years of experience in React, Next.js, and AI integrations, currently working at Oligo IT Solutions." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch from OpenAI");
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "An error occurred while communicating with the AI. Please try again later." },
      { status: 500 }
    );
  }
}
