import React from "react";

const InputField = ({ text }) => {
  return (
    <div class="sm:col-span-3">
      <label
        for="first_name"
        class="block text-sm text-left font-medium text-gray-700"
      >
        {text}
      </label>
      <div class="mt-1">
        <input
          type="text"
          name="first_name"
          id="first_name"
          autocomplete="given-name"
          class="shadow-sm focus:outline-none py-2 block w-full sm:text-sm border-b-4 rounded-md"
        />
      </div>
    </div>
  );
};

export default InputField;
