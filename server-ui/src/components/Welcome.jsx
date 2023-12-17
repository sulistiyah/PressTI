import React from 'react'
import { useSelector } from "react-redux"
import logo_ti from '../logo_ti_nobg.png'
import logo_pnp from '../logo_pnp_nobg.png'

function Welcome() {
    const { admin } = useSelector((state) => state.auth)
    return (
        <div textAlign='center'>
            <h1 
                className='title' 
                style={{ 
                    textAlign: 'center', 
                    marginTop: '40px',
                    fontSize: '40px',
                    marginBottom: '40px',
                    fontFamily: 'Serif', 
                    color: 'black' 
                }}
            >Welcome Back Adiminstrator</h1>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <img src={logo_pnp} alt="Image 1" style={{ width: '200px', marginRight: '20px' }} />
            <img src={logo_ti} alt="Image 2" style={{ width: '200px', marginLeft: '20px' }} />
        </div>

        <p style={{ textAlign: 'center', 
                    marginTop: '40px',
                    fontSize: '40px',
                    marginBottom: '40px',
                    fontFamily: 'Serif', 
                    style:'bold',
                    color: 'black'}}
        >PRESSTI</p>
    </div>
    )
}

export default Welcome
