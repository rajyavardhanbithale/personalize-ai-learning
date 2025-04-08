import { generateQuiz, generateStudyPlan, QuizResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";


const tempResponse = {
  "subject": "Operating System",
  "totalQuestions": 4,
  "topics": [
    "Process Management"
  ],
  "questions": [
    {
      "question": "What is the primary function of a Process Scheduler in Process Management?",
      "options": [
        "To manage memory allocation",
        "To manage CPU scheduling",
        "To manage process creation and termination",
        "To manage file system management"
      ],
      "answer": "To manage CPU scheduling",
      "difficulty": "medium",
      "subtopic": "Process Scheduling"
    },
    {
      "question": "What is the difference between a Process and a Thread?",
      "options": [
        "A process can have multiple threads, but a thread cannot have multiple processes",
        "A process and a thread are the same",
        "A thread is a lightweight process, a process is a heavyweight thread",
        "A process is a collection of threads"
      ],
      "answer": "A thread is a lightweight process, a process is a heavyweight thread",
      "difficulty": "hard",
      "subtopic": "Process vs Thread"
    },
    {
      "question": "What is Context Switching?",
      "options": [
        "The process of switching from one process to another",
        "The process of switching from one thread to another",
        "The process of moving a process from secondary memory to main memory",
        "The process of loading an operating system into memory"
      ],
      "answer": "The process of switching from one process to another",
      "difficulty": "easy",
      "subtopic": "Process Scheduling"
    },
    {
      "question": "What is a Zombie Process?",
      "options": [
        "A process that is still running even after its parent process has terminated",
        "A process that is waiting for its child process to complete",
        "A process that has finished execution but still has an entry in the process table",
        "A process that is being debugged"
      ],
      "answer": "A process that has finished execution but still has an entry in the process table",
      "difficulty": "medium",
      "subtopic": "Process States"
    }
  ]
}


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
