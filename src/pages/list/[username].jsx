import Image from "next/image";

import { connectToDatabase } from "../../../util/mongodb";
import { useRouter } from "next/router";

function Userlist({ tvshows }) {
  const router = useRouter();

  const TvShow = ({ name, comment, rating, poster }) => (
    <div className="flex justify-center items-center my-2 lg:my-6">
      <div className="p-2 w-36 singleItemBorder lg:w-44">
        <Image
          className="rounded-md w-full h-full"
          placeholder="blur"
          blurDataURL="/poster.png"
          width={100}
          height={150}
          sizes="10vw"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt="poster"
        />
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

  return (
    <div className="h-full mx-auto pt-14 px-6 container border space-y-6 lg:pt-14">
      <div>
        <span className="text-xl px-4 text-first md:text-2xl lg:text-3xl ">
          {router.query.username}&apos;s List
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tvshows.map((tvshow) => {
          return <TvShow key={tvshow._id} {...tvshow} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("tvshows").find({}).toArray();

  const tvshows = JSON.parse(JSON.stringify(data));

  return {
    props: { tvshows },
  };
}

export default Userlist;
