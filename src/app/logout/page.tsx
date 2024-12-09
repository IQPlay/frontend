"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    // Appel à l'API de déconnexion
                    await fetch("http://localhost:8080/api/auth/logout", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                } catch (error) {
                    console.error("Erreur lors de la déconnexion :", error);
                } finally {
                    // Suppression du token côté client
                    localStorage.removeItem("token");

                    // Redirection vers la homepage
                    router.replace("/");
                }
            } else {
                // Si aucun token n'est présent, redirige immédiatement
                router.replace("/");
            }
        };

        logout();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Déconnexion en cours...</p>
        </div>
    );
}
