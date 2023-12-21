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

function ClaimRequestModel() {
  const schema = new Schema(
    {
      email: { type: String, required: true },
      date: { type: String, required: true },
      airline: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      claim_type: { type: String, required: true },
      hours: { type: Number, required: true },
      delay_reason: { type: String, required: true },
      additional_expenses_status: { type: String, required: true },
      additional_expenses_cost: { type: Number,required:true},
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

  return mongoose.models.ClaimRequest || mongoose.model("ClaimRequest", schema);
}

export const db = {
  User: userModel(),
  ClaimRequest: ClaimRequestModel()
};
