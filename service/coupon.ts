import request from "./index";

export async function getAllCoupon(params: any) {
  return request("/coupon", {
    method: "GET",
    params: params,
  });
}

export async function getCoupon(id: number) {
  return request(`/coupon/${id}`, {
    method: "GET",
  });
}

export async function createCoupon(data: any) {
  return request("/coupon", {
    method: "POST",
    data: data,
  });
}

export async function updateCoupon(data: any) {
  return request(`/coupon/${data.id}`, {
    method: "PUT",
    data: data,
  });
}

export async function deleteCoupon(id: number) {
  return request(`/coupon/delete/${id}`, {
    method: "PUT",
  });
}

export async function unDeleteCoupon(id: number) {
  return request(`/coupon/un-delete/${id}`, {
    method: "PUT",
  });
}
