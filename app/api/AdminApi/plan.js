import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const plans = await prisma.plan.findMany();
        res.status(200).json(plans);
    } else if (req.method === 'POST') {
        const { name, price, features } = req.body;
        const newPlan = await prisma.plan.create({
            data: { name, price, features },
        });
        res.status(201).json(newPlan);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}