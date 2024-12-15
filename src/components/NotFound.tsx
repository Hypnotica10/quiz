import { Link } from "react-router-dom";
import Button from "./Button";
import { Icon } from "./common";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="not-found items-center justify-center flex flex-grow flex-shrink flex-col w-full min-h-[90vh] bg-gray-200">
      <div className="sm:max-w-30 max-w-60">
        <p className="font-bold sm:text-large text-medium text-center">
          Hmm, we can't seem to find that page
        </p>
        <p className="text-center sm:text-medium text-small mt-medium">
          It might be an old link or the page might have been removed
        </p>
        <div className="flex items-center justify-center mt-medium">
          <Button
            buttonClass="py-xsmall px-small text-gray-100 font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-twilight-500 rounded-medium outline-none mr-2 border-2"
            type="button"
          >
            <Link
              to="/quiz"
              className="flex items-center justify-center gap-xsmall"
            >
              <div className="w-4 h-4">
                <Icon iconName="arrowleft" />
              </div>
              <span className="">Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
