import express from 'express'
const router = express.Router();
import { getProducts,createProduct,deleteProduct,updateProduct,getProductsbyId,getProductsbyprice,createProductReview,createProductOrder } from '../Controllers/ProductController.js';
import { isLoggedIn } from '../Controllers/UserController.js';
import { authenticateUser } from '../Controllers/Auth.js';
router.post('/products',authenticateUser ,createProduct);
   router.put('/products/:id', updateProduct);
   router.delete('/products/:id', authenticateUser,deleteProduct);

   router.get('/products', getProducts );
   router.get('/products/:id',getProductsbyId);
   router.get('/products/price/:price',getProductsbyprice);
   router.post('/products/:productId/reviews',authenticateUser,createProductReview);
   router.post('/products/:productId/order',authenticateUser,createProductOrder);
   
   

   export default router;
