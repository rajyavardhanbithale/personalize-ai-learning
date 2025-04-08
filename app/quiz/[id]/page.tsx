'use client'

import { use, useEffect, useState } from "react"
import axios from "axios"
import Quiz from "@/components/main/Quiz"
import { useQuizPlanStore } from "@/store/quiz"
import { ImSpinner2 } from "react-icons/im"

export default function StudyPlan({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [plan, setPlan] = useState(null)
  const [error, setError] = useState(null)

  const { QuizPlan } = useQuizPlanStore();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.post('/api/groq/quiz', {
          subject: id,
          topic: QuizPlan?.topic,
          totalQuestions: QuizPlan?.totalQuestion
        })
        setPlan(response.data)
        console.log(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (id) fetchPlan()
  }, [id])

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-xl">
      Error: {error}
    </div>
  )

  if (!plan) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <ImSpinner2 className="animate-spin text-5xl text-orange-500 mb-4" />
      <p className="text-xl font-semibold">Generating Quiz Plan...</p>
    </div>
  )

  return <Quiz data={plan} />
}
