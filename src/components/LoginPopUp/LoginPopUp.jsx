import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {
    const [currState, setCurrState] = useState('Login')
    return (
        <div className='login-popup'>
            <form className='login-popup-container' action="">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => {
                        setShowLogin(false)
                    }} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? 
                        <> </> : 
                        <input type="text" placeholder="Enter Your Name" name="" id="" required/>
                    }
                    <input type="email" placeholder="Enter your email" name="" id="" required />
                    <input type="password" placeholder="Enter Password" name="" id="" required />
                </div>
                <button>
                    {currState==="Signup" ? 
                    "Create Account" : 
                    "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>
                        By Continuing, I agree to the terms of use & privacy policy.
                    </p>        
                </div>
                {
                    currState === 'Login' ? 
                    <p>Create a new account? <span onClick={() => setCurrState('Signup')}>Click here</span></p> : 
                    <p>Already have an account ? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }

                
            </form>
        </div>
    )
}

export default LoginPopUp