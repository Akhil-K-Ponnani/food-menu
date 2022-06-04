import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        type: { type: String, default: "user" },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema);