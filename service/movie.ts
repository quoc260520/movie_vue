import request from "./index";

export async function getAllMovie(params: any) {
  return request("/movie", {
    method: "GET",
    params: params,
  });
}

export async function createMovie(data: any) {
  return request("/movie/upload-movie", {
    method: "POST",
    data: data,
  });
}

export async function updateMovie(data: any) {
  return request(`/movie/update/${data.id}`, {
    method: "PUT",
    data: data,
  });
}

export async function deleteMovie(id: number) {
  return request(`/movie/delete/${id}`, {
    method: "PUT",
  });
}

export async function unDeleteMovie(id: number) {
  return request(`/movie/un-delete/${id}`, {
    method: "PUT",
  });
}
