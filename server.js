import app from './app.js';
import sequelize from './config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try{
    await sequelize.authenticate();
    
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true }); // Adjust schema to match models
    console.log('Database schema synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  }catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

startServer();