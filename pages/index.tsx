import type { NextPage } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

const Index: NextPage = () => {
  return (
    <>
      <div className="bg-white h-screen w-width text-center">
        <div className="body1 text-n-4 2xl:body1S pt-[200px]">
          I recommend seeking legal advice from a qualified professional to
          ensure accurate and reliable guidance for your specific situation.
        </div>
        <div className=" p-6">
          <Link
            className="btn-blue w-full w-auto mt-[100px]"
            href="/airplane/main-form"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
