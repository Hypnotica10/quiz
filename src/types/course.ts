import { ISentence } from "./sentence";
import { IMajor } from "./subject";
import { UserType } from "./user";

export interface ICourse {
  id?: number;
  title?: string;
  description?: string;
  createdDate?: Date;
  major?: IMajor;
  user?: UserType;
  countSentence?: number;
}

export interface IPostCourse {
  title?: string;
  description?: string;
  majorId?: number | string;
  userId?: number | string;
  sentences?: ISentence[];
}
