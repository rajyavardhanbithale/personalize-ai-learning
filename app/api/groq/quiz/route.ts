import { generateQuiz } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const body: generateQuiz = await req.json()

  const { subject, topics, totalQuestions } = body;

  console.log(process.env.GROQ_API_KEY)

  const messages = [
    {
      role: "system",
      content: `You are an AI-powered quiz generator and subject matter expert.
          Your job is to output only a valid JSON object.
          Do not include any explanations, markdown, thinking steps, or additional text.
          You are an expert in the subject: ${subject}, capable of crafting clear and accurate quiz questions across various difficulty levels. Return only JSON.`
    },
    {
      role: "user",
      content: `Generate a quiz in JSON format.
          - Subject: ${subject}
          - Topic: ${topics}
          - Total Questions: ${totalQuestions}
      
          Output only a valid JSON object with this structure:
          {
            "subject": "Subject Name",
            "totalQuestions": Number,
            "topics": ["Topic1", "Topic2", ...],
            "questions": [
              {
                "question": "What is ...?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": "Option B",
                "difficulty": "easy | medium | hard",
                "subtopic": "Specific Subtopic"
              }
            ]
          }`
    }
  ];


  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const parse = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(parse, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error fetching from GROQ API", details: error }, { status: 500 });
  }
}
