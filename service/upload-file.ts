import request from "./index";

export async function uploadMultiImage(data: any) {
  return request("/upload-file/upload-multi", {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    method: "POST",
    data: data,
  });
}
 
export async function uploadFile(data: any) {
  return request("/upload-file", {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    method: "POST",
    data: data,
  });
}