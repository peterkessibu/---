import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            gender,
            currentResidence,
            studentIdNumber,
            schoolEmail,
            otherEmail,
            phoneNumber,
            whatsappNumber,
            snapchatUsername,
            facebookUsername,
            instagramUsername,
            linkedinUsername,
            bio,
            major,
            graduationYear,
            interests,
            privacySettings,
        } = req.body;

        try {
            const profileSettings = await prisma.personalSettings.create({
                data: {
                    name: `${firstName} ${lastName}`,
                    value: JSON.stringify({
                        middleName,
                        dateOfBirth,
                        gender,
                        currentResidence,
                        studentIdNumber,
                        schoolEmail,
                        otherEmail,
                        phoneNumber,
                        whatsappNumber,
                        snapchatUsername,
                        facebookUsername,
                        instagramUsername,
                        linkedinUsername,
                        bio,
                        major,
                        graduationYear,
                        interests,
                        privacySettings,
                    }),
                },
            });
            res.status(201).json(profileSettings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save profile settings' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}