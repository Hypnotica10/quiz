/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CommonResponse<T = any> {
  error?: string;
  message?: string;
  statusCode?: number;
  data?: T[];
}

export interface IHandleResponse {
  response?: Response | null;
  resJson?: CommonResponse | null;
}
