import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Login() {
  return(
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form_container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Login</h3>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Input Email' className='form-control'/>
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Input Password' className='form-control'/>
          </div>
          <div className='d-grid'>
            <Link to = "/sidebar" className='ms-2'>
                        
            <button className='btn btn-primary'>Login</button>
            </Link>
          </div>
        </form>
      </div>  
    </div>
  )
}


export default Login