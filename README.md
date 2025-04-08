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

![Screenshot from 2025-04-08 16-10-37](https://github.com/user-attachments/assets/f08706f9-fe31-4fae-987e-2560b3caa43a)
![Screenshot from 2025-04-08 16-10-47](https://github.com/user-attachments/assets/c639b321-41fd-400a-ae31-e4c69c6aef63)
![Screenshot from 2025-04-08 16-10-54](https://github.com/user-attachments/assets/be3ec9bc-a31a-434f-aa4d-71cdca596b19)
![Screenshot from 2025-04-08 16-14-27](https://github.com/user-attachments/assets/6f31340b-c368-4007-94fe-3b52a917f4b9)
![Screenshot from 2025-04-08 16-14-30](https://github.com/user-attachments/assets/8ffe8727-6217-4816-8e8b-489be387d8da)
![Screenshot from 2025-04-08 16-13-04](https://github.com/user-attachments/assets/152cb3e4-cd6e-4bda-8959-20758aeda114)


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
