import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { login } from '../redux/actions/auth.actions'

const Login = () => {
// 1. Create storage spaces for email and password

const [email, setEmail] =  useState('');
const [password, setPassword] = useState('');


// Connect to Redux store
const dispatch = useDispatch()
const auth = useSelector((state) => state.auth)

// 3. Handle the form submission
const handleLoginSubmit = (e) => {
 e.preventDefault()

 const user ={
  email,
  password,
 }
 // Dispatches the API request inside auth.actions.js
 dispatch(login(user))
}

// 4. Automatically redirect when Redux successfully authenticates the admin
if(auth.authenticate){
  return <Navigate to={'/admin/dashboard'}/>
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="max-w-md bg-white rounded-xl shadow-lg p-8">
    <h5 className="font-bold text-gray-900 mb-6 text-center">Admin Login</h5>
   {/* Updated to read the error directly from your Redux store */}
        {auth.error && (
          <p className="text-red-600 mb-4 text-sm text-center font-medium">
            {auth.error}
          </p>
        )}
    
    <form className="space-y-4" onSubmit={handleLoginSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder='abcd@test.com'
           value={email} onChange={(e) => setEmail(e.target.value)} // Updates 'email' state 
           required/> 
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} // Updates 'password' state
          required />
      </div>

      {/* <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div> */}

      <button type="submit" disabled={auth.authenticating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
       {auth.authenticating ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  </div>
</div>
  );
}

export default Login