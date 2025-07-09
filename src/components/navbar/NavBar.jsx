import React, { useEffect } from 'react'
import './NavBar.css';

import {NavLink} from 'react-router-dom'

const Navbar = () => {
    useEffect(() => {
        document.body.style.backgroundColor = 'white';
    })
    return (
        <div className='navbar'>
            <div className='navLeft'>
                <ul>
                    <li id='mentorMesh'>MentorMesh</li>
                    <li>
                        <input placeholder='search' id='search'></input>
                    </li>
                </ul>
            </div>
            <div  className='navRight'>
                <ul>
                    <NavLink to={'/our-story'}><li>Our Story</li></NavLink>
                    <NavLink to={'/write'}><li>Write</li></NavLink>
                    <NavLink to={'/sign-in'}><li>Sign in</li></NavLink>
                    <li>
                        <NavLink to={'/get-started'}><button id='getStarted'>Get Started</button></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
