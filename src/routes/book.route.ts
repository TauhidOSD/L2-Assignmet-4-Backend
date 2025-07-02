import express from 'express'
import { createBook, deleteBook, getBokById, getBooks, updateBook } from '../controllers/book.controller';

const router = express.Router();

router.get('/', getBooks);
router.post('/',createBook);
router.get('/:id', getBokById);
router.patch('/:id', updateBook);
router.delete('/:id',deleteBook);

export default router;