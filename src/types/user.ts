export interface ISignupFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  checkbox: boolean;
}

export interface ISignInFormValues {
  username: string;
  password: string;
}

export type PostSignUpFormValues = Omit<ISignupFormValues, "checkbox">;

export type UserType = {
  id: number | undefined;
  name: string;
  username: string;
  avatar: string;
};

export interface IInformationUser {
  id: number | undefined;
  username: string;
  password?: string;
  email: string;
  name: string;
  avatar: string;
  createdDate?: string;
  updateDate?: string;
}
