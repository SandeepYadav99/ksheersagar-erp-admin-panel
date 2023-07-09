import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import Constants from "../../../config/constants";
import useLocationDetail from "./LocationCreateHook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import Geofencing from "./component/Geofencing/Geofencing.component";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const LocationCreateView = ({}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    listData,
    isEdit,
    id,
    handleCoordinate,
  } = useLocationDetail({});
  const geofence = [];

  return (
    <div className={styles.locationWeap}>
      <div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name_en}
              errorText={errorData?.name_en}
              label={"Location Name (English)*"}
              value={form?.name_en}
              onTextChange={(text) => {
                changeTextData(text, "name_en");
              }}
              onBlur={() => {
                onBlurHandler("name_en");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name_hi}
              errorText={errorData?.name_hi}
              label={"Location Name (Hindi)*"}
              value={form?.name_hi}
              onTextChange={(text) => {
                changeTextData(text, "name_hi");
              }}
              onBlur={() => {
                onBlurHandler("name_hi");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.city}
              errorText={errorData?.city}
              label={"Location City*"}
              value={form?.city}
              onTextChange={(text) => {
                changeTextData(text, "city");
              }}
              onBlur={() => {
                onBlurHandler("city");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.code}
              errorText={errorData?.code}
              label={"Location Code*"}
              value={form?.code}
              onTextChange={(text) => {
                changeTextData(text, "code");
              }}
              onBlur={() => {
                onBlurHandler("code");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option.label,
              }}
              dataset={listData?.EMPLOYEES}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "head_id");
              }}
              variant={"outlined"}
              label={"Location Manager"}
              name={"head_id"}
              isError={errorData?.head_id}
              value={form?.head_id}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Location Type*"}
              value={form?.type}
              handleChange={(value) => {
                changeTextData(value, "type");
              }}
            >
              <MenuItem value="FACTORY">FACTORY</MenuItem>
              <MenuItem value="WAREHOUSE">WAREHOUSE</MenuItem>
              <MenuItem value="SHOWROOM">SHOWROOM</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"} style={{ width: "50%" }}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Phone Number*"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
              onBlur={() => {
                onBlurHandler("contact");
              }}
            />
          </div>
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.address}
            errorText={errorData?.address}
            label={"Location Address*"}
            value={form?.address}
            onTextChange={(text) => {
              changeTextData(text, "address");
            }}
            onBlur={() => {
              onBlurHandler("address");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className="formGroup">
          <Geofencing polygon={geofence} handleSave={handleCoordinate} />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.google_page_url}
            errorText={errorData?.google_page_url}
            label={"Google Page URL"}
            value={form?.google_page_url}
            onTextChange={(text) => {
              changeTextData(text, "google_page_url");
            }}
            onBlur={() => {
              onBlurHandler("google_page_url");
            }}
          />
        </div>
      </div>
      <div className={styles.inputWrap}>
        <input
          checked={form?.is_department_attendance}
          type="checkbox"
          id="is_department_attendance"
          name="is_department_attendance"
          onChange={() => {
            changeTextData(
              !form?.is_department_attendance,
              "is_department_attendance"
            );
          }}
        />
        <label htmlFor="is_department_attendance">
          Department wise attendance is required
        </label>
      </div>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Status</div>
          <CustomSwitch
            value={form?.is_active}
            handleChange={() => {
              changeTextData(!form?.is_active, "is_active");
            }}
            label={`Active`}
          />
        </h4>
      </div>

      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {id ? "Update" : "Create"}
        </ButtonBase>
      </div>
    </div>
    // </div>
  );
};

export default LocationCreateView;
