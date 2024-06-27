import React from "react";
import styles from "./Style.module.css"; // Import your CSS styles
import PageBoxComponent from "../PageBox/PageBox.component";
import CustomDateTimePicker from "../FormFields/DatePicker/CustomDateTimePicker";
import CustomCheckbox from "../FormFields/CustomCheckbox";

import { Chip, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CustomSelect from "../FormFields/SelectField/CustomSelect";
import { Info, InfoOutlined } from "@material-ui/icons";

const SessionTable = ({ data, form, listData, errorData }) => {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableContainerBox}>
              <th className={styles.th}>DAY</th>
              <th className={styles.th}>START TIME</th>
              <th className={styles.th}>END TIME</th>
              <th className={styles.th}>TOTAL HOURS</th>
              <th className={styles.th}>WEEK OFF</th>
            </tr>
          </thead>
          <tbody>
            {/* {data?.user?.length > 0 ? (
                data?.user?.map((item, index) => (
                  <tr key={index}>
                    <td className={styles.td}>
                      <div className={styles.td1}>
                        <img src={item?.user.image} alt={item.name} />
                        <a href={`${"/app/user-profile/"}${item?.user?.id}`}>
                          {item?.user.name}
                        </a>
                      </div>
                    </td>
                    <td className={styles.td}>{item.rating || 0}</td>
                    <td className={styles.td}>{item.comment || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <div className={styles.notFound}></div>
              )} */}
            <tr className={styles.trdata}>
              <td className={styles.td}>Sunday</td>
              <td className={styles.td}>
                <div style={{marginBottom:"20px "}}>
                  <CustomDateTimePicker
                    label={"Choose Time"}
                    style={{ width: "40%" }}
                  />
                  <CustomCheckbox
                    label={
                      <span style={{ fontSize: "14px" }}>
                        Do you want Occasional Working On Sunday?{" "}
                        <InfoOutlined fontSize="small" />
                      </span>
                    }
                  />
                  <Autocomplete
                    multiple
                    size="small"
                    id="tags-outlined"
                    onChange={(e, value) => {
                      // changeTextData(value, "applicable_for");
                    }}
                    value={[]}
                    options={[]}
                    getOptionLabel={(option) => option?.name}
                    defaultValue={[]}
                    getOptionSelected={(option, value) =>
                      option?.id === value?.id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={""}
                        error={""}
                      />
                    )}
                  />
                </div>
              </td>
              <td className={styles.td} style={{ width: "30%" }}>
                <CustomDateTimePicker label={"Choose Time"} />
              </td>
              <td className={styles.td}>0</td>
              <td className={styles.td}>
                <CustomCheckbox label={""} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionTable;
