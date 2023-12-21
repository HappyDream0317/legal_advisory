import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { MONGODB_URI, MONGODB_DB, SECRETKEY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required!" });
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);

  try {
    const decoded = jwt.verify(token, SECRETKEY);
    var email = decoded.userEmail;
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      if(existingUser.status === true){
        const filter = { email: email };
        const updateDoc = {
          $set: {
            status: true
          },
        };
        await db.collection("users").updateOne(filter, updateDoc);
        return res.status(200).json({ success:"Verified successfully" });
      } else {
        return res.status(400).json({ error: "Already Verified!" });
      }
    } else {
      return res.status(400).json({ error: "Invalid user!" });
    }

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: "Token has expired.!" });
    } else {
      return res.status(400).json({ error: "Token validation has failed!" });
    }
  } finally {
    client.close();
  }
}
