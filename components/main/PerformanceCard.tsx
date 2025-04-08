export default function PerformanceCard({ result }: { result: { strong: string[]; weak: string[] } }) {


  return (
    <div className="max-w-xl mx-auto mt-12 bg-zinc-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center text-white mb-4">Your Performance</h2>
      <div className={`grid grid-cols-1 ${(result.strong.length > 0 || result.weak.length > 0) ? "sm:grid-cols-1" : "sm:grid-cols-2"} gap-6`}>
        {result.strong.length > 0 && (
          <div className="bg-green-900/30 border border-green-500 rounded-xl p-4">
            <h3 className="text-green-400 font-semibold mb-2">Strong Topics</h3>
            <ul className="list-disc ml-4 text-sm text-green-300 space-y-1">
              {result.strong.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
        {result.weak.length > 0 && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">Weak Topics</h3>
            <ul className="list-disc ml-4 text-sm text-red-300 space-y-1">
              {result.weak.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}