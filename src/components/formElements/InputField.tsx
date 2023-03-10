import React from "react";

type Props = {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: string | undefined;
};

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const InputField = ({
  label,
  name,
  type,
  autoComplete,
  value,
  onChange,
  error,
  onBlur
}: Props) => {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="block text-base font-normal text-gray-6">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={classNames(
            error ? "border-feedback-warning" : "border-gray-4",
            "block w-full border appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-royal-blue focus:outline-none focus:ring-royal-blue sm:text-sm"
          )}
        />
        <p className="mt-2 text-sm text-feedback-warning">
          {error}
        </p>
      </div>
    </div>
  );
};

export default InputField;