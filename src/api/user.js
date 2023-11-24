import request from "../../utils/request.js";

// 查询列表
export function fetchUserList(params) {
    return request({
        url: "/admin/users",
        method: "get",
        params,
    });
}

// 查询单条
export function fetchUser(id) {
    return request({
        url: `/admin/users/${id}`,
        method: "get",
    });
}

// 创建
export function createUser(data) {
    return request({
        url: "/admin/users",
        method: "post",
        data,
    });
}

// 修改
export function updateUser(id, data) {
    return request({
        url: `/admin/users/${id}`,
        method: "put",
        data,
    });
}

// 删除
export function deleteUser(id) {
    return request({
        url: `/admin/users/${id}`,
        method: "delete",
    });
}
