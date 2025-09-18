// models/Review.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js'; // Import the User model

import Product from './productModel.js'; // 👈 import Product model

const Review = sequelize.define(
  'Review',
  {


    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
  },


    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // 👈 this must match User's tableName
        key: 'id',
      },

      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // 👈 must match Product tableName
          key: 'id',
        },
      },
      

    },
  },
  {
    timestamps: true,
    tableName: 'Reviews',
  }
);

// ✅ Define the association right here
Review.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Review, { foreignKey: 'userId' });

//  Product.hasMany(Review, { as: "reviews", foreignKey: "productId" });
Review.belongsTo(Product, { as: "product", foreignKey: "productId" });


export default Review;
