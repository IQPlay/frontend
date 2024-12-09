"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/api";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        clearToken();
        router.replace("/");
    }, [router]);

    return <p>Déconnexion en cours...</p>;
}
