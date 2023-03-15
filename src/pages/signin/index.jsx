import Link from "next/link";
import React from "react";

function SignIn() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-logoFirst via-logoSec to-logoLast">
      <div className="w-full flex flex-col py-16 bg-white/30 rounded-3xl max-w-sm md:max-w-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10">
        <div className="text-xl font-medium px-6 bg-gradient-to-r from-first to-sec bg-clip-text text-transparent">
          Welcome Back!
        </div>
        <div className="px-6 py-12 flex flex-col space-y-6">
          <div class="relative">
            <input
              type="email"
              id="email"
              class="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
              placeholder="Email"
              autocomplete="off"
            />
            <label
              for="email"
              class="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Email
            </label>
          </div>
          <div class="relative">
            <input
              type="password"
              id="password"
              class="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
              placeholder="Password"
              autocomplete="off"
            />
            <label
              for="password"
              class="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Password
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="p-[1px] bg-gradient-to-r from-first via-sec to-last rounded-lg">
            <button className="rounded-lg px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-70">
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
      </div>
    </div>
  );
}

export default SignIn;
