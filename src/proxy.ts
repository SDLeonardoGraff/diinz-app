import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'auth_token';
const isAuthenticated = (request: NextRequest) => {
    return !!request.cookies.get(AUTH_COOKIE_NAME);
};
// As rotas protegidas agora estão agrupadas por tipo.
const protectedUIRoutes = ['/dashboard', '/vendas', '/configuracoes'];
const protectedAPIRoutes = ["/api/vendas"];

const publicRoutes = ['/login', "/api/login"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userIsAuthenticated = isAuthenticated(request);
    
    // 1. Lógica para Rotas Protegidas (UI e API)
    
    // Checa se a rota atual está na lista de rotas protegidas (UI ou API)
    const isProtected = protectedUIRoutes.some(route => pathname.startsWith(route)) ||
                        protectedAPIRoutes.some(route => pathname.startsWith(route));

    if (isProtected) {
        if (!userIsAuthenticated) {
            
            const isApiRoute = protectedAPIRoutes.some(route => pathname.startsWith(route));

            if (isApiRoute) {
                // 🛑 CORREÇÃO CRÍTICA: Retorna 401 Unauthorized para APIs
                return new NextResponse(
                    JSON.stringify({ message: 'Não autorizado. Requer autenticação.' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            } else {
                // Para Páginas (UI), redireciona para a página de login
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('from', pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    // 2. Lógica para Rotas Públicas (Se Logado, Redireciona para o Dashboard)
    // Se for uma rota pública E o usuário estiver logado
    if (publicRoutes.includes(pathname) && userIsAuthenticated) {
        // Ignora redirecionamento se for uma rota de API pública (/api/login), apenas para UI.
        if (!pathname.startsWith('/api')) { 
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }
    
    return NextResponse.next();
}

// O matcher pode ser simplificado agora que toda a lógica está no middleware
export const config = {
    matcher: [
        // Inclui /api/ e todas as outras rotas, exceto arquivos estáticos
        '/((?!_next/static|_next/image|favicon.ico|assets).*)',
    ],
};