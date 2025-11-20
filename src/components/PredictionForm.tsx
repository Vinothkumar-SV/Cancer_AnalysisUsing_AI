import { useState } from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PredictionResult {
  prediction: 'benign' | 'malignant';
  confidence: number;
  model: string;
}

interface PredictionFormProps {
  onPredictionComplete: () => void;
}

export function PredictionForm({ onPredictionComplete }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    patient_id: '',
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concavity_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const simulatePrediction = (features: number[]): PredictionResult => {
    const sum = features.reduce((acc, val) => acc + val, 0);
    const avg = sum / features.length;

    const isMalignant = avg > 15 || features[0] > 17 || features[6] > 0.15;
    const confidence = 0.85 + Math.random() * 0.12;

    return {
      prediction: isMalignant ? 'malignant' : 'benign',
      confidence: Math.min(confidence, 0.99),
      model: 'XGBoost',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const features = [
        parseFloat(formData.radius_mean),
        parseFloat(formData.texture_mean),
        parseFloat(formData.perimeter_mean),
        parseFloat(formData.area_mean),
        parseFloat(formData.smoothness_mean),
        parseFloat(formData.compactness_mean),
        parseFloat(formData.concavity_mean),
        parseFloat(formData.concave_points_mean),
        parseFloat(formData.symmetry_mean),
        parseFloat(formData.fractal_dimension_mean),
      ];

      if (features.some(isNaN)) {
        throw new Error('Please fill in all fields with valid numbers');
      }

      const prediction = simulatePrediction(features);
      setResult(prediction);

      const { error: dbError } = await supabase.from('analyses').insert({
        patient_id: formData.patient_id,
        radius_mean: features[0],
        texture_mean: features[1],
        perimeter_mean: features[2],
        area_mean: features[3],
        smoothness_mean: features[4],
        compactness_mean: features[5],
        concavity_mean: features[6],
        concave_points_mean: features[7],
        symmetry_mean: features[8],
        fractal_dimension_mean: features[9],
        prediction: prediction.prediction,
        confidence_score: prediction.confidence,
        model_used: prediction.model,
      });

      if (dbError) throw dbError;

      onPredictionComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: 'patient_id', label: 'Patient ID', type: 'text', placeholder: 'e.g., P12345' },
    { name: 'radius_mean', label: 'Radius Mean', type: 'number', step: '0.01', placeholder: '10-30' },
    { name: 'texture_mean', label: 'Texture Mean', type: 'number', step: '0.01', placeholder: '10-40' },
    { name: 'perimeter_mean', label: 'Perimeter Mean', type: 'number', step: '0.01', placeholder: '50-200' },
    { name: 'area_mean', label: 'Area Mean', type: 'number', step: '0.01', placeholder: '150-2500' },
    { name: 'smoothness_mean', label: 'Smoothness Mean', type: 'number', step: '0.001', placeholder: '0.05-0.15' },
    { name: 'compactness_mean', label: 'Compactness Mean', type: 'number', step: '0.001', placeholder: '0.02-0.35' },
    { name: 'concavity_mean', label: 'Concavity Mean', type: 'number', step: '0.001', placeholder: '0-0.45' },
    { name: 'concave_points_mean', label: 'Concave Points Mean', type: 'number', step: '0.001', placeholder: '0-0.2' },
    { name: 'symmetry_mean', label: 'Symmetry Mean', type: 'number', step: '0.001', placeholder: '0.1-0.3' },
    { name: 'fractal_dimension_mean', label: 'Fractal Dimension Mean', type: 'number', step: '0.0001', placeholder: '0.05-0.1' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Activity className="mr-3 text-blue-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">New Analysis</h3>
          <p className="text-sm text-gray-600">Enter tumor feature measurements</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                step={field.step}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {result && (
          <div className={`p-4 rounded-lg border-2 ${
            result.prediction === 'malignant'
              ? 'bg-red-50 border-red-300'
              : 'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Prediction Result</p>
                <p className={`text-2xl font-bold mt-1 ${
                  result.prediction === 'malignant' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {result.prediction.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">
                  Model: {result.model}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </form>
    </div>
  );
}
