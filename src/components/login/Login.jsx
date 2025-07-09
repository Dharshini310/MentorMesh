
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import './Login.css'

import React, { useEffect } from 'react'

function Login() {
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(219, 236, 244)'
    })

    return (
        <div className='login'>
            <div className='loginLeft'>
                <img src="https://res.cloudinary.com/dtejtkhk0/image/upload/v1751910361/ChatGPT_Image_Jul_7_2025_11_13_49_PM_w8b7nd.png" alt="" />
            </div>
        <div className='loginRight'>
            <h1 id='login'>Log in</h1>
            <div className='googleContinue'>
                    <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                        console.log(credentialResponseDecoded);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                
            </div>
            <br />
            <p>----------- or -----------</p>
            <br />
            <div className='loginForm'>
                <input id='userName' placeholder='Enter User Name'></input>
            </div>
            <div className='loginForm'>
                <input id='password' placeholder='Enterb your password'></input>
            </div>
            <div className='submitButton'>
                <button>Login</button>
            </div>
            <div className='newAccount'>
                <p>Don`t have an account ? <span><a href="">createOne</a></span></p>
                
            </div>
        </div>
    </div>
    );
}

export default Login
