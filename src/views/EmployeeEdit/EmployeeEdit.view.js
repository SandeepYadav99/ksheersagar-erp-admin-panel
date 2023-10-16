import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../components/FileComponent/FileComponent.component";
import constants from "../../config/constants";
import EmployeeEditHook from "./EmployeeEdit.hook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const EmployeeEdit = ({ location }) => {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    filteredDepartments,
    filteredSubDepartments,
    filteredEmployees,
    defaultImg,
    frontImg,
    backImg,
    isSubmitting,
  } = EmployeeEditHook({ location });

  const image = useMemo(() => {
    return (
      <File
        default_image={defaultImg ? defaultImg : ""}
        // imageClass={styles.inputFileUploader}
        max_size={5 * 1024 * 1024}
        type={["png", "jpeg", "jpg"]}
        fullWidth={true}
        name="document"
        accept={"image/*"}
        label="Please Upload Image"
        show_image={true}
        error={errorData?.image}
        value={form?.image}
        onChange={(file) => {
          if (file) {
            changeTextData(file, "image");
          }
        }}
      />
    );
  }, [form?.image, changeTextData]);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> Employee Update</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Personal Information</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>
        <div className={styles.imageContainer}>
          {image}
          <div className={styles.nameWrapper}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name_en}
                  errorText={errorData?.name_en}
                  label={"Employee Name (English)*"}
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
                  label={"Employee Name (Hindi)*"}
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
                  isError={errorData?.father_name}
                  errorText={errorData?.father_name}
                  label={"Father's Name*"}
                  value={form?.father_name}
                  onTextChange={(text) => {
                    changeTextData(text, "father_name");
                  }}
                  onBlur={() => {
                    onBlurHandler("father_name");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.emp_code}
              errorText={errorData?.emp_code}
              label={"Employee ID*"}
              value={form?.emp_code}
              onTextChange={(text) => {
                changeTextData(text, "emp_code");
              }}
              onBlur={() => {
                onBlurHandler("emp_code");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"DOJ"}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "doj");
              }}
              value={form?.doj}
              isError={errorData?.doj}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.age}
              errorText={errorData?.age}
              label={"Age"}
              value={form?.age}
              onTextChange={(text) => {
                changeTextData(text, "age");
              }}
              onBlur={() => {
                onBlurHandler("age");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.gender}
              errorText={errorData?.gender}
              label={"Gender"}
              value={form?.gender}
              handleChange={(value) => {
                changeTextData(value, "gender");
              }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Phone Number"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
              onBlur={() => {
                onBlurHandler("contact");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.email}
              errorText={errorData?.email}
              label={"Email Id"}
              value={form?.email}
              onTextChange={(text) => {
                changeTextData(text, "email");
              }}
              onBlur={() => {
                onBlurHandler("email");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.permanent_address}
              errorText={errorData?.permanent_address}
              label={"Permanent Address"}
              value={form?.permanent_address}
              onTextChange={(text) => {
                changeTextData(text, "permanent_address");
              }}
              onBlur={() => {
                onBlurHandler("permanent_address");
              }}
            />
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"isSame"}
                value={"isSame"}
                onClick={() => {
                  changeTextData(!form?.is_address_same, "is_address_same");
                }}
                id="vehicle1"
                checked={form?.is_address_same}
              />{" "}
              <label htmlFor="vehicle1"> Same Correspondence Address</label>
              <br />
            </div>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.current_address}
              errorText={errorData?.current_address}
              label={"Correspondence Address"}
              value={form?.current_address}
              onTextChange={(text) => {
                changeTextData(text, "current_address");
              }}
              onBlur={() => {
                onBlurHandler("current_address");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.aadhar_no}
              errorText={errorData?.aadhar_no}
              label={"Aadhar Number"}
              value={form?.aadhar_no}
              onTextChange={(text) => {
                changeTextData(text, "aadhar_no");
              }}
              onBlur={() => {
                onBlurHandler("aadhar_no");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.location_id}
              errorText={errorData?.location_id}
              label={"Location*"}
              value={form?.location_id}
              handleChange={(value) => {
                changeTextData(value, "location_id");
              }}
            >
              {listData?.LOCATIONS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Department*"}
              value={form?.department_id}
              handleChange={(value) => {
                changeTextData(value, "department_id");
              }}
            >
              {filteredDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.role_id}
              errorText={errorData?.role_id}
              label={"Role"}
              value={form?.role_id}
              handleChange={(value) => {
                changeTextData(value, "role_id");
              }}
            >
              {/* <MenuItem value="OWNER">OWNER</MenuItem>
              <MenuItem value="SHOWROOM_MANAGER">SHOWROOM MANAGER</MenuItem>
              <MenuItem value="OTHERS">OTHERS</MenuItem> */}
              {listData?.ROLES?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.pin}
              errorText={errorData?.pin}
              label={"Pin*"}
              value={form?.pin}
              onTextChange={(text) => {
                changeTextData(text, "pin");
              }}
              onBlur={() => {
                onBlurHandler("pin");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.status}
              errorText={errorData?.status}
              label={"Status*"}
              value={form?.status}
              handleChange={(value) => {
                changeTextData(value, "status");
              }}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
              <MenuItem value="TERMINATED">TERMINATED</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={styles.adharBack}>
            <div className={styles.adharWrap}>
              <File
                default_image={frontImg ? frontImg : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                bannerLabel="Upload Aadhar Front"
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Please Upload Image"
                show_image={true}
                error={errorData?.aadhaar_front}
                value={form?.aadhaar_front}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "aadhaar_front");
                  }
                }}
              />
              {/* <div>Upload Aadhar Front</div> */}
            </div>
            <div className={styles.adharWrap}>
              <File
                default_image={backImg ? backImg : ""}
                // imageClass={styles.inputFileUploader}
                bannerLabel="Upload Aadhar Back"
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Aadhar Back"
                show_image={true}
                error={errorData?.aadhaar_back}
                value={form?.aadhaar_back}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "aadhaar_back");
                  }
                }}
              />
              {/* <div>Upload Aadhar Back</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.btnCont}>
        <div className={"headerFlex wrapper"}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Update"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
