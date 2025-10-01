import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../Utility/AxiosInstances';
import { API_PATH } from '../../../../Utility/ApiPath';
import { useNavigate } from 'react-router-dom';
import AssinmentCard from '../../../Components/Cards/AssinmentCard';
import moment from 'moment';
import { LucideCirclePlus } from 'lucide-react';
import NoFound from "../../../assets/NoEvaluations.svg"

const SubmittedAssingments = () => {
  const Navigate = useNavigate();
  const [Data, setData] = useState([]);

  const handleFetchSubmision = async () => {
    try {
      const response = await AxiosInstance.get(API_PATH.PARTIAL.GET_SUBMIT);
      setData(response.data || []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    handleFetchSubmision();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-0 pt-4">
      {Data?.length > 0 ? (
        <div className="font-urbanist grid grid-cols-1 md:grid-cols-5 md:gap-4 pt-1 pb-6">
          {Data.map((Assingment) => (
            <AssinmentCard
              key={Assingment?._id}
              tag={"Evaluation"}
              ID={Assingment?._id}
              imgurl={Assingment?.thumbnail || null}
              title={Assingment?.title || "Untitled Resume"}
              lastUpdated={
                Assingment?.dueDate
                  ? moment(Assingment.dueDate).format("Do MMM YYYY")
                  : "Unknown"
              }
              onselect={() =>
                Navigate(`/Instructor/Assingment/Evaluation/${Assingment?._id}`, {
                  state: { Assingment },
                })
              }
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-20">
          <p className="text-gray-400 text-md flex flex-col gap-2.5 items-center justify-center">
              <img src={NoFound} className="size-48" alt="" />
              <p className="text-sm ">No assignments are ready for evaluation yet.<br/> Please wait until the deadline passes.</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmittedAssingments;
