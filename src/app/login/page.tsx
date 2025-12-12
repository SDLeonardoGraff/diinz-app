"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export default function Login() {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    
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
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(34 197 94) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />
            <div
                className="relative w-full max-w-md"
            >
                <Card
                    className="bg-gray-950/80 backdrop-blur-sm border-gray-950/50 shadow-2xl"
                >
                    <CardHeader className="space-y-4 text-center">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-primary"/>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold text-foreground">Bem-Vindo de volta!</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Faça login em sua conta para acessar o sistema!
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}