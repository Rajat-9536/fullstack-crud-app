const User = require("../models/userModel");

exports.createUser = async (userData) => {
  const { user, email, mobile, age, interest } = userData;

  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    throw new Error("User with this email or mobile already exists.");
  }

  let formattedInterest = [];
  if (Array.isArray(interest)) {
    formattedInterest = interest;
  } else if (typeof interest === "string") {
    formattedInterest = interest.split(",").map((i) => i.trim());
  }

  // Create the new user
  const newUser = new User({
    user,
    email,
    mobile,
    age,
    interest: formattedInterest,
  });

  await newUser.save();
  return newUser;
};
