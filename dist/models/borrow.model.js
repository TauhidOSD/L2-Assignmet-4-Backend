"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
