import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useLogInContext } from "../context/LogInContext";
import { postSignUp } from "../service/signupService";
import { ISignupFormValues, PostSignUpFormValues } from "../types/user";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { Icon, Image } from "./common";
import TextInput from "./TextInput";
import React from "react";
import { handleToast } from "../helper/handleToastify";

const initialValues: ISignupFormValues = {
  name: "",
  email: "",
  username: "",
  password: "",
  checkbox: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Min 2 characters")
    .max(20, "Must 20 or least")
    .required("Required"),
  email: Yup.string().required("Required").trim().email(),
  username: Yup.string()
    .required("Required")
    .trim()
    .min(3, "Too short")
    .max(20, "Too long"),
  password: Yup.string()
    .required("Required")
    .trim()
    .matches(
      /^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\*.!@$%^&(){}[\]:;<>,.?/~_+-=|]))).{8,}/g,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  checkbox: Yup.boolean()
    .required(
      "PLEASE ACCEPT QUIZLET'S TERMS OF SERVICE AND PRIVACY POLICY TO CONTINUE."
    )
    .oneOf(
      [true],
      "PLEASE ACCEPT QUIZLET'S TERMS OF SERVICE AND PRIVACY POLICY TO CONTINUE."
    ),
});

const SignUp: React.FC = () => {
  const { handleClickSignUp, handleClickChangeState } = useLogInContext();
  const handleSubmitFormSignUp = async (values: ISignupFormValues) => {
    const body: PostSignUpFormValues = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const resJson = await postSignUp("/users", body);
      if (resJson) {
        handleToast(resJson?.message, "success");
        handleClickChangeState();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed bg-gray-100 max-h-screen w-full h-full z-50 top-0 left-0 right-0 bottom-0 animate-zoomIn">
      <div className="flex w-full h-full">
        <div
          onClick={handleClickSignUp}
          className="absolute w-4 h-4 top-4 right-6 text-gray-600 cursor-pointer"
        >
          <Icon iconName="close" />
        </div>
        <div className="w-1/2 h-full relative">
          <div className="w-full h-full absolute">
            <Image
              imageName="bg-login"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-50 h-full flex flex-col justify-between p-[5%]">
            <h1 className="max-w-35 text-xl font-bold">
              The best way to study. Sign up for free.
            </h1>
            <div className="text-gray-100 w-40">
              <Icon iconName="fulllogo" />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-small overflow-y-auto">
          <div className="mt-xl mx-auto pb-xxl px-8 max-w-35">
            <div className="flex gap-8 mb-medium">
              <h3 className="cursor-pointer">
                <span className="text-medium font-bold">Sign up</span>
                <div className="w-full">
                  <Icon iconName="line" />
                </div>
              </h3>
              <h3 className="cursor-pointer" onClick={handleClickChangeState}>
                <span className="text-medium font-bold text-gray-600">
                  Sign in
                </span>
                <div className="w-full hidden">
                  <Icon iconName="line" />
                </div>
              </h3>
            </div>
            <div className="">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmitFormSignUp(values);
                  setSubmitting(false);
                }}
              >
                {(props) => {
                  return (
                    <form
                      onSubmit={props.handleSubmit}
                      className="flex flex-col gap-large"
                    >
                      <TextInput
                        id="name"
                        name="name"
                        label="name"
                        type="text"
                        placeholder="Duy Tân"
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errorText={
                          props.touched.name && props.errors.name
                            ? props.errors.name
                            : undefined
                        }
                        className={`py-xsmall px-small bg-gray-200 text-gray-600 rounded-lg text-small focus:outline-none border-2 focus:border-b-gray-600 ${
                          props.errors.name && props.touched.name
                            ? "border-b-error-300"
                            : ""
                        }`}
                      />
                      <TextInput
                        id="email"
                        name="email"
                        label="email"
                        type="text"
                        placeholder="example@email.com"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errorText={
                          props.touched.email && props.errors.email
                            ? props.errors.email
                            : undefined
                        }
                        className={`py-xsmall px-small bg-gray-200 text-gray-600 rounded-lg text-small focus:outline-none border-2 focus:border-b-gray-600 ${
                          props.errors.email && props.touched.email
                            ? "border-b-error-300"
                            : ""
                        }`}
                      />
                      <TextInput
                        id="username"
                        name="username"
                        label="username"
                        type="text"
                        placeholder="duytaan123"
                        value={props.values.username.replace(/\s+/g, "")}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errorText={
                          props.touched.username && props.errors.username
                            ? props.errors.username
                            : undefined
                        }
                        className={`py-xsmall px-small bg-gray-200 text-gray-600 rounded-lg text-small focus:outline-none border-2 focus:border-b-gray-600 ${
                          props.errors.username && props.touched.username
                            ? "border-b-error-300"
                            : ""
                        }`}
                      />
                      <TextInput
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        placeholder="********"
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errorText={
                          props.touched.password && props.errors.password
                            ? props.errors.password
                            : undefined
                        }
                        className={`py-xsmall px-small bg-gray-200 text-gray-600 rounded-lg text-small focus:outline-none border-2 focus:border-b-gray-600 ${
                          props.errors.password && props.touched.password
                            ? "border-b-error-300"
                            : ""
                        }`}
                      />
                      <Checkbox
                        name="checkbox"
                        id="checkbox"
                        type="checkbox"
                        onChange={props.handleChange}
                        errorText={
                          props.touched.checkbox && props.errors.checkbox
                            ? props.errors.checkbox
                            : undefined
                        }
                        className="hidden peer"
                      >
                        <span className="block w-4 h-4 border-2 rounded-sm border-gray-600 absolute top-1/2 left-0 -translate-y-1/2 after:absolute after:border-2 after:w-1/2 after:h-2/3 after:border-gray-100 after:border-t-0 after:border-l-0 after:rotate-45 after:left-1/4 after:top-px after:opacity-0 peer-checked:after:opacity-100 after:transition-all peer-checked:bg-gray-600 transition-all"></span>
                        <span className="ml-medium select-none font-normal">
                          I accept Quizlet's{" "}
                          <Link
                            to="/tos"
                            className="cursor-pointer text-gray-600 font-semibold"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="cursor-pointer text-gray-600 font-semibold"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      </Checkbox>
                      <div className="my-4">
                        <Button
                          type="submit"
                          buttonClass="w-full py-5 px-large text-center text-gray-100 text-small font-semibold bg-twilight-500 hover:bg-twilight-600 transition-all rounded-lg"
                        >
                          Sign up
                        </Button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
