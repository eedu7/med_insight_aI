import { deleteCookie, getCookie, setCookie } from "@/lib/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserLogin {
    email: string;
    password: string;
}

interface UserCreate extends UserLogin {
    username: string;
}

interface User {
    id: string;
    email: string;
    username: string;
}

interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

interface AuthResponse {
    token: Token;
    user: User;
}

export const useRegister = () => {
    return useMutation({
        mutationKey: ["auth", "registerUser"],
        mutationFn: async (data: UserCreate) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                toast.error("Error registering user");
                throw new Error("Failed to register user")
            }

            return res.json() as Promise<AuthResponse>;
        },
        onSuccess: (data) => {
            toast.success("User logged in successfully");

            setCookie("accessToken", data.token.access_token, 7);
            setCookie("refreshToken", data.token.refresh_token, 30);

        }
    })
}

export const useLogin = () => {
    return useMutation({
        mutationKey: ["auth", "loginUser"],
        mutationFn: async (data: UserLogin) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                toast.error("Error login user");
                throw new Error("Failed to login user")
            }

            return res.json() as Promise<AuthResponse>;
        },
        onSuccess: (data) => {
            toast.success("User logged in successfully");

            setCookie("accessToken", data.token.access_token, 7);
            setCookie("refreshToken", data.token.refresh_token, 30);

        }
    })
}

export const useLogout = () => {
    const router = useRouter()
    // TODO: Call the Logout API, when ready
    return useMutation({
        mutationKey: ["auth", "logout"],
        mutationFn: async () => {

            await new Promise((resolve) => setTimeout(resolve, 500));

            deleteCookie("accessToken");
            deleteCookie("refreshToken");
        },
        onSuccess: () => {
            toast.success("Logged Out")
            router.replace("/login")
        }
    }
)
}

export const useGetUser = () => {
    const accessToken = getCookie("accessToken");
    return useQuery({
        queryKey: ["auth", "getUser"],
        queryFn: async () => {


            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            })

            if (!res.ok) {
                toast.error("Error login user");
                throw new Error("Failed to login user")
            }

            return res.json() as Promise<AuthResponse>;
        }
    })
}