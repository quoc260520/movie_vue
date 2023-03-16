import request from "./index";

export async function getAllUser(params: any) {
  return request("/user", {
    method: "GET",
    params: params,
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
  return request("/user", {
    method: "GET",
    params: params,
  });
}

export async function deleteUser(id: number) {
  return request(`/user/delete-user/${id}`, {
    method: "PUT",
  });
}

export async function unDeleteUser(id: number) {
  return request(`/user/un-delete-user/${id}`, {
    method: "PUT",
  });
}

export async function updateUser(data:any) {
  return request(`/user/update-user/${data.id}`, {
    method: "PUT",
    data: data
  });
}