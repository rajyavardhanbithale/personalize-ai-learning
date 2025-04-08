# AI-Powered Study Planner

Many students struggle to prepare effectively for exams because they lack a clear understanding of where they stand and how to plan. This project solves that by offering a **smart, AI-powered system** that builds learning plans, generates quizzes, and helps identify weak areas through performance analysis.

## How It Works

1. **Input a Topic**  
   The student starts by entering a topic they want to study.

2. **Get a Personalized Learning Plan**  
   The system uses AI to break down the topic into structured subtopics, generating a step-by-step roadmap.

3. **Take a Quiz**  
   After completing the learning plan, the student takes a quiz tailored to that topic (Easy/Medium/Hard levels).

4. **Identify Weak Areas**  
   Based on quiz performance, the system identifies weak subtopics and adjusts future study and quiz recommendations accordingly.

## Features

- AI-generated study plans based on input topics
- Adaptive quizzes for each topic
- Performance analysis to highlight weak areas
- Continuous feedback loop for smarter revision
- Clean UI with reusable components

## 🛠️ Tech Stack

- **Next.js** with **TypeScript**
- **Tailwind CSS** for styling
- **OpenAI/GROQ** for AI-based roadmap and quiz generation
- **Modular UI components** (`Button`, `Input`, `Roadmap`, etc.)

## Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/rajyavardhanbithale/personalize-ai-learning](https://github.com/rajyavardhanbithale/personalize-ai-learning)
cd personalize-ai-learning
```

> Replace the URL with your actual GitHub repo.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash env
GROQ_API_KEY=your_openai_api_key
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---
