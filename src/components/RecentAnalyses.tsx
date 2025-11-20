import { Analysis } from '../lib/supabase';
import { Calendar, User } from 'lucide-react';

interface RecentAnalysesProps {
  analyses: Analysis[];
}

export function RecentAnalyses({ analyses }: RecentAnalysesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Analyses</h3>
        <p className="text-sm text-gray-600 mt-1">Latest patient diagnoses</p>
      </div>
      <div className="divide-y divide-gray-200">
        {analyses.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <p>No analyses yet. Submit the form above to create your first analysis.</p>
          </div>
        ) : (
          analyses.slice(0, 10).map((analysis) => (
            <div key={analysis.id} className="px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User size={16} className="mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900">{analysis.patient_id}</span>
                    <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                      analysis.prediction === 'malignant'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {analysis.prediction.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 mb-2">
                    <div>
                      <span className="font-medium">Radius:</span> {analysis.radius_mean.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Texture:</span> {analysis.texture_mean.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Confidence:</span> {(analysis.confidence_score * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="font-medium">Model:</span> {analysis.model_used}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(analysis.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
