/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

export const getAllSubject = async <T = any>(
  path: string,
  params?: unknown
): Promise<T> => {
  const response: Response | null = await fetch(
    urlRequestFull(path, params as string),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => handleError(error));
  return await handleResponse({ response });
};

export const getAllMajor = async <T = any>(
  path: string,
  accessToken: string
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  }).catch((error) => handleError(error));
  return await handleResponse({ response });
};
