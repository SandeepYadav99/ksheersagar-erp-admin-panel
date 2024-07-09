import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { serviceGetList } from "../../../../../services/index.services";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceAddEmployeeShift } from "../../../../../services/Shifts.service";
import { useParams } from "react-router";

const useAddEmployeeTable = ({ handleClose }) => {
  const [selected, setSelected] = useState([]);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalShow, setTotalShow] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const renderList = useCallback(() => {
    serviceGetList(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        const data = res?.data?.EMPLOYEES;
        console.log("data", data);
        setAllData(data);
        setData(data);
      }
    });
  }, []);
  useEffect(() => {
    renderList();
  }, []);

  useEffect(() => {
    // initData();
    _processData();
  }, [currentPage, data]);

  const _processData = () => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;

    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  };

  const handlePageChange = useCallback(
    (type) => {
      console.log("_handlePageChange", type);
      if (Math.ceil(data.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, data, totalShow]
  );

  const queryFilter = useCallback((key, value) => {
    console.log("_queryFilter", key, value);
  }, []);

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
      if (value) {
        const tempData = allData.filter((val) => {
          if (
            val?.name?.match(new RegExp(value, "ig")) ||
            val?.code?.match(new RegExp(value, "ig"))
          ) {
            return val;
          }
        });
        setData(tempData);
      } else {
        setData(allData);
      }
    },
    [queryFilter, _processData, data, setData, allData]
  );

  const handleSortOrderChange = useCallback((row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  }, []);

  const handleRowSize = (page) => {
    console.log(page);
  };
  console.log(">>>>>", selected);

  const handleCheckbox = useCallback(
    (data) => {
      const tempSelected = JSON.parse(JSON.stringify(selected));
      const tempIndex = tempSelected.findIndex((sel) => sel.id === data.id);
      if (tempIndex >= 0) {
        tempSelected.splice(tempIndex, 1);
      } else {
        tempSelected.push(data);
      }
      setSelected(tempSelected);
    },
    [selected, setSelected]
  );
  const handleSubmit = useCallback(() => {
    if (selected?.length > 0) {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const getEmpID = selected?.map((item) => item?.id);
        let req = serviceAddEmployeeShift;
        req({
          shift_id: id,
          employee_ids: getEmpID ? getEmpID : [],
        }).then((res) => {
          if (!res.error) {
            handleClose();
            // renderList();
            SnackbarUtils.success("Added successfully");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    } else {
      SnackbarUtils.error("Please select atlest one Employee");
    }
  }, [selected, setSelected, isSubmitting, setIsSubmitting, handleClose]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleCheckbox,
    selected,
    currentPage,
    currentData,
    data,
    allData,
    isFetching,
    isSubmitting,
    handleSubmit,
  };
};

export default useAddEmployeeTable;
