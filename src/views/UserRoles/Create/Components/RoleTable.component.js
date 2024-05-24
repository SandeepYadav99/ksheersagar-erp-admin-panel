import React, { useCallback } from "react";
import {
  withStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Style.module.css";

const RoleTableComponent = ({
  classes,
  data,
  permissions,
  changeTextData,
  permisionChangeHandler,
}) => {
  const handleCheckboxChange = useCallback((event, permissionType, index) => {

    permisionChangeHandler(index, { [permissionType]: event });

  },[permisionChangeHandler, permissions]);

  const renderHeader = () => {
    return (
      <TableRow>
        <TableCell classes={{ root: classes.tableCell }}></TableCell>
        <TableCell classes={{ root: classes.tableCell }}>
          All Location
        </TableCell>
        <TableCell classes={{ root: classes.tableCell }}>All Records</TableCell>
        <TableCell classes={{ root: classes.tableCell }}>Read</TableCell>
        <TableCell classes={{ root: classes.tableCell }}>Write</TableCell>
        <TableCell classes={{ root: classes.tableCell }}>Update</TableCell>
        <TableCell classes={{ root: classes.tableCell }}>Delete</TableCell>
      </TableRow>
    );
  };
  const renderRows = () => {
    return (
      <>
        {permissions?.map((permission, index) => {
          return (
            <TableRow key={index}>
              <TableCell classes={{ root: classes.tableCell }}>
                {permission?.name}
              </TableCell>

              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    checked={permission?.all_location_access}
                    onChange={(event) =>
                      handleCheckboxChange(
                        !permission?.all_location_access,
                        `all_location_access`,
                        index
                      )
                    }
                  />
                </div>
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    checked={permission?.limited_access}
                    onChange={(event) =>
                    
                      handleCheckboxChange(!permission?.limited_access, `limited_access`, index)
                    }
                  />
                </div>
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    checked={permission?.read}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.read, `read`, index)
                    }
                  />
                </div>
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    checked={permission?.create}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.create, `create`, index)
                    }
                  />
                </div>
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    checked={permission?.update}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.update, `update`, index)
                    }
                  />
                </div>
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }}>
                <div className={styles.crud}>
                  <Checkbox
                    color={"primary"}
                    value={permission?.delete}
                    checked={permission?.delete}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.delete, `delete`, index)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  };

  return (
    <Paper>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {renderHeader()}
          {renderRows(data)}
        </TableBody>
      </Table>
    </Paper>
  );
};

const useStyle = (theme) => ({
  tableCell: {
    color: "black",
    fontSize: "0.90rem",
    textTransform: "capitalize",
  },
  singleCell: {
    textAlign: "center",
  },
});

export default withStyles(useStyle, { withTheme: true })(RoleTableComponent);
