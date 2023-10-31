import express from 'express'
const router = express.Router();
import { getProducts,createProduct,deleteProduct,updateProduct } from '../Controllers/ProductController.js';

router.post('/products', createProduct);
   router.put('/products/:id', updateProduct);
   router.delete('/products/:id', deleteProduct);

   router.get('/products', getProducts );
   

   export default router;
