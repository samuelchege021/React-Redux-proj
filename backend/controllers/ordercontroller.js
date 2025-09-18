import asyncHandler from 'express-async-handler';
import { Order, OrderItem } from '../models/orderModel.js';

import User from "../models/userModel.js"
import Product from '../models/productModel.js';



// desc create new order
// @route post/api/orders
// access private

const addOrderItems = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Create the order
  const order = await Order.create({
    userId: req.user.id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Create associated order items
  const createdItems = await Promise.all(
    orderItems.map(async (item) => {
      return await OrderItem.create({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.product,
        orderId: order.id,
      });
    })
  );
  order.orderItems = createdItems;
  res.status(201).json(order);

});




// @desc    Get order by ID
// @route   GET /api/orders/:id
// const getorderbyid = asyncHandler(async (req, res) => {
//   const order = await Order.findByPk(req.params.id, {
//     include: [
//       {
//         model: User,
//         as: 'user',
//         attributes: ['name', 'email']
//       },
//       {
//         model: OrderItem,
       
//       }
//     ]
//   });

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });


// const getorderbyid = asyncHandler(async (req, res) => {
//   const order = await Order.findByPk(req.params.id, {
//     include: [
//       {
//         model: User,
//         as: 'user', // ✅ matches association
//         attributes: ['id', 'name', 'email'],
//       },
//       {
//         model: OrderItem,
//         as: 'orderItems', // ✅ must match the alias from Order.hasMany
//         include: [
//           {
//             model: Product,
//             as: 'product', // ✅ must match alias from OrderItem.belongsTo(Product)
//             attributes: ['id', 'name', 'price', 'image'],
//           },
//         ],
//       },
//     ],
//   });

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });


const getorderbyid = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // fetch items manually
  const items = await OrderItem.findAll({
    where: { orderId: order.id },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'image'],
      },
    ],
  });

  res.json({ ...order.toJSON(), orderItems: items });
});



// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private


const updateTopaid = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status, 
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const { id, status, update_time, email_address } = req.body;
if (!id || !status || !update_time || !email_address) {
  res.status(400);
  throw new Error("Missing payment result information");
}

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});








// desc create new order
// @route get/api/myorders
// access private



const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id }, 
  });

  res.json(orders);
});






// desc get all orders
// @route Get/api/myorders
// access private/admin



const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['name'], 
    },
  });

  res.json(orders);
});








// desc update order to deliver
// @route put/api/myorders
// access private/admin


const UpdateorderTodeliverd=asyncHandler(async(req,res)=>{


const order=await Order.findByPk(req.params.id)


if (order){


  order.isDelivered=true;
  order.deliveredAt=Date.now();

  const updatedorder=await order.save();
  res.json(updatedorder)

}else{

  res.status(404)

throw new Error('order not found')


  
}



})







export {addOrderItems,getorderbyid,updateTopaid,getMyOrders,getOrders,UpdateorderTodeliverd}