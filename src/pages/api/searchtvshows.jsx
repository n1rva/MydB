import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?language=en-US&page=1&include_adult=false`,
        {
          params: {
            query,
            api_key: process.env.TMDB_API,
          },
        }
      );

      const data = response.data.results.map((item) => {
        const {
          id,
          original_name,
          first_air_date,
          backdrop_path,
          poster_path,
        } = item;

        return {
          id,
          name: original_name,
          year: first_air_date,
          backdrop: backdrop_path,
          poster: poster_path,
        };
      });
      return res.json({
        message: data,
        success: true,
      });
    } catch (error) {
      return res.json({
        message: error,
        success: false,
      });
    }
  }
}
