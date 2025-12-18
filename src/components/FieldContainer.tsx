import React from 'react';

interface FieldContainerProps {
    children: React.ReactNode;
    // Adicionamos 'w-full' como padrão no componente, o resto será sobrescrito
    // por classes de breakpoint no componente pai.
    className?: string; 
}

export const FieldContainer: React.FC<FieldContainerProps> = ({ children, className = "" }) => (
    // Removido o 'flex-col' para permitir maior controle de layout no pai
    <div className={`flex flex-col gap-2 ${className}`}> 
        {children}
    </div>
);