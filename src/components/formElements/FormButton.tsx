import React from "react";

type Props = {
  text: string;
};

const FormButton = ({ text }: Props) => {
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:bg-blue-900 disabled:bg-blue-200"
    >
      {text}
    </button>
  );
};

export default FormButton;