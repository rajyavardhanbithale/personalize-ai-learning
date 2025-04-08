/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useQuizPlanStore } from '@/store/quiz';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

export default function Quiz({ data }: { data: any }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ subtopic: string; correct: boolean }[]>([]);
  const { setAnalysis, analysis } = useQuizPlanStore();


  const router = useRouter()

  const question = data.questions[current];
  const isCorrect = selected === question.answer;
  let correct = 0;
  let totatQuestion = 0;

  correct = selected === question.answer ? correct + 1 : 0
  totatQuestion = selected ? totatQuestion + 1 : 0;

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setShowAnswer(true);
    setResults((prev) => [
      ...prev,
      { subtopic: question.subtopic, correct: option === question.answer },
    ]);
  };

  const calculateAnalysis = () => {
    const subtopicMap: Record<string, { correct: number; total: number }> = {};

    for (const res of results) {
      if (!subtopicMap[res.subtopic]) {
        subtopicMap[res.subtopic] = { correct: 0, total: 0 };
      }
      subtopicMap[res.subtopic].total += 1;
      if (res.correct) subtopicMap[res.subtopic].correct += 1;
    }

    const strong: string[] = [];
    const weak: string[] = [];

    for (const [subtopic, { correct, total }] of Object.entries(subtopicMap)) {
      const accuracy = correct / total;
      if (accuracy >= 0.7) strong.push(subtopic);
      else weak.push(subtopic);
    }

    setAnalysis({ strong, weak, correct: correct, incorrect: totatQuestion - correct });
    router.back()
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6 bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">{data.subject} Quiz</h1>
          <p className="text-zinc-400">
            Question {current + 1} of {data.totalQuestions} • Difficulty: <span className="capitalize">{question.difficulty}</span>
          </p>
          <p className="text-sm text-zinc-500 mt-1">Subtopic: {question.subtopic}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option: string, idx: number) => {
              const isSelected = selected === option;
              const isAnswer = showAnswer && option === question.answer;
              const isWrong = showAnswer && isSelected && !isCorrect;
              return (
                <button
                  key={idx}
                  disabled={showAnswer}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition font-medium border
                    ${isAnswer ? 'bg-green-600 border-green-500' : ''}
                    ${isWrong ? 'bg-red-600 border-red-500' : ''}
                    ${!showAnswer && 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="mt-6 text-center">
              {isCorrect ? (
                <p className="text-green-400 flex items-center justify-center gap-2">
                  <BiCheckCircle className="text-green-500" /> Correct!
                </p>
              ) : (
                <p className="text-red-400 flex items-center justify-center gap-2">
                  <BiXCircle className="text-red-500" /> Incorrect. Correct Answer: <span className="font-semibold ml-1">{question.answer}</span>
                </p>
              )}

              {current + 1 < data.totalQuestions ? (
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-xl text-white font-semibold"
                >
                  Next Question
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  <p className="text-lg text-orange-400 font-bold">You’ve completed the quiz! 🎉</p>
                  <button
                    onClick={calculateAnalysis}
                    className="bg-green-700 hover:bg-green-800 px-5 py-2 rounded-xl text-white font-semibold"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
