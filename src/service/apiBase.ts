/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleToast } from "../helper/handleToastify";
import { CommonResponse, IHandleResponse } from "../types/response";

const API_URL: string = "http://localhost:8081";

export const urlRequestFull = (path: string, params?: string): string => {
  const url = new URL(
    params ? `${API_URL}${path}/${params}` : `${API_URL}${path}`
  );
  return url.toString();
};

export const handleError = (error: any) => {
  if (error?.message && error?.code) {
    if (error?.code === 401 && !error?.urlRequest.includes("/auth/signin")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "http://localhost:5173/";
      return null;
    }
    handleToast(error?.message, "error");
  } else {
    throw error;
  }
  return null;
};

export const handleResponse = async ({
  response,
}: IHandleResponse): Promise<any> => {
  let message = "";
  let resJson: CommonResponse = {};
  const urlRequest = response?.url;
  if (response) {
    try {
      resJson = await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
    if (!response.ok) {
      switch (response?.status) {
        case 401:
          message = resJson.error || "Lỗi đăng nhập";
          break;
        case 403:
          message = resJson.error || "Không có quyền truy cập";
          break;
        case 404:
          message = resJson.error || "Không tồn tại";
          break;
        default:
          message = Array.isArray(resJson.error)
            ? resJson.error[0]
            : resJson.error || "Hệ thống lỗi";
          break;
      }
    } else {
      return resJson;
    }
  }
  if (message) {
    return handleError({
      message: message,
      code: resJson?.statusCode,
      urlRequest,
    });
  }
  return resJson;
};
