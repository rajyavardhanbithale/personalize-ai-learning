export interface generateStudyPlan{
    subject: string;
    days: number;
    hours: number;
    topics: string[];
    username: string;
}

export interface generateQuiz{
    subject: string;
    topics: string[];
    totalQuestions: number;
}

export interface StudyPlanResponse {
    subject: string;
    totalDays: number;
    totalHours: number;
    topicsCovered: string[];
    schedule: {
        day: number;
        duration: string[];
        name: string;
        summary: string[];
        tips: string[];
        resources?: string[];
    }[];
}

export interface QuizResponse {
    subject: string;
    totalQuestions: number;
    topics: string[];
    questions: {
        question: string;
        options: string[];
        answer: string;
        difficulty: string;
        subtopic: string;
    }[];
}

export interface QuizPrompt{
    subjet: string;
    topics: string;
    totalQuestions: number;
}

export interface WeakTopics{
    subject: string;
    correct: {
        question: string;
        answer: string;
    }[];
    wrong: {
        question: string;
        answer: string;
    }[];
}