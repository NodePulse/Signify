import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            loading ? 'Loading...' : 'Sign In'
          }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to='/signup' >
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500'>
        {
          error ? error.message || "Something went wrong" : ""
        }
      </p>
    </div>
  )
}
