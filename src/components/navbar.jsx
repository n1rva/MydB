import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "../../util/toastProps";

function Navbar() {
  const { data: session } = useSession();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toastSignOut = useRef(null);

  const handleSignOut = () => {
    signOut({ redirect: false });
    toastSignOut.current = toast.success("Signed Out!", toastProps);
  };

  return (
    <>
      <nav className="h-11 w-full z-40 px-4 flex justify-between items-centerr shadow-md backdrop-blur fixed md:h-14 md:px-24 bg-gradient-to-r from-logoFirst via-logoSec to-logoLast ">
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
                <stop stopColor="#64C2DB" />
                <stop offset="0.510417" stopColor="#7476ED" />
                <stop offset="1" stopColor="#E56F8C" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-medium text-lg md:text-xl text-white">
            MydB
          </span>
        </Link>
        <div className="flex items-center md:flex-col">
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="md:hidden"
          >
            <svg
              className="w-8 h-full fill-first"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d=" M 200 713C 200 713 800 713 800 713C 814 712 826 719 833 731C 840 743 840 757 833 769C 826 781 814 788 800 788C 800 788 200 788 200 788C 186 788 174 781 167 769C 160 757 160 743 167 731C 174 719 186 712 200 713C 200 713 200 713 200 713M 200 462C 200 462 800 462 800 462C 814 462 826 469 833 481C 840 493 840 507 833 519C 826 531 814 538 800 538C 800 538 200 538 200 538C 186 538 174 531 167 519C 160 507 160 493 167 481C 174 469 186 462 200 462C 200 462 200 462 200 462M 200 213C 200 213 800 213 800 213C 814 212 826 219 833 231C 840 243 840 257 833 269C 826 281 814 288 800 287C 800 287 200 287 200 287C 186 288 174 281 167 269C 160 257 160 243 167 231C 174 219 186 212 200 213C 200 213 200 213 200 213" />
            </svg>
          </button>
          <div className="hidden md:flex">
            {session ? (
              <div className="relative flex flex-col items-end select-none">
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center h-14 space-x-2 capitalize text-first cursor-pointer border-sec"
                >
                  <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-sec to-first drop-shadow-xl">
                    {session.user.username}
                  </span>
                  <svg
                    className="w-5 fill-first"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d=" M 165 565C 165 565 465 265 465 265C 484 245 516 245 535 265C 535 265 835 565 835 565C 855 584 856 616 836 636C 816 656 784 655 765 635C 765 635 500 371 500 371C 500 371 235 635 235 635C 221 650 200 655 181 647C 162 639 150 621 150 601C 150 587 155 574 165 565C 165 565 165 565 165 565"
                      transform="rotate(180,500,500)"
                    />
                  </svg>
                </div>
                {isUserMenuOpen && (
                  <ul
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex flex-col py-1 bg-first/20 backdrop-blur-md drop-shadow-xl rounded-lg font-medium text-first shadow-md"
                  >
                    <li>
                      <Link
                        href={"/createlist"}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <svg
                          className="h-full w-6 fill-first"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0M 175 750C 175 750 175 750 175 750C 175 625 250 550 375 550C 458 571 458 575 500 575C 542 575 547 571 630 550C 755 550 825 625 825 750C 825 750 825 825 825 825C 825 867 792 900 750 900C 750 900 250 900 250 900C 208 900 175 867 175 825C 175 825 175 750 175 750M 367 173C 367 173 367 173 367 173C 403 138 450 118 500 118C 550 118 597 138 633 173C 668 208 688 256 688 306C 687 409 604 493 500 493C 396 493 312 409 312 306C 312 256 332 208 367 173" />
                        </svg>
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/list/Nirva"}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <svg
                          className="h-full w-6 fill-first"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0M 200 688C 200 688 800 688 800 688C 823 687 844 699 855 718C 866 738 866 762 855 782C 844 801 823 813 800 812C 800 812 200 812 200 812C 177 813 156 801 145 782C 134 762 134 738 145 718C 156 699 177 687 200 688C 200 688 200 688 200 688M 200 437C 200 437 800 437 800 437C 823 437 844 449 855 468C 866 488 866 512 855 532C 844 551 823 563 800 563C 800 563 200 563 200 563C 177 563 156 551 145 532C 134 512 134 488 145 468C 156 449 177 437 200 437C 200 437 200 437 200 437M 200 188C 200 188 800 188 800 188C 823 187 844 199 855 218C 866 238 866 262 855 282C 844 301 823 313 800 312C 800 312 200 312 200 312C 177 313 156 301 145 282C 134 262 134 238 145 218C 156 199 177 187 200 188C 200 188 200 188 200 188" />
                        </svg>
                        <span>My List</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/createlist"}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <svg
                          className="h-full w-6 fill-first"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 200 450C 200 435 210 425 225 425C 225 425 425 425 425 425C 425 425 425 225 425 225C 425 210 435 200 450 200C 450 200 550 200 550 200C 565 200 575 210 575 225C 575 225 575 425 575 425C 575 425 775 425 775 425C 790 425 800 435 800 450C 800 450 800 550 800 550C 800 565 790 575 775 575C 775 575 575 575 575 575C 575 575 575 775 575 775C 575 790 565 800 550 800C 550 800 450 800 450 800C 435 800 425 790 425 775C 425 775 425 575 425 575C 425 575 225 575 225 575C 210 575 200 565 200 550C 200 550 200 450 200 450" />
                        </svg>
                        <span>Create List</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <svg
                          className="h-full w-6 fill-last"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d=" M 250 200C 250 200 375 200 375 200C 390 200 400 210 400 225C 400 225 400 275 400 275C 400 290 390 300 375 300C 375 300 250 300 250 300C 215 300 200 315 200 350C 200 350 200 650 200 650C 200 685 215 700 250 700C 250 700 375 700 375 700C 390 700 400 710 400 725C 400 725 400 775 400 775C 400 790 390 800 375 800C 375 800 250 800 250 800C 150 800 100 750 100 650C 100 650 99 348 99 348C 99 248 150 200 250 200C 250 200 250 200 250 200M 650 246C 662 246 679 254 700 275C 700 275 875 450 875 450C 910 485 910 516 875 550C 875 550 700 725 700 725C 650 775 625 750 625 725C 625 725 625 600 625 600C 625 600 475 600 475 600C 444 600 425 588 425 550C 425 550 425 450 425 450C 425 415 442 401 475 400C 475 400 625 400 625 400C 625 400 625 275 625 275C 625 261 633 246 650 246C 650 246 650 246 650 246M 312 1000C 292 1000 333 1000 500 1000C 417 1000 333 1000 312 1000C 312 1000 312 1000 312 1000" />
                        </svg>
                        <span className="text-last">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="hidden h-14 space-x-8 items-center md:flex">
                <Link
                  href={"/signup"}
                  className=" bg-first/70 rounded-lg py-2 px-4 shadow text-sm font-semibold text-white hover:bg-first/50"
                >
                  Sign Up
                </Link>
                <Link
                  href={"/signin"}
                  className=" bg-sec/70 rounded-lg py-2 px-4 shadow text-sm font-semibold text-white hover:bg-sec/50"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed w-full h-full left-0 top-0 bg-gray-500 bg-opacity-70 z-50 ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsSidePanelOpen(false)}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div
          className={`fixed top-0 right-0 h-full w-1/2 px-3 bg-white ease-in-out duration-300
             ${isSidePanelOpen ? "translate-x-0 " : "translate-x-full"}
            `}
        >
          <div className="flex flex-col select-none">
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="h-11 flex items-center self-end"
            >
              <svg
                className="h-full w-full fill-first"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 300 262C 310 262 319 266 327 273C 327 273 500 447 500 447C 500 447 673 273 673 273C 680 266 690 262 699 262C 715 262 729 271 735 285C 741 299 738 316 727 327C 727 327 553 500 553 500C 553 500 727 673 727 673C 736 683 740 697 737 710C 733 723 723 733 710 737C 697 740 683 736 673 727C 673 727 500 553 500 553C 500 553 327 727 327 727C 317 736 303 740 290 737C 277 733 267 723 263 710C 260 697 264 683 273 673C 273 673 447 500 447 500C 447 500 273 327 273 327C 263 316 259 300 265 286C 271 271 284 262 300 262C 300 262 300 262 300 262" />
              </svg>
            </button>
            {session ? (
              <ul
                onClick={() => setIsSidePanelOpen(false)}
                className="flex flex-col py-1 my-20 font-medium text-first text-xl"
              >
                <li>
                  <Link
                    href={"/createlist"}
                    className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-6 fill-first"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0M 175 750C 175 750 175 750 175 750C 175 625 250 550 375 550C 458 571 458 575 500 575C 542 575 547 571 630 550C 755 550 825 625 825 750C 825 750 825 825 825 825C 825 867 792 900 750 900C 750 900 250 900 250 900C 208 900 175 867 175 825C 175 825 175 750 175 750M 367 173C 367 173 367 173 367 173C 403 138 450 118 500 118C 550 118 597 138 633 173C 668 208 688 256 688 306C 687 409 604 493 500 493C 396 493 312 409 312 306C 312 256 332 208 367 173" />
                    </svg>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/list/Nirva"}
                    className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-6 fill-first"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0M 200 688C 200 688 800 688 800 688C 823 687 844 699 855 718C 866 738 866 762 855 782C 844 801 823 813 800 812C 800 812 200 812 200 812C 177 813 156 801 145 782C 134 762 134 738 145 718C 156 699 177 687 200 688C 200 688 200 688 200 688M 200 437C 200 437 800 437 800 437C 823 437 844 449 855 468C 866 488 866 512 855 532C 844 551 823 563 800 563C 800 563 200 563 200 563C 177 563 156 551 145 532C 134 512 134 488 145 468C 156 449 177 437 200 437C 200 437 200 437 200 437M 200 188C 200 188 800 188 800 188C 823 187 844 199 855 218C 866 238 866 262 855 282C 844 301 823 313 800 312C 800 312 200 312 200 312C 177 313 156 301 145 282C 134 262 134 238 145 218C 156 199 177 187 200 188C 200 188 200 188 200 188" />
                    </svg>
                    <span>My List</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/createlist"}
                    className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-6 fill-first"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 200 450C 200 435 210 425 225 425C 225 425 425 425 425 425C 425 425 425 225 425 225C 425 210 435 200 450 200C 450 200 550 200 550 200C 565 200 575 210 575 225C 575 225 575 425 575 425C 575 425 775 425 775 425C 790 425 800 435 800 450C 800 450 800 550 800 550C 800 565 790 575 775 575C 775 575 575 575 575 575C 575 575 575 775 575 775C 575 790 565 800 550 800C 550 800 450 800 450 800C 435 800 425 790 425 775C 425 775 425 575 425 575C 425 575 225 575 225 575C 210 575 200 565 200 550C 200 550 200 450 200 450" />
                    </svg>
                    <span>Create List</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-6 fill-last"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d=" M 250 200C 250 200 375 200 375 200C 390 200 400 210 400 225C 400 225 400 275 400 275C 400 290 390 300 375 300C 375 300 250 300 250 300C 215 300 200 315 200 350C 200 350 200 650 200 650C 200 685 215 700 250 700C 250 700 375 700 375 700C 390 700 400 710 400 725C 400 725 400 775 400 775C 400 790 390 800 375 800C 375 800 250 800 250 800C 150 800 100 750 100 650C 100 650 99 348 99 348C 99 248 150 200 250 200C 250 200 250 200 250 200M 650 246C 662 246 679 254 700 275C 700 275 875 450 875 450C 910 485 910 516 875 550C 875 550 700 725 700 725C 650 775 625 750 625 725C 625 725 625 600 625 600C 625 600 475 600 475 600C 444 600 425 588 425 550C 425 550 425 450 425 450C 425 415 442 401 475 400C 475 400 625 400 625 400C 625 400 625 275 625 275C 625 261 633 246 650 246C 650 246 650 246 650 246M 312 1000C 292 1000 333 1000 500 1000C 417 1000 333 1000 312 1000C 312 1000 312 1000 312 1000" />
                    </svg>
                    <span className="text-last">Sign Out</span>
                  </button>
                </li>
              </ul>
            ) : (
              <ul
                onClick={() => setIsSidePanelOpen(false)}
                className="flex flex-col py-1 my-20 font-medium text-first text-xl"
              >
                <li>
                  <Link
                    href={"/signup"}
                    className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-7 fill-first"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 375 550C 458 571 458 575 500 575C 542 575 547 571 630 550C 755 550 825 625 825 750C 825 750 825 825 825 825C 825 867 792 900 750 900C 750 900 250 900 250 900C 208 900 175 867 175 825C 175 825 175 750 175 750C 175 625 250 550 375 550C 375 550 375 550 375 550M 800 300C 800 300 850 300 850 300C 864 300 875 311 875 325C 875 325 875 400 875 400C 875 400 950 400 950 400C 964 400 975 411 975 425C 975 425 975 475 975 475C 975 489 964 500 950 500C 950 500 875 500 875 500C 875 500 875 575 875 575C 875 589 864 600 850 600C 850 600 800 600 800 600C 786 600 775 589 775 575C 775 575 775 500 775 500C 775 500 700 500 700 500C 686 500 675 489 675 475C 675 475 675 425 675 425C 675 411 686 400 700 400C 700 400 775 400 775 400C 775 400 775 325 775 325C 775 311 786 300 800 300C 800 300 800 300 800 300M 500 118C 550 118 597 138 633 173C 668 208 688 256 688 306C 687 409 604 493 500 493C 396 493 312 409 312 306C 312 256 332 208 367 173C 403 138 450 118 500 118C 500 118 500 118 500 118" />
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/signin"}
                    className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                  >
                    <svg
                      className="h-full w-8 fill-first"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 500 1000C 167 1000 333 1000 500 1000C 500 1000 500 1000 500 1000M 625 200C 625 200 750 200 750 200C 850 200 900 250 900 350C 900 350 900 650 900 650C 900 750 850 800 750 800C 750 800 625 800 625 800C 610 800 600 790 600 775C 600 775 600 725 600 725C 600 710 610 700 625 700C 625 700 750 700 750 700C 785 700 800 685 800 650C 800 650 800 350 800 350C 800 315 785 300 750 300C 750 300 625 300 625 300C 610 300 600 290 600 275C 600 275 600 225 600 225C 600 210 610 200 625 200C 625 200 625 200 625 200M 325 246C 337 246 354 254 375 275C 375 275 550 450 550 450C 585 485 585 516 550 550C 550 550 375 725 375 725C 325 775 300 750 300 725C 300 725 300 600 300 600C 300 600 150 600 150 600C 119 600 100 588 100 550C 100 550 100 450 100 450C 100 415 117 401 150 400C 150 400 300 400 300 400C 300 400 300 275 300 275C 300 261 308 246 325 246C 325 246 325 246 325 246" />
                    </svg>
                    <span>Sign In</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
