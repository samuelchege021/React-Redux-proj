import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js';
import Product from './productModel.js';
const Order = sequelize.define('Order', {

  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false, 
},
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' },
  },
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentResult: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  taxPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  shippingPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'Orders',
});

const OrderItem = sequelize.define('OrderItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Products', key: 'id' },
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' },
  },
}, {
  timestamps: true,
  tableName: 'OrderItems',
});
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

// Order ↔ OrderItem
// Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product ↔ OrderItem
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
// Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });


export {Order,OrderItem} ;
