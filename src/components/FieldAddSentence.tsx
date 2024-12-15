import React from "react";
import Button from "./Button";
import { FieldAddSentenceProps } from "../types/componentType";

const FieldAddSentence: React.FC<FieldAddSentenceProps> = (props) => {
  const {
    error,
    sentence,
    handleOnBlur,
    handleOnChange,
    handleClickAdd,
    handleClickReset,
  } = props;
  return (
    <div className="py-medium flex flex-col gap-large">
      <div className="bg-gray-100 rounded-medium">
        <div className="p-small border-b-2 border-b-gray-200 flex items-center justify-between">
          <div className="px-small">
            <span className="text-gray-600 text-small font-bold">
              Add sentence
            </span>
          </div>
        </div>
        <div className="px-small pt-small pb-medium flex justify-between items-center">
          <div className="flex-grow pl-small pt-small pr-medium">
            <label
              className={`${
                error.term
                  ? "before:bg-error-300"
                  : "before:bg-gray-800 focus-within:before:bg-sunset-400"
              } bg-gray-100 py-xxsmall text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bottom-0 before:left-0 before:transition-all`}
            >
              <input
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                value={sentence.term}
                className="font-normal text-small border-none outline-none text-gray-800"
                type="text"
                maxLength={255}
                placeholder="Enter term"
                name="term"
              />
            </label>
            <span className="uppercase font-semibold text-xs text-gray-500">
              term
            </span>
          </div>
          <div className="flex-grow pr-small pt-small pl-medium">
            <label
              className={`${
                error.definition
                  ? "before:bg-error-300"
                  : "focus-within:before:bg-sunset-400 before:bg-gray-800"
              } bg-gray-100 py-xxsmall text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bottom-0 before:left-0 before:transition-all`}
            >
              <input
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                value={sentence.definition}
                className="font-normal text-small border-none outline-none text-gray-800"
                type="text"
                maxLength={255}
                placeholder="Enter definition"
                name="definition"
              />
            </label>
            <span className="uppercase font-semibold text-xs text-gray-500">
              definition
            </span>
          </div>
        </div>
        <div className="p-small">
          <div className="px-small flex items-center justify-end gap-small">
            <div className="">
              <Button
                handleClick={handleClickAdd}
                buttonClass="text-gray-100 min-w-20 bg-twilight-500 hover:bg-twilight-600 transition-all py-xsmall font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-none outline-none border-2 rounded-medium border-transparent"
                type="button"
              >
                Add
              </Button>
            </div>
            <div className="">
              <Button
                handleClick={handleClickReset}
                buttonClass="text-gray-600 min-w-20 py-xsmall font-semibold capitalize cursor-pointer flex items-center justify-center transition-all bg-transparent hover:bg-gray-300 transition-all outline-none border-2 rounded-medium border-gray-300 "
                type="button"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldAddSentence;
