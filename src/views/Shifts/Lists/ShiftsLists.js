import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase, Avatar } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
  AccessTime,
  Add,
  Delete,
  DeleteOutline,
  Edit,
  Info,
  InfoOutlined,
} from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";

import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";

// import StaticQrCreate from "../Create/StaticQrCreate";
import useShiftsListsHook from "./ShiftsListsHook";
import HoursCreate from "../WorkingHoursCreate/HoursCreate";
import CustomRadio from "../../../components/FormFields/CustomRadio";
import WeekSection from "../Componet/WeekSection";
import ShiftsCreate from "../Create/ShiftsCreate";

const ShiftsLists = ({}) => {
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
    isSidePanelHours,
    handleToggleSidePannelHours,
    handleToggleSidePannel,
    handleViewShiftDetail,
  } = useShiftsListsHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.StaticQr);

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

  const renderTileHours = useCallback(() => {
    return (
      <div>
        <span className={styles.title}>Adjust Full Day/Half Day Hours</span>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);

  const renderTile = useCallback(() => {
    return (
      <div>
        <span className={styles.title}>{id ? "Update" : "Add"} Shift</span>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "shift_name",
        label: "SHIFT NAME",
        sortable: false,
        render: (value, all) => <div>{}</div>,
      },
      {
        key: "assigned_employees",
        label: "ASSIGNED EMPLOYEES",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "shift_days",
        label: "SHIFT DAYS",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.avatorFlex}>
            <Avatar className={styles.avator}>Su</Avatar>{" "}
            <Avatar className={styles.avatorSeleted}>Mo</Avatar>
          </div>
        ),
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewShiftDetail(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                // handleViewDetails(all);
              }}
            >
              <DeleteOutline fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    handleViewShiftDetail,
  ]);

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
            <span className={styles.title}>Shifts</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.actionButton}>
            <ButtonBase
              onClick={handleToggleSidePannelHours}
              className={styles.setWorking}
            >
              SET WORKING HOURS{" "}
              <AccessTime
                fontSize={"small"}
                className={"plusIcon"}
              ></AccessTime>
            </ButtonBase>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              ADD SHIFT<Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
     
        <div className={styles.actionTime}>
          <div className={styles.weekSection}>
            <WeekSection />
          </div>
        </div>
        <div >
          {/* <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          /> */}
       
           
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          
        </div>
      </PageBox>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={renderTile()}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <ShiftsCreate
          isSidePanel={isSidePanel}
          handleToggleSidePannel={handleToggleSidePannel}
          qrId={id}
        />
      </SidePanelComponent>
      <SidePanelComponent
        handleToggle={handleToggleSidePannelHours}
        title={renderTileHours()}
        open={isSidePanelHours}
        side={"right"}
        arrowBack={true}
      >
        <HoursCreate
          isSidePanel={isSidePanelHours}
          handleToggleSidePannel={handleToggleSidePannelHours}
          qrId={id}
        />
      </SidePanelComponent>
    </div>
  );
};

export default ShiftsLists;
