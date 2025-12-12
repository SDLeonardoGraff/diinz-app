// // SidebarItem.tsx

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // Hook para saber a rota atual
// import { ChevronDown, ChevronUp } from 'lucide-react';

// interface SubItem {
//     name: string;
//     href: string;
// }

// interface SidebarItemProps {
//     item: {
//         name: string;
//         icon: React.ElementType; // Tipo para ícones do Lucide
//         href: string;
//         children?: SubItem[];
//     };
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
//     const pathname = usePathname();
//     const [isExpanded, setIsExpanded] = useState(false);
    
//     // Verifica se o link atual ou qualquer sublink está ativo
//     const isActive = pathname === item.href || 
//                      item.children?.some(child => pathname.startsWith(child.href));
    
//     // Classes de base e hover
//     const baseClasses = "flex items-center p-3 rounded-lg transition-colors duration-200";
//     const activeClasses = "bg-green-700 text-white font-semibold shadow-md";
//     const inactiveClasses = "text-gray-300 hover:bg-gray-700";

//     const ItemIcon = item.icon;
//     const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

//     // Se tiver filhos, renderiza como um botão de dropdown
//     if (item.children) {
//         return (
//             <div className="w-full">
//                 <button
//                     onClick={() => setIsExpanded(!isExpanded)}
//                     className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} justify-between w-full`}
//                 >
//                     <div className="flex items-center">
//                         <ItemIcon size={20} className="mr-3" />
//                         <span>{item.name}</span>
//                     </div>
//                     <ChevronIcon size={16} className="ml-2" />
//                 </button>
                
//                 {/* Sub-links */}
//                 {isExpanded && (
//                     <div className="ml-6 mt-1 space-y-1">
//                         {item.children.map((child) => (
//                             <Link href={child.href} key={child.name}>
//                                 <a className={`block py-2 px-3 rounded-md transition-colors duration-200 text-sm 
//                                              ${pathname === child.href ? 'bg-green-700 text-white font-medium' : 'text-gray-400 hover:bg-gray-700'}`}>
//                                     {child.name}
//                                 </a>
//                             </Link>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     // Se não tiver filhos, renderiza como um link simples
//     return (
//         <Link href={item.href} legacyBehavior>
//             <a className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} w-full`}>
//                 <ItemIcon size={20} className="mr-3" />
//                 <span>{item.name}</span>
//             </a>
//         </Link>
//     );
// };

// export default SidebarItem;

// SidebarItem.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook para saber a rota atual
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubItem {
    name: string;
    href: string;
}

interface SidebarItemProps {
    item: {
        name: string;
        icon: React.ElementType; // Tipo para ícones do Lucide
        href: string;
        children?: SubItem[];
    };
    // 1. REINTRODUZINDO a prop 'isOpen' (necessária para a Sidebar colapsável)
    isOpen: boolean; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isOpen }) => { // 2. RECEBENDO 'isOpen'
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Verifica se o link atual ou qualquer sublink está ativo
    const isActive = pathname === item.href || 
                     item.children?.some(child => pathname.startsWith(child.href));
    
    // Classes de base e hover
    // Ajustado para centralizar e esconder a seta se estiver colapsado
    const baseClasses = `flex items-center p-3 rounded-lg transition-colors duration-200 
                         ${isOpen ? 'justify-start' : 'justify-center'}`; 
                         
    const activeClasses = "bg-green-700 text-white font-semibold shadow-md";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700";

    const ItemIcon = item.icon;
    const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;
    
    const titleText = isOpen ? undefined : item.name;

    // Se tiver filhos, renderiza como um botão de dropdown
    if (item.children) {
        return (
            <div className="w-full">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} w-full`}
                    title={titleText}
                >
                    <div className="flex items-center">
                        {/* 3. Lógica para ícone colapsado */}
                        <ItemIcon size={20} className={isOpen ? "mr-3" : "mx-auto"} /> 
                        
                        {/* 4. Oculta o texto */}
                        {isOpen && <span>{item.name}</span>}
                    </div>
                    
                    {/* 5. Oculta a seta */}
                    {isOpen && <ChevronIcon size={16} className="ml-2" />}
                </button>
                
                {/* Sub-links */}
                {/* 6. Sublinks só aparecem se expandido E a Sidebar estiver aberta */}
                {isExpanded && isOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                            // 🛑 CORREÇÃO AQUI: Removemos o <a> envolto e aplicamos className no Link
                            <Link 
                                href={child.href} 
                                key={child.name}
                                className={`block py-2 px-3 rounded-md transition-colors duration-200 text-sm 
                                             ${pathname === child.href ? 'bg-green-700 text-white font-medium' : 'text-gray-400 hover:bg-gray-700'}`}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Se não tiver filhos, renderiza como um link simples
    return (
        // 🛑 CORREÇÃO AQUI: Removemos legacyBehavior e a tag <a>. Aplicamos classes no Link.
        <Link 
            href={item.href} 
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} w-full`}
            title={titleText}
        >
            {/* Lógica para ícone colapsado */}
            <ItemIcon size={20} className={isOpen ? "mr-3" : "mx-auto"} />
            
            {/* Oculta o texto */}
            {isOpen && <span>{item.name}</span>}
        </Link>
    );
};

export default SidebarItem;