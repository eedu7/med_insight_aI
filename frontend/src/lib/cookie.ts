import Cookies from "js-cookie";

type CookieKey = "accessToken" | "refreshToken";

export const setCookie = (key: CookieKey,value: string, expires: number = 7) => {
    Cookies.set(key, value, { expires });
}

export const getCookie = (key: CookieKey): string | undefined => {
    return Cookies.get(key);
}

export const deleteCookie = (key: CookieKey) => {
    Cookies.remove(key);
}