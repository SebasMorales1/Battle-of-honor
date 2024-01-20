import React from 'react';
import LogoImage from '../images/logo.png';
import backgroundImage from '../images/Pixel-background.png';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(false)
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault()

    if(name === "" || password === "") {
        setError(true)
        return
    }

    setError(false)
    navigate("/home")
}

    return (
        <form className='container-login flex h-screen' onSubmit={handleSubmit}>
            <div className="fields-login w-1/2 h-full bg-form bg-cover bg-no-repeat bg-center">
                <div className='container-content flex flex-col m-20'>
                  <h1 className='italic text-white text-5xl text-center mb-10 font-bold' >Login</h1>
                  <input className='mb-8 p-4 rounded-3xl' type="text" placeholder='NickName' value={name} 
                  onChange={e => setName(e.target.value)} id="" />
                  <input className='mb-8 p-4 rounded-3xl' type="password" placeholder='password' value={password} 
                  onChange={e => setPassword(e.target.value)} id="" />
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
                </div>
                {error && <p className='Alert-message text-red-500 font-bold text-2xl text-center drop-shadow-sm'>The fields are required.</p>}
            </div>
            <div className="logo">
                <img className='w-full sm:w-full h-full' src={LogoImage} alt="" />
            </div>
            
        </form>
      );
}

export default Login