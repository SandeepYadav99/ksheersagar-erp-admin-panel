import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
  Dialog,
  Slide,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Close, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import DataTables from "../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import PageBox from "../../../../components/PageBox/PageBox.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useAddUserDialogHook from "./AddEmployRecord_hook";
import StatusPill from "../../../../components/Status/StatusPill.component";
import Constants from "../../../../config/constants";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const AddEmployRecord_Dilog = ({ isOpen, handleToggle, formValue }) => {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
    handleAddCandidate,
    createDD,
    handleCreate,
  } = useAddUserDialogHook({});

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
              <img
                src={obj?.image}
                style={{ borderRadius: "50%" }}
                height={"100px"}
                width={"100px"}
              />
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
        {obj?.contact && (
          <div>
            <strong>{obj?.contact} </strong>
          </div>
        )}
        {obj?.email && <div>{obj?.email}</div>}
      </div>
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "punch date",
        label: "PUNCH DATE",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "punch time",
        label: "PUNCH TIME",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{renderContact(all)}</div>,
      },
      {
        key: "punch type",
        label: "PUNCH TYPE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.gender} <br /> {all?.age && `${all?.age} years`}
          </div>
        ),
      },

      {
        key: "attendanc type",
        label: "ATTENDANCE TYPE",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.department?.name}/{all?.sub_department?.name}
          </div>
        ),
      },

      {
        key: "user pic",
        label: "USER PIC",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
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
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PageBox>
          <div className={styles.headerContainer}>
            <div className={styles.btnWrapperGap}>
              <div className={styles.resetWrapper}>
                <ButtonBase
                  classes={{ root: classes.closeBtn }}
                  onClick={()=>{handleToggle(); window.location.reload()}}
                >
                  <Close />
                </ButtonBase>
              </div>
              <div className={styles.headingWrapper}>
                <div className={styles.heading}>Attendance Detail</div>
                <div className={styles.newLine}></div>
              </div>
            </div>
          </div>

          <div>
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
      </Dialog>
    </div>
  );
};

export default AddEmployRecord_Dilog;
