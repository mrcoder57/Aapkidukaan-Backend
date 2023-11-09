import express from 'express';
import http from 'http';
import productsRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js';

const app = express();

const server = http.createServer(app);

app.get('/home', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
server.listen(4000, () => {
  console.log('Server running on port 4000');
  app.use('/', productsRoutes);
  app.use('/user', userRoutes);

});