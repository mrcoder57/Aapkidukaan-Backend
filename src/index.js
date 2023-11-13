import express from 'express';
import http from 'http';
import productsRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();

app.use(cors());

const server = http.createServer(app);

app.get('/home', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  app.use('/', productsRoutes);
  app.use('/user', userRoutes);

});