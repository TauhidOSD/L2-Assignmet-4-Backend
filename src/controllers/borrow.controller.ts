import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({ message: "Not enough copies available" });
      return;
    }

    const borrow = await Borrow.create({
      bookId,
      quantity,
      dueDate,
    });

    book.copies -= quantity;
    if (book.copies <= 0) book.available = false;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Borrowing failed" });
  }
};

export const getBorrowSummary = async (req: Request, res: Response): Promise<void> => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Summary fetch failed" });
  }
};
