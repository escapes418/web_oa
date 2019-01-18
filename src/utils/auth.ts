const TokenKey = "web_oa_sessionid";

export function getToken() {
    return localStorage.getItem(TokenKey);
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}
