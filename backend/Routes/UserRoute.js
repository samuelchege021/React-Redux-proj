



import express from 'express'



import { userAuth,getuserProfile, registeruser, updateuserprofile ,getusers,deleteuser,updateuserAdmin,getuserById} from '../controllers/usercontroller.js'

import { admin, protect } from '../middleware/Authmiddleware.js';



const router=express.Router();



router.route('/').post(registeruser).get(protect,admin,getusers)
router.post('/login',userAuth)

router.route('/profile').get(protect,getuserProfile).put(protect,updateuserprofile)

router.route('/:id').delete(protect,admin,deleteuser).put(protect,admin,updateuserAdmin).get(protect,admin,getuserById)
export default router