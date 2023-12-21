import { useState } from "react";
import type { NextPage } from "next";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

import { useColorMode } from "@chakra-ui/color-mode";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const tabNav = ["Sign in", "Create account"];

const VerifyEmail: NextPage = () => {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    // Retrieve the token from the query parameters
    console.log(token);

    if (token) {
      verifyUser(token);
    }
  }, [token]);

  const verifyUser = async (token: string) => {
    try {
      const response = await fetch("/api/user/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Verified Successfully!");
        if(localStorage.getItem("redirect_status") && localStorage.getItem("redirect_status") === "true") {
          var redirect_url = localStorage.getItem("redirect_url");
          localStorage.removeItem('redirect_status');
          localStorage.removeItem('redirect_url');
          location.href = redirect_url + "/";
        } else {
          window.location.href = "/updates-and-faq";
        }
      } else {
        toast.error(data.error);
        if (data.error === "Already Verified!") {
          setTimeout(function () {
            window.location.href = "/";
          }, 3000);
        }
        // Handle error logic here
      }
    } catch (error) {
      console.log("Error creating account:", error);
      // Handle error logic here
    }
  };

  const resendLink = async() => {
    const email = localStorage.getItem("email");
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:" ", email, password:" " }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Verify link sent successfully.");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("Error creating account:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen min-h-screen-ios lg:p-6 md:px-6 md:pt-16 md:pb-10">
      <div className="relative shrink-0 w-[40rem] p-20 overflow-hidden 2xl:w-[37.5rem] xl:w-[30rem] xl:p-10 lg:hidden">
        <div className="max-w-[25.4rem]">
          <div className="mb-4 h2 text-n-1">Unlock the power of AI</div>
          <div className="body1 text-n-3">
            Chat with the smartest AI - Experience the power of AI with us
          </div>
        </div>
        <div className="absolute top-52 left-5 right-5 h-[50rem] xl:top-24">
          <Image
            className="object-contain"
            src="/images/create-pic.png"
            fill
            sizes="(max-width: 1180px) 50vw, 33vw"
            alt=""
          />
        </div>
      </div>
      <div className="flex grow my-6 mr-6 p-10 bg-n-1 rounded-[1.25rem] lg:m-0 md:p-0 dark:bg-n-6">
        <div className="w-full max-w-[31.5rem] m-auto text-center">
          <div className="flex items-center my-8 md:my-4">
            <span className="shrink-0 mx-5 text-n-4/50 mx-auto">
              Verify your email
            </span>
          </div>
          <button
            onClick={resendLink}
            className="btn-stroke-light btn-large mb-3"
          >
            <span className="ml-4">Resend Verify Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
