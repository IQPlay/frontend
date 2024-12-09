"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1>Bienvenue sur votre tableau de bord !</h1>
            <Link
                href="/logout"
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Déconnexion
            </Link>
        </div>
    );
}
