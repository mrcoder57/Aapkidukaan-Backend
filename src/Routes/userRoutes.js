import express from 'express';
const router = express.Router();
import { getUserProducts,userLogin,userRegistration,isLoggedIn} from '../Controllers/UserController.js';


router.get('/user/:userId/products', isLoggedIn,getUserProducts);

router.post('/login', userLogin);

router.post('/register', userRegistration);



export default router;