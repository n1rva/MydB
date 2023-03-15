import SingleItem from "@component/components/singleItem";
import Image from "next/image";

import posimg from "../../../public/poster.jpg";

function Demolist() {
  return (
    <div className="h-full pt-28 px-8 container mx-auto border">
      <div className="inline-block pl-2 bg-gradient-to-r from-logoFirst to-white">
        <header className="pb-1 bg-clip-text bg-gradient-to-r from-first via-sec to-last ">
          <span className="text-2xl font-medium text-transparent lg:text-4xl 2xl:text-5xl">
            nirva&apos;s List
          </span>
        </header>
      </div>
      <div className="mt-8 w-fit  mx-auto bg-clip-content bg-gradient-to-r from-logoFirst via-logoSec to-logoLast">
        <div className="grid grid-cols-2 mt-8 max-w-sm lg:max-w-4xl lg:grid-cols-4 2xl:max-w-none 2xl:grid-cols-6 outline-white">
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
        </div>
      </div>
      <div className="flex flex-col items-center my-36">
        <div className="bg-clip-text bg-gradient-to-r from-first via-sec to-last">
          <span className="text-5xl font-semibold text-transparent">
            Share Yours
          </span>
        </div>
        <div className="space-x-10 mt-4">
          <button class=" bg-blue-100 rounded-lg py-2 px-4 shadow text-sm font-semibold text-slate-400">
            Sign Up
          </button>
          <button class=" bg-pink-100 rounded-lg py-2 px-4 shadow text-sm font-semibold text-slate-400">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Demolist;
