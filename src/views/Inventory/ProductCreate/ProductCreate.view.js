import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  InputAdornment,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import File from "../../../components/FileComponent/FileComponent.component";
import ProductCreateHook from "./ProductCreateHook";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import WaitingComponent from "../../../components/Waiting.component";
import DialogComponent from "./Dialog.component";
import classNames from "classnames";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ArrowDropDown, Clear } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const ProductCreate = ({ location }) => {
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
    empFlag,
    id,
    handleDelete,
    addSubcatData,
    data,
    isLoading,
    isDialog,
    toggleConfirmDialog,
    dialogText,
    handleRemoveImage,
    unitSelected,
    subcategoryId,
    setFinishedGood,
    finishedGood,
    mithaiBox,
    setMithaiBox,
  } = ProductCreateHook({ location });

  const image = useMemo(() => {
    console.log("data image", defaultImg);
    return (
      <>
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
      </>
    );
  }, [form?.image, changeTextData]);
  console.log("form", form);
  return (
    <>
      <>
        <div>
          <div className={styles.outerFlex}>
            <div>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />{" "}
                <span>
                  <b>{id ? "Update" : "New"} Product</b>
                </span>
              </ButtonBase>
              <div className={styles.newLines} />
            </div>
          </div>
          <div className={"plainPaper"}>
            <div className={"headerFlex"}>
              <h4 className={"infoTitle"}>
                <div className={"heading"}>Product Details</div>
                {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                {/*    <InfoIcon fontSize={'small'}/>*/}
                {/*</Tooltip>*/}
              </h4>
            </div>
            <div className={styles.imageContainer}>
              <div>
                {image}
                {console.log("image", defaultImg)}

                {console.log("image form", form?.image)}
                {form?.image != "" && defaultImg != "" && (
                  <span
                    onClick={handleRemoveImage}
                    className={styles.removeImageText}
                  >
                    Remove
                  </span>
                )}
              </div>

              <div className={styles.nameWrapper}>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.name_en}
                      errorText={errorData?.name_en}
                      label={"Product Name (English)*"}
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
                      label={"Product Name (Hindi)*"}
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
                      isError={errorData?.code}
                      errorText={
                        errorData?.code &&
                        form?.code != "" &&
                        "Product code already exists"
                      }
                      label={"Product Code"}
                      value={form?.code}
                      onTextChange={(text) => {
                        changeTextData(text, "code");
                      }}
                      onBlur={() => {
                        onBlurHandler("code");
                      }}
                    />
                    {errorData?.code}
                  </div>

                  <div className={"formGroup"}>
                    <CustomSelectField
                      isError={errorData?.type}
                      errorText={errorData?.type}
                      label={"Type"}
                      value={form?.type}
                      handleChange={(value) => {
                        console.log({ value });

                        changeTextData(value, "type");
                      }}
                    >
                      <MenuItem value="RAW_MATERIAL">RAW MATERIAL</MenuItem>
                      <MenuItem value="FINISHED_GOODS">FINISHED GOODS</MenuItem>
                      <MenuItem value="SERVICE">SERVICE</MenuItem>
                      <MenuItem value="CONTAINER">CONTAINER</MenuItem>
                      <MenuItem value="ASSETS">ASSETS</MenuItem>
                      <MenuItem value="MITHAI_BOX"> MITHAI BOX</MenuItem>
                      <MenuItem value="MATERIAL">MATERIAL</MenuItem>
                    </CustomSelectField>
                  </div>
                </div>
              </div>
            </div>
            {finishedGood && (
              <div className={"formFlex"}>
                <div className={"formGroup"}>
                  <div></div>
                </div>
                <div className={"formGroup"}>
                  <CustomTextField
                    isError={errorData?.price}
                    errorText={errorData?.price}
                    label={"Price "}
                    value={form?.price}
                    onTextChange={(text) => {
                      changeTextData(text, "price");
                    }}
                    onBlur={() => {
                      onBlurHandler("price");
                    }}
                  />
                </div>
              </div>
            )}
            {mithaiBox && (
              <>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <div className={styles.flexfile}>
                      <CustomTextField
                        isError={errorData?.deadWeight}
                        errorText={errorData?.deadWeight}
                        label={"Dead weight"}
                        type={"number"}
                        value={form?.deadWeight}
                        onTextChange={(text) => {
                          changeTextData(text, "deadWeight");
                        }}
                        onBlur={() => {
                          onBlurHandler("deadWeight");
                        }}
                      />
                      <div>KG</div>
                    </div>
                  </div>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.selling_price}
                      errorText={errorData?.selling_price}
                      label={"Selling price  "}
                      type={"number"}
                      value={form?.selling_price}
                      onTextChange={(text) => {
                        changeTextData(text, "selling_price");
                      }}
                      onBlur={() => {
                        onBlurHandler("selling_price");
                      }}
                    />
                  </div>
                </div>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <div className={styles.flexfile}>
                      <CustomTextField
                        isError={errorData?.capacity}
                        errorText={errorData?.capacity}
                        label={"Capacity"}
                        type={"number"}
                        value={form?.capacity}
                        onTextChange={(text) => {
                          changeTextData(text, "capacity");
                        }}
                        onBlur={() => {
                          onBlurHandler("capacity");
                        }}
                      />
                      <div>KG</div>
                    </div>
                  </div>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.no_of_lanes}
                      errorText={errorData?.no_of_lanes}
                      label={"No of lanes  "}
                      value={form?.no_of_lanes}
                      onTextChange={(text) => {
                        changeTextData(text, "no_of_lanes");
                      }}
                      onBlur={() => {
                        onBlurHandler("no_of_lanes");
                      }}
                    />
                  </div>
                </div>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <Autocomplete
                      id="tags-outlined"
                      onChange={(e, value) => {
                        changeTextData(value, "applies_to");
                      }}
                      value={form.applies_to || []}
                      options={[]} // listData ||
                      getOptionLabel={(option) => option}
                      defaultValue={form?.applies_to || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={"Applies to"}
                          error={errorData?.applies_to}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {form?.applies_to ? (
                                  <Clear
                                    onClick={() =>
                                      changeTextData(null, "applies_to")
                                    }
                                    style={{ cursor: "pointer" }}
                                  />
                                ) : null}
                                <ArrowDropDown
                                  style={{
                                    marginRight: -20,
                                    cursor: "pointer",
                                  }}
                                />
                              </>
                            ),
                          }}
                        />
                      )}
                      disableClearable
                    />
                  </div>
                </div>
              </>
            )}
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.category_id}
                  errorText={errorData?.category_id}
                  label={"Category"}
                  value={form?.category_id}
                  handleChange={(value) => {
                    changeTextData(value, "category_id");
                    addSubcatData(value);
                  }}
                  // onChange={()=>{
                  //   addSubcatData("category_id")

                  // }}
                >
                  {listData?.CATEGORIES?.map((dT) => {
                    return (
                      <MenuItem value={dT?.id} key={dT?.id}>
                        {dT?.label}
                      </MenuItem>
                    );
                  })}
                </CustomSelectField>
              </div>

              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.sub_category_id}
                  errorText={errorData?.sub_category_id}
                  label={"Subcategory"}
                  value={form?.sub_category_id ?? subcategoryId}
                  handleChange={(value) => {
                    changeTextData(value, "sub_category_id");
                  }}
                >
                  {listData?.SUB_CATEGORIES?.map((dT) => {
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
                  // multiple
                  isError={errorData?.unit_ids}
                  errorText={errorData?.unit_ids}
                  label={"Units"}
                  value={form?.unit_ids ?? unitSelected}
                  handleChange={(value) => {
                    changeTextData(value, "unit_ids");
                  }}
                >
                  {listData?.UNITS?.map((dT) => {
                    return (
                      <MenuItem value={dT?.id} key={dT?.id}>
                        {dT?.label}
                      </MenuItem>
                    );
                  })}
                </CustomSelectField>
              </div>

              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomTextField
                  isError={errorData?.min_qty}
                  errorText={errorData?.min_qty}
                  label={"Min Quantity"}
                  value={form?.min_qty}
                  onTextChange={(text) => {
                    changeTextData(text, "min_qty");
                  }}
                  onBlur={() => {
                    onBlurHandler("min_qty");
                  }}
                />
                {unitSelected}
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                {/* <CustomTextField
                  isError={errorData?.daysExpiration}
                  errorText={errorData?.daysExpiration}
                  label={"Days until expiration"}
                  value={form?.daysExpiration}
                  onTextChange={(text) => {
                    changeTextData(text, "daysExpiration");
                  }}
                  onBlur={() => {
                    onBlurHandler("daysExpiration");
                  }}
                /> */}
                <CustomTextField
                  isError={errorData?.daysExpiration}
                  errorText={errorData?.daysExpiration}
                  label={"Days until expiration"}
                  value={form?.daysExpiration}
                  onTextChange={(text) => {
                    changeTextData(text, "daysExpiration");
                  }}
                  onBlur={() => {
                    onBlurHandler("daysExpiration");
                  }}
                />
                {/* {unitSelected} */}
              </div>

              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomSelectField
                  isError={errorData?.gstSlab}
                  errorText={errorData?.gstSlab}
                  label={"Subcategory"}
                  value={form?.gstSlab ?? subcategoryId}
                  handleChange={(value) => {
                    changeTextData(value, "gstSlab");
                  }}
                >
                  <MenuItem value="5%">5%</MenuItem>
                  <MenuItem value="18%">18%</MenuItem>
                </CustomSelectField>
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomTextField
                  isError={errorData?.max_qty}
                  errorText={
                    errorData?.max_qty &&
                    form?.max_qty != "" &&
                    "Max quantity should be greater than min quantity"
                  }
                  label={"Max Quantity"}
                  value={form?.max_qty}
                  onTextChange={(text) => {
                    changeTextData(text, "max_qty");
                  }}
                  onBlur={() => {
                    onBlurHandler("max_qty");
                  }}
                />
                {unitSelected}
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_negative_allowed"}
                    value={"is_negative_allowed"}
                    onClick={() => {
                      changeTextData(
                        !form?.is_negative_allowed,
                        "is_negative_allowed"
                      );
                    }}
                    id="vehicle1"
                    checked={form?.is_negative_allowed}
                  />{" "}
                  <label htmlFor="vehicle1"> Is negative stock allowed?</label>
                  {/* <br /> */}
                </div>
              </div>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_batch_wise"}
                    value={"is_batch_wise"}
                    onClick={() => {
                      changeTextData(!form?.is_batch_wise, "is_batch_wise");
                    }}
                    id="vehicle1"
                    checked={form?.is_batch_wise}
                  />{" "}
                  <label htmlFor="vehicle1"> Batch-wise stock?</label>
                  {/* <br /> */}
                </div>
              </div>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_first_in_first_out"}
                    value={"is_first_in_first_out"}
                    onClick={() => {
                      changeTextData(
                        !form?.is_first_in_first_out,
                        "is_first_in_first_out"
                      );
                    }}
                    id="vehicle1"
                    checked={form?.is_first_in_first_out}
                  />{" "}
                  <label htmlFor="vehicle1"> First-in, First-out?</label>
                  {/* <br /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className={"plainPaper"}>
        <div className={"headerFlex wrapper"}>
          <div className={"infoTitle inner"}>
            <div className="info_Status">
              <h4 className={"heading_stats"}>Status</h4>
              <div className={"slider_wrap "}>
                <p className="tags">Inactive</p>
                <CustomSwitch
                  value={form?.is_active}
                  handleChange={() => {
                    changeTextData(!form?.is_active, "is_active");
                  }}
                  label={`Active`}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {id && (
              <ButtonBase
                type={"button"}
                className={styles.deleteBtn}
                onClick={toggleConfirmDialog}
              >
                {"DELETE"}
              </ButtonBase>
            )}
            <ButtonBase
              type={"button"}
              className={styles.createBtn}
              onClick={handleSubmit}
            >
              {isLoading && <CircularProgress size="1rem" color="inherit" />}{" "}
              <span style={{ marginLeft: 4 }}> {id ? "UPDATE" : "CREATE"}</span>
            </ButtonBase>
          </div>
          <DialogComponent
            isOpen={isDialog}
            handleClose={toggleConfirmDialog}
            description={dialogText}
            handleConfirm={handleDelete}
          />
        </div>
      </div>
    </>
  );
};
export default ProductCreate;
