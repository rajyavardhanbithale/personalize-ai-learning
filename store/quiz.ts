import { create } from 'zustand';

export interface QuizPlanResponse {
    topic: string;
    totalQuestion: number;
}

export interface Analysis {
    strong: string[];
    weak: string[];
    correct:number
    incorrect: number
}

interface QuizPlanState {
    QuizPlan: QuizPlanResponse | null;
    setQuizPlan: (plan: QuizPlanResponse) => void;
    clearQuizPlan: () => void;

    analysis: Analysis | null;
    setAnalysis: (data: Analysis) => void;
    clearAnalysis: () => void;
}

export const useQuizPlanStore = create<QuizPlanState>((set) => ({
    QuizPlan: null,
    setQuizPlan: (plan) => set({ QuizPlan: plan }),
    clearQuizPlan: () => set({ QuizPlan: null }),

    analysis: null,
    setAnalysis: (data) => set({ analysis: data }),
    clearAnalysis: () => set({ analysis: null }),
}));
