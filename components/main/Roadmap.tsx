import { useQuizPlanStore } from "@/store/quiz";
import { QuizPrompt, StudyPlanResponse } from "@/types/api";
import PerformanceCard from "./PerformanceCard";

export default function Roadmap({
  data,
  handleQuiz
}: {
  data: StudyPlanResponse
  handleQuiz: (quiz: QuizPrompt) => void
}) {
  const { analysis } = useQuizPlanStore()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{data.subject} Roadmap</h1>
          <p className="text-zinc-400">
            {data.totalDays} Days • {data.totalHours} Hours • {data.topicsCovered.length} Topics
          </p>
        </div>

        {analysis && (
          <PerformanceCard result={analysis}  ></PerformanceCard>
        )}

        {/* Schedule */}
        <div className="space-y-8">
          {data.schedule.map((day: any) => (
            <div
              key={day.day}
              className="bg-zinc-900 rounded-2xl shadow-xl p-6 transition hover:shadow-orange-700/30"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-orange-400">
                  Day {day.day}: {day.name}
                </h2>
                <span className="text-sm text-zinc-400">{day.duration}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-300 text-sm">
                <div>
                  <h3 className="font-medium text-white mb-1">Summary</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {day.summary.map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Tips</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {day.tips.map((tip: string, idx: number) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Resources</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {day.resources.map((link: string, idx: number) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:underline break-words"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quiz Button */}
              <div className="mt-6 text-right">
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-xl transition duration-200"
                  onClick={() => handleQuiz({
                    subjet: data.subject,
                    topics: day.name,
                    totalQuestions: 10
                  })}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
