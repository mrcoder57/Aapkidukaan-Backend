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
    res.status(500).json({ error: 'Could not retrieve products' ,message:error.message });
  }
}

// Create a product
async function createProduct(req, res) {
  const { title, image, description, category,price } = req.body;
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
          price,
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
    const { title, image, description, category,price } = req.body;
  
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
          price
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

 const getProductsbyId= async (req, res) => {
    const productId = parseInt(req.params.id);
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          reviews: {
            where: {
              productId: productId,
            },
          },
        },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  };

  const getProductsbyprice= async (req, res) => {
    const maxPrice = parseFloat(req.params.price);
  
    try {
      const products = await prisma.product.findMany({
        where: {
          price: {
            lt: maxPrice,
          },
        },
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found within the specified price range' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' ,message:error.message });
    }
  }
  async function createProductReview(req, res) {
    const { productId } = req.params;
    const { text, rating, image } = req.body;
    const authorId = req.user.userId;
    // const username = user.username;
    // console.log(authorId)
    // // console.log(username)
    // console.log(Number(productId))
   
    try {
      const user = await prisma.user.findUnique({
        where: { userid: authorId },
        
      });
      // console.log(id)
      
    
      if (!user) {
        throw new Error('User not found',errors.message);
      }
    
      const username = user.username;
      // const Product=await prisma.product.findUnique({where: {id: productId}});
      // const productid=Product.id;
      // console.log(productid)

    const newReview = await prisma.review.create({
      data: {
        text,
        rating,
        image,
        authorId ,       // Representing the id of the author
        productId:Number(productId),
      username
      },
    });
   
    res.status(200).json(newReview);
    } catch (error) {
    res.status(500).json({ error: 'Unable to create review' ,message: error.message });
    }
  }
  
  
const createProductOrder=async (req, res) => {
  const productId=parseInt(req.params.productId);
  const userId = req.user.userId;
 try {
  const user= await prisma.user.findUnique({
    where: { userid: userId },
  })
  if(!user){
    throw new Error('User not found',errors.message)
  }

  const username=user.username;
  
  const product= await prisma.product.findUnique({
    where: { id: productId },
  })
  if(!product){
    throw new Error('product not found',errors.message)
  }

  const price=product.price;
  
  const newOrder= await prisma.order.create({
    data:{
      userId,
      productId: productId,
      price,
      username
    }
  })
  res.status(200).json(newOrder);

  }
  catch (error) {
  res.status(500).json({error:"could not place order",message:error.message});
 }
};

export { getProducts,deleteProduct,createProduct,updateProduct,getProductsByUserId,getProductsbyId,getProductsbyprice,createProductReview,createProductOrder };
