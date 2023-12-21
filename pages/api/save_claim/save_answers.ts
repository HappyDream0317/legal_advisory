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
  var { token, date, airline, origin, destination, claim_type, hours, delay_reason, additional_expenses_status, additional_expenses_cost } = req.body;
//   console.log(token, date, airline, origin, destination, claim_type, hours, delay_reason, additional_expenses_status, additional_expenses_cost)
  if (!token || !date || !airline || !origin || !destination || !claim_type || !hours || !delay_reason || !additional_expenses_status) {
    // console.log("sdfsf")
    return res.status(400).json({ error: "required answers" });
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);


  try {
    const decoded = jwt.verify(token, SECRETKEY);
    var email = decoded.userEmail;
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        const result = await db
        .collection("claimRequests")
        .insertOne({ email, date, airline, origin, destination, claim_type, hours, delay_reason, additional_expenses_status, additional_expenses_cost, });
        return res.status(200).json({ success:"Successfully Saved" });
    } else {
      return res.status(400).json({ error: "Invalid user" });
    }

  } catch (error) {
    return res.status(400).json({ error: "Invalid user" });
  } finally {
    client.close();
  }
}
