
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onGenerate, isLoading }) => {
  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-indigo-300 mb-3">
        Tema da História
      </label>
      <p className="text-sm text-gray-400 mb-4">
        Digite uma ideia ou premissa curta. Ex: "Descobri um segredo no porão da minha avó" ou "Meu vizinho não é humano".
      </p>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Digite sua ideia aqui..."
        className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed disabled:text-gray-400 flex items-center justify-center transition-all duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
          </>
        ) : 'Gerar Roteiro'}
      </button>
    </div>
  );
};
