import React, { useCallback, useState } from "react";

const initialData = {
  role: "",
  role_description: "",
};
const useUserRolesCreateHook = () => {
  const [form, setForm] = useState({ ...initialData });
  const [errorData, setErrorData] = useState({});

  const changeTextData = useCallback(() => {}, []);

  const onBlurHandler = useCallback(() => {}, []);

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
  };
};

export default useUserRolesCreateHook;
