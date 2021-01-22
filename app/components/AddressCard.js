import React from "react";

const AddressCard = ({ item }) => {
  const { address, postalcode, tag } = item;
  return (
    <div className="rounded-sm col-span-1 items-start flex flex-col">
      <p>{tag}</p>
      <p>{address}</p>
      <p>{postalcode}</p>
    </div>
  );
};

export default AddressCard;
