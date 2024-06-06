import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utills/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    // req.body is what is received from the form/send from the http body
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !email) {
        res.status(400).json({
            success: false,
            message:
                "Missing required fields: username, password, and email are required.",
        });
        return;
    }

    const hashedpw = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpw });
    try {
        await newUser.save();
        res.status(201).json("user created");
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Missing required fields: email and password are required.",
        });
        return;
    }
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found!"));
      
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      
      if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
        
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc
      res.cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
    } catch (error) {
      next(error);
    }
//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });

//         // If user is not found, return error
//         if (!user) {
//             res.status(404).json({
//                 success: false,
//                 message: "Invalid credentials.",
//             });
//             return;
//         }

//         // Compare the provided password with the hashed password in the database
//         const isPasswordValid = bcryptjs.compareSync(password, user.password);

//         // If password is not valid, return error
//         if (!isPasswordValid) {
//             res.status(401).json({
//                 success: false,
//                 message: "Invalid credentials.",
//             });
//             return;
//         }

//         // If user is found and password is valid, generate a token and send it in the response
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         res.cookie('access_token', token, { httpOnly: true }).status(200).json(user)

//         const { password: pw, ...rest } = user._doc
//         res
//             .status(200)
//             .json(rest)
           
//         ;
//     } catch (error) {
//         next(error);
//     }
}