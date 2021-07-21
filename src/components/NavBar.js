import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="bg-blue-800 shadow-lg">
            <div className="sm:flex justify-between">
                <a href="/" className="text-white text-3xl font-bold p-3 no-underline">Collab WebApp </a>
                
                <ul className="text-white sm:self-center text-xl border-t sm:border-none">
                    <li className="sm:inline-block">
                        <Link className="p-3 hover:font-extrabold" to="/" >Home</Link>
                    </li>
                    <li className="sm:inline-block">
                        <Link className="p-3 hover:font-extrabold" to="/login" >LogIn</Link>
                    </li>
                    <li className="sm:inline-block">
                        <Link className="p-3 hover:font-extrabold" to="/signup" >SignUp</Link>
                    </li>

                </ul>
        
            </div>
        </nav>
    )
}



