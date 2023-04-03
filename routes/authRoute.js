import express from 'express'
import {registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getAllOrdersController,
    getOrdersController,
    orderStatusController,
} from '../controllers/authController.js'

import { isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"
//router object 
const router =express.Router()

//routing 
//REGISTER
router.post('/register',registerController)

//LOGIN ||POST
router.post('/login',loginController)

//Forget Password
router.post('/forgot-password',forgotPasswordController)

//Test routes
router.get('/test',requireSignIn,isAdmin,testController)

//procted route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

//procted route auth for admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

//update profile 
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//All order in admin
router.get('/all-orders',requireSignIn,getAllOrdersController)

//order status 
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router;


