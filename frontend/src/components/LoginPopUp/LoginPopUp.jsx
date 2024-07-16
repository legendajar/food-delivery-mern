import { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const LoginPopUp = ({setShowLogin}) => {
    const [currState, setCurrState] = useState('Login')

    const{ url, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currState==='Login'){
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }
        console.log(newUrl)
        const res = await axios.post(newUrl, data);

        if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false)
            // toast.success(res.data.message)
        } else {
            // toast.error(res.data.message)
            alert(res.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container' action="">
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
                        <input type="text" onChange={onChangeHandler} value={data.name} placeholder="Enter Your Name" name="name" required/>
                    }
                    <input type="email" placeholder="Enter your email" name="email" onChange={onChangeHandler} value={data.email} required />
                    <input type="password" placeholder="Enter Password" name="password" onChange={onChangeHandler} value={data.password} required />
                </div>
                <button type='submit'>
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