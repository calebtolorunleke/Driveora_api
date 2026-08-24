import mongoose from "mongoose";

const UserSchema = new monggose.Schema(
  {
    name: { type: string, required: true },
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true },
    role: { type: string, enum: ["owner", "user"], default: "user" },
    image: { type: string, default: "" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;
