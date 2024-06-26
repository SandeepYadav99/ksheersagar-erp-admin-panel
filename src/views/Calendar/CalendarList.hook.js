import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { calenderData } from "../../helper/calenderData";
import { serviceGetCalendar } from "../../services/Calendar.service";

function useCalendarList() {
  const [isSidePanel, setSidePanel] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [editData, setEditData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    all: true,
    GAZETTED: true,
    RESTRICTED: true,
    OPTIONAL: true,
  });

  const renderList = useCallback(() => {
    serviceGetCalendar({
      index: 1,
      row: "createdAt",
      order: "desc",
      query: "",
      query_data: null,
    }).then((res) => {
      if (!res.error) {
        setData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    renderList();
  }, []);

  const handleDateChange = (date) => {
    console.log(">>>>", date);
    setSelectedDate(date);
  };
  console.log("data", data);
  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      if (name === "all") {
        setCheckedItems({
          all: checked,
          GAZETTED: checked,
          RESTRICTED: checked,
          OPTIONAL: checked,
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

  console.log("checkedItems", checkedItems);
  const filteredData = useMemo(() => {
    if (checkedItems?.all) {
      return data;
    } else {
      return data?.filter((item) => checkedItems[item?.holiday_type]);
    }
  }, [data, setData, checkedItems, setCheckedItems]);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data);
      } else {
        setEditData(null);
      }
    },
    [setEditData, setSidePanel]
  );

  console.log("editdata", editData);
  return {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
    editData,
    renderList
  };
}

export default useCalendarList;
