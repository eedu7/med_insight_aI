import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface User {
    id: string;
    email: string;
    username: string;
}


export const requireAuth = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if (res.ok) {
        const user: User = await res.json()
        return user
    }
    redirect('/login');



}


export const requireUnAuth = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if (res.ok) {
        redirect('/chat');
    }
}