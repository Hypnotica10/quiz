import React, { ChangeEvent, useState } from "react";
import { Sentence, SentencePreviewProps } from "../types/componentType";
import Icon from "./common/Icon";

const SentencePreview: React.FC<SentencePreviewProps> = (props) => {
  const {
    index,
    listSentences,
    handleClickEdit,
    handleClickDelete,
    updateSentences,
  } = props;
  const [newValue, setNewValue] = useState<Sentence>(listSentences[index]);
  const [error, setError] = useState<{
    term: boolean;
    definition: boolean;
  }>({
    term: false,
    definition: false,
  });

  const handleOnBlurEdit = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value === "0") {
      setError({
        ...error,
        [e.target.name]: true,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      });
    }
  };

  const handleOnChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue((newValue) => ({
      ...newValue,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleClickUpdate = () => {
    updateSentences(newValue, index);
  };

  return (
    <div
      className={`${
        error.term || error.definition
          ? "border-error-200"
          : "border-transparent"
      } transition-all border-2 text-gray-900 p-small bg-gray-100 rounded-small shadow-base flex items-center gap-large`}
    >
      <div className="flex-grow">
        <div className="flex gap-large">
          <label className="flex-grow py-xsmall border-r-2 border-gray-400">
            <input
              onBlur={handleOnBlurEdit}
              type="text"
              value={newValue.term}
              onChange={handleOnChangeEdit}
              className="bg-gray-100 border-none outline-none focus:outline-none text-small"
              disabled={!listSentences[index].isEditing}
              name="term"
            />
          </label>
          <label className="flex-grow py-xsmall">
            <input
              onBlur={handleOnBlurEdit}
              type="text"
              value={newValue.definition}
              onChange={handleOnChangeEdit}
              className="bg-gray-100 border-none outline-none focus:outline-none text-small"
              disabled={!listSentences[index].isEditing}
              name="definition"
            />
          </label>
        </div>
      </div>
      <div className="flex gap-small">
        {listSentences[index].isEditing ? (
          <div
            onClick={handleClickUpdate}
            className="w-10 h-10 flex items-center justify-center cursor-pointer p-xsmall text-gray-100 bg-success-400 rounded-medium"
          >
            V
          </div>
        ) : (
          <div
            onClick={(e) => handleClickEdit(e, index)}
            className="w-10 h-10 cursor-pointer p-xsmall text-gray-100 bg-success-400 rounded-medium"
          >
            <Icon iconName="edit" />
          </div>
        )}
        <div
          onClick={(e) => handleClickDelete(e, index)}
          className="w-10 h-10 cursor-pointer p-xsmall text-gray-100 bg-error-200 rounded-medium"
        >
          <Icon iconName="trash" />
        </div>
      </div>
    </div>
  );
};

export default SentencePreview;
