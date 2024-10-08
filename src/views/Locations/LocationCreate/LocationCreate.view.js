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
import DialogIncComponent from "./component/confirmDialogInc";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const LocationCreateView = ({ isSidePanel, setSidePanel }) => {
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
    isDialog,
    toggleConfirmDialog,
    handleMapAddress,
    handleCityCountry,
    lat,
    lng,
    geofence,
    handleToggleSidePannel,
    geoLocation,
    setGeoFence,
  } = useLocationDetail({ isSidePanel, setSidePanel });
  // const geofence = [];
  console.log(geofence, "GEOFENCE");

  return (
    <div className={styles.locationWeap}>
      {isDialog && (
        <DialogIncComponent
          lat={lat}
          lng={lng}
          isOpen={isDialog}
          handleClose={toggleConfirmDialog}
          handleMapAddress={handleMapAddress}
          handleCityCountry={handleCityCountry}
          handleDialogToggle={toggleConfirmDialog}
        />
      )}
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
              // onBlur={() => {
              //   onBlurHandler("name_en");
              // }}
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
              // onBlur={() => {
              //   onBlurHandler("name_hi");
              // }}
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
              // onBlur={() => {
              //   onBlurHandler("code");
              // }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.head_id}
              errorText={errorData?.head_id}
              label={"Location Manager"}
              value={form?.head_id}
              handleChange={(value) => {
                changeTextData(value, "head_id");
              }}
            >
              {listData?.EMPLOYEES?.map((item, index) => (
                <MenuItem value={item?.id} key={`emp_${index}`}>
                  {`${item?.name} - (${item?.code})`}
                </MenuItem>
              ))}
            </CustomSelectField>
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
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Mobile Number"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
              onBlur={() => {
                onBlurHandler("contact");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.landline_number}
              errorText={errorData?.landline_number}
              label={"Landline Number"}
              value={form?.landline_number}
              onTextChange={(text) => {
                changeTextData(text, "landline_number");
              }}
              type={"number"}
              onBlur={() => {
                onBlurHandler("landline_number");
              }}
            />
          </div>
        </div>
      </div>
      <div className="formFlex">
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.fssai_number}
            errorText={errorData?.fssai_number}
            label={"Fssai id"}
            value={form?.fssai_number}
            onTextChange={(text) => {
              changeTextData(text, "fssai_number");
            }}
            type={"number"}
            onBlur={() => {
              onBlurHandler("fssai_number");
            }}
          />
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
            // onBlur={() => {
            //   onBlurHandler("address");
            // }}
          />
        </div>
        <div className={styles.btnWrapMap}>
          <ButtonBase
            className={styles.edit}
            onClick={() => {
              toggleConfirmDialog();
            }}
          >
            Locate on Map
          </ButtonBase>
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
            // isError={errorData?.google_page_url}
            // errorText={errorData?.google_page_url}
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
            label={form?.is_active ? `Active` : "Inactive"}
          />
        </h4>
      </div>

      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={() => handleSubmit()}
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
