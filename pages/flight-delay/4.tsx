import type { NextPage } from "next";
import { useState } from "react";
import Field from "@/components/Field";

const Handler: NextPage = () => {
  const [date, setDate] = useState<String>("");
  const [airline, setAirline] = useState<String>("");
  const [origin, setOrigin] = useState<String>("");
  const [destination, setDestination] = useState<String>("");


  const onClick = () => {
    location.href = "/sign-in";
  };
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          Complete your form
        </div>
        <div className="flex items-center md:block w-[400px] m-auto justify-between mt-[50px]">
          <div className="text-left base1 font-semibold md:mb-4">Flight Date</div>
          <Field
            className="mb-4 w-[250px] mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            type="date"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center md:block w-[400px] m-auto justify-between">
          <div className="text-left base1 font-semibold md:mb-4">Airline</div>
          <Field
            className="mb-4 w-[250px] mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            type="number"
            value={airline}
            onChange={(e: any) => setAirline(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center md:block w-[400px] m-auto justify-between">
          <div className="text-left base1 font-semibold md:mb-4">Origin(departure airport)</div>
          <Field
            className="mb-4 w-[250px] mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            type="number"
            value={origin}
            onChange={(e: any) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center md:block w-[400px] m-auto justify-between">
          <div className="text-left base1 font-semibold md:mb-4">Destination(arrival airport)</div>
          <Field
            className="mb-4 w-[250px] mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            type="number"
            value={destination}
            onChange={(e: any) => setDestination(e.target.value)}
            required
          />
        </div>
        <div></div>
        <button
          className="btn-blue btn-large w-full w-[150px] mt-[50px]"
          onClick={onClick}
        >
          Complete
        </button>
      </div>
    </>
  );
};

export default Handler;
