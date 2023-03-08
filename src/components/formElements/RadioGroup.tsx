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
            {/* <input 
            type="radio" 
            id="customid" 
            className="block text-sm font-medium leading-6 text-gray-6" 
            onChange={formik.handleChange} 
            name="enrolled" 
            value="yes" 
          /> adding comment for to just copy and paste later :) */}
            {children}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-feedback-warning">{error}</p>}
      </fieldset>
    </div>
  );
};

export default RadioGroup;
