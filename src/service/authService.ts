/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISignInFormValues } from "../types/user";
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

export const postSignin = async <T = any>(
  path: string,
  body: ISignInFormValues
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch((error) => handleError(error));
  return await handleResponse({ response });
};

export const postSignOut = async <T = any>(
  path: string,
  accessToken: string
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  }).catch((error) => handleError(error));
  return await handleResponse({ response });
};
