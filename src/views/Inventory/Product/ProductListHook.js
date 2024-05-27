import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateProduct,
  actionFetchProduct, actionSetPageProduct,
  actionUpdateId

} from "../../../actions/Product.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";

const useProductList = ({ }) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const [listData, setListData] = useState()

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.product);
  const {id} =useParams()
  // const { category_id } = useSelector(state => state.category)
  useEffect(() => {
    // dispatch(actionFetchUnit());
    serviceGetList(["UNITS", "CATEGORIES"]).then(res => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchProduct(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        category_id: id
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageProduct(type));
  }, []);
  //   const handleSubCategory = useCallback((data) => {
  //     console.log('here',data)
  //     historyUtils.push(RouteName.SUBCATEGORY+ data.id) //+
  // }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateProduct(data));
      } else {
        // dispatch(actionUpdateUnit(data));
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
        actionFetchProduct(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
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
      dispatch(actionSetPageProduct(1));
      dispatch(
        actionFetchProduct(
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

  // const handleDelete = useCallback(
  //   (id) => {
  //     dispatch(actionDeleteUnit(id));
  //     setSidePanel(false);
  //     setEditData(null);
  //   },
  //   [setEditData, setSidePanel]
  // );

  const handleEdit = useCallback(
    (data) => {
      console.log('sjhdsjd', data)
      historyUtils.push(RouteName.PRODUCT_UPDATE + data.id); //+data.id

      // setEditData(data);
      // dispatch(actionUpdateId(data?.id))
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  // const handleToggleSidePannel = useCallback(() => {
  //   setSidePanel((e) => !e);
  // }, [setSidePanel]);

  // const handleSideToggle = useCallback(
  //   (data) => {
  //     historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
  //   },
  //   [setEditData, setSidePanel]
  // );

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.PRODUCT_CREATE);
  }, []);
  console.log('jfhifs',listData?.CATEGORIES)
  const configFilter = useMemo(() => {
    return [
       {
        label: "Category",
        name: "category_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.CATEGORIES,
      },

      {
        label: "Type",
        name: "type",
        type: "select",
        // custom: { extract: { id: "id", title: "name" } },
        fields: ["RAW_MATERIAL", "FINISHED_GOODS", "SERVICE","CONTAINER","ASSETS", "MITHAI_BOX","MATERIAL"],
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "ACTIVE",
          "INACTIVE",
          "DELETED"
        ],
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
listData
  };
};

export default useProductList;
