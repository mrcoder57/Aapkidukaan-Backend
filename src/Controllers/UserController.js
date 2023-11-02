import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

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

const getUserProducts = async (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from request params

  try {
    const products = await getProductsByUserId(userId);
    res.json(products); // Respond with the fetched products
  } catch (error) {
    res.status(500).json({ error: "Error fetching user products" });
  }
};



const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        // Create a JWT
        const token = jwt.sign({ userId: user.userid }, 'aapkaswagathai', { expiresIn: '1h' });

        res.json({ message: "Login successful", user, token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
};

const userRegistration=async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password:hashedPassword,
          role: 'common', // Assign a default role upon registration
          // Additional user data can be added here
        },
      });
      res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' ,messgae:error});
    }
  };

  const isLoggedIn =(req,res)=>{
    if(req.user== null){
        return res.status(403).json({ error: 'you need be logged in'});
    }
  }

export { getUserProducts, userLogin,userRegistration,isLoggedIn };