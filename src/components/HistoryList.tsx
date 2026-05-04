import type { FoodHistory } from "../types/food";
import { getImageUrl } from "../services/api";

interface Props {
  history: FoodHistory[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function HistoryList({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-400">No scans yet</p>
        <p className="text-xs text-gray-300 mt-1">Upload a food photo to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {history.map((item) => {
        const foodNames = item.analysis.items.map((f) => f.name).join(", ");
        return (
          <div
            key={item._id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="h-28 bg-gray-100 overflow-hidden">
              <img
                src={getImageUrl(item.image)}
                alt={foodNames || "Food scan"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 truncate capitalize">
                {foodNames || "Unknown food"}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-100">
                  {item.analysis.total_calories} kcal
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-1.5">{formatDate(item.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
