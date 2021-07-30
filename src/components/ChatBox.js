import React, {useState} from 'react'

export default function ChatBox() {

    const [message, setMessage] = useState('')

    const handlSubmit = e=>{
        e.preventDefault()

        console.log(e.target.elements.chatInput.value)

    }

    return (
        <div className='h-screen w-full bg-gray-200'>
            <div className="overflow-auto h-2/3 p-4 m-4" >
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                <h3 className="m-8  " >test</h3>
                

            </div>
            

            <form className='text-black static ' onSubmit={handlSubmit} >
                <input id='chatInput' className="ml-4 absolute bottom-20 lef-0 sm:w-1/3 md:w-2/3 p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm" type="text" />
                <button className=' absolute bottom-20 right-0 mr-8 bg-deep-cerulean-600 py-2 px-4 text-sm text-white  rounded border' >Send Message</button>
            </form>
        </div>
    )
}
