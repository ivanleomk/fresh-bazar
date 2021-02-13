import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import DashboardRow from "./DashboardRow";
import { ALL_ITEMS_AND_ID_QUERY } from "../../queries/getItemsAndId";

const DashboardTable = () => {
  //Grab All Items
  const { loading, error, data } = useQuery(ALL_ITEMS_AND_ID_QUERY);

  //Component State
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    if (!loading) {
      let newData = data?.["item"]
        .map(({ __typename, ...item }) => item)
        .map((item) => {
          return {
            ...item,
            item_categories: item.item_categories.map(
              ({ category }) => category.name
            ),
          };
        });
      setItems(newData);
      console.log(newData);
    }
  }, [loading]);

  return (
    <div class="flex flex-col mx-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unit Amount
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price/Unit
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Categories
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Active
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {items && items.map((item) => <DashboardRow item={item} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
