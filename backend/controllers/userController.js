import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator'


// Login User
const loginUser = async (req, res) => {
    const { email, password } =req.body;
    try {
        const user = await userModel.findOne({email: email})
        
        if(!user) {
            return res.json({
                success: false,
                message: "User Doesn't Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = createToken(user._id)

        return res.json({
            success: true,
            message: "Login Successfully",
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register User
const registerUser = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        // checking whether the user is already exists
        const exists = await userModel.findOne({"email": email})
        if (exists) {
            return res.json({
                success: false,
                message: "User Already Exists"
            })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter valid email"
            })
        }

        // checking password length is greater than 8 or not
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter strong password"
            })
        }

        // encrypting or hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) 

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // saving new user
        const user = await newUser.save();
        const token = createToken(user._id)

        res.json({
            success: true,
            message: "User Registered",
            token
        })

    } catch (err) {
        console.log(err);
        res.json({ 
            success: false, 
            message: "Error" 
        });
    }
}

export {loginUser, registerUser}