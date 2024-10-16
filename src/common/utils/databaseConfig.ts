// databaseConfig.ts
import { Sequelize } from "sequelize";
import { env } from "./envConfig";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
});

// Create an asynchronous function to manage database connection
async function testConnection() {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        // await sequelize.close(); // Close the connection
    }
}

// Call the async function to test the connection
testConnection();

export const syncDatabase = async () => {
    try {
        await sequelize.sync(); // Sync all defined models to the DB
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};


export { sequelize }