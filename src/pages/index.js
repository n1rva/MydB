import Link from "next/link";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TopLists from "@src/components/toplists";

export default function Home() {
  const app = useRef();
  const hero = useRef();
  const heroText = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width:800px)", () => {
        const heroTL = gsap.timeline({
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "+=200",
            scrub: true,
            pin: false,
            snap: {
              snapTo: "labels",
              ease: "none",
            },
          },
        });

        heroTL
          .addLabel("circle")
          .to(
            ".secCircle",
            {
              x: -30,
              y: -30,
            },
            ">"
          )
          .to(
            ".thirdCircle",
            {
              x: -40,
              y: -40,
            },
            "<"
          )
          .to(
            ".firstCircle",
            {
              x: -10,
              y: -10,
            },
            "<"
          );

        const contentCircles = gsap.timeline({
          scrollTrigger: {
            trigger: ".content",
            start: "top top",
            end: "+=900",
            scrub: true,
            pin: false,
            snap: {
              snapTo: "labels",
              ease: "none",
            },
          },
        });
        contentCircles
          .addLabel("circles")
          .to(
            ".contentCircleTop",
            {
              x: -100,
              y: -100,
            },
            ">"
          )
          .to(
            ".contentCircleLeft",
            {
              x: 50,
            },
            "<"
          )
          .to(
            ".contentCircleBottom",
            {
              x: 100,
              y: 100,
            },
            "<"
          );

        gsap.to(".contentFirst", {
          scrollTrigger: {
            trigger: ".content",
            start: "top 800",
            end: "+=500",
            scrub: true,
          },
          xPercent: 10,
        });
        gsap.to(".contentSecond", {
          scrollTrigger: {
            trigger: ".content",
            start: "top 500",
            end: "+=500",
            scrub: true,
          },
          xPercent: -10,
        });
        gsap.to(".contentThird", {
          scrollTrigger: {
            trigger: ".content",
            start: "top 200",
            end: "+=500",
            scrub: true,
          },
          xPercent: 10,
        });
      });
    }, app);

    return () => ctx.revert();
  }, []);

  return (
    <div className="app" ref={app}>
      <div
        ref={hero}
        className="container relative overflow-clip mx-auto px-4 pt-20 mb-32 z-30 flex space-y-10 items-start md:pt-36 md:mb-64 lg:pt-44 lg:pb-20 xl:pt-60 "
      >
        <div
          ref={heroText}
          className="flex font-motivaSansTest flex-col md:space-y-8"
        >
          <span className="text-xl w-80 font-bold md:text-3xl md:w-2/3 lg:w-[35rem] lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-first via-sec to-last">
            Discover the Best TV Shows and Create Your Own Lists with Us!
          </span>
          <span className="text-sm w-[19rem] font-medium my-3 md:text-lg md:w-3/5 lg:w-[34rem] lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-first via-sec to-last">
            Browse through user-generated lists to find the most popular TV show
            recommendations and create your own lists to join the community.
          </span>
          <Link
            href={"/createlist"}
            className="p-[1px] mt-4 w-fit bg-gradient-to-r from-first via-sec to-last rounded-md md:mt-0 md:rounded-2xl"
          >
            <button className="p-1 md:py-2 md:px-4 bg-opacity-[0.85] bg-white rounded-md md:rounded-2xl hover:bg-opacity-70">
              <span className="bg-gradient-to-r from-first via-sec to-last bg-clip-text text-transparent font-medium md:font-bold">
                Create List
              </span>
            </button>
          </Link>
        </div>

        <div className="absolute firstCircle -z-10 blur-sm bg-first/50 rounded-full w-60 h-60 -bottom-32 -right-32 lg:w-[27rem] lg:h-[27rem] lg:-bottom-48 lg:-right-32"></div>
        <div className="absolute secCircle -z-20 blur-sm bg-sec/50 rounded-full w-44 h-44 -bottom-8 -right-8 lg:w-80 lg:h-80 lg:-bottom-4 lg:right-6"></div>
        <div className="absolute thirdCircle -z-30 blur-sm bg-last/30 rounded-full w-32 h-32 bottom-8 right-10 lg:w-64 lg:h-64 lg:bottom-24 lg:right-32"></div>
      </div>

      <div className="content max-w-md mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl relative mt-4 overflow-clip">
        <div className="top-11 sticky -z-10">
          <div className="w-full h-screen absolute overflow-clip rounded-3xl">
            <div className="absolute contentCircleTop blur-md rounded-full bg-first/50 h-64 w-64 -right-32 -top-32 lg:-right-[300px] lg:-top-[300px] lg:h-[600px] lg:w-[600px]"></div>
            <div className="absolute contentCircleLeft blur-md rounded-full bg-sec/50 h-64 w-64 -left-52 top-40  lg:-left-[540px] lg:top-28 lg:h-[600px] lg:w-[600px]"></div>
            <div className="absolute contentCircleBottom blur-md rounded-full bg-last/50 h-64 w-64 right-0 -bottom-28 lg:-bottom-[300px] lg:h-[600px] lg:w-[600px] "></div>
          </div>
        </div>
        <div className="relative p-4 flex flex-col w-full h-full space-y-16 lg:px-20 lg:space-y-48">
          <div className="flex flex-col contentFirst p-3 w-52 space-y-4 lg:w-96">
            <div className="flex text-center">
              <span className="basis-1/4">
                <svg
                  className="inline-block fill-sec/80 h-8 lg:h-10"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d=" M 175 750C 175 750 175 750 175 750C 175 625 250 550 375 550C 458 571 458 575 500 575C 542 575 547 571 630 550C 755 550 825 625 825 750C 825 750 825 825 825 825C 825 867 792 900 750 900C 750 900 250 900 250 900C 208 900 175 867 175 825C 175 825 175 750 175 750M 367 173C 367 173 367 173 367 173C 403 138 450 118 500 118C 550 118 597 138 633 173C 668 208 688 256 688 306C 687 409 604 493 500 493C 396 493 312 409 312 306C 312 256 332 208 367 173" />
                </svg>
              </span>
              <h3 className="basis-1/2 bg-gradient-to-r from-first to-sec bg-clip-text text-transparent font-bold text-lg lg:text-2xl">
                Sign Up
              </h3>
            </div>
            <p className="bg-gradient-to-r from-first to-sec bg-clip-text font-medium text-transparent lg:text-xl">
              Sign up and save your TV show ratings! Joining is free and gives
              you access to all features.
            </p>
          </div>
          <div className="flex flex-col contentSecond p-3 w-52 space-y-4 self-end lg:w-96">
            <div className="flex text-center">
              <span className="basis-1/4">
                <svg
                  className="inline-block fill-sec/80 h-8 lg:h-10"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 200 688C 200 688 800 688 800 688C 823 687 844 699 855 718C 866 738 866 762 855 782C 844 801 823 813 800 812C 800 812 200 812 200 812C 177 813 156 801 145 782C 134 762 134 738 145 718C 156 699 177 687 200 688C 200 688 200 688 200 688M 200 437C 200 437 800 437 800 437C 823 437 844 449 855 468C 866 488 866 512 855 532C 844 551 823 563 800 563C 800 563 200 563 200 563C 177 563 156 551 145 532C 134 512 134 488 145 468C 156 449 177 437 200 437C 200 437 200 437 200 437M 200 188C 200 188 800 188 800 188C 823 187 844 199 855 218C 866 238 866 262 855 282C 844 301 823 313 800 312C 800 312 200 312 200 312C 177 313 156 301 145 282C 134 262 134 238 145 218C 156 199 177 187 200 188C 200 188 200 188 200 188" />
                </svg>
              </span>
              <h3 className="basis-1/2 bg-gradient-to-r from-first to-sec bg-clip-text text-transparent font-bold text-lg lg:text-2xl">
                Create List
              </h3>
            </div>
            <p className="bg-gradient-to-r from-first to-sec bg-clip-text font-medium text-transparent lg:text-xl">
              Easily create your own TV show lists! You can create as many lists
              as you want and rate TV shows.
            </p>
          </div>
          <div className="flex flex-col contentThird p-3 w-56 space-y-4 lg:w-[26rem]">
            <div className="flex text-center">
              <span className="basis-1/4">
                <svg
                  className="inline-block fill-sec/80 h-8 lg:h-10"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 750 88C 750 88 750 88 750 88C 839 88 912 161 912 250C 912 339 839 412 750 412C 705 412 664 394 634 364C 634 364 411 476 411 476C 412 484 412 492 412 500C 412 509 412 517 411 525C 411 525 634 637 634 637C 663 606 705 588 750 588C 839 588 912 661 912 750C 912 839 839 912 750 912C 661 912 588 839 588 750C 588 742 588 734 589 726C 589 726 365 614 365 614C 336 644 295 663 250 663C 161 663 88 589 88 500C 88 411 161 337 250 337C 295 337 336 356 366 387C 366 387 589 274 589 274C 588 266 588 258 588 250C 588 161 661 88 750 88" />
                </svg>
              </span>
              <h3 className="basis-1/2 bg-gradient-to-r from-first to-sec bg-clip-text text-transparent font-bold text-lg lg:text-2xl">
                Share List
              </h3>
            </div>
            <p className="bg-gradient-to-r from-first to-sec bg-clip-text font-medium text-transparent lg:text-xl">
              Share your TV show lists with friends! Sharing your lists can give
              others recommendations or inspiration.
            </p>
          </div>
        </div>
        <TopLists />
        <div className="flex mt-24 flex-col items-center space-y-4 pb-12">
          <span className="bg-gradient-to-r from-first to-sec text-transparent bg-clip-text font-medium text-lg lg:text-2xl lg:font-bold text-center">
            What are your favorite TV shows? <br /> Start creating your list
            today!
          </span>
          <Link
            href={"createlist"}
            className="py-2 px-3 bg-sec rounded-lg hover:bg-sec/80"
          >
            <span className="font-medium text-white">Create List</span>
          </Link>
        </div>
      </div>

      <div className="w-full border bg-gradient-to-r from-logoFirst to-logoSec hidden">
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
    </div>
  );
}
