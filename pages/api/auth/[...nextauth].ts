import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const { MONGODB_URI, MONGODB_DB, SECRETKEY } = process.env;

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "", // Add default value
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {

      const client = await MongoClient.connect(MONGODB_URI);
      const db = client.db(MONGODB_DB);

      var userEmail = token.email;
      var userName = token.name;

      try {
        const existingUser = await db.collection("users").findOne({ email:userEmail });
        //generate jwt token
        const secretKey = SECRETKEY;
        const payload = { userEmail: userEmail };
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        if (existingUser) {
          return {success:true,email:userEmail, jwtToken:token};
        } else {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash("asvlsisdfv", saltRounds);
          await db
            .collection("users")
            .insertOne({
              email: userEmail,
              password: hashedPassword,
              name: userName,
              status: true,
            });
          return {success:true,email:userEmail, jwtToken:token};
        }
      } catch (error) {
        return {success:false}
      } finally {
        client.close();
      }
    },
  },
});
