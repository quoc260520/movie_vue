import request from "./index";

export async function getSlide(params: any) {
  return request("/slide", {
    method: "GET",
    params: params,
  });
}

export async function createSlide(data: any) {
  return request("/slide", {
    method: "POST",
    data: data,
  });
}

export async function updateSlide(data: any) {
  return request(`/slide/${data.id}`, {
    method: "PUT",
    data: data,
  });
}

export async function deleteSlide(id: number) {
  return request(`/slide/${id}`, {
    method: "DELETE",
  });
}
