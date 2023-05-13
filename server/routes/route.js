require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../model/collection");
// const authenticate = require("../middleware/authentucate")

router.get("/", (req, res) => {
    console.log("hello i am home page");
    res.send("hello this is home page router js");
});

// using async-await
router.post("/signup", async (req, res) => {
    const { name, email, mobile, profession, password, cpassword } = req.body;
    if (!name || !email || !mobile || !profession || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all fields" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ massage: "Email already exist" });
        }
        const user = new User({
            name,
            email,
            mobile,
            profession,
            password,
            cpassword,
        });
        if (password !== cpassword) {
            return res
                .status(422)
                .json({ massage: "password and confirm password not match" });
        }
        //   pre password hash
        //   generate jesonwebtoken
        // const generatetoken = await user.generatetoken();
        // console.log(generatetoken);
        // res.cookie("jwtoken", generatetoken, {
        //   expires: new Date(Date.now() + 50000000),
        //   httpOnly: true,
        // });

        await user.save();
        return res.status(201).json({ massage: "user registered successfully" });
    } catch (error) {
        console.log(error);
    }
});

// create log in 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all fields" });
    }
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            const ismatch = await bcrypt.compare(password, userExist.password);
            //   generate jesonwebtoken
            const generatetoken = await userExist.generatetoken();
            if (ismatch) {
                await userExist.save();
                return res.status(201).json({ massage: "Log in successful", token: generatetoken });
            }
            else return res.status(400).json({ massage: "Invalid details" });
        }
        return res.status(400).json({ massage: "Email not exist" });
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;
