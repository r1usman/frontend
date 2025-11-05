import React, { useState } from 'react'
import Input from "../../../Collaboration/Components/Inputs/Input"

import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../../../Utility/AxiosInstances'
import { API_PATH } from '../../../Utility/ApiPath'
import { useEffect } from 'react'

const CreateCourse = ({setOpenCreateModal , OpenCreateModal}) => {
  const [Title, setTitle] = useState("")
  const [error, seterror] = useState("")
 
  const navigate = useNavigate();

  const handleCreateChallenge = async (e) => {
    try
    {
        e.preventDefault();
        if (!Title) {
        seterror("Please enter a challenge title");
        return;
        }
        seterror("")
        const response = await AxiosInstance.post(API_PATH.PLATFORM_COURSES.CREATE, { title: Title })
        setOpenCreateModal(false)

        if (response.data?._id) {
        navigate(`/Admin/Courses`);
        }
    }
    catch(error)
    {
        seterror(error.response.data.message)
    }
  }

  useEffect(() => {
    const timer = setTimeout(()=>{
        seterror("");
    }, 3000)
  
    return () => {
      clearInterval(timer)
    }
  }, [error])
  

  return (
    <div className="font-urbanist w-[90vw] md:w-[39vw] px-6 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black">Create New Assingment</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Give your Assingment   a title to get started. You can edit all details later.
      </p>

      <form onSubmit={handleCreateChallenge}>
        <Input
          value={Title}
          onchange={(e) => setTitle(e.target.value)}
          label="Assingment Title"
          placeholder="e.g. Basic of Data Structure"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Create Assingment
        </button>
      </form>
    </div>
  )
}

export default CreateCourse
