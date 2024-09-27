// pages/api/products.js
import Product from '../../models/product';
import sequelize from '../../lib/db';

export default async function handler(req, res) {
    await sequelize.sync(); // Ensure the models are synchronized

    if (req.method === 'GET') {
        const products = await Product.findAll();
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const { name, description, status, location } = req.body;
        const newProduct = await Product.create({ name, description, status, location });
        res.status(201).json(newProduct);
    }
}
