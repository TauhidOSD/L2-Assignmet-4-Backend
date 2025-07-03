
import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { quantity, dueDate } = req.body;

  const book = await Book.findById(bookId);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.copies < quantity) {
    return res.status(400).json({ message: "Not enough copies available" });
  }

  // Create borrow record
  const borrow = await Borrow.create({
    bookId,
    quantity,
    dueDate,
  });

  // Update book copies
  book.copies -= quantity;
  if (book.copies <= 0) book.available = false;
  await book.save();

  res.status(201).json(borrow);
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
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
    {
      $unwind: "$bookInfo",
    },
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
};
