import React, { useCallback, useEffect, useState } from "react";
import {
  serviceGetLocationDetails,
  serviceLocationDepartments,
} from "../../../services/Location.service";
import { useParams } from "react-router";
import EmpInfo_Qr from "./component/EmpInfo_Qr/EmpInfo_Qr";
import ReactDOM from 'react-dom';
function useLocationDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [allData, setAllData] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();

  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);

  useEffect(() => {
    let dataValues = serviceLocationDepartments({ location_id: id });
    dataValues
      .then((data) => {
        setAllData(data?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const initData = useCallback(() => {
    if (id && !isSubmitting) {
      setIsSubmitting(true);
      const req = serviceGetLocationDetails({ id: id });
      req.then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setData(data);
        }
        setIsSubmitting(false);
      });
    }
  }, [id, isSubmitting, setIsSubmitting]);

  useEffect(() => {
    initData();
  }, [id]);

  const handleDownload = (data) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      ReactDOM.render(<EmpInfo_Qr data={data}/>, newWindow.document.body);
    } 
    // const newTab = window.open(imageUrl, "_blank");
    // newTab.focus();
  };
  
  return {
    data,
    id,
    handleDownload,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
  };
}

export default useLocationDetail;
