
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actionGetJobOpeningShiftEmp } from "../../../actions/AssociatedEmployees.action";


const totalShow =10;
const useAssociatedEmployeeHook = ({id}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const [isRejectPopUp,setIsRejectPopUp]=useState(false)
  const [currentPage,setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData,setCurrentData] = useState([]);


  const {isCandidatesFetching, associatedUser:candidates } = useSelector(state => state.associatedEmployee);


  useEffect(() => {
    dispatch(actionGetJobOpeningShiftEmp(1, {}, {},id))
  }, []);

    useEffect(() => {
         setData(candidates);
    }, [candidates]);

    useEffect(() => {
        _processData();
    }, [data, currentPage]);


    const _processData = useCallback(() =>  {
      const from = (((currentPage) * totalShow) - totalShow);
      let to = (((currentPage) * totalShow));
      // all.filter((val, index) => {
      //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
      //         return val;
      //     }
      // });
      
      if (from <= data.length) {
          to = to <= data.length ? to : data.length;
          setCurrentData(data.slice(from, to));
      }
  }, [setCurrentData, currentPage, data, totalShow]);

  const handlePageChange = useCallback((type) => {
    console.log(data)
      if (Math.ceil(data.length / totalShow) >= (type + 1)) {
          setCurrentPage(type + 1);
          _processData()
      }
  }, [_processData, setCurrentPage, data]);


  // const handlePageChange = useCallback((type) => {
  //   // dispatch(actionSetPageHubMasterRequests(type));
  // }, []);


  // const handleFilterDataChange = useCallback(
  //   (value) => {
  //     queryFilter("FILTER_DATA", value);
  //   },
  //   [queryFilter]
  // );

  // const handleSearchValueChange = useCallback(
  //   (value) => {
  //     queryFilter("SEARCH_TEXT", value);
  //   },
  //   [queryFilter]
  // );

  const handleSortOrderChange= (row, order)=>{
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
    }

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditId("");
      setEditData(null);
    },
    [setEditId, setSidePanel, setEditData]
  );

  const handleEditHubMaster = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditId(data?.id);
      setEditData(data);
    },
    [setEditData, setSidePanel, setEditId]
  );

  const configFilter = useMemo(() => {
    return [
      { label: "Created On", name: "createdAt", type: "date" },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, []);

  const toggleRejectDialog = useCallback(
    (all) => {
      setIsRejectPopUp((e) => !e);
      setEditId(all)
    },
    [isRejectPopUp, setEditId]
  );

  return {
    handlePageChange,
    isRejectPopUp,
    toggleRejectDialog,
    // handleFilterDataChange,
    // handleSearchValueChange,
    handleSortOrderChange,
    handleSideToggle,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    editId,
    handleEditHubMaster,
     data:candidates,
    currentData,
    currentPage
  };
};

export default useAssociatedEmployeeHook;
