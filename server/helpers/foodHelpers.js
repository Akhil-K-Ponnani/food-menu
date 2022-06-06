import foodModel from "../models/foodModel.js";

export default {
    getAllFoods: () => {
        return new Promise(async (resolve, reject) => {
            let foods = await foodModel.find()
            resolve(foods)
        })
    },
    addFood: (foodData) => {
        return new Promise((resolve, reject) => {
            foodModel.create(foodData).then((food) =>
                resolve(food)
            )
        })
    },
    updateFood: (foodId, foodData) => {
        return new Promise((resolve, reject) => {
            foodModel.findByIdAndUpdate(foodId, { name: foodData.name, category: foodData.category, price: foodData.price }, { new: true }).then((food) =>
                resolve(food)
            )
        })
    },
    deleteFood: (foodId) => {
        return new Promise((resolve, reject) => {
            foodModel.findByIdAndRemove(foodId).then((food) =>
                resolve(food)
            )
        })
    }
};