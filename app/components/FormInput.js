import React from "react";

const FormInput = ({ label, value, onChange,type }) => {
  return (
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div class="mt-1">
        <input
          id={label}
          name={label}
          type={type}
          autocomplete="email"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default FormInput;
