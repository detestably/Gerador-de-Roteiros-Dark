
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg w-full">
            <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white tracking-wider">
                    <span className="text-indigo-400">Gerador</span> de Roteiros <span className="text-red-500">Dark</span>
                </h1>
            </div>
        </header>
    );
};
