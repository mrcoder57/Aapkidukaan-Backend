import express from 'express';
import { PrismaClient } from '@prisma/client';

const secretKey ='your-secret-key';

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
  const authorId = req.user.userId; // Assuming user ID is retrieved correctly

  try {
    const user = await prisma.user.findUnique({
      where: {
        userid: authorId,
      },
    });

    if (!user) {
      res.status(400).json({ error: 'Author not found' });
    } else {
      const product = await prisma.product.create({
        data: {
          title,
          image,
          description,
          category,
          authorId: authorId, // Set the authorId directly
          authorName: user.username, // Set the authorName from the user's username
        },
      });

      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not create product', message: error.message });
  }
}


 
 
  // Delete a product
  async function deleteProduct(req, res) {
    const productId = parseInt(req.params.id);
    const userId = req.user.userId; // Assuming the user ID is available in the request
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          authorId: true,
        },
      });
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      // Check if the user is either the product's author or an admin
      if (product.authorId === userId || req.user.role === 'admin') {
        const deletedProduct = await prisma.product.delete({
          where: {
            id: productId,
          },
        });
  
        res.json(deletedProduct);
      } else {
        res.status(403).json({ error: 'Unauthorized to delete the product' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not delete product', message: error.message });
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

  async function getProductsByUserId(userId) {
    const userProducts = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        products: {
          where: {
            authorId: userId,
          },
        },
      },
    });
  
    return userProducts ? userProducts.products : [];
  }

export { getProducts,deleteProduct,createProduct,updateProduct,getProductsByUserId };
