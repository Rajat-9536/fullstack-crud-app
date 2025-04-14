const User = require("../models/userModel");

exports.createUser = async (userData) => {
  try {
    const { user, email, mobile, age, interest } = userData;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      // Throw a specific error for duplicate user
      const error = new Error("User with this email or mobile already exists.");
      error.status = 400;
      throw error;
    }

    let formattedInterest = [];
    if (Array.isArray(interest)) {
      formattedInterest = interest;
    } else if (typeof interest === "string") {
      formattedInterest = interest.split(",").map((i) => i.trim());
    }

    const newUser = new User({
      user,
      email,
      mobile,
      age,
      interest: formattedInterest,
    });

    await newUser.save();
    return newUser;

  } catch (error) {
    console.error("Create user error:", error.message);
    throw error;
  }
};
