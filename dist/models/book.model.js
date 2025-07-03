"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: String,
    genre: String,
    isbn: String,
    description: String,
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, { timestamps: true });
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
