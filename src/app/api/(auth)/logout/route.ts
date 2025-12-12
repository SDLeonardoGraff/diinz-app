// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const AUTH_COOKIE_NAME = 'auth_token';

export async function POST() {
  // Serializa um cookie com a mesma chave, mas com data de expiração no passado (Max-Age: 0)
  const expiredCookie = serialize(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // ⚠️ Define a expiração para o passado
    path: '/',
    sameSite: 'strict',
  });

  const response = new NextResponse(
    JSON.stringify({ success: true, message: 'Logout bem-sucedido' }),
    { status: 200 }
  );

  // Anexa o cookie expirado na resposta HTTP
  response.headers.set('Set-Cookie', expiredCookie);

  return response;
}