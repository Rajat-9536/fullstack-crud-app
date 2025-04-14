const User = require("../models/userModel");
const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error('Error creating user:', error); // Add this
    res.status(500).json({ error: "Error creating user" });
  }
};


exports.getUsersList = async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}

exports.updateUser = async (req,res) => {
  try {
    const userId = req.params.id;
    const {user,email,mobile,age,interest} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        user,
        email,
        mobile,
        age,
        interest: Array.isArray(interest) ? interest : interest.split(",").map((i) => i.trim())
      },
      {new: true}
    );

    if(!updatedUser){
      return res.status(404).json({error:"User not found"});
    }

    res.status(200).json({message:"Update User Successfully",user:updatedUser});
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
}

exports.getUserById = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
}