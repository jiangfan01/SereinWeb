import request from "../utils/request.js";

// 查询列表
export function fetchCategoryList(params) {
    return request({
        url: '/admin/categories',
        method: 'get',
        params
    });
}

// 查询单条
export function fetchCategory(id) {
    return request({
        url: `/admin/categories/${id}`,
        method: 'get',
    })
}

// 创建
export function createCategory(data) {
    return request({
        url: '/admin/categories',
        method: 'post',
        data
    })
}

// 修改
export function updateCategory(id, data) {
    return request({
        url: `/admin/categories/${id}`,
        method: 'put',
        data
    })
}

// 删除
export function deleteCategory(id) {
    return request({
        url: `/admin/categories/${id}`,
        method: 'delete'
    })
}