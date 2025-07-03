"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({ message: "Not enough copies available" });
            return;
        }
        const borrow = yield borrow_model_1.Borrow.create({
            bookId,
            quantity,
            dueDate,
        });
        book.copies -= quantity;
        if (book.copies <= 0)
            book.available = false;
        yield book.save();
        res.status(201).json(borrow);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Borrowing failed" });
    }
});
exports.borrowBook = borrowBook;
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            { $unwind: "$bookInfo" },
            {
                $project: {
                    _id: 0,
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn",
                    totalQuantity: 1,
                },
            },
        ]);
        res.json(summary);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Summary fetch failed" });
    }
});
exports.getBorrowSummary = getBorrowSummary;
