import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";
import useAuthenticate from "../../../hooks/AuthenticateHook";
import useMachinesHook from "./MachinesHook";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import MachinesCreate from "../Create/MachinesCreate";

const Machines = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    id,
    handleToggleSidePannel,
  } = useMachinesHook({});

  const { isCorporateHR } = useAuthenticate();
  const {
     data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.PaytmMachines);
console.log(data)
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

  const renderTile = () => {
    return (
      <div>
        <div>
          <span className={styles.title}>{id ? "Update" :"Add"} Machine</span>
          <div className={styles.newLine} />
        </div>
      </div>
    );
  };
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "MACHINE NAME",
        sortable: false,
        render: (value, all) => <div>{all?.name || "N/A"}</div>,
      },
      {
        key: "td_id",
        label: "TD ID",
        sortable: false,
        render: (temp, all) => (
          <div style={{ width: "15rem" }}>{all?.t_id}</div>
        ),
      },
      {
        key: "serial_number",
        label: "SERIAL NUMBER",
        sortable: false,
        render: (temp, all) => 
          <div >
          {all?.serial_no || "N/A"
          }
          </div>
        ,
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
                 handleViewDetails(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
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
            <span className={styles.title}>Machine List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              ADD MACHINE <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
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
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={renderTile()}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <MachinesCreate isSidePanel={isSidePanel} handleToggleSidePannel={handleToggleSidePannel} machineId={id}/>
      </SidePanelComponent>
    </div>
  );
};

export default Machines;
