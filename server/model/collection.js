const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number, 
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
    },
});
// password hash

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = undefined;
        }
        return next();
    } catch (error) {
        console.log(error);
    }
});

// jwt token generate
userSchema.methods.generatetoken = async function (req, res, next) {
    try {
        const token = jwt.sign(
            { _id: this._id },
            process.env.SECRET_KEY, 
               { expiresIn: '1d' }
        );
        return token;
    } catch (error) {
        console.log(error);
    }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
