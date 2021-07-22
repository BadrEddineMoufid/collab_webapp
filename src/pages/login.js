import React from 'react'

export default function login() {

    //TODO:setup component state using useState hook

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        //TODO: check if emty before fetch
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        console.log(email, password);


        //TODO: setup the fetch request for login
    };

    return (
        <div className='h-screen flex bg-gray-200'>
            <div className='w-full max-w-md m-auto bg-deep-cerulean-600 text-white rounded-lg border-2 shadow-md py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className="bg-white py-2 px-4 text-sm text-black rounded border focus:outline-none hover:bg-blue-500 hover:text-white">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
