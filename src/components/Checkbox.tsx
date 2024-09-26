import React from "react";
import { TextInputProps } from "../types/componentType";

const Checkbox: React.FC<TextInputProps> = (props) => {
  const { errorText, children, onChangeText, ...inputProps } = props;
  return (
    <div>
      <label
        htmlFor={inputProps.id || inputProps.name}
        className="relative text-base font-semibold text-gray-600 mb-xsmall flex gap-xxsmall"
      >
        <input
          {...inputProps}
          onChange={(e) => {
            // override on change to fire change text event
            inputProps.onChange?.(e);
            onChangeText?.(e.target.value);
          }}
          className={inputProps.className}
        />
        {children}
      </label>
      {errorText && (
        <div className="p-small border-2 border-error-300 rounded-lg mt-large">
          <p className="uppercase text-error-300">{errorText}</p>
        </div>
      )}
    </div>
  );
};

export default Checkbox;
