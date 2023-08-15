const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("./model/Users");
const cookieParser = require("cookie-parser");
const saltRounds = 10;
const JWT_KEY = process.env.JWT_KEY;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res
                .status(400)
                .json({ status: "failed", message: "Bad Requests" });

        const salt = bcrypt.genSaltSync(saltRounds);

        const newUser = {
            username,
            password: bcrypt.hashSync(password, salt),
        };

        const UserDoc = await Users.create(newUser);

        res.status(201).json({
            status: "success",
            data: {
                data: UserDoc,
            },
        });
    } catch (e) {
        res.status(409).json({
            status: "failed",
            message: "This account has already used",
        });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Bad Request",
            });
        }

        const UserDoc = await Users.findOne({ username });
        const matchPw = bcrypt.compareSync(password, UserDoc.password);

        if (matchPw) {
            jwt.sign(
                {
                    user_id: UserDoc._id,
                    username,
                },
                JWT_KEY,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json({
                        username,
                        user_id: UserDoc._id,
                    });
                }
            );
        } else {
            res.status(400).json("wrong user credentials");
        }
    } catch (e) {
        return res.status(401).json({
            status: "failed",
            message: "Authentication failed",
        });
    }
});

app.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json();
    jwt.verify(token, JWT_KEY, {}, (err, userinfo) => {
        if (err) throw err;
        res.json(userinfo);
    });
});

app.post("/logout", async (req, res) => {
    res.cookie("token", "").json({ message: "logout successful" });
});

console.log(process.env.MONGODB_URL);
app.listen("8080", () => {
    console.log("Server is running on Port 8080");
});
