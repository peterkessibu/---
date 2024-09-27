// lib/db.js
import { Sequelize } from 'sequelize';

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost', // or your database host
    dialect: 'mysql',
});

export default sequelize;
