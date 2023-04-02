import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "../../../util/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { db } = await connectToDatabase();

  const addTVShow = async (req, res) => {
    try {
      const { name, poster, comment, rating } = req.body;

      await db
        .collection("tvshows")
        .insertOne({ name, poster, comment, rating });

      return res.json({
        message: "TV Show has been added successfully.",
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  };

  const deleteTVShow = async (req, res) => {
    const id = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "No ID provided", success: false });
    }

    try {
      const result = await db
        .collection("tvshows")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Item not found", success: false });
      }

      return res.status(200).json({
        message: "TV Show has been deleted successfully.",
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  };

  switch (req.method) {
    case "POST": {
      return addTVShow(req, res);
    }

    case "DELETE": {
      return deleteTVShow(req, res);
    }
  }
}
