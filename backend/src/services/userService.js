const User = require("../models/userModel");

exports.createUser = async (userData) => {
  try {
    const { user, email, mobile, age, interest } = userData;


    if (typeof user !== 'string' || user.trim().length === 0 || /\d/.test(user)) {
      const error = new Error("User name must be a valid string without numbers.");
      error.status = 400;
      throw error;
    }

    if (!/^\d{10}$/.test(mobile)) {
      const error = new Error("Mobile number must be exactly 10 digits.");
      error.status = 400;
      throw error;
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
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
