import React from 'react'

export default function Card({title, content}) {

    return (
        <div className="w-full p-6 mx-auto bg-blue-700 rounded-md shadow-md  ">
            <div className="p-4 lg:p-8 rounded-xl bg-blueGray-50">
            <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" 
                src="https://dummyimage.com/720x400/F3F4F7/8693ac" alt="blog"
            />
            <h1 className="mx-auto mb-8 text-2xl text-center font-semibold leading-none tracking-tighter text-white title-font">
                 {title} 
            </h1>
            <p className="mx-auto text-base font-medium leading-relaxed text-white text-center ">
                {content}
            </p>
            </div>
        </div>
        
    )
}
