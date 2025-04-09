import express from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
      return;
    }
    cb(null, true);
  }
});

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  rating: z.number().min(0).max(5).optional(),
  imageUrl: z.string().optional(),
});

const updateProductSchema = createProductSchema.partial();

// Get all products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.user?.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: {
        id,
        userId: req.user?.userId,
      },
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        userId: req.user?.userId,
      },
    });
    
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateProductSchema.parse(req.body);
    
    // Check if product exists and belongs to user
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
        userId: req.user?.userId,
      },
    });
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: validatedData,
    });
    
    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists and belongs to user
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
        userId: req.user?.userId,
      },
    });
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await prisma.product.delete({
      where: {
        id,
      },
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Filter products
router.get('/filter', authMiddleware, async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating } = req.query;
    
    const where: any = {
      userId: req.user?.userId,
    };
    
    if (category) {
      where.category = category;
    }
    
    if (minPrice) {
      where.price = {
        ...where.price,
        gte: parseFloat(minPrice as string),
      };
    }
    
    if (maxPrice) {
      where.price = {
        ...where.price,
        lte: parseFloat(maxPrice as string),
      };
    }
    
    if (minRating) {
      where.rating = {
        ...where.rating,
        gte: parseFloat(minRating as string),
      };
    }
    
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search products
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const products = await prisma.product.findMany({
      where: {
        userId: req.user?.userId,
        OR: [
          {
            name: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Image upload endpoint
router.post('/upload-image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the server's base URL
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    // Create the image URL
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 