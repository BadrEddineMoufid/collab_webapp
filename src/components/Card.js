import React from 'react'

export default function Card({title, content, image}) {

    return (
        <div className="md:w-3/4 lg:w-auto sm:w-2/3 p-4 mx-auto bg-deep-cerulean-600 rounded-md shadow-lg  ">
            <div className="p-2 lg:p-4 rounded-xl ">
                <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" 
                    src={image} alt="card-img"
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
