import Link from "next/link";

function Navbar() {
  return (
    <nav className="h-11 w-full z-40 px-4 flex justify-between items-center shadow-md backdrop-blur fixed md:h-14 md:px-24 bg-gradient-to-r from-logoFirst via-logoSec to-logoLast ">
      <Link
        className="flex h-full items-center space-x-2 cursor-pointer"
        href={"/"}
      >
        <svg
          className="navbarLogo h-3/5 w-fit self-center "
          viewBox="0 0 471 364"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M142.975 334.376C102.107 376.036 32.8912 375.87 13.5611 320.347C9.77659 309.476 6.7507 298.299 4.52517 286.894C-4.56164 240.326 0.102037 192.058 17.9265 148.192C35.7509 104.328 65.9355 66.8355 104.663 40.4574C143.392 14.0793 188.923 -2.03383e-06 235.501 0C282.078 2.03384e-06 327.61 14.0793 366.337 40.4574C405.065 66.8355 435.249 104.328 453.074 148.194C470.898 192.058 475.561 240.326 466.475 286.894C464.25 298.299 461.224 309.476 457.438 320.347C438.108 375.87 368.893 376.036 328.024 334.376L264.938 270.068C258.91 263.924 259.533 253.791 261.196 245.27C262.206 240.09 261.687 234.72 259.704 229.84C257.721 224.96 254.364 220.789 250.056 217.855C245.747 214.921 240.682 213.354 235.501 213.354C230.319 213.354 225.254 214.921 220.946 217.855C216.636 220.789 213.279 224.96 211.296 229.84C209.313 234.72 208.794 240.09 209.805 245.27C211.468 253.791 212.089 263.924 206.062 270.068L142.975 334.376Z"
            fill="url(#paint0_linear_15_245)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_15_245"
              x1="449.563"
              y1="120.03"
              x2="31.5511"
              y2="120.03"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#64C2DB" />
              <stop offset="0.510417" stop-color="#7476ED" />
              <stop offset="1" stop-color="#E56F8C" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-medium text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#e2e2e2] to-[#dfdfdf]">
          MydB
        </span>
      </Link>

      <div>
        {/* hamburger menu for mobile - hidden after md: */}
        <div className="md:hidden">
          <svg
            className="fill-[#79CBCA]"
            width="24"
            height="24"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d=" M 200 713C 200 713 800 713 800 713C 814 712 826 719 833 731C 840 743 840 757 833 769C 826 781 814 788 800 788C 800 788 200 788 200 788C 186 788 174 781 167 769C 160 757 160 743 167 731C 174 719 186 712 200 713C 200 713 200 713 200 713M 200 462C 200 462 800 462 800 462C 814 462 826 469 833 481C 840 493 840 507 833 519C 826 531 814 538 800 538C 800 538 200 538 200 538C 186 538 174 531 167 519C 160 507 160 493 167 481C 174 469 186 462 200 462C 200 462 200 462 200 462M 200 213C 200 213 800 213 800 213C 814 212 826 219 833 231C 840 243 840 257 833 269C 826 281 814 288 800 287C 800 287 200 287 200 287C 186 288 174 281 167 269C 160 257 160 243 167 231C 174 219 186 212 200 213C 200 213 200 213 200 213" />
          </svg>
        </div>
        {/* signin- signup */}
        <div className="space-x-8 hidden md:flex">
          <Link
            href={"/signup"}
            class=" bg-blue-100 rounded-lg py-2 px-4 shadow text-sm font-semibold text-slate-400"
          >
            Sign Up
          </Link>
          <Link
            href={"/signin"}
            class=" bg-pink-100 rounded-lg py-2 px-4 shadow text-sm font-semibold text-slate-400"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
