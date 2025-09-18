import jwt from "jsonwebtoken";


import asyncHandler from "express-async-handler";


import User from "../models/userModel.js";


// “This protect middleware checks if a request has a JWT token.
//  If it exists and is valid, we verify it, decode the user’s ID, fetch the user from the database, 
// and attach that user to req.user. 
// That way, any protected route can know which user is making the request. If the token is missing or invalid, we deny access.”




// What this code does (step by step):

// Check for token in request headers

// It looks at req.headers.authorization.

// If it starts with "Bearer ", that means the client has sent a JWT.

// Extract the token

// req.headers.authorization.split(' ')[1]

// This removes the "Bearer " part and gets only the actual token.

// Verify the token

// jwt.verify(token, process.env.JWT_SECRET)

// This checks if the token is valid and not tampered with, using the server’s secret key.

// If valid, it gives back tpayload (like { id: userId, iat,he decoded  exp }).

// Find the user in the database

// It gets the user by ID from the decoded token.

// User.findByPk(decoded.id, { exclude: ['password'] }) → ensures the password is not returned.

// The user object is then attached to req.user.

// Call next() to continue

// If everything is okay, it calls next().

// That means the request can now reach the protected route.

// Handle errors

// If verification fails (e.g., invalid or expired token), it throws Not Authorized, token failed.

// If no token is found at all, it throws No token found.

const protect=asyncHandler(async(req,res,next)=>{


let token;

if (req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){


try {
    


    token=req.headers.authorization.split(' ')[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      
    next()
} catch (error) {
    console.error(error)
    throw new Error('Not Authorized,token failed')
}


}else{


throw  new Error('No token found')


}


})




const admin=(req,res,next)=>{



if (req.user && req.user.isAdmin ){

next();




}


else{

    res.status(401);
    throw new Error("Not authorised,only for the admin users")
}


}






export {protect,admin}