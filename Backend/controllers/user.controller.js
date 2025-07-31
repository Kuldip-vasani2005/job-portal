import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname, email, phoneNumber, password, role);
    // Check for missing fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};

//Login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1. Input validation
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // 3. Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // 4. Check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    // 5. Create token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // 6. Prepare user response data
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // 7. Set cookie and return response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData, // ✅ use new object
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//LogOut

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        // httpOnly: true, // Optional: for security
        // sameSite: "strict", // Optional: for CSRF protection
        // secure: process.env.NODE_ENV === "production", // Optional: only send on HTTPS
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Logout failed.",
      success: false,
    });
  }
};

//UpdateProfile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Assuming middleware adds this
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save(); // ✅ Save changes to DBs

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
