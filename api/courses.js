import request from "../utils/request.js";

// 查询列表
export function fetchCourseList(params) {
    return request({
        url: '/admin/courses',
        method: 'get',
        params
    });
}

// 查询单条
export function fetchCourse(id) {
    return request({
        url: `/admin/courses/${id}`,
        method: 'get',
    })
}

// 创建
export function createCourse(data) {
    return request({
        url: '/admin/courses',
        method: 'post',
        data
    })
}

// 修改
export function updateCourse(id, data) {
    return request({
        url: `/admin/courses/${id}`,
        method: 'put',
        data
    })
}

// 删除
export function deleteCourse(id) {
    return request({
        url: `/admin/courses/${id}`,
        method: 'delete'
    })
}