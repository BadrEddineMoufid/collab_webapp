import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {

	useEffect(()=>{
		document.title = '404 | Not Found '

		const favicon = document.getElementById("favicon")
		//DONE:Download the icon and save it to public folder
		favicon.href = "not-found-icon.png"


		return ()=>{
			document.title = 'Collab WebApp'
			favicon.href = 'favicon.ico'
		}
	}, [])

	return (
		<div className='text-center p-40 text-2xl font-bold'>
			<div className="flex justify-center  ">
				<img className='mb-9' alt='!' src="https://img.icons8.com/ios-glyphs/100/fcba03/error--v1.png"/>
				<h1 className='text-yellow-400 text-5xl mb-9 self-center'>404 | Oooops....</h1>
			</div>
			<h2 className='text-3xl' >That page could not be found</h2>
			<p className='p-6 mt-4 font-semibold'>
				Go back to the <Link className='rounded p-2 text-white bg-congress-blue-700 ' to='/'>Homepage</Link>
			</p>
		
		</div>
	)
}
