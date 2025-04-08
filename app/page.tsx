'use client'

import { useQuizPlanStore } from "@/store/quiz";
import { useStudyPlanStore } from "@/store/roadmap";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";

export default function Home() {
  const [search, setSearch] = useState('');
  const [days, setDays] = useState('7');
  const [hour, setHour] = useState('3');
  const [username, setUsername] = useState('rajyavardhan');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setStudyPlan } = useStudyPlanStore();
  const { clearAnalysis } = useQuizPlanStore();

  const handleNext = async () => {
    try {
      setLoading(true);
      clearAnalysis();
      const response = await axios.post('/api/groq/study-plan', {
        subject: search,
        days,
        hour,
        username,
        topics: [],
      });
      setStudyPlan(response.data);
      if (response.data) {
        router.push(`/study-plan/${search}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 tracking-tight mb-2">
          Personalized Learning
        </h1>
        <p className="text-zinc-400 text-lg">
          Generate your own study + quiz plan in seconds
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl p-6 space-y-4 transition-all duration-300 ring-1 ring-zinc-800">
          <div className="flex items-center gap-4">
            <AiOutlineSearch className="text-zinc-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search subject..."
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-transparent text-white placeholder-zinc-500 focus:outline-none text-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-zinc-400 text-sm">Days</label>
              <input
                type="text"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="bg-zinc-800 text-white px-4 py-2 rounded-xl placeholder-zinc-500 focus:outline-none w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-400 text-sm">Hours per Day</label>
              <input
                type="text"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="bg-zinc-800 text-white px-4 py-2 rounded-xl placeholder-zinc-500 focus:outline-none w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-400 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-800 text-white px-4 py-2 rounded-xl placeholder-zinc-500 focus:outline-none w-full"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white px-5 py-2 rounded-xl text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading && <ImSpinner2 className="animate-spin" />}
            {loading ? 'Generating Plan...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
}
