import { useState } from "react";

type Address = {
  line1: string;
  town: string;
  postcode: string;
  country: string;
};

type APIAddress = Address & { line2?: string; line3?: string };

function AddressBook() {

  const [list, setList] = useState<APIAddress[]>([]);

  return <div className="container">
    <></>
    This is Address book
  </div>;
}

export default AddressBook;
