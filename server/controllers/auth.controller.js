import User from "../models/user.model.js"; // Import User model

export const handleClerkAuth = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      user = new User({ username, email });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error("Error in Clerk Auth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
