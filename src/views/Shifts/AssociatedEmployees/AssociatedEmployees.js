import React, { useCallback, useMemo } from "react";

import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";

import history from "../../../libs/history.utils";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import useAssociatedEmployeeHook from "./AssociatedEmployeeHook";
import { Add, Info } from "@material-ui/icons";
import { ButtonBase, IconButton } from "@material-ui/core";
import DeletePopup from "./Component/DeleteModal";

const AssociatedEmployees = ({ listData, id }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    data,
    currentData,
    currentPage,
    isRejectPopUp,
    toggleRejectDialog,
  } = useAssociatedEmployeeHook({ listData, id });

  // const {
  //   present,
  //   all: allData,
  //   currentPage,
  //   is_fetching: isFetching,
  // } = useSelector((state) => state.associatedManufactures);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>
              <strong></strong>
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      // {
      //   key: "user_info",
      //   label: "User Info",
      //   sortable: false,
      //   render: (temp, all) => (
      //     <div className={styles.image}>
      //       <img
      //         src={all?.image}
      //         className={styles.imageContainer}
      //         crossOrigin="anonymous"
      //         alt="..."
      //       />

      //       <div variant="body1"> {all?.name} </div>
      //     </div>
      //   ),
      // },
      {
        key: "employee_name",
        label: "EMPLOYEE NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.contact}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.depatment || "N/A"} / {all?.designation || "N/A"}
          </div>
        ),
        //  candidate?.applied_date
      },

      {
        key: "role",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        render: (temp, all) => (
          // <StatusPill
          //   status={all?.status}
          //   color={all?.status === "ACTIVE" ? "active" : "high"}
          // />
          <></>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => (
          // <StatusPill
          //   status={all?.status}
          //   color={all?.status === "ACTIVE" ? "active" : "high"}
          // />
          <></>
        ),
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton onClick={() => toggleRejectDialog}>
              <Info fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData || [],
      count: data?.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    currentData,
  ]);

  return (
    <PageBoxComponent>
      <div className={styles.listAction}>
        <div className={styles.employeTitle}>Associated Employees (2)</div>
        <div>
          <ButtonBase
            // onClick={handleToggleSidePannel}
            className={"createBtn"}
          >
            ADD EMPLOYEE<Add fontSize={"small"} className={"plusIcon"}></Add>
          </ButtonBase>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
      <DeletePopup
        handleDialog={toggleRejectDialog}
        isOpen={isRejectPopUp}
        empId={id}
      />
    </PageBoxComponent>
  );
};

export default AssociatedEmployees;
