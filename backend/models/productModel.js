import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Product = sequelize.define(
  'Product',
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
  },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    countInStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
    tableName: 'Products',
  }
);

export default Product;
