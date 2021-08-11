import React, {useState, useEffect} from 'react'

export default function SharedFiles({roomName}) {

    const [files, setFiles] = useState([])

    const handleChange = (e)=>{
        e.preventDefault()
        console.log(e.target.files[0])

        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('room',roomName)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/upload`, {
            method:'POST',
            body:data
        })
        .then(data => data.json())
        .then(res => {
            //console.log(res)
            setFiles(res.files)
        })
        .catch(err => console.log(err))


    }

    useEffect(() => {
        const fetchData = async ()=>{
            try{
                const res =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/roomFiles?roomname=${roomName}`, {method: 'GET'})
                const json = await res.json();

                //console.log(json)
                if(json.files){
                    setFiles(json.files)
                }

            }catch(err){
                console.log(err)
            }
        }


        const id = setInterval(()=>{
            fetchData()
        }, 60 * 1000)

        return () => clearInterval(id)

    }, [])

    return (
        <React.Fragment >
            <div className="mt-2 bg-gray-200 h-40 overflow-auto rounded text-deep-cerulean-700  border  " >
                <ul>
                    {files.length === 0 
                    ?
                        <li className='text-sm text-center truncate m-1' >
                            ⚠ no files yet
                        </li>
                    :
                     files.map((file, i)=>
                        <li className='text-sm truncate m-1' key={i} >
                            📌<a target='_blank' rel="noreferrer " href={`${process.env.REACT_APP_API_BASE_URL}/upload/${file}`} >{file} </a>
                        </li>
                    )
                     
                    }
                </ul>
            </div>
            
            <div className='flex justify-evenly w-full border bg-gray-200 mt-2 p-2 rounded' >
                <label className='cursor-pointer font-bold text-deep-cerulean-700 w-full ' htmlFor='file' >
                    Upload your file
                </label>
                <img alt='upload icon' className='h-full' src="https://img.icons8.com/metro/25/000000/upload.png"/>
                <input className='' name='file' id='file' type='file' onChange={handleChange} />
            </div>
          

        </React.Fragment>
    )
}
