// Sidebar.tsx

import React, { useState } from 'react';
import { sidebarItems } from './data';
import SidebarItem from './SidebarItem';
import { LogOut, Sun, Moon } from 'lucide-react'; // Importados para o toggle de tema
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SidebarProps {
    isOpen: boolean; // Recebe o estado do Layout Pai
    setLoading: (value: boolean) => void;
    router: AppRouterInstance;
}

export default function Sidebar({ isOpen, setLoading, router }: SidebarProps) {
    // Estado local para o tema (necessário para o toggle funcionar)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark'); 

    const handleLogout = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                // Chama o endpoint de API de logout
                const response = await fetch('/api/logout', {
                    method: 'POST',
                });

                if (response.ok) {
                    // Redireciona para a página inicial (que deve ser a de login)
                    
                        // Redireciona para a página de login
                        router.refresh(); // Força a revalidação de rotas após a remoção do cookie
                        router.push('/login');
                    // 2000 milissegundos = 2 segundos
                    // router.push('/login');
                } else {
                    console.error('Falha ao deslogar:', response.statusText);
                    // Em caso de erro, ainda podemos tentar redirecionar por segurança
                    // router.push('/'); 
                }
            } catch (error) {
                console.error('Erro de rede ao deslogar:', error);
                router.push('/login'); // Redireciona mesmo com erro de rede
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        // NOTA: Implementar a lógica de aplicar a classe 'dark' ao <html> ou body globalmente
    };

    // Define a largura base da sidebar: w-64 (aberta) ou w-20 (colapsada para ícones)
    const sidebarWidthClass = isOpen ? 'w-64' : 'w-20'; 
    
    // Define o ícone de tema baseado no estado atual
    const ThemeIcon = theme === 'dark' ? Sun : Moon;

    return (
        // 1. ALTERADO: Transição de largura em vez de translate-x. 
        // Usamos 'transition-all' para animar a largura e o conteúdo.
        <div 
            className={`
                ${sidebarWidthClass} bg-gray-800 text-white flex flex-col h-screen p-4 
                fixed top-0 left-0 z-40 shadow-xl
                transition-all duration-300 ease-in-out
            `}
        >
            {/* Cabeçalho/Logo */}
            <div className="mb-10 pt-2 border-b border-gray-700 pb-4 overflow-hidden transition-all duration-300">
                {/* Oculta o texto quando a sidebar está fechada */}
                <span className={`text-2xl font-extrabold text-green-500 
                                  ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    ERP Diinz
                </span>
            </div>

            {/* Links de Navegação */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => (
                    // 2. PASSANDO isOpen para SidebarItem (essencial para esconder o texto)
                    <SidebarItem key={item.name} item={item} isOpen={isOpen}/>
                ))}
            </nav>

            {/* 3. Rodapé/Controles */}
            <div className="mt-6 pt-4 border-t border-gray-700">
                
                {/* Botão de Sair */}
                <button
                    onClick={handleLogout}
                    // Ajuste para centralizar o ícone quando colapsado
                    className={`flex cursor-pointer items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200 
                                ${isOpen ? 'justify-start' : 'justify-center'}`}
                >
                    <LogOut size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
                    {isOpen && <span>Sair</span>} {/* Oculta o texto */}
                </button>
                
                {/* 4. Contêiner da Versão e Tema (usando justify-between) */}
                <div 
                    className={`mt-2 text-sm text-gray-400 overflow-hidden 
                                flex items-center 
                                ${isOpen ? 'justify-between' : 'justify-center'}`} 
                >
                    {/* Texto de Versão */}
                    <div className={isOpen ? '' : 'hidden'}> 
                        <p>Versão 0.1.0</p>
                    </div>
                    
                    {/* Botão de Tema */}
                    <button
                        onClick={toggleTheme}
                        title={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
                        className={`p-1 rounded-full text-gray-400 hover:text-green-500 transition-colors duration-200 
                                    ${!isOpen && 'mx-auto'}`}
                    >
                        <ThemeIcon size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}