import { useState } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "@/components/Image";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { token } = router.query;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token_val: token, type: "reset-password", password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully.");
        window.location.href = "/";
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("Error creating account:", error);
    }
  };

  return (
    <>
    <div className="relative flex min-h-screen min-h-screen-ios lg:p-6 md:px-6 md:pt-16 md:pb-10">
            <div className="relative shrink-0 w-[40rem] p-20 overflow-hidden 2xl:w-[37.5rem] xl:w-[30rem] xl:p-10 lg:hidden">
                <div className="max-w-[25.4rem]">
                    <div className="mb-4 h2 text-n-1">
                        Unlock the power of AI
                    </div>
                    <div className="body1 text-n-3">
                        Chat with the smartest AI - Experience the power of AI
                        with us
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
                <div className="w-full max-w-[31.5rem] m-auto">
                    <form onSubmit={onSubmit}>
                        <Field
                        className="mb-6"
                        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                        placeholder="password"
                        icon="password"
                        type="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        required
                        />
                        <button className="btn-blue btn-large w-full mb-6" type="submit">
                        Reset password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default ResetPassword;
