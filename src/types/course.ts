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

export interface IPostQuizTest {
  courseId: number;
  questionNumber: number;
}

export type SentenceTest = {
  question: string;
  answer: string[];
};

export interface IQuizTestResponse {
  questionNumber: number;
  title: string;
  listSentence: SentenceTest[];
  solution: { [K: string]: string };
}
