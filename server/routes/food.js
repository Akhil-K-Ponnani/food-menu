import express from "express";
const router = express.Router();
import foodHelpers from "../helpers/foodHelpers.js";
import auth from "../middlewares/auth.js";

router.get("/", async (req, res) => {
    let foods = await foodHelpers.getAllFoods()
    res.status(200).json(foods)
})

router.post("/add-food", auth.userAuth, (req, res) => {
    if (req.user.type === "admin") {
        if (req.body.name && req.body.category && req.body.price) {
            foodHelpers.addFood(req.body).then((food) =>
                res.status(200).json(food)
            )
        }
        else
            res.status(400).json({ message: "Please fill all the Fields." })
    }
    else
        res.status(400).json({ message: "Only admins can add foods." })
})

router.put("/edit-food/:id", auth.userAuth, (req, res) => {
    if (req.user.type === "admin") {
        if (req.params.id && req.body.name && req.body.category && req.body.price) {
            foodHelpers.updateFood(req.params.id, req.body).then((food) =>
                res.status(200).json(food)
            )
        }
        else
            res.status(400).json({ message: "Please fill all the Fields." })
    }
    else
        res.status(400).json({ message: "Only admins can edit foods." })
})

router.delete("/delete-food/:id", auth.userAuth, (req, res) => {
    if (req.user.type === "admin") {
        if (req.params.id) {
            foodHelpers.deleteFood(req.params.id).then((food) =>
                res.status(200).json(food)
            )
        }
        else
            res.status(400).json({ message: "The id of food not Found." })
    }
    else
        res.status(400).json({ message: "Only admins can delete foods." })
})

export default router;