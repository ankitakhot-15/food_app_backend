// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false, // true = admin
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
