import express from 'express'
const router = express.Router();
import { getProducts,createProduct,deleteProduct,updateProduct, } from '../Controllers/ProductController.js';
import { isLoggedIn } from '../Controllers/UserController.js';
import { authenticateUser } from '../Controllers/Auth.js';
router.post('/products',authenticateUser ,createProduct);
   router.put('/products/:id', updateProduct);
   router.delete('/products/:id', authenticateUser,deleteProduct);

   router.get('/products', getProducts );
   
   

   export default router;
