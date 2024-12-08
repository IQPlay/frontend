"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Réinitialiser les erreurs
        setSuccess(false); // Réinitialiser le succès

        // Validation côté client
        if (!username || !email || !password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError("Veuillez entrer une adresse e-mail valide.");
            return;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        try {
            setIsSubmitting(true); // Indique que la requête est en cours
            await apiRequest("/auth/register", "POST", { username, email, password });
            setSuccess(true); // Marquer le succès
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
        } finally {
            setIsSubmitting(false); // Réinitialiser l'état de soumission
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-blue-600">Inscription</CardTitle>
                    <CardDescription className="text-gray-600">
                        Créez un compte pour suivre votre progression !
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">Inscription réussie !</p>}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                            <input
                                type="text"
                                placeholder="Choisissez un nom d'utilisateur"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                            <input
                                type="email"
                                placeholder="Entrez votre adresse e-mail"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="Créez un mot de passe"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Inscription..." : "S'inscrire"}
                        </Button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Déjà un compte ?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Connectez-vous
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
