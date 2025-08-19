import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();

    // Get Thirdweb credentials from environment variables
    const secretKey = process.env.THIRDWEB_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          error:
            "Thirdweb credentials not configured. Please add THIRDWEB_SECRET_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    // Initialize OpenAI client with Thirdweb AI endpoint
    const client = new OpenAI({
      baseURL: "https://api.thirdweb.com/ai",
      apiKey: secretKey,
    });

    // Call Thirdweb AI API using OpenAI client
    const requestBody = {
      model: "t0" as const,
      messages,
      stream: false as const,
      // Add context directly in the request body for Thirdweb
      context: context || {},
    };

    const chatCompletion = await client.chat.completions.create(
      requestBody as OpenAI.ChatCompletionCreateParams
    );

    const completion = chatCompletion as OpenAI.ChatCompletion;

    return NextResponse.json({
      message:
        (completion as { message?: string }).message ||
        completion.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.",
      sessionId:
        (completion as { session_id?: string }).session_id || completion.id,
    });
  } catch (error: unknown) {
    console.error("AI Chat API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
        details: "Please check your Thirdweb configuration.",
      },
      { status: 500 }
    );
  }
}
