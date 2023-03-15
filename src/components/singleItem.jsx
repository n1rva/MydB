import Image from "next/image";
import React from "react";

import posimg from "../../public/poster.jpg";

function SingleItem() {
  return (
    <div className="border-[14px] border-white relative">
      <div className="outline outline-4 outline-white rounded-lg p-4">
        <div className="absolute top-0 left-0 h-full w-full rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"></div>
        <div className="w-full h-full relative">
          <Image
            // className="relative h-screen"
            src={posimg}
            // width={95}
            // height={145}
            // fill={true}
            alt="poster"
          ></Image>
          <div className="absolute w-full bottom-0 text-white bg-transparent h-12 backdrop-blur-md">
            name
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
