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
    console.log(classes)
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
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
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
            error ? "border-red-500" : "border-gray-300",
            "block w-full border appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          )}
        />
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    </div>
  );
};

export default InputField;