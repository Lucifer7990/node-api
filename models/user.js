import mongoose from "mongoose";
mongoose.connect('mongodb+srv://admin:admin123@dhruv.slhzn6v.mongodb.net/usersDB')

// mongoose.connect("mongodb://localhost:27017/temp");

// Define the schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const User = mongoose.model("User", userSchema);

export default User;
