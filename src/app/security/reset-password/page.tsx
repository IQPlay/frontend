"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiRequest("/auth/reset-password", "POST", { email });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Erreur lors de la réinitialisation.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-blue-600">Réinitialisation</CardTitle>
                    <CardDescription className="text-gray-600">
                        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">Lien envoyé avec succès !</p>}
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                            <input
                                type="email"
                                placeholder="Entrez votre adresse e-mail"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Envoyer le lien
                        </Button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Rappelez-vous votre mot de passe ?{" "}
                        <Link href="/security/login" className="text-blue-600 hover:underline">
                            Connectez-vous
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
