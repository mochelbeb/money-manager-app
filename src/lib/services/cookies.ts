import {cookies} from "next/headers";

export const setCookies = (header: string, cookie: string) => {
    cookies().set(header, cookie, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
}

export const getCookies = (header: string) => {
    return cookies().get(header);
}

export const getSession = () => {
    return cookies().get('session');
}