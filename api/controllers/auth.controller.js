import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utills/error.js";

export const signup = async (req, res, next) => {
    // req.body is what is received from the form/send from the http body
    const { username, email, password } = req.body;
    const hashedpw = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedpw });
    try {
        await newUser.save()
        res.status(201).json("user created")
    } catch (error) {
        next(error)
    }

}