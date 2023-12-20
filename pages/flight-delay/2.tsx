import type { NextPage } from "next";
import { useState } from "react";
import Select from "@/components/Select";
import Link from "next/link";
import Icon from "@/components/Icon";
import { twMerge } from "tailwind-merge";
import Image from "@/components/Image";
import Field from "@/components/Field";

const reasons = [
  {
    id: "0",
    title: "I don't remember",
  },
  {
    id: "1",
    title: "Technical problems",
  },
  {
    id: "2",
    title: "Bad weather conditions",
  },
  {
    id: "3",
    title: "Influence of other flights",
  },
  {
    id: "4",
    title: "Overbooking",
  },
  {
    id: "5",
    title: "Problems at the airport",
  },
  {
    id: "6",
    title: "Strike",
  },
  {
    id: "7",
    title: "They did not indicate the reason",
  },
];

const Handler: NextPage = () => {
  const [reason, setReason] = useState<any>(reasons[0]);

  const onClick = () => {
    location.href = "/flight-delay/3";
  };
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          What, according to the airline, was the cause of the problem?
        </div>
        <div className=" p-6 w-[300px] m-auto mt-[50px]">
          <div className="flex mb-8 space-x-8 md:pr-0">
            <Select
              className="min-w-[13.125rem]"
              classButton="bg-n-3/75 dark:bg-n-6 dark:shadow-[inset_0_0_0_0.0625rem_#232627]"
              items={reasons}
              value={reason}
              onChange={setReason}
            />
          </div>
        </div>
        <button
          className="btn-blue btn-large w-full w-[150px]"
          onClick={onClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Handler;
