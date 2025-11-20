import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Analysis {
  id: string;
  patient_id: string;
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
  prediction: 'benign' | 'malignant';
  confidence_score: number;
  model_used: string;
  created_at: string;
}

export interface ModelMetrics {
  id: string;
  model_name: string;
  accuracy: number;
  precision_score: number;
  recall_score: number;
  f1_score: number;
  roc_auc: number;
  created_at: string;
  updated_at: string;
}
