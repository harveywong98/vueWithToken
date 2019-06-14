import request from "../utils/request";

export function loginByUsername(data) {
  return request({
    url: "/api/login",
    method: "post",
    data: data
  });
}
