import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'


const userRouter = express.Router()

// Signup Route
userRouter.post('/register', registerUser)

// Login Route
userRouter.post('/login', loginUser)



export default userRouter;