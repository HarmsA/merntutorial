import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            setLoading(true)
            // vite.config.js has a proxy to make this work
            const res = await fetch('/api/auth/signup', 
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
    
            const data = await res.json()
            if(data.success === false){
                setLoading(false)
                console.log("failed: ", data.success)
                setError(data.message)
                return
            }
            setLoading(false)
            console.log("DATA: ", data)
            setError(null)
            navigate('/sign-in')
        }catch(error){
            setLoading(false)
            setError(error.message)
            return
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 ' >
                <label htmlFor='username' className='sr-only'>Username</label>
                <input type="text" placeholder='username' id='username' className="border p-3 rounded-lg" onChange={handleChange} autoComplete="username"/>

                <label htmlFor='email' className='sr-only'>Email</label>
                <input type="email" placeholder='email' id='email' className="border p-3 rounded-lg" onChange={handleChange} autoComplete="email"/>

                <label htmlFor='password' className='sr-only'>Password</label>
                <input type="password" placeholder='password' id='password' className="border p-3 rounded-lg" onChange={handleChange} autoComplete="new-password"/>

                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? 'Loading...' : 'Sign up'}
                </button>
            </form>
            <div className='flex gap-1 mt-3'>
                <p>Have an account?</p>
                <Link to={'/sign-in'} >
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {error ? <p className="text-red-500 mt-5">{error}</p> : ''}
        </div>
    );
};

export default SignUp;