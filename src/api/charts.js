import request from "../../utils/request.js";

export function courseCharts() {
  return request({
    url: "/admin/chatrs/courses",
    method: "get",
  });
}

export function sexesCharts() {
  return request({
    url: "/admin/chatrs/sexes",
    method: "get",
  });
}

export function articlesCharts() {
  return request({
    url: "/admin/chatrs/articles",
    method: "get",
  });
}

export function usersCharts() {
  return request({
    url: "/admin/chatrs/users",
    method: "get",
  });
}
