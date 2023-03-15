import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const app = useRef();
  const logo = useRef();
  const hero = useRef();
  const heroText = useRef();

  useLayoutEffect(() => {
    const navbarLogo = document.getElementsByClassName("navbarLogo")[0];

    const navbarLogoPos = navbarLogo.getBoundingClientRect();
    const logoPos = logo.current.getBoundingClientRect();
    const heroTextPos = heroText.current.getBoundingClientRect();

    console.log(heroTextPos);
    console.log(window.innerWidth, window.innerHeight);

    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // gsap.to(logo.current, {
      //   scrollTrigger: {
      //     trigger: hero.current,
      //     start: "top top",
      //     end: "80% 56px",
      //     markers: true,
      //     scrub: true,
      //     pin: true,
      //   },
      //   y:
      //     navbarLogoInfo.y -
      //     logoInfo.y -
      //     (logoInfo.height / 2 - navbarLogoInfo.height / 2),
      //   x:
      //     navbarLogoInfo.x -
      //     logoInfo.x -
      //     (logoInfo.width / 2 - navbarLogoInfo.width / 2),
      //   ease: "none",
      //   scale: navbarLogoInfo.width / logoInfo.width,
      // });

      const mm = gsap.matchMedia();

      mm.add("(min-width:800px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "+=700",
            markers: true,
            scrub: true,
            pin: true,
            snap: {
              snapTo: "labels",
              ease: "none",
            },
          },
        });

        tl.addLabel("first")
          .to(
            logo.current,
            {
              x:
                navbarLogoPos.x -
                logoPos.x -
                (logoPos.width / 2 - navbarLogoPos.width / 2),
              ease: "none",
              scale: (navbarLogoPos.width / logoPos.width) * 5,
            },
            ">"
          )
          .to(
            heroText.current,
            {
              x:
                window.innerWidth / 2 -
                (heroTextPos.left + heroTextPos.right) / 2,
            },
            "<"
          )
          .to(logo.current, {
            autoAlpha: 0,
            ease: "none",
            y:
              navbarLogoPos.y -
              logoPos.y -
              (logoPos.height / 2 - navbarLogoPos.height / 2),
            scale: navbarLogoPos.width / logoPos.width,
          });

        gsap.to(".content", {
          scrollTrigger: {
            trigger: ".content",
            start: "%10 top",
          },
        });
      });
    }, app);

    return () => ctx.revert();
  }, []);

  return (
    <div className="app" ref={app}>
      <div
        ref={hero}
        className="h-[488px] w-full z-30 flex flex-col space-y-10 pb-14 justify-center items-center shadow-xl md:flex-row md:justify-evenly md:space-y-0 bg-gradient-to-r from-logoFirst to-logoSec  md:h-[52rem] "
      >
        <svg
          ref={logo}
          className="h-24 md:h-64 logo z-50"
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
        <div
          ref={heroText}
          className="inline-flex font-motivaSansTest flex-col items-center space-y-3 md:space-y-8"
        >
          <span className="text-3xl font-bold md:text-8xl text-transparent bg-clip-text  bg-gradient-to-r from-first via-sec to-last">
            Create your list
          </span>
          <span className="text-xl font-medium md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-first via-sec to-last">
            and share it with one click!
          </span>
        </div>
      </div>
      {/* <div className="h-[700px] overflow-auto no-scrollbar content scroll-smooth"> */}
      <div className="flex justify-center my-16">
        <div className="flex flex-col items-center w-3/5 bg-gradient-to-r from-logoFirst via-logoSec to-logoLast font-motivaSansTest rounded-xl md:flex-row md:justify-center md:my-36">
          <div className="w-full relative after:content-[' '] after:absolute after:rounded-2xl after:top-0 after:left-0 after:bottom-0 after:right-0 after:border-8 after:border-white ">
            <div className="relative h-36 w-full p-4 bg-slate-200 space-y-2 border-4 border-white bg-opacity-80 md:h-48 md:min-w-72">
              <div className="absolute top-1 left-1 bottom-1 right-1 rounded-xl z-30 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]" />
              <span className="font-medium text-2xl">Sign Up</span>
              <p className="font-medium text-lg text-slate-600">
                Sign up to create your own list!
              </p>
            </div>
          </div>
          <div className="w-full relative after:content-[' '] after:absolute after:rounded-2xl after:top-0 after:left-0 after:bottom-0 after:right-0 after:border-8 after:border-white ">
            <div className="relative h-36 w-full p-4 space-y-2 border-4 border-white bg-slate-200 bg-opacity-80  md:h-48 md:min-w-72 ">
              <div className="absolute top-1 left-1 bottom-1 right-1 rounded-xl z-30 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]" />
              <span className="font-medium text-2xl">Create List</span>
              <p className="font-medium text-lg text-slate-600">
                Create your list to show your friends!
              </p>
            </div>
          </div>
          <div className="w-full relative  after:content-[' '] after:absolute after:rounded-2xl after:top-0 after:left-0 after:bottom-0 after:right-0 after:border-8 after:border-white ">
            <div className="relative h-36 w-full p-4 space-y-2 border-4 border-white bg-slate-200 bg-opacity-80 md:h-48 md:min-w-72">
              <div className="absolute top-1 left-1 bottom-1 right-1 rounded-xl z-30 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]" />
              <span className="font-medium text-2xl">Share It!</span>
              <p className="font-medium text-lg text-slate-600">
                Share it with one click!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border bg-gradient-to-r from-logoFirst to-logoSec">
        <div className="w-4/5 sm:w-3/5 mx-auto my-16">
          <div className="ml-2 rounded-sm text-center">
            <span className="text-xl font-medium p-1 md:text-2xl lg:text-3xl">
              Top User Lists
            </span>
          </div>
          <div className="flex flex-col justify-center items-center mt-4 md:mt-8 w-full md:w-4/5 lg:w-3/5 mx-auto space-y-6">
            <div className="w-full h-14 flex items-center justify-between text-lg font-medium p-2 cursor-pointer border border-black rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-gradient-to-r from-first/20 via-sec/20 to-last/20 hover:from-first/40 hover:via-sec/40 hover:to-last/40">
              <span>1. Nirva</span>
              <span>nirva&apos;s List</span>
              <span className="font-bold">2454 ❤️</span>
            </div>
            <div className="w-full h-14 flex items-center justify-between text-lg font-medium p-2 cursor-pointer border border-black rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-gradient-to-r from-first/20 via-sec/20 to-last/20 hover:from-first/40 hover:via-sec/40 hover:to-last/40">
              <span>1. Nirva</span>
              <span>nirva&apos;s List</span>
              <span className="font-bold">2454 ❤️</span>
            </div>
            <div className="w-full h-14 flex items-center justify-between text-lg font-medium p-2 cursor-pointer border border-black rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-gradient-to-r from-first/20 via-sec/20 to-last/20 hover:from-first/40 hover:via-sec/40 hover:to-last/40">
              <span>1. Nirva</span>
              <span>nirva&apos;s List</span>
              <span className="font-bold">2454 ❤️</span>
            </div>
            <div className="w-full h-14 flex items-center justify-between text-lg font-medium p-2 cursor-pointer border border-black rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-gradient-to-r from-first/20 via-sec/20 to-last/20 hover:from-first/40 hover:via-sec/40 hover:to-last/40">
              <span>1. Nirva</span>
              <span>nirva&apos;s List</span>
              <span className="font-bold">2454 ❤️</span>
            </div>
            <div className="w-full h-14 flex items-center justify-between text-lg font-medium p-2 cursor-pointer border border-black rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-gradient-to-r from-first/20 via-sec/20 to-last/20 hover:from-first/40 hover:via-sec/40 hover:to-last/40">
              <span>1. Nirva</span>
              <span>nirva&apos;s List</span>
              <span className="font-bold">2454 ❤️</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-24 flex-col items-center w-4/5 md:w-3/5 space-y-4 mx-auto">
        <span className="font-medium text-3xl">
          What are your favorite TV shows? Start creating your list today!
        </span>
        <Link
          href={"createlist"}
          className="py-2 px-3 border bg-logoFirst rounded-lg hover:bg-logoFirst/70"
        >
          Create List
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
}
