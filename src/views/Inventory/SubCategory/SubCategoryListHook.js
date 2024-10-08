import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateSubcategory,
  // actionDeleteUnit,
  actionFetchSubcategory,
  actionSubcategoryId,
  actionUpdateSubcategory,
  actionSetPageSubcategory
  // actionSetPageUnit,
  // actionUpdateUnit,
} from "../../../actions/Subcategory.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { useParams } from "react-router";
import useSubcategoryDetail from "../SubcategoryCreate/SubcategoryCreateHook";
import { 
  serviceGetCategoryDetails,
} from "../../../services/Category.service";


const useSubCategoryList = ({}) => {

  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryName,setCategoryName]=useState("");
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const catId= useParams();
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    subcategory_id,
  } = useSelector((state) => state.subcategory);
  const {
    data
  } = useSelector((state) => state.category);
  const {
handleReset
  } = useSubcategoryDetail({  });
  useEffect(() => {
    // dispatch(actionFetchUnit());
  }, []);
  console.log('sc',editData)
  useEffect(() => {
    if (catId?.id !==0) {
      serviceGetCategoryDetails({ id: catId?.id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log('data set',data)
          setCategoryName(data?.name)
          // setForm({
          //   // ...data,
          //   id:data?.id,
          //   name:data?.name,
          //   is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          // });
        } else {
          // SnackbarUtils.error(res?.message);
        }
      });
    }
  }, []);
  useEffect(() => {
    // console.log('jwhwjhw data',data?.indexOf(catId))
    // data?.indexOf(catId)
    dispatch(
      actionFetchSubcategory(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        category_id:catId?.id
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageSubcategory(type));
  }, []);
  const capitalizeFirstLetter=useCallback((string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
},[])
  const handleProduct = useCallback((data) => {
    console.log('here')
    historyUtils.push(RouteName.PRODUCT) //+
}, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateSubcategory(data));
      } else {
        dispatch(actionUpdateSubcategory(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageUnitRequests(1));
      dispatch(
        actionFetchSubcategory(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          category_id: catId
        })
      );
      // dispatch(actionFetchUnit(1, sortingData))
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
      // dispatch(actionSetPageSubcategory(1));
      dispatch(
        actionFetchSubcategory(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          },
          // category_id:catId
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
      // dispatch(actionDeletenit(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
      dispatch(actionSubcategoryId(data?.id))
    },
    [setEditData, setSidePanel]
  );

  const handleToggleSidePannel = useCallback(() => {
    setSidePanel((e) => !e);
    dispatch(actionSubcategoryId(0))
    handleReset()
    // setEditData(null);
    // handleReset()

  }, [setSidePanel]);

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  const configFilter = useMemo(() => {
    return [
      // {label: 'Country', name: 'country', type: 'text'},
      // {label: 'City', name: 'city', type: 'text'},

      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        // fields: listData?.LOCATIONS,
      },

      {
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        // fields: listData?.DEPARTMENTS,
      },
      {
        label: "Created Date",
        options: { maxDate: new Date() },
        name: "createdAt",
        type: "date",
      },
      // {label: 'Status', name: 'status', type: 'select', fields: ['INACTIVE', 'ACTIVE']},
    ];
  }, []);


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
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    handleProduct,
    handleReset,
    categoryName,
    capitalizeFirstLetter

  };
};

export default useSubCategoryList;
