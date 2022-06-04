import express from "express";
const router = express.Router();
import userHelpers from "../helpers/userHelpers.js";
import auth from "../middlewares/auth.js";

router.post("/signup", (req, res) => {
    if (req.body.name && req.body.email && req.body.password) {
        userHelpers.userSignup(req.body).then((user) =>
            res.status(201).json(user)
        ).catch((error) =>
            res.status(400).json({ message: error })
        )
    }
    else
        res.status(400).json({ message: "Please fill all the Fields." })
})

router.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        userHelpers.userLogin(req.body).then((user) =>
            res.status(201).json(user)
        ).catch((error) =>
            res.status(400).json({ message: error })
        )
    }
    else
        res.status(400).json({ message: "Please fill all the Fields." })
})

router.put("/edit-user", auth.userAuth, (req, res) => {
    if (req.body.name) {
        userHelpers.updateUser(req.user._id, req.body.name).then((user) =>
            res.status(200).json(user)
        ).catch((error) =>
            res.status(400).json({ message: error })
        )
    }
    else
        res.status(400).send({ message: "The name of the user not found." })
})

export default router;