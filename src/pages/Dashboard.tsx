import { useEffect, useState } from "react";
import { getHistory, uploadFood } from "../services/api";
import { getToken } from "../services/auth";
import type { Analysis, FoodHistory } from "../types/food";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import HistoryList from "../components/HistoryList";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [image, setImage] = useState<string>("");
  const [history, setHistory] = useState<FoodHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [uploadError, setUploadError] = useState("");

  const token = getToken();

  const fetchHistory = async () => {
    try {
      const res = await getHistory(token);
      if (res.success) setHistory(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      setUploadError("");
      setAnalysis(null);
      const res = await uploadFood(file, token);
      if (res.success) {
        setAnalysis(res.analysis);
        setImage(res.image);
        await fetchHistory();
      } else {
        setUploadError(res.message ?? "Analysis failed");
      }
    } catch {
      setUploadError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

      <Navbar variant="app" />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Top row: Upload + Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Upload Card */}
          <div className="animate-fade-in-up bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Scan Food
            </h2>
            <UploadForm onUpload={handleUpload} loading={loading} />
            {uploadError && (
              <div className="mt-3 animate-scale-in flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {uploadError}
              </div>
            )}
          </div>

          {/* Result Card */}
          <div className="animate-fade-in-up bg-white rounded-3xl shadow-sm border border-gray-100 p-6" style={{ animationDelay: "80ms" }}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              AI Result
            </h2>

            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl" />
                <div className="h-28 bg-gray-100 rounded-2xl" />
              </div>
            ) : analysis ? (
              <div className="animate-slide-in-right">
                <ResultCard analysis={analysis} image={image} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-400">No result yet</p>
                <p className="text-xs text-gray-300 mt-1">Upload a photo to see nutrition info</p>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <div className="animate-fade-in-up bg-white rounded-3xl shadow-sm border border-gray-100 p-6" style={{ animationDelay: "160ms" }}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Scan History
          </h2>

          {historyLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-32 bg-gray-100" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <HistoryList history={history} />
          )}
        </div>
      </main>
    </div>
  );
}
