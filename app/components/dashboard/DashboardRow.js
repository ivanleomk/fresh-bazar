import { useMutation } from "@apollo/client";
import { Switch, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { produceToast } from "../../helperFunctions/produceToast";
import { UPDATE_ITEM } from "../../queries/updateItem";

const DashboardRow = ({ item }) => {
  //Destructuring
  const { item_id, name, price, unit, active, item_categories } = item;

  //Component State
  //TODO: Reformat items to use reducer hooks
  const [currStatus, setCurrStatus] = React.useState(active);
  const [currPrice, setCurrPrice] = React.useState(price);
  const [currUnit, setCurrUnit] = React.useState(unit);
  const [currName, setCurrName] = React.useState(name);
  const [modified, setModified] = React.useState(false);
  const [Pending, setPendingStatus] = React.useState(false);

  const toast = useToast();

  //Mutation Hooks
  const [
    updateItem,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_ITEM, {
    onCompleted() {
      produceToast(
        toast,
        "success",
        "Success!",
        "Updated Database with new information"
      );
    },
  });

  const onChangeActiveToggle = (e) => {
    e.preventDefault();
    setCurrStatus(!currStatus);
  };
  const onChangeCurrName = (e) => {
    e.preventDefault();
    setCurrName(e.target.value);
  };
  const onChangePrice = (e) => {
    e.preventDefault();
    setCurrPrice(e.target.value);
  };

  const onChangeUnit = (e) => {
    e.preventDefault();
    setCurrUnit(e.target.value);
  };

  const resetParameters = (e) => {
    setCurrUnit(unit);
    setCurrPrice(price);
    setCurrStatus(active);
    setCurrName(name);
  };

  const submitChanges = (e) => {
    //$id:Int!,new_name:String!,new_price:Float!,new_unit:String!
    updateItem({
      variables: {
        id: item_id,
        new_name: currName,
        new_price: currPrice,
        new_unit: currUnit,
      },
    });
  };

  useEffect(() => {
    //We check to see if the data has been modified
    setModified(
      !(
        currStatus == active &&
        currPrice == price &&
        currUnit == unit &&
        currName == name
      )
    );
  }, [currStatus, currPrice, currUnit]);

  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div class="mt-1 relative ">
          <input
            type="text"
            name="name"
            value={currName}
            onChange={(e) => onChangeCurrName(e)}
            id="name"
            class="focus:outline-none block pl-7 sm:text-sm "
          />
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div class="mt-1 relative ">
          <input
            type="text"
            name="unit"
            value={currUnit}
            onChange={(e) => onChangeUnit(e)}
            id="unit"
            class="focus:outline-none block pl-7 sm:text-sm "
          />
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div>
          <div class="mt-1 relative ">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              value={currPrice}
              onChange={(e) => onChangePrice(e)}
              id="price"
              class="focus:outline-none block pl-7 sm:text-sm "
            />
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item_categories}
      </td>
      <td>
        <Switch
          onChange={onChangeActiveToggle}
          isChecked={currStatus}
          size="lg"
        />
      </td>
      <td>
        <div className="flex items-center">
          {modified ? (
            <div className="flex flex-col">
              <button
                onClick={(e) => submitChanges(e)}
                className="mt-4 mx-4 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="pr-2">Save</p>
              </button>
              <button
                onClick={() => resetParameters()}
                className="inline-flex mt-2 mb-4 mx-4 items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    d="M6 18L18 6M6 6l12 12"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <p className="pr-2">Reset</p>
              </button>
            </div>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default DashboardRow;
