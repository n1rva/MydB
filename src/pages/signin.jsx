import Link from "next/link";
import { getSession, signIn } from "next-auth/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { toastProps } from "../../util/toastProps";
import { useRouter } from "next/navigation";

function SignIn() {
  const toastSignIn = useRef(null);

  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toastSignIn.current = toast.loading("Signing In", { toastProps });

    const { ok, error } = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (ok) {
      toast.update(toastSignIn.current, {
        render: "Signed In Succesfully",
        type: "success",
        isLoading: false,
        ...toastProps,
      });
      push("/");
    }

    if (error) {
      toast.update(toastSignIn.current, {
        render: "An Error Occured",
        type: "error",
        isLoading: false,
        ...toastProps,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-logoFirst via-logoSec to-logoLast">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="w-full flex flex-col py-16 bg-white/30 rounded-3xl max-w-sm md:max-w-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
      >
        <div className="text-xl font-medium px-6 bg-gradient-to-r from-first to-sec bg-clip-text text-transparent">
          Welcome Back!
        </div>
        <div className="px-6 py-12 flex flex-col space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
              placeholder="Username"
              autoComplete="off"
            />
            <label
              htmlFor="username"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
              placeholder="Password"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Password
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="p-[1px] bg-gradient-to-r from-first via-sec to-last rounded-lg">
            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-70"
            >
              <span className="bg-gradient-to-r from-first via-sec to-last bg-clip-text text-transparent font-medium">
                Sign In
              </span>
            </button>
          </div>
          <Link
            className="inline-block text-first hover:text-first/70"
            href={"/passwordreset"}
          >
            Forgot Your Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const session = await getSession({ req });

  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: {},
  };
}

export default SignIn;
