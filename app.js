import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();


app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('You are accessing the root route');
})

export default app;