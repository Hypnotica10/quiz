/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPostCourse } from "../types/course";
import { handleError, handleResponse, urlRequestFull } from "./apiBase";

export const getCourseBySubjectId = async <T = any>(
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
  return handleResponse({ response });
};

export const getCourseById = async <T = any>(
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

export const createCourse = async <T = any>(
  path: string,
  accessToken: string,
  body: IPostCourse
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
  return handleResponse({ response });
};

export const updateCourseById = async <T = any>(
  path: string,
  accessToken: string,
  body: IPostCourse
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch((error) => handleError(error));
  return handleResponse({ response });
};

export const getCourseByUserId = async <T = any>(
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
  return handleResponse({ response });
};

export const deleteCourseByCourseId = async <T = any>(
  path: string,
  accessToken: string
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  }).catch((error) => handleError(error));
  return handleResponse({ response });
};

export const getQuizTest = async <T = any>(
  path: string,
  accessToken: string,
): Promise<T> => {
  const response: Response | null = await fetch(urlRequestFull(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  }).catch((error) => handleError(error));
  return handleResponse({ response });
};
