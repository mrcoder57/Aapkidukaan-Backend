import express from 'express';
const router = express.Router();
import { getUserProducts,userLogin,userRegistration,isLoggedIn, getUserProfile} from '../Controllers/UserController.js';
import { authenticateUser } from '../Controllers/Auth.js';


router.get('/user/:userId/products', isLoggedIn,getUserProducts);

router.post('/login', userLogin);

router.post('/register', userRegistration);

router.get('/profile',authenticateUser ,getUserProfile );



export default router;