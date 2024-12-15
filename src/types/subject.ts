export interface IMajor {
  id?: number;
  name?: string;
  description?: string;
}

export interface ISubject {
  id: number;
  name: string;
  description?: string;
  major?: IMajor[];
}
