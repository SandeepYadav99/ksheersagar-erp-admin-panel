
import { useCallback, useEffect, useMemo,  useState } from "react";
import historyUtils from "../../../libs/history.utils";
import { serviceGetList } from "../../../services/index.services";

const totalShow = 50;
const useMusterReportHook= ({}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInfoPanel, setInfoPanel] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isCalling, setIsCalling] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [formData, setFormData] = useState({});
    const [listData, setListData] = useState({
        LOCATIONS: [],
        GRADES: [],
        DEPARTMENTS: []
    });

    useEffect(() => {
        serviceGetList(["LOCATIONS", "DEPARTMENTS", "GRADES"]).then((res) => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    const toggleConfirmDialog = useCallback(
        (type) => {
            setIsDialog((e) => !e);
        },
        [setIsDialog]
    );
    const resetData = useCallback(() => {
    }, [ setIsCalling]);

    useEffect(() => {
        setData(apiData);
    }, [apiData]);

    const handleDownload = useCallback(() => {
       
    }, []);

    useEffect(() => {
        _processData();
    }, [data, currentPage]);

    const _processData = useCallback(() => {
        const from = currentPage * totalShow - totalShow;
        let to = currentPage * totalShow;
        if (from <= data?.length) {
            to = to <= data?.length ? to : data?.length;
            setCurrentData(data.slice(from, to));
        }
    }, [setCurrentData, currentPage, data, totalShow]);

    const handlePageChange = useCallback(
        (type) => {
            if (Math.ceil(data?.length / totalShow) >= type + 1) {
                setCurrentPage(type + 1);
                _processData();
            }
        },
        [_processData, setCurrentPage, data]
    );

    const queryFilter = useCallback((key, value) => {
        console.log("_queryFilter", key, value);
    }, []);

    const handleFilterDataChange = useCallback((value) => {
        if (value && Array.isArray(value) && value.length > 0) {
            let tData = [...apiData];
            let filteredData = [];
            for (const filterObj of value) {
                const {name, value} = filterObj;
                if (name !== 'is_modified') {
                    tData = tData.filter(obj => {
                        return obj[name] === value;
                    });
                } else {
                    tData = tData.filter(obj => {
                        if (value === 'YES') {
                            return obj.increment_percentage != obj.final_percentage;
                        } else {
                            return obj.increment_percentage == obj.final_percentage;
                        }
                    });
                }
            }
            setData(tData);
        } else {
            setData(apiData);
        }
    }, [queryFilter, apiData, data, setData]);

    const handleSearchValueChange = useCallback(
        (value) => {
            console.log("_handleSearchValueChange", value);
            queryFilter("SEARCH_TEXT", value);
            if (value) {
                const tempData = apiData?.filter((val) => {
                    if (val?.name?.match(new RegExp(value, "ig")) || val?.code?.match(new RegExp(value, "ig"))) {
                        return val;
                    }
                });
                setData(tempData);
            } else {
                setData(apiData);
            }
        },
        [queryFilter, _processData, data, setData, apiData]
    );

    const initialApiCall = useCallback(() => {
       
            resetData();
       
    }, []);

    const handleSortOrderChange = useCallback(
        (row, order) => {
            console.log(`handleSortOrderChange key:${row} order: ${order}`);
        },
        [resetData]
    );

    const handleRowSize = (page) => {
        console.log(page);
    };

    const handleQueryInfo = useCallback((data) => {
        setInfoPanel(true);
    }, []);
    const handleViewDetails = useCallback((data) => {
        historyUtils.push(`/employees/details/${data?.emp_code}`);
    }, []);

    

    const handleValueChange = useCallback((id, name, value) => {
        // const tData = {...formData};
        const tList = [...data];
        const index = data.findIndex(val => val.id === id);
        if (index >= 0) {
            // const dT = tData[id];
            // dT[name] = value;

            // tData[id] = dT;

            const obj = tList[index];
            obj[name] = value;
           
            setData(tList);

            
        }
    }, [data, setData]);

    const submitToServer = useCallback(() => {
        const tData = [];
        data.forEach((dT) => {
            // if (changedIds.indexOf(dT.id) >= 0 ) {
            tData.push({
                final_percentage: dT.final_percentage,
                is_promoted: dT.is_promoted,
                comments: dT?.comments ? dT?.comments : '',
                increment_amount: dT?.increment_amount,
                effective_amount: dT?.effective_amount,
                new_salary: dT?.new_salary,
                employee_id: dT?.employee_id,
                incr_due_month: dT?.incr_due_month,
            });
            // }
        });
    
    }, [data, isSubmitting, setIsSubmitting, toggleConfirmDialog]);

    const handleDialogConfirm = useCallback(() => {
        submitToServer();
    }, [submitToServer]);

    const handleViewGraph = useCallback(() => {
       
    }, []);

  

   
    const handleFreezeBtn = useCallback(() => {
        
        toggleConfirmDialog();
    }, [toggleConfirmDialog]);

    const handleSaveBtn = useCallback(() => {
       
        toggleConfirmDialog();
    }, [ toggleConfirmDialog]);

    return {
        handlePageChange,
        handleFilterDataChange,
        handleSearchValueChange,
        handleRowSize,
        handleSortOrderChange,
        isCalling,
        currentData,
        data: apiData,
        currentPage,
    
        isInfoPanel,
        handleQueryInfo,
        listData,
       
        initialApiCall,
        
        handleDownload,
        handleViewDetails,
     
        toggleConfirmDialog,
        isDialog,
        handleValueChange,
        formData,
        handleDialogConfirm,
        isSubmitting,
        handleViewGraph,
      
        handleFreezeBtn,
        handleSaveBtn
    };
};

export default useMusterReportHook;
