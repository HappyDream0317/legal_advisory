import type { NextPage } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Field from "@/components/Field";

const Handler: NextPage = () => {
  const [hours, setHours] = useState<Number>();
  const onClick = () => {
    location.href = "/flight-delay/4";
  };
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          How many hours of delay did you experience on your flight?
        </div>
        <div className="caption1 text-n-4 mt-[20px]">
          <p>
            Suitable if the delay is more than 3 hours upon reaching the final
            destination.
          </p>
        </div>
        <div>
          <Field
            className="mb-4 w-[150px] m-auto mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="hours"
            type="number"
            value={hours}
            onChange={(e: any) => setHours(e.target.value)}
            required
          />
        </div>
        <button
          className="btn-blue btn-large w-full w-[150px] mt-[50px]"
          onClick={onClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Handler;
