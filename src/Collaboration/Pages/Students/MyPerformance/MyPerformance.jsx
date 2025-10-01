import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../Utility/AxiosInstances';
import { API_PATH } from '../../../../Utility/ApiPath';
import AssinmentCard from '../../../Components/Cards/AssinmentCard';
import moment from 'moment';
import Result from '../../../Components/Cards/Result';

const MyPerformance = () => {
  const [Data, setData] = useState([]);
  const [display, setdisplay] = useState("");

  const handleFetchSubmision = async () => {
    try {
      const response = await AxiosInstance.get(API_PATH.PARTIAL.GET_SUBMIT);
      setData(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const ConfirmID = (ID) => {
    setdisplay(ID);
  };

  useEffect(() => {
    handleFetchSubmision();
  }, []);

  return (
    <div className='relative '>
      <div className="font-urbanist grid grid-cols-1 md:grid-cols-5 md:gap-4 pt-1 pb-6 px-4 md:px-0">
        {Data?.map((Assingment) => (
          <AssinmentCard
            key={Assingment?._id}
            tag={"Performance"}
            ID={Assingment?._id}
            imgurl={Assingment?.thumbnail || null}
            title={Assingment?.title || "Untitled Resume"}
            lastUpdated={
              Assingment?.updatedAt
                ? moment(Assingment.updatedAt).format("Do MMM YYYY")
                : "Unknown"
            }
            onselect={() => ConfirmID(Assingment._id)}
          />
        ))}
      </div>


      <div
        onClick={() => setdisplay("")}
        className={`absolute top-0 -right-5 w-1/2 min-h-screen border rounded-md bg-slate-50 px-5 py-5 transform transition-transform duration-500 ease-in-out z-20 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Result AssingmentID={display} />
      </div>
    </div>
  );
};

export default MyPerformance;
