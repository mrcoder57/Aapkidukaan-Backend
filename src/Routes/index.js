import express from 'express';
import productRoutes from './productRoutes.js'
import usersRoutes from './usersRoutes.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', usersRoutes);

export default router;
