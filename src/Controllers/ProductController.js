import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany(); // Assuming "product" is the name of your model

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve products' });
  }
}

// Create a product
async function createProduct(req, res) {
    const { title, image, description, category } = req.body;
  
    try {
      const product = await prisma.product.create({
        data: {
          title,
          image,
          description,
          category,
        },
      });
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Could not create product' });
    }
  }
  
  // Delete a product
  async function deleteProduct(req, res) {
    const productId = parseInt(req.params.id);
  
    try {
      const product = await prisma.product.delete({
        where: {
          id: productId,
        },
      });
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Could not delete product' });
    }
  }
  async function updateProduct(req, res) {
    const productId = parseInt(req.params.id);
    const { title, image, description, category } = req.body;
  
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          title,
          image,
          description,
          category,
        },
      });
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Could not update product' });
    }
  }

export { getProducts,deleteProduct,createProduct,updateProduct };
