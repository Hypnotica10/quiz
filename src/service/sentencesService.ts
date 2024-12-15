/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

export const getSentencesByCourseId = async <T = any>(
    path: string,
    accessToken: string,
    param: string
  ): Promise<T> => {
    const response: Response | null = await fetch(urlRequestFull(path, param), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    }).catch((error) => handleError(error));
    return handleResponse({ response });
  };