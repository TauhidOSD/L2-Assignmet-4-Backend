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
exports.getBokById = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
const book_model_1 = require("../models/book.model");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find();
    res.json(books);
});
exports.getBooks = getBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new book_model_1.Book(req.body);
    yield book.save();
    res.status(201).json(book);
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const update = yield book_model_1.Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(update);
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield book_model_1.Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted' });
});
exports.deleteBook = deleteBook;
const getBokById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(req.params.id);
    res.json(book);
});
exports.getBokById = getBokById;
