import mongoose from "mongoose"

const documentSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Document = mongoose.model('Document', documentSchema)

