import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

function userModel() {
  const schema = new Schema(
    {
      email: { type: String, required: true },
      name: { type: String, required: true },
      password: { type: String, required: true },
      status: { type: Boolean, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: { _id: any; }) {
      delete ret._id;
    },
  });

  return mongoose.models.User || mongoose.model("User", schema);
}

export const db = {
  User: userModel(),
};
