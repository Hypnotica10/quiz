import React, { useEffect, useState } from "react";
import { Button, FieldAddSentence } from "../components";
import { useCreateFlashcards } from "../context/CreateFlashcardsContext";
import { IMajor } from "../types/subject";
import { getAllMajor } from "../service/subjectService";

const SetFlashCards: React.FC = () => {
  const [listMajor, setListMajor] = useState<IMajor[]>([]);
  const {
    error,
    handleOnBlur,
    handleOnChange,
    informationFlashcards,
    handleClickCreate,
  } = useCreateFlashcards();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const getMajor = async () => {
      try {
        const resJson = await getAllMajor("/major/all", accessToken || "");
        if (resJson) {
          setListMajor(resJson?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMajor();
  }, []);

  return (
    <div className="container pt-medium pb-40">
      <div className="">
        <div className="mb-large">
          <h2 className="mb-large font-bold text-large text-gray-800">
            Create a new flashcard set
          </h2>
          <div className="">
            <div className="flex flex-col gap-medium mb-medium">
              <div className="">
                <label
                  className={`${
                    error.title
                      ? "before:bg-error-300"
                      : "focus-within:before:bg-gray-800 before:bg-gray-200"
                  } bg-gray-100 py-xsmall px-small h-12 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bottom-0 before:left-0 before:transition-all`}
                >
                  <input
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    value={informationFlashcards.title}
                    className="font-semibold text-small border-none outline-none text-gray-800"
                    type="text"
                    maxLength={255}
                    placeholder="Enter a title, like “Biology - Chapter 22: Evolution”"
                    name="title"
                  />
                </label>
              </div>
              <div className="flex gap-small">
                <div className="flex-grow w-7/12">
                  <label className="bg-gray-100 py-xsmall px-small h-12 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bg-gray-200 before:bottom-0 before:left-0 before:transition-all focus-within:before:bg-gray-800">
                    <input
                      onChange={handleOnChange}
                      value={informationFlashcards.description}
                      className="font-semibold text-small border-none outline-none text-gray-800"
                      type="text"
                      maxLength={255}
                      placeholder="Add a description..."
                      name="description"
                    />
                  </label>
                </div>
                <div className="flex-grow">
                  <label
                    className={`${
                      error.majorId ? "border-error-300" : "border-transparent "
                    } bg-gray-100 py-xxsmall px-small h-12 border-2 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center`}
                  >
                    <select
                      onBlur={handleOnBlur}
                      onChange={handleOnChange}
                      name="majorId"
                      defaultValue="0"
                      className="capitalize text-small border-none outline-none text-gray-800"
                    >
                      <option value="0">Select subject</option>
                      {listMajor &&
                        listMajor.map((major: IMajor) => (
                          <option
                            className="capitalize"
                            key={major.id}
                            value={major.id}
                          >
                            {major.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className="py-medium flex flex-col gap-large">
              <FieldAddSentence />
            </div>
            <div className="flex justify-end">
              <Button
                handleClick={handleClickCreate}
                buttonClass="py-small px-large border-2 border-gray-400 text-gray-600 bg-gray-200 font-semibold text-small rounded-medium transition-all hover:bg-gray-300"
                type="button"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetFlashCards;
