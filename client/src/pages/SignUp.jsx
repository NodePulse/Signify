import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      console.log(data)
      if (data.success === false) {
        setError(true)
        return
      }
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(false)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          id="username"
          placeholder='Username'
          onChange={changeHandler}
          className='bg-slate-100 p-3 rounded-lg' />
        <input
          type="email"
          id="email"
          placeholder='Email'
          onChange={changeHandler}
          className='bg-slate-100 p-3 rounded-lg' />
        <input
          type="password"
          id="password"
          placeholder='Password'
          onChange={changeHandler}
          className='bg-slate-100 p-3 rounded-lg' />
        <button type='submit' disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {
            loading ? 'Loading...' : 'Sign Up'
          }
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/signin' >
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-500'>
        {
          error && "Something went wrong"
        }
      </p>
    </div>
  )
}
