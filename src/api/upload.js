import request from "../../utils/request.js";

// 查询列表
export function uploadToken(params) {
    return request({
        url: '/uploadToken',
        method: 'get',
        params
    });
}