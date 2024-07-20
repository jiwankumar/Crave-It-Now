import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials!" });
        }

        const token = createToken(user._id);
        console.log(token);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Server Error" })
    }

}

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    if (!token) {
        console.log("Error creating token");
        return null;
    }

    return token;
};

// register user

const registerUser = async (req, res) => {
    let errors = [];
    let { name, email, password } = req.body;

    try {

        // check for existing user
        let exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists!" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, msg: 'Password should be at least 8 characters long' })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
}

export { loginUser, registerUser }