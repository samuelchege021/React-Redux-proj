






import express from 'express'



import { addOrderItems,getorderbyid, updateTopaid,getMyOrders, getOrders, UpdateorderTodeliverd } from '../controllers/ordercontroller.js'
import { admin, protect } from '../middleware/Authmiddleware.js'




const router=express.Router()


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getorderbyid)
router.route('/:id/pay').put(protect,updateTopaid)
router.route('/:id/deliver').put(protect,admin,UpdateorderTodeliverd)
export default router