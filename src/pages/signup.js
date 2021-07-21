import React from 'react'

export default function signup() {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        let name = e.target.elements.name.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        console.log(name, email, password);
    };


    return (
        <div className='h-screen flex bg-gray-100'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Sign Up ➕
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email'>Name</label>
                        <input
                            type='text'
                            className={`w-full p-2  border-2 border-gray-300 rounded-md outline-none text-sm  mb-4`}
                            id='name'
                            placeholder='Your Name'
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2  border-2 border-gray-300 rounded-md outline-none text-sm  mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2  border-2 border-gray-300 rounded-md outline-none text-sm  mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className="bg-blue-700 py-2 px-4 text-sm text-white rounded border-2  focus:outline-none hover:bg-blue-500">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
                          
    )
}
