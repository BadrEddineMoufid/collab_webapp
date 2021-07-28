import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({loggedIn}) {

    ///get a prop islogedin if true render home link and room link else render default nav 
    return (
        <nav className="bg-deep-cerulean-700 shadow-lg">
            <div className="sm:flex justify-between">
                
                <Link className="text-white text-3xl font-bold p-3 no-underline" to='/' >Collab WebApp</Link>
                <ul className="text-white sm:self-center text-xl border-t sm:border-none">
                    <li className="sm:inline-block  ">
                        <Link className="p-3 hover:font-extrabold" to="/" >Home</Link>
                    </li>
                    {   loggedIn ?
                        <li className="sm:inline-block  ">
                            <Link className="p-3 hover:font-extrabold" to="/chat">Create Room</Link>
                        </li> 
                        :
                        
                        <span>
                            <Link className="p-3 hover:font-extrabold " to="/login" >Log In</Link>
                            <Link className="p-3 hover:font-extrabold" to="/signup" >Sign Up</Link>
                        </span>   
                        
                    }

                </ul>
        
            </div>
        </nav>
    )
}



