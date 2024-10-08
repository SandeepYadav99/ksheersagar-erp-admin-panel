import React, {  useCallback,  useMemo } from "react";
import { IconButton,  ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import {  useSelector } from "react-redux";
import { Add, InfoOutlined, } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";
import useAuthenticate from "../../../hooks/AuthenticateHook";
import useUserRoleListHook from "./UserRoleListHook";


const UserRoleList = ({}) => {
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
    warehouses,
    handleToggleSidePannel,
  } = useUserRoleListHook({});

  const { isCorporateHR } = useAuthenticate();
  const {
    present:data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    
  } = useSelector((state) => state?.userRoles);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name || "N/A"}</span> <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "role",
        label: "Role",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "description",
        label: "Description",
        sortable: false,
        render: (temp, all) => <div style={{width:"15rem"}}>{all?.description || "N/A"}</div>,
      },
      {
        key: "users",
        label: "Users",
        sortable: false,
        render: (temp, all) =>     <div style={{width:"20rem"}}>
        {all?.users?.length > 0 ? (
          all?.users?.map((user, index) => (
            <span key={user.id}>
              {user.name}
              {index < all.users.length - 1 && ", "}
            </span>
          ))
        ) : (
          "N/A"
        )}
      </div>
      },
    
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
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
             
              <InfoOutlined fontSize={"small"} />
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
            <span className={styles.title}>Roles list</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase onClick={handleToggleSidePannel} className={"createBtn"}>
              CREATE <Add fontSize={"small"} className={"plusIcon"}></Add>
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
    </div>
  );
};

export default UserRoleList;
