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
  const { type } = req.body;

  if (type === "send-link") {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);
    try {
      const existingUser = await db.collection("users").findOne({ email });

      if (existingUser) {
        // create jwt token
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
            subject: "Reset your password",
            text: `<p>Click <a href="${BASE_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
          };
      
          await transporter.sendMail(mailOptions);
          return res
            .status(200)
            .json({ message: "User registered successfully" });
      } else {
        return res.status(409).json({ error: "Unregistered User!" });
      }
    } catch (error) {
      console.log("forget error occured:", error);
      return res.status(500).json({ error: "Failed to sending forgot password link." });
    } finally {
      client.close();
    }
  } else if(type === "reset-password") {
    const { token_val, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }
    if (!token_val) {
        return res.status(400).json({ error: "Invalid link" });
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);
    try {
        const decoded = jwt.verify(token_val, SECRETKEY);
        var email = decoded.userEmail;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const filter = { email: email };
        const updateDoc = {
          $set: {
            password: hashedPassword
          },
        };
        await db.collection("users").updateOne(filter, updateDoc);
        return res.status(200).json({ success:"Password was reset successfully" });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ error: "Token has expired.!" });
        } else {
        return res.status(400).json({ error: "Invalid link" });
        }
    } finally {
        client.close();
    }

  }
}
