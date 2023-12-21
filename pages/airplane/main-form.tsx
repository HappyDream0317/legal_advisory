import type { NextPage } from "next";
import { useState } from "react";
import Field from "@/components/Field";

const Handler: NextPage = () => {
  const [date, setDate] = useState<String>("");
  const [airline, setAirline] = useState<String>("");
  const [origin, setOrigin] = useState<String>("");
  const [destination, setDestination] = useState<String>("");

  const onClick = async (e: React.FormEvent) => {
    e.preventDefault();
    var token;
    localStorage.setItem("date", date);
    localStorage.setItem("airline", airline);
    localStorage.setItem("origin", origin);
    localStorage.setItem("destination", destination);
    if (!localStorage.getItem("jwt_token")) {
      localStorage.setItem("redirect_status", "true");
      localStorage.setItem("redirect_url", "/airplane/choose-types");
      location.href = "/sign-in";
    } else {
      token = localStorage.getItem("jwt_token");
      fetch("/api/user/verify-jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            location.href = "/airplane/choose-types"
          } else {
            localStorage.setItem("redirect_status", "true");
            localStorage.setItem("redirect_url", "/airplane/choose-types");
            location.href = "/sign-in";
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          Complete your form
        </div>
        <form onSubmit={onClick}>
          <div className="flex items-center md:block w-[400px] m-auto justify-between mt-[50px]">
            <div className="text-left base1 font-semibold md:mb-4">
              Flight Date
            </div>
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
              type="String"
              value={airline}
              onChange={(e: any) => setAirline(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center md:block w-[400px] m-auto justify-between">
            <div className="text-left base1 font-semibold md:mb-4">
              Origin(departure airport)
            </div>
            <Field
              className="mb-4 w-[250px] mt-[20px]"
              classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
              type="String"
              value={origin}
              onChange={(e: any) => setOrigin(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center md:block w-[400px] m-auto justify-between">
            <div className="text-left base1 font-semibold md:mb-4">
              Destination(arrival airport)
            </div>
            <Field
              className="mb-4 w-[250px] mt-[20px]"
              classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
              type="String"
              value={destination}
              onChange={(e: any) => setDestination(e.target.value)}
              required
            />
          </div>
          <div></div>
          <button
            className="btn-blue btn-large w-[150px] mt-[50px]"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Handler;
