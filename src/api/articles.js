import request from "../../utils/request.js";

// 查询列表
export function fetchArticleList(params) {
    return request({
        url: '/admin/articles',
        method: 'get',
        params
    });
}

// 查询单条
export function fetchArticle(id) {
    return request({
        url: `/admin/articles/${id}`,
        method: 'get',
    })
}

// 创建
export function createArticle(data) {
    return request({
        url: '/admin/articles',
        method: 'post',
        data
    })
}

// 修改
export function updateArticle(id, data) {
    return request({
        url: `/admin/articles/${id}`,
        method: 'put',
        data
    })
}

// 删除
export function deleteArticle(id) {
    return request({
        url: `/admin/articles/${id}`,
        method: 'delete'
    })
}