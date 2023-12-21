import { useState } from "react";
import { toast } from "react-toastify";
import Field from "@/components/Field";

type SignInProps = {
  onClick: () => void;
};

const SignIn = ({ onClick }: SignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          var jwt_token = data.token;
          localStorage.setItem("jwt_token", jwt_token);
          localStorage.setItem("email", email);
          if(data.user.status === false){
            window.location.href = "/verify-email";
          } else {
            if(localStorage.getItem("redirect_status") && localStorage.getItem("redirect_status") === "true") {
              var redirect_url = localStorage.getItem("redirect_url");
              localStorage.removeItem('redirect_status');
              localStorage.removeItem('redirect_url');
              location.href = redirect_url + "/";
            } else {
              window.location.href = "/updates-and-faq";
            }
          }
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Email"
        icon="email"
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button
        className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
        type="button"
        onClick={onClick}
      >
        Forgot password?
      </button>
      <button className="btn-blue btn-large w-full" type="submit">
        Sign in with Brainwave
      </button>
    </form>
  );
};

export default SignIn;
