import { Lightbulb, AlertTriangle, Cog, CheckCircle, User, BarChart } from 'lucide-react';

export function ICESPOTInfo() {
  const sections = [
    {
      letter: 'I',
      title: 'Introduction',
      icon: <Lightbulb size={24} />,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      content: 'Breast cancer early detection using AI/ML models on Wisconsin Diagnostic Dataset for benign vs malignant classification.',
    },
    {
      letter: 'C',
      title: 'Challenges',
      icon: <AlertTriangle size={24} />,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      content: 'Data imbalance, noise handling, feature selection, model overfitting, hyperparameter tuning, and deployment optimization.',
    },
    {
      letter: 'E',
      title: 'Execution',
      icon: <Cog size={24} />,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      content: 'Data preparation, EDA, model development (RF, SVM, XGBoost, ANN), training pipeline with cross-validation and tuning.',
    },
    {
      letter: 'S',
      title: 'Solution',
      icon: <CheckCircle size={24} />,
      color: 'bg-green-50 text-green-600 border-green-200',
      content: 'XGBoost classifier with high recall, low false-negative rate, and interpretability via SHAP values and feature importance.',
    },
    {
      letter: 'P',
      title: 'Personal Contribution',
      icon: <User size={24} />,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      content: 'Complete ML pipeline design, data preparation, model development & tuning, ANN architecture, and containerized deployment.',
    },
    {
      letter: 'O',
      title: 'Outcome',
      icon: <BarChart size={24} />,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      content: '97.5% accuracy, 0.994 ROC-AUC, reliable tumor classification with generalization to unseen data and full documentation.',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold text-gray-900">ICESPOT Framework</h3>
        <p className="text-sm text-gray-600 mt-1">Comprehensive AI-driven breast cancer analysis methodology</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div
              key={section.letter}
              className={`p-4 rounded-lg border-2 ${section.color} transition hover:shadow-md`}
            >
              <div className="flex items-start mb-3">
                <div className="mr-3">{section.icon}</div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-2xl font-bold mr-2">{section.letter}</span>
                    <span className="font-semibold text-sm">{section.title}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed opacity-90">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
