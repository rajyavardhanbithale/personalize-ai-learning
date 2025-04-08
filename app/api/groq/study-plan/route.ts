import { generateStudyPlan } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
    const body: generateStudyPlan = await req.json()

    const { subject, username, days, hours, topics } = body;

    console.log(req.body)

    const messages = [
        {
            role: "system",
            content: `You are an AI-powered study planner and expert educator. 
      Your job is to output only a valid JSON object. 
      Do not include any explanations, markdown, thinking steps, or additional text. 
      You are an expert in the subject: ${subject}, and can explain concepts clearly, but return only JSON.`
        },
        {
            role: "user",
            content: `Create a personalized study plan in JSON format for ${username}. 
      - Total duration: ${days} days 
      - Study time per day: ${hours} hours 
      ${topics.length > 0 ? `- Topics to focus on: ${topics.join(", ")}` : "- Choose core topics automatically."}
      
      Output only a valid JSON object with this structure:
      {
        "subject": "Subject Name",
        "totalDays": Number,
        "totalHours": TotalStudyHours,
        "topicsCovered": ["Topic1", "Topic2", ...],
        "schedule": [
          {
            "day": 1,
            "duration": ["X hours"],
            "name": "Topic Name",
            "summary": ["Key Point 1", "Key Point 2"],
            "tips": ["Study Tip 1", "Study Tip 2"],
            "resources": ["https://resource1", "https://resource2"]
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
