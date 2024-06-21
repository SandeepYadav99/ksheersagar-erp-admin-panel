import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isAadhar,
  isAccountNum,
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  IsIFSCCode,
  isNum,
  isSpace,
  validateESI,
  validateUAN,
} from "../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../services/Common.service";
import {
  serviceCheckEmployeeExists,
  serviceGetEmployeeConversionInfo,
  serviceGetEmployeeEditInfo,
  serviceCreateEmployees,
} from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import { useMemo } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";

function EmployeeListCreateHook({ location }) {
  const initialForm = {
    emp_code: "",
    image: "",
    status: "",
    name_en: "",
    name_hi: "",
    doj: "",
    dob: "",
    age: "",
    location_id: "",
    department_id: "",
    role_id: "",
    gender: "",
    contact: "",
    email: "",
    father_name: "",
    permanent_address: "",
    current_address: "",
    password: "",
    pin: "",
    aadhar_no: "",
    is_address_same: false,
    aadhaar_back: "",
    aadhaar_front: "",
    uan_no: "",
    esi_no: "",
    external_emp_code: "",
    bank_name: "",
    account_no: "",
    bank_branch: "",
    ifsc: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [defaultImg, setDefaultImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remotePath, setRemotePath] = useState("");
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const codeDebouncerExternalCode = useDebounce(form?.external_emp_code, 600);
  const candidateId = location?.state?.empId;
  const empFlag = location?.state?.isOnboard;
  const [listData, setListData] = useState({
    LOCATION_DEPARTMENTS: [],
    EMPLOYEES: [],
    DEPARTMENTS: [],
    SUB_DEPARTMENTS: [],
    JOB_ROLES: [],
    HR: [],
    DESIGNATIONS: [],
    LEVEL: [],
    LOCATIONS: [],
    ROLES: [],
  });
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);

  useEffect(() => {
    serviceGetList([
      "LOCATION_DEPARTMENTS",
      "EMPLOYEES",
      "DEPARTMENTS",
      "SUB_DEPARTMENTS",
      "JOB_ROLES",
      "DESIGNATIONS",
      "LOCATIONS",
      "ROLES",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (listData?.EMPLOYEES?.length > 0 && candidateId) {
      let req;
      if (candidateId) {
        req = serviceGetEmployeeConversionInfo({ candidate_id: candidateId });
      }
      req.then((res) => {
        const empData = res?.data;
        setDefaultImg(empData?.image);
        setRemotePath(empData?.remote_image_path);
        const data = { image: "" };
        Object.keys({ ...initialForm }).forEach((key) => {
          if (key in initialForm && key !== "image") {
            data[key] = empData[key];
          }
        });
        setForm({ ...initialForm, ...data });
      });
    }
  }, [candidateId, listData]);
  LogUtils.log("formLLL", form, remotePath);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "emp_code",
      "name_en",
      "name_hi",
      "doj",
      "location_id",
      "password",
      // "pin",
      // "department_id",
      "role_id",
      "gender",
      "status",
      // "age",
      // "contact",
      "father_name",
      // "permanent_address",
      // "current_address",
      // "aadhar_no",
      // "email",
      // "uan_no",
      // "esi_no"
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.emp_code.length <= 3 && form?.emp_code.length > 0) {
      errors.emp_code = "Employee ID must be longer than 3 characters.";
    }
    if (form?.email && !isEmail(form?.email)) {
      errors["email"] = true;
    }
    if (form?.uan_no && form?.uan_no?.length < 12) {
      errors["uan_no"] = "Min 12 digit required";
    }
    if(form?.ifsc && form?.ifsc?.length !== 11){
      errors.ifsc = true
    }
    // if (form?.esi_no && !validateESI(form?.esi_no)) {
    //   errors["esi_no"] = "Min 17 digit required";
    // }
    if (
      form?.contact &&
      (!isNum(form?.contact) || form?.contact?.length !== 10)
    ) {
      errors["contact"] = true;
    }
    if (form?.aadhar_no && !isAadhar(form?.aadhar_no)) {
      errors["aadhar_no"] = true;
    }
    if (form?.pin && form?.pin.length !== 4) {
      errors["pin"] = true;
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name_en") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "emp_code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "external_emp_code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "is_address_same") {
        if (text) {
          t.current_address = t?.permanent_address;
        }
        t[fieldName] = text;
      } else if (fieldName === "age") {
        if (text >= 0 && text < 100) {
          t[fieldName] = text;
        }
      } else if (fieldName === "contact") {
        if (text >= 0 && text?.length <= 10) {
          t[fieldName] = text;
        }
      } else if (fieldName === "pin") {
        if (text >= 0 && text?.length < 5) {
          t[fieldName] = text;
        }
      } else if (fieldName === "aadhar_no") {
        if (text >= 0 && text?.length <= 12) {
          t[fieldName] = text;
        }
      } else if (fieldName === "uan_no") {
        if (!text || (isAlphaNum(text) && text?.length <= 12)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "esi_no") {
        // if (text >= 0 && text?.length <= 17) {
        t[fieldName] = text;
        // }
      } else if (fieldName === "ifsc") {
        if (text.length < 12 && isAlphaNum(text)) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  const checkCodeValidation = useCallback(() => {
    if (form?.emp_code?.length <= 3) return;
    if (form?.emp_code) {
      serviceCheckEmployeeExists({
        code: form?.emp_code,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["emp_code"] = "Employee Code Exists";
            setErrorData(errors);
          } else {
            delete errors.emp_code;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.emp_code, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);
  const checkCodeValidationEmpoyCode = useCallback(() => {
    if (form?.external_emp_code) {
      serviceCheckEmployeeExists({
        external_emp_code: form?.external_emp_code,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["external_emp_code"] = "External Employee Code Exists";
            setErrorData(errors);
          } else {
            delete errors.external_emp_code;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.external_emp_code, id]);

  useEffect(() => {
    if (codeDebouncerExternalCode) {
      checkCodeValidationEmpoyCode();
    }
  }, [codeDebouncerExternalCode]);
  const onBlurHandler = useCallback(
    (type) => {
      // if (form?.[type]) {
      //   changeTextData(form?.[type].trim(), type);
      // }
    },
    [changeTextData, checkCodeValidation, checkCodeValidationEmpoyCode]
  );
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      if(!form?.dob){
        delete form?.dob
      }
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        LogUtils.log("key", key);
        if (key !== "is_address_same") {
          fd.append(key, form[key]);
        }
      });
      if (remotePath?.length > 0) {
        fd.append("remote_image_path", remotePath);
      }
      serviceCreateEmployees(fd).then((res) => {
        if (!res.error) {
          historyUtils.push("/employees");
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    LogUtils.log("errors==>", errors);
    if (Object.keys(errors)?.length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const filteredDepartments = useMemo(() => {
    const locations = listData?.LOCATION_DEPARTMENTS;
    const index = locations?.findIndex((l) => l.id === form?.location_id);
    if (index >= 0) {
      const departments = locations[index]?.departments;
      return listData?.DEPARTMENTS?.filter(
        (val) => departments?.indexOf(val.id) >= 0
      );
    }
    return [];
  }, [listData, form?.location_id]);

  const filteredSubDepartments = useMemo(() => {
    return listData?.SUB_DEPARTMENTS?.filter(
      (val) => val.department_id === form?.department_id
    );
  }, [listData, form?.department_id]);

  const filteredEmployees = useMemo(() => {
    return listData?.EMPLOYEES?.filter((val) => {
      return (
        val.department_id === form?.department_id &&
        val.location_id === form?.location_id
      );
    });
  }, [form?.location_id, form?.department_id, listData]);

  const filteredAssociateJobRole = useMemo(() => {
    return listData.JOB_ROLES?.filter((val) => {
      return (
        val.department_id === form?.department_id &&
        val.location_id === form?.location_id
      );
    });
  }, [form?.location_id, form?.department_id, listData]);
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    filteredDepartments,
    filteredSubDepartments,
    filteredEmployees,
    filteredAssociateJobRole,
    empFlag,
    defaultImg,
    isSubmitting,
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
}

export default EmployeeListCreateHook;
