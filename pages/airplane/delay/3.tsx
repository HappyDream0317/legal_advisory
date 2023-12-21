import type { NextPage } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Field from "@/components/Field";
import { toast } from "react-toastify";

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
    var token = localStorage.getItem("jwt_token");
    var date = localStorage.getItem("date");
    var airline = localStorage.getItem("airline");
    var origin = localStorage.getItem("origin");
    var destination = localStorage.getItem("destination");
    var claim_type = localStorage.getItem("claim_type");
    var hours = localStorage.getItem("hours");
    var delay_reason = localStorage.getItem("delay_reason");
    var additional_expenses_status = "false";
    var additional_expenses_cost = 0;

    console.log(
      token,
      date,
      airline,
      origin,
      destination,
      claim_type,
      hours,
      delay_reason,
      additional_expenses_status,
      additional_expenses_cost
    );

    fetch("/api/save_claim/save_answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        date,
        airline,
        origin,
        destination,
        claim_type,
        hours,
        delay_reason,
        additional_expenses_status,
        additional_expenses_cost,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        localStorage.removeItem("date");
        localStorage.removeItem("airline");
        localStorage.removeItem("origin");
        localStorage.removeItem("destination");
        localStorage.removeItem("claim_type");
        localStorage.removeItem("hours");
        localStorage.removeItem("delay_reason");
        localStorage.removeItem("additional_expenses_status");
        localStorage.removeItem("additional_expenses_cost");
        if (response.ok) {
          toast.success("Success");
          setTimeout(() => {
            location.href = "/forms/airclaim1";
          }, 5000);
        } else {
          if (data.error === "required answers") {
            toast.error("Answer from Scratch.");
            setTimeout(() => {
              location.href = "/airplane/main-form";
            }, 5000);
          } else if (data.error === "Invalid user") {
            toast.error("Login Again.");
            setTimeout(() => {
              location.href = "/sign-in";
            }, 5000);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    var token = localStorage.getItem("jwt_token");
    var date = localStorage.getItem("date");
    var airline = localStorage.getItem("airline");
    var origin = localStorage.getItem("origin");
    var destination = localStorage.getItem("destination");
    var claim_type = localStorage.getItem("claim_type");
    var hours = localStorage.getItem("hours");
    var delay_reason = localStorage.getItem("delay_reason");
    var additional_expenses_status = "true";
    var additional_expenses_cost = amount;

    fetch("/api/save_claim/save_answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        date,
        airline,
        origin,
        destination,
        claim_type,
        hours,
        delay_reason,
        additional_expenses_status,
        additional_expenses_cost,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        localStorage.removeItem("date");
        localStorage.removeItem("airline");
        localStorage.removeItem("origin");
        localStorage.removeItem("destination");
        localStorage.removeItem("claim_type");
        localStorage.removeItem("hours");
        localStorage.removeItem("delay_reason");
        localStorage.removeItem("additional_expenses_status");
        localStorage.removeItem("additional_expenses_cost");
        if (response.ok) {
          toast.success("Success");
          setTimeout(() => {
            location.href = "/forms/airclaim1";
          }, 5000);
        } else {
          if (data.error === "required answers") {
            toast.error("Answer from Scratch.");
            setTimeout(() => {
              location.href = "/airplane/main-form";
            }, 5000);
          } else if (data.error === "Invalid user") {
            toast.error("Login Again.");
            setTimeout(() => {
              location.href = "/sign-in";
            }, 5000);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
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
            <form onSubmit={onSubmit}>
              <Field
                className="mb-4 w-[150px] m-auto mt-[20px]"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="USD"
                type="number"
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                required
              />
              <button className="btn-blue btn-large w-[150px]" type="submit">
                Submit Answers
              </button>
            </form>
          </div>
        ) : (
          <>
            <button className="btn-blue btn-large w-[150px]" onClick={onClick}>
              Submit Answers
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Handler;
