import React, {  useCallback,  useMemo } from "react";
import { IconButton,  ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import {  useSelector } from "react-redux";
import {
  Add,

  InfoOutlined,

} from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useEmployeeList from "./EmployeeListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from "./Employee.view";
import defaultImage from "../../assets/img/ic_user_pic.png";
import Download from "../../assets/img/ic_download_report@2x.png";
import ResetPassword from "../../assets/img/ic_reset_password@2x.png";
import DownloadDialog from "./Component/Download";
import ResetPasswordPopup from "../EmployeeEdit/Component/ResetPasswordPopup";

const EmployeeList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    handleViewUpdate,
    editData,
    isSidePanel,
    isCalling,
    configFilter,
 
    createDD,
    handleCreate,
    isRejectPopUp,
    toggleRejectDialog,
    id,

    isApprovalPopUp,
    toggleApprovalDialog,
  } = useEmployeeList({});

  const {
    data,
    all: allData,
    currentPage,
    total,
    is_fetching: isFetching,
  } = useSelector((state) => state.employee);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <div>
              {obj?.image ? (
                <img
                  src={obj?.image}
                  style={{ borderRadius: "50%" }}
                  height={"100px"}
                  width={"100px"}
                />
              ) : (
                <img
                  src={defaultImage}
                  style={{ borderRadius: "50%" }}
                  height={"100px"}
                  width={"100px"}
                />
              )}
            </div>
            <div>
              <span className={styles.productName}>{obj?.name_en}</span>
              <br />
              <span>{obj?.emp_code}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderContact = useCallback((obj) => {
    return (
      <div>
        {obj?.contact ? (
          <div>
            <strong>{obj?.contact} </strong>
          </div>
        ) : (
          "N/A"
        )}
        {obj?.email ? <div>{obj?.email}</div> : ""}
      </div>
    );
  }, []);

  const renderCreateForm = useMemo(() => {
    return (
      <CreateView
        handleDataSave={handleDataSave}
        data={editData}
        handleDelete={handleDelete}
      />
    );
  }, [handleDataSave, editData, handleDelete]);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE INFO",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{renderContact(all)}</div>,
      },
      {
        key: "gender",
        label: "GENDER/AGE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.gender} <br /> {all?.age && `${all?.age} years`}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>{all?.location.name}</div>
        ),
      },

      {
        key: "dept",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.department?.name || "N/A"}
            {all?.role?.name && `/${all?.role?.name}`}
          </div>
        ),
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
        style: { width: "15%" },
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
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleRejectDialog(all);
              }}
            >
              <img src={ResetPassword} alt="" width={20} />
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
      count: allData.length,
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
            <span className={styles.title}>
              Total Employee Records: {total}
            </span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrapperGap}>
            <>
              <ButtonBase
                aria-owns={createDD ? "createDD" : undefined}
                aria-haspopup="true"
                onClick={toggleApprovalDialog}
                className={"createBtnOutland"}
              >
                DOWNLOAD REPORT
                <img
                  src={Download}
                  alt=""
                  height={20}
                  className={styles.downloadImg}
                />
                {/* <GetApp fontSize={"small"} className={"plusIcon"}></GetApp> */}
              </ButtonBase>
            </>
            <div>
              <ButtonBase
                aria-owns={createDD ? "createDD" : undefined}
                aria-haspopup="true"
                onClick={handleCreate}
                className={"createBtn"}
              >
                ADD EMPLOYEE
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          </div>
        </div>
        <DownloadDialog
          isOpen={isApprovalPopUp}
          handleToggle={toggleApprovalDialog}
          empId={id}
          data={allData}
        />
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
        handleToggle={handleSideToggle}
        title={"New Employee"}
        open={isSidePanel}
        side={"right"}
      >
        {renderCreateForm}
      </SidePanelComponent>
      <ResetPasswordPopup
        handleDialog={toggleRejectDialog}
        isOpen={isRejectPopUp}
        empId={id}
      />
    </div>
  );
};

export default EmployeeList;
