import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const stores = await prisma.store.findMany();
        res.status(200).json(stores);
    } else if (req.method === 'POST') {
        const { owner_id, name, description, logo_url, theme_id, custom_domain, plan_id } = req.body;
        const newStore = await prisma.store.create({
            data: { owner_id, name, description, logo_url, theme_id, custom_domain, plan_id },
        });
        res.status(201).json(newStore);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}