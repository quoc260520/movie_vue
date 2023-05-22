import request from "./index";

export async function getAllCoupon(params: any) {
  return request("/coupon", {
    method: "GET",
    params: params,
  });
}

export async function createCoupon(data: any) {
  return request("/coupon", {
    method: "POST",
    data: data,
  });
}

export async function updateCategory(data: any) {
  return request(`/category/update/${data.id}`, {
    method: "PUT",
    data: data,
  });
}

export async function deleteCategory(id: number) {
  return request(`/category/delete/${id}`, {
    method: "PUT",
  });
}

export async function unDeleteCategory(id: number) {
  return request(`/category/un-delete/${id}`, {
    method: "PUT",
  });
}
