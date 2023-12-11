import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { serviceGetEmployeeDetails } from "../../services/Employee.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import EmpInfo from "./Component/EmpInfo";
import ReactDOM from 'react-dom';
function useEmployeeDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();

  const initData = useCallback(() => {
    if (id && !isSubmitting) {
      setIsSubmitting(true);
      const req = serviceGetEmployeeDetails({ id: id });
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

  const handleEditBtn = useCallback(() => {
    historyUtils.push(`${RouteName.EMPLOYEE_UPDATE}${id}`);
  }, [id]);

  const handleEmpInfoPage = useCallback((data) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      ReactDOM.render(<EmpInfo data={data}/>, newWindow.document.body);
    } 
    //  historyUtils.push(`${RouteName.EMPLOYEE_INFORMATION}${id}`);
  }, []);

  return {
    data,
    id,
    handleEditBtn,
    handleEmpInfoPage,
  };
}

export default useEmployeeDetails;
