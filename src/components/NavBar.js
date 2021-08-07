import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({loggedIn, userName}) {

    ///get a prop islogedin if true render home link and room link else render default nav 
    return (
        <nav className="bg-deep-cerulean-700 shadow-lg sticky top-0 z-50">
            <div className="sm:flex justify-between">
                
                <Link className="text-white text-3xl font-bold p-3 no-underline" to='/' >Collab WebApp</Link>
                <ul className="text-white sm:self-center text-xl border-t sm:border-none">
                    <li className="sm:inline-block  ">
                        <Link className="p-3 hover:font-extrabold" to="/" >Home</Link>
                    </li>
                    {   loggedIn ?
                        <React.Fragment>
                            <li className="sm:inline-block  ">
                                <Link className="p-3 hover:font-extrabold" to="/newRoom">Create or Join room </Link>
                            
                            </li> 
                            <li className="sm:inline-block font-thin p-3" > ({userName}) </li>
                        </React.Fragment>
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



