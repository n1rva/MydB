import { useEffect, useRef, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Router from "next/router";
import Image from "next/image";

import useDebounce from "../components/useDebounce";
import { toastProps } from "../../util/toastProps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { connectToDatabase } from "../../util/mongodb";

export default function AddShow({ data }) {
  const [tvShows, setTvShows] = useState(data);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [isModalOpen, setisModalOpen] = useState(false);

  const toastTVShowAdd = useRef(null);
  const toastTVShowDelete = useRef(null);
  const toastTVShowSearch = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  async function handleSubmit(event) {
    event.preventDefault();
    toastTVShowAdd.current = toast.loading("TV Show Adding...", { toastProps });

    const { name, poster } = selectedItem;

    const data = { name, poster, comment, rating };

    const response = await axios.post("/api/tvshows", data);

    if (response.data.success) {
      toast.update(toastTVShowAdd.current, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        ...toastProps,
      });
      Router.reload();
    } else
      toast.update(toastTVShowAdd.current, {
        render: "An error occurred while adding.",
        type: "error",
        isLoading: false,
        ...toastProps,
      });
  }

  const handleSearch = async (query) => {
    try {
      const response = await axios.post("/api/searchtvshows", {
        query,
      });

      let data = response.data.message;
      data = data.slice(0, 5);

      setSearchResults(data);
    } catch (error) {
      toastTVShowSearch.current = toast.error("Search Failed", {
        toastProps,
      });
    }
  };

  const handleChange = (e) => {
    setSearchIsLoading(true);
    const query = e.target.value;
    setSearchTerm(query);
  };

  const handleSelectItem = ({ name, year, poster }) => {
    setSelectedItem({ name, year, poster });
    setSearchResults([]);
  };

  const deleteTVShow = async (id) => {
    toastTVShowDelete.current = toast.loading("TV Show deleting...", {
      toastProps,
    });

    const response = await axios.delete("/api/tvshows", { data: id });

    if (response.data.success) {
      let updatedTVShows = tvShows.filter((i) => i._id != id);
      setTvShows(updatedTVShows);
      toast.update(toastTVShowDelete.current, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        ...toastProps,
      });
    } else {
      toast.update(toastTVShowDelete.current, {
        render: "An error occurred while deleting.",
        type: "error",
        isLoading: false,
        ...toastProps,
      });
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      handleSearch(debouncedSearchTerm);
      setSearchIsLoading(false);
    } else {
      setSearchIsLoading(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed w-full h-full left-0 top-0 bg-gray-500 bg-opacity-70 z-50 transition-opacity duration-1000">
          <div
            onClick={() => setisModalOpen(false)}
            className="absolute top-0 left-0 w-full h-full"
          />
          <div className="absolute h-full w-full overflow-y-scroll no-scrollbar top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:rounded-md lg:h-[80vh] lg:w-[1000px] lg:border-4 border-first shadow-lg bg-white bg-opacity-95">
            <div className="flex flex-col space-y-12 lg:flex-row lg:space-x-6 lg:space-y-0 lg:justify-center">
              <div className="h-full w-full lg:w-2/5 flex flex-col items-center">
                <h2 className="my-8 font-bold text-2xl text-first">
                  Search TV Show
                </h2>
                <div className="mt-8 flex">
                  <div className="flex flex-col mx-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleChange}
                      placeholder="Person of Interest"
                      className="border border-first outline-none font-medium px-2 h-10 w-96 rounded-md"
                    />
                    <div className="absolute mt-10 z-20 bg-white">
                      {searchResults?.map((tvshow) => {
                        const { id, name, year, backdrop, poster } = tvshow;
                        return (
                          <div
                            onClick={() =>
                              handleSelectItem({ name, year, poster })
                            }
                            key={id}
                            className="flex w-96 h-16 my-1 rounded-md border border-sec hover:bg-gray-200 cursor-pointer"
                          >
                            <div className="p-1">
                              <Image
                                priority
                                src={
                                  backdrop
                                    ? `https://image.tmdb.org/t/p/w500/${backdrop}`
                                    : "/dummy.png"
                                }
                                width="180"
                                height="100"
                                placeholder="blur"
                                blurDataURL="/dummy.png"
                                sizes="10vw"
                                alt="backdrop"
                                className="w-full h-full rounded-sm"
                              />
                            </div>
                            <div className="w-fit whitespace-nowrap overflow-hidden ">
                              <h2 className="w-64 font-bold text-lg text-sec">
                                {name}
                              </h2>
                              <h3 className="font-medium text-gray-500">
                                {year}
                              </h3>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex mt-3">
                    {searchIsLoading ? (
                      <div className="flex">
                        <div className="relative w-4 h-4 animate-spin rounded-full bg-gradient-to-r from-first via-sec to-last ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-white"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-gray-500" />
                    )}
                  </div>
                </div>
              </div>
              <div className="h-full w-full px-4 flex flex-col items-center max-w-md mx-auto ">
                <h2 className="my-8 font-bold text-2xl text-sec">
                  Add TV Show
                </h2>
                <div className="flex w-full space-x-3">
                  {selectedItem ? (
                    <div className="relative w-full">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster}`}
                        priority
                        fill
                        sizes="100vw"
                        alt="poster"
                      />
                    </div>
                  ) : (
                    <div className="border border-sec w-60 bg-gray-200" />
                  )}
                  <form
                    className="flex flex-col h-full"
                    onSubmit={handleSubmit}
                  >
                    <label className="flex flex-col text-lg font-medium text-sec">
                      Name
                      <input
                        disabled
                        className="border border-sec outline-none font-medium px-2 h-10 rounded-md text-base text-black cursor-not-allowed"
                        type="text"
                        value={selectedItem.name}
                      />
                    </label>
                    <label className="flex flex-col text-lg font-medium text-sec mt-4">
                      Comment
                      <input
                        className="border border-sec outline-none font-medium px-2 h-10 rounded-md text-base text-black"
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col text-lg font-medium text-sec mt-4">
                      Rating
                      <input
                        className="border border-sec outline-none font-medium px-2 h-10 rounded-md text-base text-black"
                        type="number"
                        step={0.1}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </label>
                    <button
                      className="px-1 py-2 border border-first bg-sec/60 text-first font-medium rounded-md mt-12 hover:bg-sec/40 "
                      type="submit"
                    >
                      Add TV Show
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-full mx-auto pt-14 px-6 container border space-y-6 lg:pt-14">
        <div className="flex justify-between mt-4">
          <span className="text-xl px-4 text-first md:text-2xl lg:text-3xl ">
            nirva&apos;s List
          </span>
          <button
            onClick={() => setisModalOpen(true)}
            className="py-1 px-2 border border-sec rounded-md bg-last/70 font-medium text-white hover:bg-last/50"
          >
            Add TV Show
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tvShows.map((tvshow) => {
            const { _id, name, poster, comment, rating } = tvshow;
            return (
              <div
                key={_id}
                className="flex justify-center items-center my-2 lg:my-6"
              >
                <div className="relative p-2 w-36 singleItemBorder lg:w-44">
                  <Image
                    className="rounded-md w-full h-full"
                    placeholder="blur"
                    blurDataURL="/poster.png"
                    src={`https://image.tmdb.org/t/p/w500/${poster}`}
                    width={100}
                    height={150}
                    sizes="100vw"
                    alt="poster"
                  />
                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      className="bg-transparent rounded-md inline-flex items-center justify-center text-last hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-last"
                      onClick={() => deleteTVShow(_id)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col text-sm items-start text-first font-medium lg:text-base">
                    <span>{name}</span>
                    <span className="italic text-transparent bg-gradient-to-r from-first via-sec to-last bg-clip-text">
                      {comment}
                    </span>
                    <span>{rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const data = await db.collection("tvshows").find({}).toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      session,
    },
  };
}
