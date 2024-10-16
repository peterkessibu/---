import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Store Settings CRUD
app.get('/api/store-settings', async (req, res) => {
    try {
        const storeSettings = await prisma.storeSettings.findFirst();
        res.json(storeSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.post('/api/store-settings', async (req, res) => {
    try {
        const storeSettings = await prisma.storeSettings.create({ data: req.body });
        res.status(201).json(storeSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.put('/api/store-settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const storeSettings = await prisma.storeSettings.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(storeSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.delete('/api/store-settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.storeSettings.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Store settings deleted' });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Personal Settings CRUD
app.get('/api/personal-settings', async (req, res) => {
    try {
        const personalSettings = await prisma.personalSettings.findFirst();
        res.json(personalSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.post('/api/personal-settings', async (req, res) => {
    try {
        const personalSettings = await prisma.personalSettings.create({ data: req.body });
        res.status(201).json(personalSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.put('/api/personal-settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personalSettings = await prisma.personalSettings.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(personalSettings);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.delete('/api/personal-settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.personalSettings.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Personal settings deleted' });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Category CRUD
app.get('/api/inventory/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json({ categories: categories.map(category => category.name) });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.post('/api/inventory/categories', async (req, res) => {
    try {
        const category = await prisma.category.create({ data: req.body });
        res.status(201).json(category);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.put('/api/inventory/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(category);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.delete('/api/inventory/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Product CRUD
app.get('/api/inventory/featured', async (req, res) => {
    try {
        const products = await prisma.product.findMany({ where: { featured: true } });
        res.json({ products });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.get('/api/inventory/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json({ products });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.post('/api/inventory/products', async (req, res) => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.status(201).json(product);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.put('/api/inventory/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(product);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.delete('/api/inventory/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
