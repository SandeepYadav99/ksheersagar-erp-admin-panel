import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, InfoOutlined, PrintOutlined, OpenInNew } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
// import FilterComponent from "../../components/Filter/Filter.component";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useAuthenticate from "../../../hooks/AuthenticateHook";
import useSubCategoryList from "./SubCategoryListHook";
import StatusPill from "../../../components/Status/StatusPill.component";
import SubcategoryCreateView from "../SubcategoryCreate/SubcategoryCreate.view";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const SubCategoryList = ({ }) => {
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
    handleProduct,
    categoryName,
    capitalizeFirstLetter
  } = useSubCategoryList({});


  const { isCorporateHR } = useAuthenticate();
  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    subcategory_id
  } = useSelector((state) => state.subcategory);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Name",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "productsCount",
        label: "Products",
        sortable: false,
        render: (temp, all) => <div>{all?.productsCount}</div>,
      },

      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "_id",
        label: "Action",
        render: (temp, all) => (

          <div>
            <IconButton onClick={() => { handleEdit(all) }} className={'tableActionBtn'} color='secondary' disabled={isCalling}><Edit fontSize={'small'} /></IconButton>
            <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling} onClick={() => { handleProduct(all) }}>
              <OpenInNew fontSize={'small'} className={styles.openIcon} /> <span className={styles.subText}>Products</span>
            </IconButton >
            {/* <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              // onClick={() => {
              //   handleViewDetails(all);
              // }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton> */}
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
        {/* <div className={styles.outerFlex}> */}
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={styles.title}>{capitalizeFirstLetter(categoryName)} SubCategory List</span>

          </ButtonBase>
          <div className={styles.newLines} />

        </div>
        {/* <div className={styles.newLines} /> */}

      {/* </div> */}
          {/* <div>
            <ButtonBase onClick={() => history.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span className={styles.title}>{capitalizeFirstLetter(categoryName)} SubCategory List</span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div> */}

          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              ADD SUBCATEGORY{" "}
              <Add fontSize={"small"} className={"plusIcon"}></Add>
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
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={subcategory_id === 0 ? "Create Subcategory" : "Update Subcategory"}
          open={isSidePanel}
          side={"right"}
        >
          <SubcategoryCreateView handleToggleSidePannel={handleToggleSidePannel} isSidePanel={isSidePanel} />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default SubCategoryList;
