import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { useLogInContext } from "../context/LogInContext";
import { postSignin } from "../service/authService";
import { ISignInFormValues } from "../types/user";
import Button from "./Button";
import { Icon, Image } from "./common";
import TextInput from "./TextInput";
import React from "react";
import { AuthActionsEnum } from "../helper/constant";
import { useNavigate } from "react-router-dom";

const initialValues: ISignInFormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Required")
    .trim()
    .min(3, "Too short")
    .max(20, "Too long"),
  password: Yup.string().required("Required").trim().max(30),
});

const SignIn: React.FC = () => {
  const { handleClickSignIn, handleClickChangeState } = useLogInContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmitFormSignIn = (values: ISignInFormValues) => {
    const body: ISignInFormValues = {
      username: values.username,
      password: values.password,
    };
    const signIn = async (body: ISignInFormValues) => {
      return postSignin("/auth/signin", body).then((resJson) => {
        if (resJson?.data != null) {
          const accessToken = resJson?.data["access_token"];
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("user", JSON.stringify(resJson?.data?.user));
          dispatch({
            type: AuthActionsEnum.LOGIN,
            payload: resJson.data,
          });
          handleClickSignIn();
          navigate("/quiz");
          window.location.reload();
        }
      });
    };
    signIn(body);
  };

  return (
    <div className="fixed bg-gray-100 max-h-screen w-full h-full z-50 top-0 left-0 right-0 bottom-0 animate-zoomIn">
      <div
        onClick={handleClickSignIn}
        className="absolute w-4 h-4 top-4 right-6 text-gray-600 cursor-pointer"
      >
        <Icon iconName="close" />
      </div>
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full relative">
          <div className="w-full h-full absolute">
            <Image
              imageName="bg-login"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-50 h-full flex flex-col justify-between p-[5%]">
            <h1 className="max-w-35 text-xl font-bold">
              Smash sets in your sweats.
            </h1>
            <div className="text-gray-100 w-40">
              <Icon iconName="fulllogo" />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-small overflow-y-auto">
          <div className="mt-xl mx-auto pb-xxl px-8 max-w-35">
            <div className="flex gap-8 mb-medium">
              <h3 className="cursor-pointer" onClick={handleClickChangeState}>
                <span className="text-medium font-bold text-gray-600">
                  Sign up
                </span>
                <div className="w-full hidden">
                  <Icon iconName="line" />
                </div>
              </h3>
              <h3 className="cursor-pointer">
                <span className="text-medium font-bold">Sign in</span>
                <div className="w-full">
                  <Icon iconName="line" />
                </div>
              </h3>
            </div>
            <div className="">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmitFormSignIn(values);
                  setSubmitting(false);
                }}
              >
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit} action="" method="POST">
                      <div className="my-large flex flex-col gap-large">
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
                        <Button
                          type="submit"
                          buttonClass="w-full py-5 px-large text-center text-gray-100 text-small font-semibold bg-twilight-500 hover:bg-twilight-600 transition-all rounded-lg"
                        >
                          Sign in
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

export default SignIn;
