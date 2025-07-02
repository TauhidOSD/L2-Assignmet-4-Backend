import { Request, Response } from "express";
import { Book } from "../models/book.model"

export const getBooks = async (req: Request, res: Response) =>{
    const books = await Book.find();
    res.json(books)
}

export const createBook = async (req: Request, res: Response) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
};

export const updateBook = async (req:Request, res: Response) =>{
    const {id} = req.params;
    const update = await Book.findByIdAndUpdate(id, req.body, {new: true});
    res.json(update);
};

export const deleteBook = async (req:Request, res: Response)=>{
    const {id} = req.params;
    await Book.findByIdAndDelete(id);
    res.json({message:'Book deleted'})
}

export const getBokById = async (req: Request, res: Response) =>{
    const book = await Book.findById(req.params.id);
    res.json(book);
}