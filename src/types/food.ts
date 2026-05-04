export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

export interface Analysis {
  is_food: boolean;
  items: FoodItem[];
  total_calories: number;
  overall_confidence: number;
}

export interface UploadResult {
  success: boolean;
  cached: boolean;
  image: string;
  analysis: Analysis;
  message?: string;
}

export interface FoodHistory {
  _id: string;
  imageHash: string;
  image: string;
  analysis: Analysis;
  user: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
}
