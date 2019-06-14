import request from "../utils/request";

export function getMessage() {
  return request({
    method: "get",
    url: "/api/getMessage"
  });
}
