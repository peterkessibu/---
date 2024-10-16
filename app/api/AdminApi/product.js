import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const { name, price, featured, categoryId } = req.body;
        const newProduct = await prisma.product.create({
            data: { name, price, featured, categoryId },
        });
        res.status(201).json(newProduct);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}