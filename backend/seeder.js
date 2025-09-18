import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/product.js';

import { sequelize } from './config/db.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
// import { Order, OrderItem } from './models/orderModel.js';

// Load env vars
dotenv.config();

// Define associations BEFORE syncing
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });
const importData = async () => {
  try {
    await sequelize.authenticate();

    // Disable FK checks temporarily
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const createdUsers = await User.bulkCreate(users, { individualHooks: true });
    const adminUser = createdUsers[0].id;

    const sampleProducts = products.map(product => ({
      ...product,
      userId: adminUser,
    }));

    await Product.bulkCreate(sampleProducts);

    console.log('Users and Products imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};


const destroyData = async () => {
  try {
    // await OrderItem.destroy({ where: {} });
    // await Order.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('Users and Products destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
