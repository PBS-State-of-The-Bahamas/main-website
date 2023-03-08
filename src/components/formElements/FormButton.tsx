import React from "react";

type Props = {
  text: string;
};

const FormButton = ({ text }: Props) => {
  return (
    <button
      type="submit"
      className="flex w-full uppercase justify-center rounded-md bg-royal-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-dark-royal-blue disabled:bg-blue-200"
    >
      {text}
    </button>
  );
};

export default FormButton;
