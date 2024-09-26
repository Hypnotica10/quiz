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
  id: number;
  name: string;
  username: string;
  avatar: string;
};
