import { Sequelize } from "sequelize";
import dotenv from 'dotenv'; //imports the .env file to access the variables inside

dotenv.config(); //reads the .env file , parses its key-value pairs and assigns them to the process.env 

const sequelize = new Sequelize( //accesses the required varibles using process.env
    process.env.DB_NAME as string,
    process.env.DB_USER as string, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }

); 

sequelize.authenticate() //calls the authenticate middleware 
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection failed: ', err))

export default sequelize;