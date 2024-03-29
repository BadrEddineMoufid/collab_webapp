import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup({setIsLoggedIn, setUserName}) {

	const [redirect, setRedirect] = useState(false)

	const handleFormSubmit = (e) => {
		e.preventDefault();
		
		//DONE: check if emty before fetch : server side validation is enough 
		let name = e.target.elements.name.value;
		let email = e.target.elements.email.value;
		let password = e.target.elements.password.value;

		//console.log(name, email, password);

		//DONE: setup the fetch request for signup
		fetch(`${process.env.REACT_APP_API_BASE_URL}/register`,{
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
					name: name,
					email: email,
					password: password
			})
		})
		.then(response => response.json())
		.then(data => {
				
			//debug
			console.log(data)
			
			//DONE: store token 
				
			if(data.user){
				
				toast.success(`${data.user.name} got registered successfully `, {position:"top-right", hideProgressBar: true, autoClose: 2000, pauseOnHover: false})
				setUserName(data.user.name)

				localStorage.setItem('token', data.token)
				
				setIsLoggedIn(true)
				setRedirect(true)
					
			}else{
				toast.warn(data.error, {position:"bottom-center", hideProgressBar: true, autoClose: 4000, pauseOnHover: false})
			}

		}).catch(err => console.log(err))
	};

	//if redirect is true go to home, true only when signup is a success 
	if(redirect){
		return <Redirect to='/' />
	}

	return (
		<div className='h-screen flex bg-gray-200'>
			<div className='w-full max-w-md m-auto bg-deep-cerulean-600 text-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
				<h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
					Sign Up ➕
				</h1>

				<form onSubmit={handleFormSubmit}>
					<div>
						<label htmlFor='email'>Name</label>
						<input
							autoFocus
							type='text'
							className={`w-full p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm  mb-4`}
							id='name'
							placeholder='Your Name'
							required
						/>
					</div>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							className={`w-full p-2  border-2  text-black border-gray-300 rounded-md outline-none text-sm  mb-4`}
							id='email'
							placeholder='Your Email'
							required
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className={`w-full p-2  border-2 border-gray-300 text-black rounded-md outline-none text-sm  mb-4`}
							id='password'
							placeholder='Your Password'
							required
						/>
					</div>

					<div className='flex justify-center items-center mt-6'>
						<button
								className="bg-white transform hover:scale-110 py-2 px-4 text-sm text-black rounded border-2  focus:outline-none hover:bg-blue-500 hover:text-white">
								Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
												
	)
}
