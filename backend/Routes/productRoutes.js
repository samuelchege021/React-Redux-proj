



import express from 'express'


import {getproducts,getproductbyid,deleteproduct,createProduct,updateproduct, createProductReview} from '../controllers/productcontroller.js'
import { admin,protect } from '../middleware/Authmiddleware.js';
const router=express.Router();


router.route('/').get(getproducts).post(protect,admin,createProduct)

router.route('/:id/reviews').post(protect,createProductReview)

 router.route('/:id').get(getproductbyid).delete(protect,admin,deleteproduct).put(protect,admin,updateproduct)


export default router