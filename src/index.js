import express from 'express';
import http from 'http';
import productsRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js';
import cors from 'cors';
const app = express();

app.use(cors());

const server = http.createServer(app);

app.get('/home', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
server.listen(5000, () => {
  console.log('Server running on port 5000');
  app.use('/', productsRoutes);
  app.use('/user', userRoutes);

});