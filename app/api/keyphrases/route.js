import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    if (text.trim().length < 20) {
      return NextResponse.json(
        { error: "Text is too short. Please paste at least a few sentences." },
        { status: 400 }
      );
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-02-01";

    if (!endpoint || !apiKey || !deployment) {
      return NextResponse.json(
        { error: "Azure OpenAI is not configured." },
        { status: 500 }
      );
    }

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a study assistant that extracts key phrases from course notes.
Extract the most important terms, concepts, and phrases from the provided text.
Return ONLY a valid JSON object in this exact format:
{
  "keyphrases": ["phrase1", "phrase2", "phrase3", ...]
}
Rules:
- Extract 5 to 15 key phrases depending on text length
- Focus on technical terms, definitions, and core concepts
- Keep each phrase concise (1 to 5 words)
- No duplicate phrases
- No preamble or explanation, only the JSON object`,
          },
          {
            role: "user",
            content: `Extract key phrases from these study notes:\n\n${text}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Azure OpenAI error:", errorData);
      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 500 }
      );
    }

    // Strip markdown fences if present
    const clean = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({
      keyphrases: parsed.keyphrases || [],
    });
  } catch (error) {
    console.error("keyphrases route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
