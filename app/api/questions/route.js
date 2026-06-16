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

    if (text.trim().length < 50) {
      return NextResponse.json(
        { error: "Text is too short to generate meaningful questions." },
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
            content: `You are a study assistant that creates practice questions from course notes.
Generate clear and useful questions that help students review and test their understanding.
Return ONLY a valid JSON object in this exact format:
{
  "questions": [
    {
      "question": "What is ...?",
      "answer": "The answer is ..."
    }
  ]
}
Rules:
- Generate 5 questions based on the text length and complexity
- Mix question types: definition, explanation, comparison, application
- Answers should be concise but complete (1 to 3 sentences)
- Questions must be answerable from the provided notes only
- No preamble or explanation, only the JSON object`,
          },
          {
            role: "user",
            content: `Generate practice questions from these study notes:\n\n${text}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 1000,
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

    const clean = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({
      questions: parsed.questions || [],
    });
  } catch (error) {
    console.error("questions route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
