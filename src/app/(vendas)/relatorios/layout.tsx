"use client";

import Sidebar from "@/components/(sidebar)/Sidebar";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function RelatoriosLayout({children}: {children: ReactNode}) {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    // 🛑 ESTADO: Variável de estado para controlar a exibição do loading
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const FULL_WIDTH = 'ml-64';    // 256px
    const COLLAPSED_WIDTH = 'ml-20'; // 80px (para caber os ícones)
    
    const BUTTON_OPEN_POSITION = 'left-64'; 
    const BUTTON_CLOSED_POSITION = 'left-4'; 

    return (
        <div className="flex min-h-screen bg-gray-950"> 
            
            {/* 1. O Botão Toggle */}
            <button 
                onClick={toggleSidebar} 
                className={`cursor-pointer fixed top-4 p-2 z-50 text-white transition-all duration-300 rounded-full bg-green-700 hover:bg-green-600 
                    ${isSidebarOpen ? BUTTON_OPEN_POSITION : BUTTON_CLOSED_POSITION}
                    lg:hidden
                `}
                aria-label={isSidebarOpen ? "Fechar Menu" : "Abrir Menu"}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 2. A Sidebar (Passa o setLoading) */}
            {/* NOTA: A prop 'setLoading' deve ser usada no seu Sidebar.tsx, 
               especialmente no botão de Logout ou em links externos. */}
            <Sidebar isOpen={isSidebarOpen} setLoading={setLoading} router={router}/> 

            {/* 3. Conteúdo Principal da Página */}
            <main 
                className={`
                    flex-1 grow w-full relative
                    transition-all duration-300 
                    pt-6 sm:pt-8 md:pt-10 
                    px-4 sm:px-6 md:px-10 
                    overflow-y-auto
                    ${isSidebarOpen ? FULL_WIDTH : COLLAPSED_WIDTH}
                `}
            >
                
                
                {children}
            </main>

            {loading && (
                <div 
                    className="
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
            )}
        </div>
    )
}