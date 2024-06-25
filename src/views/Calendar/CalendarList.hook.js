import React, { useCallback, useMemo, useState } from "react";
import { calenderData } from "../../helper/calenderData";

function useCalendarList() {
  const [isSidePanel, setSidePanel] = useState(false);
  const [data, setData] = useState(calenderData);
  const [selectedDate, setSelectedDate] = useState(null);

  const [editData, setEditData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    all: true,
    personal: true,
    holiday: true,
    business: true,
  });

  const handleDateChange = (date) => {
    console.log(">>>>", date);
    setSelectedDate(date);
  };

  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      if (name === "all") {
        setCheckedItems({
          all: checked,
          personal: checked,
          holiday: checked,
          business: checked,
        });
      } else {
        setCheckedItems({
          ...checkedItems,
          [name]: checked,
          all: false,
        });
      }
    },
    [checkedItems, setCheckedItems, data]
  );

  const filteredData = useMemo(() => {
    if (checkedItems?.all) {
      return data;
    } else {
      return data?.filter((item) => checkedItems[item?.type]);
    }
  }, [data, setData, checkedItems, setCheckedItems]);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data?.id);
      }
    },
    [setEditData, setSidePanel]
  );
  return {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
  };
}

export default useCalendarList;
