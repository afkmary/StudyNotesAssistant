import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Please paste more notes before generating a summary." },
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
            content: `
              You are a study assistant.

              Create a clean, easy-to-read summary.

              Rules:
              - Do NOT use markdown
              - Do NOT use ** or #
              - Use plain text only
              - Use short paragraphs
              - Use bullet points when appropriate
              - Keep the summary concise and beginner friendly
              `
          },
          {
            role: "user",
            content: `Summarize these study notes in plain text:\n\n${text}`,
          },
        ],
        temperature: 0.4,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Azure OpenAI summary error:", errorData);

      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content?.trim();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("summary route error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the summary." },
      { status: 500 }
    );
  }
}