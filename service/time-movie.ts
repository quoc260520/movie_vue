import request from "./index";

export async function getAllTime(params: any) {
  return request("/showtime-movie", {
    method: "GET",
    params: params,
  });
}

export async function createTimeMovie(data: any) {
  return request("/showtime-movie/create-multi-room", {
    method: "POST",
    data: data,
  });
}

