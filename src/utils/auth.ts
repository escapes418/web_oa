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


export function getCookie(cookieName) {
    var allcookies = document.cookie;
    var cookiePos = allcookies.indexOf(cookieName); //索引的长度
    if (cookiePos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookiePos += cookieName.length + 1;
        var cookieEnd = allcookies.indexOf(";", cookiePos);

        if (cookieEnd == -1) {
            cookieEnd = allcookies.length;
        }
        var value = decodeURI(allcookies.substring(cookiePos, cookieEnd));
    }
    return value;
}
