import type { NextPage } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Field from "@/components/Field";

const Handler: NextPage = () => {
  const [statusVal, setStatusVal] = useState<boolean>(true);
  const [amount, setAmount] = useState<Number>();
  const items = [
    {
      title: "Yes",
      image: "/images/theme-light.svg",
      active: statusVal === true,
      onClick: () => {
        setStatusVal(true);
      },
    },
    {
      title: "No",
      image: "/images/theme-dark.svg",
      active: statusVal === false,
      onClick: () => {
        setStatusVal(false);
      },
    },
  ];

  const onClick = () => {
    location.href = "/sign-in"
  }
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          Have you suffered additional expenses due to the delay?
        </div>
        <div className=" p-6 w-[300px] m-auto mt-[50px]">
          <div className="flex mb-8 space-x-8 md:pr-0">
            {items.map((item, index) => (
              <button
                className={twMerge(
                  `basis-1/2 p-3 border-4 border-transparent bg-n-2 rounded-2xl text-left transition-colors dark:bg-n-6 dark:text-n-3/50 text-center ${
                    item.active &&
                    "bg-transparent border-primary-1 text-n-6/50 dark:text-n-1 dark:bg-transparent"
                  }`
                )}
                key={index}
                onClick={item.onClick}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        {statusVal ? (
          <div>
            <div className="body1 text-n-4 2xl:body1S pt-[50px]">
              How much is it?
            </div>
            <Field
              className="mb-4 w-[150px] m-auto mt-[20px]"
              classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
              placeholder="USD"
              type="number"
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
              required
            />
          </div>
        ) : (
          <></>
        )}
        <button className="btn-blue btn-large w-full w-[150px]" onClick={onClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default Handler;
