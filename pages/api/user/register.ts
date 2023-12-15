import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { BASE_URL } from "../../../constants/constants";

dotenv.config();

const { MONGODB_URI, MONGODB_DB, SECRETKEY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (name === " " && password === " ") {
    const secretKey = SECRETKEY;
    const payload = { userEmail: email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "superdeveloper4913@gmail.com",
        pass: "joja fabl vzft ughx",
      },
    });

    let mailOptions = {
      from: "superdeveloper4913@gmail.com",
      to: email,
      subject: "Verify Your Email Address",
      text: `<p>Click <a href="${BASE_URL}/verify-email?token=${token}">here</a> to verify your email address.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Verify link successfully sent" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // password = hashPassword;

  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);

  try {
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const result = await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword, status: false });

    const secretKey = SECRETKEY;
    const payload = { userEmail: email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "superdeveloper4913@gmail.com",
        pass: "joja fabl vzft ughx",
      },
    });

    let mailOptions = {
      from: "superdeveloper4913@gmail.com",
      to: email,
      subject: "Verify Your Email Address",
      text: `<p>Click <a href="${BASE_URL}/verify-email?token=${token}">here</a> to verify your email address.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "User registered successfully", data: result });
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  } finally {
    client.close();
  }
}
