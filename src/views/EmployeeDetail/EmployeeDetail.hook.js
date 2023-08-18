import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { serviceGetEmployeeDetails } from "../../services/Employee.service";

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

  return {
    data,
    id,
  };
}

export default useEmployeeDetails;
