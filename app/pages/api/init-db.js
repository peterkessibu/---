// pages/api/init-db.js
import sequelize from '../../lib/db';

export default async function handler(req, res) {
    try {
        await sequelize.authenticate(); // Test the connection
        await sequelize.sync(); // Synchronize models
        res.status(200).json({ message: 'Database connection successful' });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
}
