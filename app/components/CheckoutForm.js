import React from "react";
import InputField from "./InputField";
import Heading from "./Heading";

const CheckoutForm = () => {
  return (
    <>
      <span className="mt-20" />
      <Heading text="Order Details" />
      <form class="space-y-8 divide-y divide-gray-200 w-full">
        <div class="space-y-8 divide-gray-200">
          <div className="pt-8">
            <div class="mt-6  grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <InputField text="Street" />
              <InputField text="Unit Number" />
              <InputField text="Postal Code" />
              <InputField text="Contact Number" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Checkout
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
