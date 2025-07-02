import { model, Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: { type:String, required: true},
        author: String,
        genre: String,
        isbn: String,
        description: String,
        copies: { type: Number, required: true},
        available: {type: Boolean, default: true},
    },
    {timestamps: true}
)

export const Book = model('Book', bookSchema)