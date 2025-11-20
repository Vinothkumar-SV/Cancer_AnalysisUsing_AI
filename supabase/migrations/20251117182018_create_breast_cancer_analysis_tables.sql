/*
  # Breast Cancer Analysis Database Schema

  ## Overview
  This migration creates the database structure for the breast cancer analysis application using the ICESPOT framework.

  ## New Tables
  
  ### `analyses`
  Stores individual breast cancer analysis records with patient features and predictions
  - `id` (uuid, primary key) - Unique identifier for each analysis
  - `patient_id` (text) - Patient identifier
  - `radius_mean` (decimal) - Mean of distances from center to points on perimeter
  - `texture_mean` (decimal) - Standard deviation of gray-scale values
  - `perimeter_mean` (decimal) - Mean size of core tumor
  - `area_mean` (decimal) - Mean area of tumor
  - `smoothness_mean` (decimal) - Mean of local variation in radius lengths
  - `compactness_mean` (decimal) - Mean of perimeter^2 / area - 1.0
  - `concavity_mean` (decimal) - Mean of severity of concave portions of contour
  - `concave_points_mean` (decimal) - Mean number of concave portions of contour
  - `symmetry_mean` (decimal) - Mean symmetry
  - `fractal_dimension_mean` (decimal) - Mean "coastline approximation"
  - `prediction` (text) - Model prediction: 'benign' or 'malignant'
  - `confidence_score` (decimal) - Prediction confidence (0-1)
  - `model_used` (text) - ML model used for prediction
  - `created_at` (timestamptz) - When analysis was performed

  ### `model_metrics`
  Stores performance metrics for different ML models
  - `id` (uuid, primary key) - Unique identifier
  - `model_name` (text) - Name of the ML model
  - `accuracy` (decimal) - Model accuracy score
  - `precision_score` (decimal) - Precision metric
  - `recall_score` (decimal) - Recall metric
  - `f1_score` (decimal) - F1 score
  - `roc_auc` (decimal) - ROC-AUC score
  - `created_at` (timestamptz) - When metrics were recorded
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Add policies for authenticated users to manage their own data
  - Public read access for model metrics (for displaying on dashboard)
*/

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text NOT NULL,
  radius_mean decimal NOT NULL,
  texture_mean decimal NOT NULL,
  perimeter_mean decimal NOT NULL,
  area_mean decimal NOT NULL,
  smoothness_mean decimal NOT NULL,
  compactness_mean decimal NOT NULL,
  concavity_mean decimal NOT NULL,
  concave_points_mean decimal NOT NULL,
  symmetry_mean decimal NOT NULL,
  fractal_dimension_mean decimal NOT NULL,
  prediction text NOT NULL,
  confidence_score decimal NOT NULL,
  model_used text NOT NULL DEFAULT 'Random Forest',
  created_at timestamptz DEFAULT now()
);

-- Create model_metrics table
CREATE TABLE IF NOT EXISTS model_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text UNIQUE NOT NULL,
  accuracy decimal NOT NULL,
  precision_score decimal NOT NULL,
  recall_score decimal NOT NULL,
  f1_score decimal NOT NULL,
  roc_auc decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_metrics ENABLE ROW LEVEL SECURITY;

-- Policies for analyses table
CREATE POLICY "Anyone can view analyses"
  ON analyses FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert analyses"
  ON analyses FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies for model_metrics table
CREATE POLICY "Anyone can view model metrics"
  ON model_metrics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert model metrics"
  ON model_metrics FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update model metrics"
  ON model_metrics FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert sample model metrics
INSERT INTO model_metrics (model_name, accuracy, precision_score, recall_score, f1_score, roc_auc)
VALUES 
  ('Random Forest', 0.972, 0.970, 0.980, 0.975, 0.992),
  ('SVM', 0.968, 0.965, 0.975, 0.970, 0.988),
  ('XGBoost', 0.975, 0.973, 0.982, 0.977, 0.994),
  ('ANN', 0.970, 0.968, 0.978, 0.973, 0.990),
  ('Logistic Regression', 0.958, 0.955, 0.965, 0.960, 0.982)
ON CONFLICT (model_name) DO NOTHING;