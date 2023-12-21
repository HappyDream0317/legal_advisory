import type { NextPage } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Field from "@/components/Field";

const Handler: NextPage = () => {
  const [hours, setHours] = useState<Number>();
  const onClick = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("hours", hours);
    location.href = "/airplane/delay/2";
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
        <form onSubmit={onClick}>
          <Field
            className="mb-4 w-[150px] m-auto mt-[20px]"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="hours"
            type="number"
            value={hours}
            onChange={(e: any) => setHours(e.target.value)}
            required
          />
          <button
            className="btn-blue btn-large w-[150px] mt-[50px]"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default Handler;
