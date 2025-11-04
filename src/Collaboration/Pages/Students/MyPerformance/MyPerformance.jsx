import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../Utility/AxiosInstances';
import { API_PATH } from '../../../../Utility/ApiPath';
import AssinmentCard from '../../../Components/Cards/AssinmentCard';
import moment from 'moment';
import Result from '../../../Components/Cards/Result';
import RenderFrom from '../../../Pages/Instructors/AssingmentEvaluation/RenderSubmission';
import Modal from '../../../Layouts/Modal';
import { LuDownload } from 'react-icons/lu';
import { data } from 'react-router';

const MyPerformance = () => {
  const [Data, setData] = useState([]);
  const [display, setdisplay] = useState("");
  const [baseWidth, setBaseWidth] = useState(600);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [Assingmentdata, setAssingmentdata] = useState({})
  const [AssingmentDetail, setAssingmentDetail] = useState({})
  console.log("AssingmentDetail",AssingmentDetail);
  

  const handleFetchSubmision = async () => {
    try {
      const response = await AxiosInstance.get(API_PATH.PARTIAL.GET_SUBMIT);
      setData(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("data",Data);
  
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
            dueDate={moment(Assingment?.dueDate).format("Do MMM YYYY")}
            lastUpdated={
              Assingment?.updatedAt
                ? moment(Assingment.updatedAt).format("Do MMM YYYY")
                : "Unknown"
            }
            onselect={() => {ConfirmID(Assingment._id), setAssingmentDetail(Assingment)}}
          />
        ))}
      </div>
      


      <div
        className={`absolute top-0 -right-5 w-1/2 min-h-screen border rounded-xl border-[#6c63ff] bg-slate-50 px-5 py-5 transform transition-transform duration-500 ease-in-out z-20 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Result AssingmentDetail={AssingmentDetail} setdisplay={setdisplay} AssingmentID={display} setAssingmentdata={setAssingmentdata} openPreviewModal={openPreviewModal} setOpenPreviewModal={setOpenPreviewModal} />
      </div>
      {/* <Modal
              isOpen={openPreviewModal}
              onClose={() => setOpenPreviewModal(false)}
              title={AssingmentDetail.title}
              showActionBtn
              actionBtnText="Download"
              actionBtnIcon={<LuDownload className="text-[16px]" />}
              type={"Print"}
              
              >
              <div className="w-[98vw] h-[90vh]" >
                  <RenderFrom
                      AssingmentDetail ={AssingmentDetail}
                      data = {Assingmentdata}
                      containerWidth = {baseWidth}
                      status={"Medium"}
                  />
          </div>
        </Modal> */}
    </div>
  );
};

export default MyPerformance;
