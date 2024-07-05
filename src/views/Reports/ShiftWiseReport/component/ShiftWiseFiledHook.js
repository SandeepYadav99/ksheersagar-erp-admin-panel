import React, { useState } from 'react'

const initialForm = {
    machineName: "",
    td_id: "",
    serial_number: "",
    location_id: "",
    status: true,
  };

const useShiftWiseFiledHook = () => {
    const [form, setForm] = useState({ ...initialForm });
    
  return {
    form
  }
}

export default useShiftWiseFiledHook