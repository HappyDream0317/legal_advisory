import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const { MONGODB_URI, MONGODB_DB, SECRETKEY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var { email, password } = req.body;

  var return_val = {
    success: true,
    msg: "",
  };
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // password = hashPassword;

  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);

  try {
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(409).json({ error: "Password Incorrect!" });
      } else {
        console.log(SECRETKEY)
        const secretKey = SECRETKEY;
        const payload = { userEmail: email };
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        res.setHeader("Set-Cookie", `authorization=${token}; Path=/; HttpOnly`);
        return res
          .status(200)
          .json({ message: "Successfully logged in!", token: token, user:existingUser });
      }
    } else {
      return res.status(409).json({ error: "User can't find." });
    }
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  } finally {
    client.close();
  }
}
