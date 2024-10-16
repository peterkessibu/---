import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            storeName,
            storeDescription,
            timezone,
            currency,
            paymentMethods,
            deliveryServices,
            orderPrefix,
            allowGuestCheckout,
            enableReviews,
            enableWishlist,
            socialMedia,
        } = req.body;

        try {
            const storeSettings = await prisma.storeSettings.create({
                data: {
                    name: storeName,
                    value: JSON.stringify({
                        storeDescription,
                        timezone,
                        currency,
                        paymentMethods,
                        deliveryServices,
                        orderPrefix,
                        allowGuestCheckout,
                        enableReviews,
                        enableWishlist,
                        socialMedia,
                    }),
                },
            });
            res.status(201).json(storeSettings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save store settings' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}