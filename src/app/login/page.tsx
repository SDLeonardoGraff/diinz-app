"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as THREE from 'three';

export default function Login() {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            import("vanta/dist/vanta.fog.min").then((VANTA) => {
                const effect = VANTA.default({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    highlightColor: 0x00ffaa,
                    midtoneColor: 0x0099cc,
                    lowlightColor: 0x3366ff,
                    baseColor: 0x0a0a0a,
                    blurFactor: 0.5,
                    speed: 1.0,
                    zoom: 1.2,
                });
                setVantaEffect(effect);
            });
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        }
    }, [vantaEffect]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, rememberMe})
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Login realizado com sucesso!");
            } else if (res.status === 400 || res.status === 401) {
                toast.error('Credenciais inválidas.\nVerifique seu e-mail ou senha.');
            } else {
                toast.error('Erro no servidor. Tente novamente mais tarde.');
            }
        } catch (e: any) {
            toast.error('Não foi possível conectar ao servidor.');
            console.error("Erro de rede/fetch:", e);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div
            ref={vantaRef}
            className="relative min-h-screen flex items-center justify-center md:justify-start px-4 md:px-24 lg:px-48 text-white"
            style={{overflow: "hidden"}}
        >
            <div 
                className="absolute inset-0 bg-linear-to-br from-black via-black to-neutral-950/20" 
            />
            <div
                className="
                    relative 
                    w-full 
                    max-w-md"
            >
                <Card
                    className="bg-[#161616]/80 backdrop-blur-sm border-[#161616]/50 shadow-2xl"
                >
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto w-16 h-16 bg-[#58a547]/10 rounded-2xl flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-[#58a547]"/>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold text-foreground">Bem-Vindo de volta!</CardTitle>
                            <CardDescription className="text-[#808080]">
                                Faça login em sua conta para acessar o sistema!
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form 
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            // autoComplete="on"
                        >
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-[#eeeeee]"
                                >
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#808080]"
                                    />
                                    <Input 
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12 bg-[#0b0b0b] border-[#161616] focus:border-[#58a547] focus:ring-[#58a547]"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-[#eeeeee]"
                                >
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#808080]"
                                    />
                                    <Input 
                                        id="password"
                                        type={showPassword ? "text": "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-12 pr-10 bg-[#0b0b0b] border-[#161616] focus:border-[#58a547] focus:ring-[#58a547]"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-[#808080] hover:text-[#eeeeee] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                        className="border-border cursor-pointer data-[state=checked]:bg-[#58a547] data-[state=checked]:border-[#58a547]"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-[#808080] cursor-pointer">
                                        Lembrar de mim
                                    </Label>
                                </div>
                                <Link 
                                    href="/forget-password"
                                    className="text-sm text-[#58a547] hover:text-[#58a547]/80 transition-colors"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-[#58a547] hover:bg-[#58a547]/90 text-[#222222] font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#58a547]/25"
                            >
                                {
                                    isLoading ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#222222] border-t-transparent "/>
                                            Entrando...
                                        </>
                                    ) : (
                                        "Entrar"
                                    )
                                }
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-[#161616]" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#161616] px-2 text-[#808080]">ou</span>
                            </div>
                        </div>

                        <div className="text-center text-sm text-[#808080]">
                            Não tem uma conta?
                            <Link href="/register" className="ml-2 text-[#58a547] hover:text-[#58a547]/80 font-medium transition-colors">
                                Criar conta
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-xs text-[#808080]">
                    <p>© 2025 ERP Dashboard. Todos os direitos reservados.</p>
                    <div className="mt-2 space-x-4">
                        <Link href="/privacy" className="hover:text-[#eeeeee] transition-colors">
                            Privacidade
                        </Link>
                        <Link href="/terms" className="hover:text-[#eeeeee] transition-colors">
                            Termos
                        </Link>
                        <Link href="/support" className="hover:text-[#eeeeee] transition-colors">
                            Suporte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}