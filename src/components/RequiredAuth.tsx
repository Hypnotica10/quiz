import React from "react";
import { useLogInContext } from "../context/LogInContext";
import Button from "./Button";

const RequiredAuth: React.FC = () => {
  const { handleClickSignIn } = useLogInContext();
  return (
    <div className="not-found items-center justify-center flex flex-grow flex-shrink flex-col w-full min-h-[90vh] bg-gray-200">
      <div className="px-small">
        <p className="font-bold sm:text-large text-medium text-center">
          Sign in and see the remaining page. It’s free!
        </p>
        <div className="flex items-center justify-center mt-medium">
          <Button
            buttonClass="py-xsmall px-small text-gray-100 font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-twilight-500 rounded-medium outline-none mr-2 border-2"
            type="button"
            handleClick={handleClickSignIn}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequiredAuth;
