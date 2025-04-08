import { generateStudyPlan } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";


const tempResponse = {
    "subject": "Operating System",
    "totalDays": 7,
    "totalHours": 35,
    "topicsCovered": [
        "Process Management",
        "Memory Management",
        "File System Management",
        "Process Synchronization",
        "Deadlock Prevention",
        "Interrupt Handling",
        "Device Management"
    ],
    "schedule": [
        {
            "day": 1,
            "duration": "5 hours",
            "name": "Process Management",
            "summary": [
                "Process creation and termination",
                "Process scheduling algorithms"
            ],
            "tips": [
                "Understand the different process scheduling algorithms",
                "Practice problems on process management"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/process-management-in-operating-system/",
                "https://en.wikipedia.org/wiki/Process_scheduling"
            ]
        },
        {
            "day": 2,
            "duration": "5 hours",
            "name": "Memory Management",
            "summary": [
                "Memory hierarchy and allocation",
                "Fragmentation and paging"
            ],
            "tips": [
                "Understand the different memory allocation algorithms",
                "Practice problems on memory management"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/memory-management-in-operating-system/",
                "https://en.wikipedia.org/wiki/Memory_management"
            ]
        },
        {
            "day": 3,
            "duration": "5 hours",
            "name": "File System Management",
            "summary": [
                "File system structure and organization",
                "File access methods"
            ],
            "tips": [
                "Understand the different file system organization methods",
                "Practice problems on file system management"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/file-system-management-in-operating-system/",
                "https://en.wikipedia.org/wiki/File_system"
            ]
        },
        {
            "day": 4,
            "duration": "5 hours",
            "name": "Process Synchronization",
            "summary": [
                "Mutual exclusion and semaphores",
                "Monitors and condition variables"
            ],
            "tips": [
                "Understand the different synchronization techniques",
                "Practice problems on process synchronization"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/process-synchronization-in-operating-system/",
                "https://en.wikipedia.org/wiki/Process_synchronization"
            ]
        },
        {
            "day": 5,
            "duration": "5 hours",
            "name": "Deadlock Prevention",
            "summary": [
                "Deadlock definition and detection",
                "Deadlock prevention techniques"
            ],
            "tips": [
                "Understand the different deadlock prevention techniques",
                "Practice problems on deadlock prevention"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/deadlock-prevention-in-operating-system/",
                "https://en.wikipedia.org/wiki/Deadlock"
            ]
        },
        {
            "day": 6,
            "duration": "5 hours",
            "name": "Interrupt Handling",
            "summary": [
                "Interrupts and interrupt handling",
                "Interrupt handling techniques"
            ],
            "tips": [
                "Understand the different interrupt handling techniques",
                "Practice problems on interrupt handling"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/interrupt-handling-in-operating-system/",
                "https://en.wikipedia.org/wiki/Interrupt"
            ]
        },
        {
            "day": 7,
            "duration": "5 hours",
            "name": "Device Management",
            "summary": [
                "Device types and device management",
                "Device driver and device management"
            ],
            "tips": [
                "Understand the different device management techniques",
                "Practice problems on device management"
            ],
            "resources": [
                "https://www.geeksforgeeks.org/device-management-in-operating-system/",
                "https://en.wikipedia.org/wiki/Device_driver"
            ]
        }
    ]
}


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
