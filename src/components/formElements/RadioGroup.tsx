import React from "react";

const RadioGroup = ({ children, label, error}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-6">{label}</label>
      )}
      <fieldset className="mt-2">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          <div className="flex items-center">
            {children}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-feedback-warning">{error}</p>}
      </fieldset>
    </div>
  );
};

export default RadioGroup;
