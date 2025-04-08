
import { create } from 'zustand';

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

interface StudyPlanState {
  studyPlan: StudyPlanResponse | null;
  setStudyPlan: (plan: StudyPlanResponse) => void;
  clearStudyPlan: () => void;
}

export const useStudyPlanStore = create<StudyPlanState>((set) => ({
  studyPlan: null,
  setStudyPlan: (plan) => set({ studyPlan: plan }),
  clearStudyPlan: () => set({ studyPlan: null }),
}));
