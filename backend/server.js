import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path'


import cors from 'cors';


import { sequelize } from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/UserRoute.js';
import orderRoute from './Routes/orderRoute.js'
import uploadRoutes from './Routes/uploadRoutess.js'
import { notfound, errorhandler } from './middleware/errormiddleware.js';
import { Order,OrderItem } from './models/orderModel.js';
// import './models/index.js'

dotenv.config();



const app = express();
app.use(express.json());

app.use(cors());





// Routes
app.get('/', (req, res) => {
  res.send("API is running");
});

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoutes);

// create static folder

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Error middleware
app.use(notfound);
app.use(errorhandler);






// Start the server AFTER defining app and middleware
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.bgYellow);
    });
   
  })
  .catch(err => {
    console.error('DB sync error:', err);
  });
