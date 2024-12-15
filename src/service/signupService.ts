/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostSignUpFormValues } from "../types/user";
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

export const postSignUp = async <T = any>(
  path: string,
  body: PostSignUpFormValues
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((error) => handleError(error));
  return await handleResponse({ response });
};
