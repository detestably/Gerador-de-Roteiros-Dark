
import React from 'react';
import type { GeneratedScript } from '../types';
import { CopyButton } from './CopyButton';

interface ScriptDisplayProps {
  script: GeneratedScript;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-indigo-300 mb-4 border-b border-gray-700 pb-2">{title}</h3>
    {children}
  </div>
);

const NarrationBlock: React.FC<{ title: string; text: string }> = ({ title, text }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-300">{title}</h4>
            <CopyButton textToCopy={text} />
        </div>
        <pre className="bg-gray-900 rounded-md p-4 text-gray-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
            <code>{text}</code>
        </pre>
    </div>
);


export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script }) => {
  return (
    <div className="w-full space-y-8 animate-fade-in">
      <Section title="[METADADOS SEO]">
        <div>
          <h4 className="font-semibold text-gray-300 mb-2">Títulos Sugeridos:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            {script.seo.titles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold text-gray-300 mb-2">Descrição Curta:</h4>
          <p className="text-gray-400 italic">{script.seo.description}</p>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold text-gray-300 mb-2">Tags Virais:</h4>
          <div className="flex flex-wrap gap-2">
            {script.seo.tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="[SUGESTÃO VISUAL]">
        <p className="text-gray-400">{script.visualSuggestion}</p>
      </Section>

      <Section title="[ROTEIRO DE NARRAÇÃO]">
        <div className="space-y-6">
            <NarrationBlock title="O Gancho (0-5s)" text={script.narration.hook} />
            <NarrationBlock title="O Incidente" text={script.narration.incident} />
            <NarrationBlock title="A Reviravolta" text={script.narration.twist} />
            <NarrationBlock title="O Desfecho/Pergunta de Engajamento" text={script.narration.conclusion} />
        </div>
      </Section>
    </div>
  );
};

// Add fade-in animation to tailwind config (or just in a style tag for simplicity here)
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);
