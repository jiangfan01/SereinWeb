import Cookies from "js-cookie";

// cookie中key的命名
const TokenKey = "token";

/**
 * 获取cookie中的token
 * @returns {*}
 */
export function getToken() {
    return Cookies.get(TokenKey);
}

/**
 * 设置token到cookie中
 * @param token
 * @param remember
 * @returns {*}
 */
export function setToken(token, remember = false) {
    // 记住我
    if (remember) {
        return Cookies.set(TokenKey, token, { expires: 7 });
    }

    return Cookies.set(TokenKey, token);
}

/**
 * 删除cookie中的token
 * @returns {*}
 */
export function removeToken() {
    return Cookies.remove(TokenKey);
}
