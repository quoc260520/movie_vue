import request from "./index";

export async function getAllRoom(params: any) {
  return request("/room", {
    method: "GET",
    params: params,
  });
}

export async function createRoom(data: any) {
  return request("/room", {
    method: "POST",
    data: data,
  });
}

export async function updateRoom(data: any) {
  return request(`/room/${data.id}`, {
    method: "PUT",
    data: data,
  });
}

export async function deleteRoom(id: number) {
  return request(`/room/delete/${id}`, {
    method: "PUT",
  });
}

export async function unDeleteRoom(id: number) {
  return request(`/room/unDelete/${id}`, {
    method: "PUT",
  });
}
