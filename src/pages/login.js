import React , {useState} from 'react'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login ({setIsLoggedIn, setUserName}){

    //DONE:setup component state using useState hook

    const [redirect, setRedirect] = useState(false)

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
            //console.log(data)

            
            //DONE: store token in localStorge or something 
            
            if(data.user){

                setIsLoggedIn(true)
                setUserName(data.user.name)
								localStorage.setItem("token", data.token)
                setRedirect(true)
            }else{
                toast.error(data.error, {position:"bottom-center", hideProgressBar: true, autoClose: 2000, pauseOnHover: false})
                
            }
        }).catch(err => {
					toast.error(err.toString(), {position:"bottom-center", hideProgressBar: true, autoClose: 2000, pauseOnHover: false})
					console.log(err)
        })

        
    };

    if(redirect){
        return <Redirect to="/" />
    }

    return (
        <div className='h-screen flex bg-gray-200  '>
            <div className='w-full max-w-md m-auto  bg-deep-cerulean-600 text-white rounded-lg border-2 shadow-md py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in 🔐
                </h1>

                <form onSubmit={handleFormSubmit} >
                    <div>
                        <label htmlFor='email' >Email</label>
                        <input
                            autoFocus
                            type='email'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm focus:border-gray-700 mb-4`}
                            id='email'
                            placeholder='Your Email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm focus:border-gray-700 mb-4`}
                            id='password'
                            placeholder='Your Password'
                            required
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button className="bg-white transform  hover:scale-110 py-2 px-4 text-sm text-black rounded border focus:outline-none hover:bg-blue-500 hover:text-white">
                            Log In
                        </button>
                    </div>

                    
                </form>
            </div>
        </div>
    )
}


