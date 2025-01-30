"use client";

import { useEffect } from "react";
import { apiRequest } from "@/lib/api";

export default function Logout() {
    useEffect(() => {
        const performLogout = async () => {
            try {
                await apiRequest("/auth/logout", "POST");
            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error);
            } finally {
                window.location.href = "/security/login";
            }
        };

        performLogout();
    }, []);

    return <p className="text-center text-gray-600">Déconnexion en cours...</p>;
}
