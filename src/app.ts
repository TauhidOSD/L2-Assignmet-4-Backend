import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://library-frontend-one-iota.vercel.app'],
}));



app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req, res) =>{
    res.send('Library management server is running');
})

export default app;
