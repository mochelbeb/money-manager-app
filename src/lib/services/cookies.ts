
export const setCookies = (header: string, cookie: string) => {
    document.cookie = `${header}=${cookie}; path=/`;
}