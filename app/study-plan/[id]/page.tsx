"use client"

import { use, useEffect, useState } from "react"
import axios from "axios"
import Roadmap from "@/components/main/Roadmap"
import { QuizPrompt } from "@/types/api"
import { useStudyPlanStore } from "@/store/roadmap"
import { useQuizPlanStore } from "@/store/quiz"
import { useRouter } from "next/navigation"
import PerformanceCard from "@/components/main/PerformanceCard"

export default function StudyPlan({ params }: { params: Promise<{ id: string }> }) {
  const { studyPlan, setStudyPlan } = useStudyPlanStore()
  const { setQuizPlan } = useQuizPlanStore()
  const router = useRouter();

  const handleQuiz = (quiz: QuizPrompt) => {
    setQuizPlan({
      topic: quiz.topics,
      totalQuestion: 10
    })
    router.push(`/quiz/${quiz.subjet}`)
  }


  return (
    <div>
      {studyPlan ? (
        <Roadmap data={studyPlan} handleQuiz={handleQuiz} />
      ) : (
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 tracking-tight mb-2">
            An Error Occured
          </h1>
          <p className="text-zinc-400 text-lg">
            Please dont refresh the page 
          </p>
        </div>
      )}
    </div>
  )
}
