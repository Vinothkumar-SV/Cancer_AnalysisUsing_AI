import { useEffect, useState } from 'react';
import { Activity, Target, TrendingUp, Award } from 'lucide-react';
import { supabase, Analysis, ModelMetrics } from '../lib/supabase';
import { MetricsCard } from './MetricsCard';
import { ModelComparison } from './ModelComparison';
import { RecentAnalyses } from './RecentAnalyses';

export function Dashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [analysesRes, metricsRes] = await Promise.all([
        supabase.from('analyses').select('*').order('created_at', { ascending: false }),
        supabase.from('model_metrics').select('*').order('accuracy', { ascending: false }),
      ]);

      if (analysesRes.data) setAnalyses(analysesRes.data);
      if (metricsRes.data) setModelMetrics(metricsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalAnalyses = analyses.length;
  const malignantCount = analyses.filter((a) => a.prediction === 'malignant').length;
  const benignCount = analyses.filter((a) => a.prediction === 'benign').length;
  const avgConfidence = analyses.length > 0
    ? (analyses.reduce((sum, a) => sum + a.confidence_score, 0) / analyses.length) * 100
    : 0;
  const bestModel = modelMetrics[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Analyses"
          value={totalAnalyses}
          subtitle="All-time predictions"
          icon={<Activity size={24} />}
        />
        <MetricsCard
          title="Malignant Cases"
          value={malignantCount}
          subtitle={`${totalAnalyses > 0 ? ((malignantCount / totalAnalyses) * 100).toFixed(1) : 0}% of total`}
          icon={<Target size={24} />}
        />
        <MetricsCard
          title="Benign Cases"
          value={benignCount}
          subtitle={`${totalAnalyses > 0 ? ((benignCount / totalAnalyses) * 100).toFixed(1) : 0}% of total`}
          icon={<TrendingUp size={24} />}
        />
        <MetricsCard
          title="Avg Confidence"
          value={`${avgConfidence.toFixed(1)}%`}
          subtitle={bestModel ? `Best: ${bestModel.model_name}` : 'No data'}
          icon={<Award size={24} />}
          trend="up"
        />
      </div>

      {modelMetrics.length > 0 && <ModelComparison metrics={modelMetrics} />}

      <RecentAnalyses analyses={analyses} />
    </div>
  );
}
