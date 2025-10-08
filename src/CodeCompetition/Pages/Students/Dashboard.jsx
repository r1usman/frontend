import { Ban } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Banner from './Banner/Banner'
import AxiosInstance from "../../../Utility/AxiosInstances.js"
import { API_PATH } from '../../../Utility/ApiPath.js'
import ChallengeCard from '../../Components/Cards/User/ChallengeCard.jsx'
import Model from "../../Layouts/Modal.jsx"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigator = useNavigate();
  const [Data, setData] = useState([]);
  const [ConfirmId, setConfirmId] = useState("")
  const [Confirmation, setConfirmation] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  const fetchAllResumes = async () => {
    try {
      const response = await AxiosInstance.get(API_PATH.CHALLENGE.GET_PUBLIC_CHALLENGE); 
      setData(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const ConfirmID = (ID)=>{  
    const challenge = Data.find(item => item._id === ID);
    setSelectedChallenge(challenge);
    setConfirmation(true)
    setConfirmId(ID)
  }

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleAfterConfirmation = ()=>{
    navigator(`/Student/Editor/${ConfirmId}`)
  }

  const contestStarted = selectedChallenge
    ? new Date(selectedChallenge.startTime) <= new Date()
    : false;

  // const contestStarted = true

  return (
    <div className=' px-4'>
      <Banner/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {
          Data.map((item)=>(
            <ChallengeCard
                key={item._id}
                ID={item._id}
                title = {item.title}
                description = {item.description}
                priority= {item.difficulty}  
                startTime={item.startTime}
                endTime={item.endTime}
                status ={item.duration}
                dueDate = {item.dueDate || ""}
                onselect={(ID)=>ConfirmID(ID)}
                blurContent={!hasConfirmed}
            />
          ))
        }
      </div>
          <Model
          isOpen={Confirmation}
          onClose={() => setConfirmation((prev) => !prev)}
          type={contestStarted ? "Confirmation":"small"}
          title={contestStarted ? "Participation Guidelines" : "Contest Has Not Started Yet"}
        >
            <div className="space-y-4 text-sm text-gray-700 px-5 py-3">
              {contestStarted ? (
                <>
                  <p>
                    You are about to participate in a live coding competition. Please read the following guidelines carefully before proceeding:
                  </p>

                  <ul className="list-disc list-inside space-y-1">
                    <li>Do <strong>not</strong> open a new tab or window during the competition.</li>
                    <li>Do <strong>not</strong> switch or navigate away from the current tab.</li>
                    <li>All activities are monitored. Any form of cheating or suspicious behavior will lead to <strong>immediate disqualification</strong>.</li>
                  </ul>

                  <p className="font-medium">
                    By proceeding, you agree to abide by these rules. Failure to comply will result in elimination from the competition.
                  </p>
                  <button className='btn-primary' onClick={handleAfterConfirmation}>Confirm</button>
                </>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-2 rounded-full bg-yellow-100">
                    <Ban className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contest Has Not Started Yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    This contest will open at its scheduled start time. Please return once the event has officially begun.
                  </p>
                </div>

              )}
            </div>
      </Model>

    </div>
  )
}

export default Dashboard
