import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useLogInContext } from "../context/LogInContext";
import Button from "./Button";
import { Icon } from "./common";
import Menu from "./Menu";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import React from "react";

const Header: React.FC = () => {
  const {
    isRenderSignUp,
    isRenderSignIn,
    handleClickSignUp,
    handleClickSignIn,
  } = useLogInContext();

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="flex flex-wrap items-stretch justify-between bg-gray-100 text-gray-800 p-small">
          <div className="flex md:hidden pr-4">
            <div className="w-10 h-10 flex items-center justify-center p-xsmall text-gray-600">
              <Icon iconName="menu" />
            </div>
            <div className="text-twilight-500 ml-xsmall">
              <Link to="/quiz">
                <div className="w-8 h-10 flex justify-center">
                  <Icon iconName="minilogo" />
                </div>
              </Link>
            </div>
          </div>
          <div className="pr-6 md:flex hidden">
            <div className="text-twilight-500 ml-xsmall">
              <Link to="/quiz">
                <div className="w-24 h-10 flex justify-center">
                  <Icon iconName="fulllogo" />
                </div>
              </Link>
            </div>
            <Menu />
          </div>
          <div className="md:pl-6 pl-4 flex gap-8 min-h-10">
            <Button
              type="button"
              buttonClass="text-twilight-500 h-full px-small font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-none outline-none border-2 rounded-medium"
              handleClick={handleClickSignUp}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              buttonClass="text-gray-100 h-full px-small font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-twilight-500 rounded-medium outline-none mr-2 border-2"
              handleClick={handleClickSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>
      {isRenderSignUp && createPortal(<SignUp />, document.body)}
      {isRenderSignIn && createPortal(<SignIn />, document.body)}
    </>
  );
};

export default Header;
