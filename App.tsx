
import React, { useState, useCallback } from 'react';
import { generateScript } from './services/geminiService';
import type { GeneratedScript } from './types';
import { PromptInput } from './components/PromptInput';
import { ScriptDisplay } from './components/ScriptDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Por favor, insira um tema para a história.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedScript(null);

    try {
      const script = await generateScript(prompt);
      setGeneratedScript(script);
    } catch (err) {
      setError('Ocorreu um erro ao gerar o roteiro. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {generatedScript && <ScriptDisplay script={generatedScript} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
