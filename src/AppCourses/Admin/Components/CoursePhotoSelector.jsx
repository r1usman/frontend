import React, { useRef, useState } from 'react'
import {User , Trash , Upload} from "lucide-react"
import { LuFileImage } from 'react-icons/lu';
const CoursePhotoSelector = ({image , setimage}) => {
const  inputref = useRef(null);
const [previewUrl, setpreviewUrl] = useState(image);

const HandleImageChange= (e)=>{
    // console.log(e.target.files);

    console.log("image", image);
    
    
    const file = e.target.files[0];

    if(file)
    {
        
        
        const preview = URL.createObjectURL(file);
        setimage(file);
        setpreviewUrl(preview);
    }
}
        
console.log("previewUrl", previewUrl);



const HandleImageRemove = ()=>{
    setimage(null);
    setpreviewUrl(null);
}

const onChooseFile = ()=>{
    inputref.current.click();
}

  return (
    <>
        <div className='flex justify-center mb-6 h-full'>
        <input
        className='hidden'
        type="file"
        ref={inputref}
        onChange={(e) => HandleImageChange(e)} 
        accept='image/*'
    />


        {
            !image ? 
            (
                <div className='bg-gray-50/50 flex flex-col items-center justify-center h-full w-full gap-2 '>
                    <div onClick={onChooseFile} className='size-16 bg-sky-50 rounded-full flex items-center justify-center cursor-pointer'>
                        <LuFileImage className='text-xl text-sky-600'/>
                    </div>
                    <p className='text-sm text-gray-700'>Click to upload Cover Image</p>

                </div>
                

            )
            :
            (
                <div className=' w-full h-full relative   flex items-center justify-center p-1'>
                    <img className='w-full h-full object-cover' src={previewUrl} alt="" />
                    <button className=' absolute bg-red-600 rounded-full p-1 text-white  top-3 cursor-pointer right-3 border' type='button' onClick={HandleImageRemove}><Trash className='w-4 h-4'/></button>
                </div>
            )
        }
        </div>
    </>
  )
}

export default CoursePhotoSelector