import request from "../../utils/request.js";

export function fetchArticle(id) {
    return request({
        url: `/articles/${id}`,
        method: "get",
    });
}

export function fetchChapter(id) {
    return request({
        url: `/chapters/${id}`,
        method: "get",
    });
}
