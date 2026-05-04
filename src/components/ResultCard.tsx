import type { Analysis } from "../types/food";
import { getImageUrl } from "../services/api";

interface Props {
  analysis: Analysis;
  image: string;
}

const macroTiles = [
  { key: "calories" as const, label: "Calories", unit: "kcal", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600" },
  { key: "protein"  as const, label: "Protein",  unit: "g",    bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-600"   },
  { key: "carbs"    as const, label: "Carbs",    unit: "g",    bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-600" },
  { key: "fat"      as const, label: "Fat",      unit: "g",    bg: "bg-pink-50",   border: "border-pink-100",   text: "text-pink-600"   },
];

export default function ResultCard({ analysis, image }: Props) {
  if (!analysis.is_food) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-scale-in">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <p className="font-semibold text-gray-700">No food detected</p>
        <p className="text-sm text-gray-400 mt-1">Try a clearer photo of your meal</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Image thumbnail */}
      {image && (
        <div className="rounded-2xl overflow-hidden h-36">
          <img
            src={getImageUrl(image)}
            alt="Analyzed food"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Total calories banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-green-100">
        <div>
          <p className="text-green-100 text-xs font-medium uppercase tracking-wider">Total Calories</p>
          <p className="text-3xl font-bold text-white leading-tight">{analysis.total_calories}</p>
          <p className="text-green-200 text-xs mt-0.5">kcal</p>
        </div>
        <div className="text-4xl select-none">🍽️</div>
      </div>

      {/* Food items */}
      {analysis.items.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-green-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 capitalize text-sm">{item.name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              item.confidence >= 0.8
                ? "bg-green-100 text-green-700"
                : item.confidence >= 0.5
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}>
              {Math.round(item.confidence * 100)}% match
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {macroTiles.map(({ key, label, unit, bg, border, text }) => (
              <div key={key} className={`rounded-xl border ${bg} ${border} ${text} p-2 text-center`}>
                <p className="text-xs font-medium opacity-60">{label}</p>
                <p className="font-bold text-sm leading-tight mt-0.5">
                  {key === "calories" ? item.calories : item[key as keyof typeof item]}
                </p>
                <p className="text-xs opacity-50">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
