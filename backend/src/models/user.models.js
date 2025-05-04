import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    fullName: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "admin", "staff"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

const user = mongoose.model("user", userSchema, "user");
export default user;
