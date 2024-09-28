import { TextInputProps } from "../types/componentType";

const TextInput: React.FC<TextInputProps> = (props) => {
  const { label, errorText, helpText, onChangeText, ...inputProps } = props;

  // const { setFieldValue } = useFormikContext();
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex gap-small">
        <label
          htmlFor={inputProps.id || inputProps.name}
          className="text-base font-semibold text-gray-600 mb-xsmall flex gap-xxsmall capitalize"
        >
          {errorText && <span className="text-error-300 italic">*</span>}
          <span>{label}</span>
        </label>
        <div className="">
          {helpText && <span className="">{helpText}</span>}
          {errorText && (
            <span className="text-error-300 italic">{errorText}</span>
          )}
        </div>
      </div>
      <input
        {...inputProps}
        onChange={(e) => {
          inputProps.onChange?.(e);
          onChangeText?.(e.target.value);
        }}
        className={inputProps.className}
      />
    </div>
  );
};

export default TextInput;
