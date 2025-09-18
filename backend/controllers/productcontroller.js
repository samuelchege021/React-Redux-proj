
import Product from "../models/productModel.js";

import asyncHandler from "express-async-handler"

import Review from "../models/Reviewmodel.js";




/*      @desc   

getproducts
@route Get   API/products/
Access public
*/


const getproducts=asyncHandler(async(req,res)=>{


    const products = await Product.findAll(); // Sequelize method
    // const products=  await Product.find({});
    res.json(products)




})



// @desc   

// getsingleproduct
// @route Get   API/prducts/:id
// Access public
// */
// const getproductbyid = asyncHandler(async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//       include: [
//         {
//           model: Review,
//           as: 'reviews', // ✅ Match the alias you used in Product.hasMany
//         },
//       ],
//     });

//     if (product) {
//       res.json({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         countInStock: product.countInStock,
//         description: product.description,
//         rating: product.rating,
//         numReviews: product.numReviews,
//         reviews: product.reviews, // ✅ Include reviews in response
//       });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

  
const getproductbyid = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      // Manually fetch reviews since Product.hasMany is removed
      const reviews = await Review.findAll({ where: { productId: product.id } });

      res.json({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.countInStock,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
        reviews: reviews, // now manually attached
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});



// @desc   DELETE product

// getsingleproduct
// @route delete   api/prducts/:id
// Access private/admin
// */

const deleteproduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (product) {
    await product.destroy();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});





// @desc   create a product

// post /api/products/

// Access private/admin





const createProduct=(asyncHandler(async(req,res)=>{


const product=new Product({

name:"sampleproduct",
price:0,
user:req.user.id,
image:'/Images/sample.jpg',
brand:'sample brand',
category:"category",
countInStock:0,
numReviews:0,
description:'some desc...'
})


const createdprodct=await product.save();
res.status(201).json(createdprodct)
}))






// @desc   update a product

// put /api/products/

// Access private/admin





const updateproduct=asyncHandler(async(req,res)=>{


const {name,price,description,image,brand,category,countInStock}=req.body


const product =await Product.findByPk(req.params.id)

if(product){


product.name=name;
product.price=price;
product.description=description;
product.image = product.image = image || product.image;

product.brand=brand;
product.category=category;

product.countInStock=countInStock;

const updatedproduct=await product.save();


res.json(updatedproduct)

}

else{
res.status(404)
  throw new Error('product not found')
}


})






// @desc  create new review

// put /api/products/:id/reviews

// Access private/admin


// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findByPk(req.params.id, {
//     include: [
//       {
//         model: Review,
//         as: 'reviews', // ✅ Match your association alia
//       },
//     ],
//   });
  
//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (review) => review.userId === req.user.id
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error("Product already reviewed");
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       userId: req.user.id,     
//       productId: product.id,     
//     };

    
//     await Review.create(review);

    
//     const reviews = await Review.findAll({ where: { productId: product.id } });

//     product.numReviews = reviews.length;
//     product.rating =
//       reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

//     await product.save();

//     res.status(201).json({ message: "Review added" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });




const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findByPk(req.params.id);

  if (product) {
    const reviews = await Review.findAll({ where: { productId: product.id } });

    const alreadyReviewed = reviews.find(
      (review) => review.userId === req.user.id
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    await Review.create({
      name: req.user.name,
      rating: Number(rating),
      comment,
      userId: req.user.id,
      productId: product.id,
    });

    const updatedReviews = await Review.findAll({ where: { productId: product.id } });

    product.numReviews = updatedReviews.length;
    product.rating =
      updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      updatedReviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


  export {getproducts,getproductbyid,deleteproduct,createProduct,updateproduct,createProductReview}







