import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEmployee,
  actionDeleteEmployee,
  actionFetchEmployee,
  actionSetPageEmployeeRequests,
  actionUpdateEmployee,
} from "../../actions/Employee.action";
import historyUtils from "../../libs/history.utils";
import { serviceGetList } from "../../services/Common.service";
import RouteName from "../../routes/Route.name";
import { serviceExportEmployees } from "../../services/Employee.service";
import Constants from "../../config/constants";

const useEmployeeList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [createDD, setCreateDD] = useState(null);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
    JOINING_CANDIDATES: [],
    TRAINEE_EMPLOYEES: [],
  });
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employee);

  const initData = useCallback(() => {
    dispatch(
      actionFetchEmployee(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
  }, []);

  useEffect(() => {
    initData();
    isMountRef.current = true;
    serviceGetList([
      "LOCATIONS",
      "GRADES",
      "DEPARTMENTS",
      "JOINING_CANDIDATES",
      "TRAINEE_EMPLOYEES",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEmployeeRequests(type));
  }, []);
  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.EMPLOYEE_CREATE); //+
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEmployee(data));
      } else {
        dispatch(actionUpdateEmployee(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchEmployee(1, sortingData))
    },
    [sortingData, query, queryData]
  );

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
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteEmployee(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleSideToggle = useCallback(() => {
    historyUtils.push(RouteName.EMPLOYEE_CREATE);
    // setSidePanel(e => !e);
    // setEditData(null);
  }, [setEditData, setSidePanel]);

  const handleAddCandidate = useCallback(
    (event) => {
      setCreateDD(event.currentTarget);
    },
    [setCreateDD]
  );

  const handleViewDetails = useCallback((data) => {
    // console.log('>data',data)
    historyUtils.push(`${RouteName.EMPLOYEE_DETAILS}${data?.id}`);
  }, []);
  const handleViewUpdate = useCallback((data) => {
    // historyUtils.push(`${RouteName.EMPLOYEE_UPDATE}${data?.id}`);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },

      {
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Created Date",
        options: { maxDate: new Date() },
        name: "createdAt",
        type: "date",
      },
      // {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
    ];
  }, [listData, role]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    handleViewUpdate,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleAddCandidate,
    createDD,
    listData,
  };
};

export default useEmployeeList;
