import React , {useState} from 'react'
import { Redirect } from 'react-router';

const Login = ({setIsLoggedIn, setUserName}) => {

    //DONE:setup component state using useState hook

    const [redirect, setRedirect] = useState(false)
    const [err, setErr] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();    
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`,{
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            //debug stuff
            console.log(data)

            
            //TODO: store token in localStorge or something 
            
            if(data.user){

                setRedirect(true)
                setIsLoggedIn(true)
                setUserName(data.user.name)
            }else{
                setErr(data)
            }
        }).catch(err => {
           
            console.log(err)
        })

        
    };

    if(redirect){
        return <Redirect to="/" />
    }

    return (
        <div className='h-screen flex bg-gray-200'>
            <div className='w-full max-w-md m-auto bg-deep-cerulean-600 text-white rounded-lg border-2 shadow-md py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email' >Email</label>
                        <input
                            autoFocus
                            type='email'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            required
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button className="bg-white py-2 px-4 text-sm text-black rounded border focus:outline-none hover:bg-blue-500 hover:text-white">
                            Log In
                        </button>
                    </div>

                    {
                        err ? <span className='flex justify-center rounded items-center mt-6 text-yellow-400 font-bold' >{err.error}</span> : <span></span>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login;
