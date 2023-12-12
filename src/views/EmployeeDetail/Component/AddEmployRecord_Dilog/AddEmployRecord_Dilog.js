import React, { useEffect, useMemo } from "react";
import { ButtonBase, Dialog, Slide, makeStyles } from "@material-ui/core";
import DataTables from "../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import defaultImage from "../../../../assets/img/ic_user_pic.png";
import Constants from "../../../../config/constants";
import { useState } from "react";
import { serviceGetEmployLogs } from "../../../../services/Employee.service";
import { Close } from "@material-ui/icons";

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
  container: {
    overflow: "auto",
  },
}));

const AddEmployRecord_Dilog = ({
  isOpen,
  handleToggle,
  formValue,
  id,
  date,
  handleClose,
}) => {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (!date || !id) return;
    serviceGetEmployLogs({ employee_id: id, date: date }).then((res) => {
      setDetails(res?.data);
    });
  }, [date]);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "punch date",
        label: "PUNCH DATE",
        sortable: false,
        render: (value, all) => <div>{all?.punchDate}</div>,
      },
      {
        key: "punch time",
        label: "PUNCH TIME",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{all?.punchTime}</div>,
      },
      {
        key: "punch type",
        label: "PUNCH TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.punch_type}</div>,
      },

      {
        key: "attendanc type",
        label: "ATTENDANCE TYPE",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => <div>{all?.type}</div>,
      },

      {
        key: "user pic",
        label: "USER PIC",
        sortable: false,
        render: (temp, all) => (
          <>
            {all?.employee?.image ? (
              <img
                src={all?.employee?.image}
                style={{ width: "50px", height: "50px", borderRadius: "50px" }}
              />
            ) : (
              <img
                src={defaultImage}
                style={{ width: "50px", height: "50px", borderRadius: "50px" }}
              />
            )}
            ,
          </>
        ),
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const datatableFunctions = {};
   
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: details,
      count: details.length,
    };

    return { datatableFunctions, datatable };
  }, [details, tableStructure]);

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"md"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <div className={styles.headerContainer}>
            <div className={styles.btnWrapperGap}>
              <div className={styles.resetWrapper}>
                <ButtonBase
                  classes={{ root: classes.closeBtn }}
                  onClick={() => {
                    handleClose();
                  }}
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
        
     
     
        <div className={styles.upperWrap}>
          {details.length === 0 ? (
          
            <p className={styles.loader}>Not Found Attendance Record</p>
          ) : (
           
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          )}
        </div>
      </>
            
           
          
      </Dialog>
    </div>
  );
};

export default AddEmployRecord_Dilog;
