import express from 'express';
import {Sequelize, DataTypes} from 'sequelize';
import User from './models.js';
import sequelize from './database.js';

const app = express();

const port = 3000;

app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});