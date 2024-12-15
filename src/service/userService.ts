import { IInformationUser } from "../types/user";
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserById = async <T = any>(
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

export const updateUser = async <T = any>(
  path: string,
  accessToken: string,
  body: IInformationUser
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch((error) => handleError(error));
  return await handleResponse({ response });
};
