import React, { useCallback, useMemo } from "react";
import {  ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";

import StatusPill from "../../../components/Status/StatusPill.component";


import useShiftWiseReportHook from "./ShiftWiseReportHook";
import ShiftWiseFiled from "./component/ShiftWiseFiled";



const ShiftWiseReport = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isSidePanel,
    isCalling,
    configFilter,
    id,
    handleToggleSidePannel,
  } = useShiftWiseReportHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.PaytmMachines);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name || "N/A"}</span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderTile = useCallback(() => {
    return (
      <div>
        <span className={styles.title}>{id ? "Update" : "Add"} Machine</span>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: false,
        
        render: (value, all) => <div>{all?.name}</div>,
      },
    
      {
        key: "department_role",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "shift_name",
        label: "SHIFT NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "from",
        label: "FROM",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "to",
        label: "TO",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      
      
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData?.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Shift Wise Report</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtnOutland"}
            >
             DOWNLOAD
            </ButtonBase>
          </div>
        </div>

        <div>
         <ShiftWiseFiled/>
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
      {/* <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={renderTile()}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <MachinesCreate
          isSidePanel={isSidePanel}
          handleToggleSidePannel={handleToggleSidePannel}
          machineId={id}
        />
      </SidePanelComponent> */}
    </div>
  );
};

export default ShiftWiseReport;
