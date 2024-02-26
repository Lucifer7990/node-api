import Express from "express";
import User from "../models/user.js";

const router = Express.Router();

// all routes start from /user
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// insert new user in database
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Create a new instance of the User model with the extracted information
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      return res
        .status(400)
        .json({ error: "Email or User Name is already registered" });
    } else {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      return res
        .status(400)
        .json({ error: "Email or User Name is already registered" });
    } else {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body; // Updates to be applied

  try {
    // Find the user by ID and update it
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      return res
        .status(400)
        .json({ error: "Email or User Name is already registered" });
    } else {
      console.error("Error saving user:", error);
      res.status(500).json({ error: error });
    }
  }
});

export default router;
