import React, { useCallback, useMemo } from "react";

import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";

import history from "../../../libs/history.utils";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import useAssociatedEmployeeHook from "./AssociatedEmployeeHook";
import { Add, Delete, DeleteOutline, Info } from "@material-ui/icons";
import { ButtonBase, IconButton } from "@material-ui/core";
import DeletePopup from "./Component/DeleteModal";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import AddEmployeeTable from "./Component/AddEmployeeTable/AddEmployeeTable.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter";

const AssociatedEmployees = ({ listData, id , associatedEmployeesCount}) => {
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
    isSidePanel,
    handleSideToggle,
    editId
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
      {
        key: "employee_name",
        label: "EMPLOYEE NAME",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.image}>
            <img
              src={all?.image}
              className={styles.imageContainer}
              crossOrigin="anonymous"
              alt="..."
            />

            <div ><b>{capitalizeFirstLetter(all?.name_en)} </b> <br/> {all?.emp_code}</div>
          </div>
        ),
      },
     
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.locationName}>
             {all?.location?.name || "N/A"}
          </div>
        ),
        //  candidate?.applied_date
      },

      {
        key: "role",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        render: (temp, all) => (
         
         <div>
        
          {all?.department?.name || "N/A"} / {all?.role?.name || "N/A"}
         </div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => (
          <StatusPill
            status={all?.status}
            color={all?.status}
          />
        
        ),
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton  className={"tableActionBtn"}
              color="secondary" onClick={() => toggleRejectDialog(all)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling, toggleRejectDialog]);

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
  const renderTitle = useMemo(() => {
    return (
      <div>
        <div className={styles.titleTime}>Add Employee</div>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);
  return (
    <PageBoxComponent>
      <div className={styles.listAction}>
        <div className={styles.employeTitle}>Associated Employees ({associatedEmployeesCount})</div>
        <div>
          <ButtonBase onClick={handleSideToggle} className={"createBtn"}>
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
        shiftId={editId}
        empId={id}
      />
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={renderTitle}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <AddEmployeeTable isOpen={isSidePanel} handleClose={handleSideToggle} />
      </SidePanelComponent>
    </PageBoxComponent>
  );
};

export default AssociatedEmployees;
