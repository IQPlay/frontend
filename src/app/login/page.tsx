"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace("/dashboard");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };

        try {
            const data = await apiRequest("/auth/login", "POST", payload);
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Erreur de connexion.");
        }
    };

    // Retourne un écran vide si l'utilisateur est déjà connecté
    if (isAuthenticated()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-blue-600">Connexion</CardTitle>
                    <CardDescription className="text-gray-600">
                        Connectez-vous avec votre email !
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Entrez votre email"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Se connecter
                        </Button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Pas de compte ?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
