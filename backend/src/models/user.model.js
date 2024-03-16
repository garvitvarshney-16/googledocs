import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter ID"],
        },
        username: {
            type: String,
            required: [true, "Please enter name"],
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
        },
        photo: {
            type: String,
            required: [true, "Please enter profile photo URL"]
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema);