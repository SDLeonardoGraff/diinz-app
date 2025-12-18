'use client';

export default function Loading() {
  return (
        <div className="
                absolute inset-0 z-50 
                flex items-center justify-center 
                bg-gray-900/10 backdrop-blur-sm 
                pointer-events-auto
                transition-opacity duration-300 ease-in-out
            "
        >
            {/* Indicador de Loading Estilizado */}
            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-800 shadow-2xl">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                <p className="mt-3 text-white text-md font-medium">Carregando...</p>
            </div>
        </div>
  );
}
