import request from "../../utils/request.js";
// 查询列表
export function fetchChapterList(params) {
  return request({
    url: "/admin/chapters",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchChapter(id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: "get",
  });
}

// 创建
export function createChapter(data) {
  return request({
    url: "/admin/chapters",
    method: "post",
    data,
  });
}

// 修改
export function updateChapter(id, data) {
  return request({
    url: `/admin/chapters/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteChapter(id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: "delete",
  });
}
