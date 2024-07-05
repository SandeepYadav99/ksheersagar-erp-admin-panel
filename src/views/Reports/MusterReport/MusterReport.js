import React, { useCallback, useMemo } from "react";
import {
  IconButton,
  ButtonBase,
  TablePagination,
  TableCell,
  Tooltip,
} from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import useMusterReportHook from "./MusterReportHook";
import MusterReportFiled from "./component/MusterReportFiled";

const MusterReport = ({}) => {
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
    currentData,
  } = useMusterReportHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.PaytmMachines);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
  const TableHead = ({ columns }) => {
    return (
      <thead>
        <tr>
          {columns?.map(
            ({ key, parameters, label, fixed, text, is_static }) => (
              <>
                <th
                  rowSpan={is_static ? 2 : 1}
                  colSpan={parameters ? parameters.length : 1}
                  key={key}
                  style={{
                    position: "sticky",
                    left: fixed ? 0 : undefined,
                    top: 0,
                    zIndex: fixed ? 100 : 9,
                  }}
                  className={styles.thead}
                >
                  <div className={styles.tipWrap}>
                    {label?.replace(/_/g, " ")}
                    {text && (
                      <Tooltip title={text} enterDelay={2} leaveDelay={2000}>
                        <IconButton size="small">
                          <InfoOutlined color="secondary" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </th>
              </>
            )
          )}
        </tr>
      </thead>
    );
  };

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name || "N/A"}</span>{" "}
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
        fixed: true,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "department_role",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        render: (temp, all) => <div>{all?.t_id}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "employee_status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "total_salary",
        label: "TOTAL SALARY",
        sortable: false,
        render: (temp, all) => <div>{all?.t_id}</div>,
      },
      {
        key: "gross_salary",
        label: "GROSS SALARY",
        sortable: false,
        render: (temp, all) => <div>{all?.t_id}</div>,
      },
      {
        key: "total_working_days",
        label: "TOTAL WORKING DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.t_id}</div>,
      },
      {
        key: "present_days",
        label: "PRESENT DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },

      {
        key: "absent_days",
        label: "ABSENT DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "01_06",
        label: "01/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "02_06",
        label: "02/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "03_06",
        label: "03/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "04_06",
        label: "04/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "05_06",
        label: "05/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "06_06",
        label: "06/06",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "07_06",
        label: "07/06",
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
            <span className={styles.title}>Muster Report</span>
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
          <MusterReportFiled />
          <div>
            <div style={{ width: "100%" }}>
              <div className={styles.tableWrapper}>
                <div className={styles.container}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      cellSpacing: "0",
                      borderSpacing: "0",
                      cellpadding: "0",
                      height: "50vh",
                    }}
                  >
                    <TableHead columns={tableStructure} />
                    <tbody>
                      {currentData.map((row, rowIndex) => (
                        <tr key={row.id}>
                          {tableStructure.map(
                            (
                              { key, fixed, readOnly, render, ...props },
                              index
                            ) => (
                              <TableCell
                                row={row}
                                key={key}
                                fixed={fixed}
                                render={render}
                                index={index}
                                {...props}
                              />
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                // count={data?.length}
                count={1}
                rowsPerPage={50}
                // page={currentPage - 1}
                page={0}
                onChangePage={(event, newPage) => {
                  handlePageChange(newPage);
                }}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default MusterReport;
