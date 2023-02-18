import request from "./index";

export async function getAllUser() {
  return request("/user", {
    method: "GET",
  });
}

export async function login(data: any) {
  return request("/user/login", {
    method: "POST",
    data: data,
  });
}

export async function register(data: any) {
  return request("/user", {
    method: "POST",
    data: data,
  });
}

export async function getUser(params: any) {
  return request("/user/getOne", {
    method: "GET",
    params: params,
  });
}
