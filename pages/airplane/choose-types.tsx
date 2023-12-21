import type { NextPage } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const ChooseTypes: NextPage = () => {

  const saveType = (type:String) => {
    localStorage.setItem("claim_type", type);
  }
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          Select the types of claim
        </div>
        <div className="p-6 w-[400px] m-auto mt-[50px]">
          <Link
            className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
            href="/airplane/delay/1" onClick={() => saveType("airplane-delay")}
          >
            <div className="relative flex justify-center items-center w-15 h-15 mr-6">
              <div
                className="absolute inset-0 opacity-20 rounded-xl"
                style={{
                  backgroundColor: "#8E55EA",
                }}
              ></div>
              <Icon
                className="relative z-1"
                fill="#8E55EA"
                name="image-check"
              />
            </div>
            Flight Delay
            <Icon
              className="ml-auto fill-n-4 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-4"
              name="arrow-next"
            />
          </Link>
          <Link
            className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
            href="/photo-editing" onClick={() => saveType("airplane-cancellation")}
          >
            <div className="relative flex justify-center items-center w-15 h-15 mr-6">
              <div
                className="absolute inset-0 opacity-20 rounded-xl"
                style={{
                  backgroundColor: "#8E55EA",
                }}
              ></div>
              <Icon
                className="relative z-1"
                fill="#8E55EA"
                name="play-circle"
              />
            </div>
            Flight Cancellation:
            <Icon
              className="ml-auto fill-n-4 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-4"
              name="arrow-next"
            />
          </Link>
          <Link
            className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
            href="/photo-editing" onClick={() => saveType("airplane-loss")}
          >
            <div className="relative flex justify-center items-center w-15 h-15 mr-6">
              <div
                className="absolute inset-0 opacity-20 rounded-xl"
                style={{
                  backgroundColor: "#8E55EA",
                }}
              ></div>
              <Icon className="relative z-1" fill="#8E55EA" name="trophy" />
            </div>
            Loss of Luggage:
            <Icon
              className="ml-auto fill-n-4 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-4"
              name="arrow-next"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChooseTypes;
