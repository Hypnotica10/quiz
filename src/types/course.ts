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
  id?: string | number;
  title?: string;
  description?: string;
  majorId?: string;
  userId?: string;
  sentences?: ISentence[];
}
