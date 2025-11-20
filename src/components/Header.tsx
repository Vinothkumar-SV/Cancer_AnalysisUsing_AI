import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Activity className="text-blue-600 mr-3" size={32} />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Breast Cancer Analysis AI
              </h1>
              <p className="text-xs text-gray-600">ICESPOT Framework Implementation</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-900">97.5%</p>
              <p className="text-gray-600">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">0.994</p>
              <p className="text-gray-600">ROC-AUC</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">98.2%</p>
              <p className="text-gray-600">Recall</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
