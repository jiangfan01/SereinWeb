import request from "../../utils/request.js";

// 登录
export function login(data) {
    return request({
        url: "/admin/auth/login",
        method: "post",
        data,
    });
}

// 邮箱注册
export function emailLogin(data) {
    return request({
        url: "/admin/users/emailLogin",
        method: "post",
        data,
    });
}

//发送邮件
export function sendEmail(data) {
    return request({
        url: "/admin/users/email",
        method: "post",
        data,
    });
}

//当前用户
export function getInfoMe(data) {
    return request({
        url: "/admin/users/me",
        method: "get",
        data,
    });
}