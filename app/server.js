import express from 'express';
import { PrismaClient } from '@prisma/client';
import personalSettingsHandler from './api/auth/AdminApi/personalSettings.js';
import storeSettingsHandler from './api/auth/AdminApi/storeSetting.js';
import productHandler from './api/auth/AdminApi/product.js';
import categoryHandler from './api/auth/AdminApi/category.js';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Add the error handler middleware
app.use(errorHandler);

// Store Settings CRUD
app.use('/api/store-settings', storeSettingsHandler);

// Personal Settings CRUD
app.use('/api/personal-settings', personalSettingsHandler);

// Category CRUD
app.use('/api/AdminApi/categories', categoryHandler);

// Product CRUD
app.use('/api/AdminApi/products', productHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
