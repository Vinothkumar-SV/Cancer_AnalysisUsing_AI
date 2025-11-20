import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PredictionForm } from './components/PredictionForm';
import { ICESPOTInfo } from './components/ICESPOTInfo';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePredictionComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ICESPOTInfo />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <PredictionForm onPredictionComplete={handlePredictionComplete} />
          </div>
          <div className="lg:col-span-2">
            <Dashboard key={refreshKey} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium mb-2">Breast Cancer Analysis Using AI — ICESPOT Framework</p>
            <p>Built with React, TypeScript, Tailwind CSS, and Supabase</p>
            <p className="mt-2">Wisconsin Diagnostic Breast Cancer Dataset (WBCD) • Production-Ready ML Pipeline</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
