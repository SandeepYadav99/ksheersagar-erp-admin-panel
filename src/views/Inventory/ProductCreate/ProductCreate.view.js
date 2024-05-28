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
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { actionFetchProduct } from "../../../actions/Product.action";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const ProductCreate = ({ location, isSidePanel, handleToggleSidePannel }) => {
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
    subCategory,
  } = ProductCreateHook({ location, isSidePanel, handleToggleSidePannel });
  console.log(form.unit_ids);
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
  console.log("form", form?.applicable_for);
  const dispatch = useDispatch();
  return (
    <>
      <>
        <div>
          <div className={styles.outerFlex}>
            <div>
              <ButtonBase
                onClick={() => {
                  history.push("/product");
                  addSubcatData("");
                }}
              >
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
            {(finishedGood === true || form?.type === "FINISHED_GOODS") && (
              <div className={"formFlex"}>
                <div className={"formGroup"}>
                  <div></div>
                </div>
                <div className={"formGroup"}>
                  <CustomTextField
                    isError={errorData?.price}
                    errorText={errorData?.price}
                    label={"Selling price "}
                    value={form?.price}
                    onTextChange={(text) => {
                      changeTextData(text, "price");
                    }}
                    onBlur={() => {
                      onBlurHandler("price");
                    }}
                    type={"number"}
                  />
                </div>
              </div>
            )}
            {(mithaiBox === true || form?.type === "MITHAI_BOX") && (
              <>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <div className={styles.flexfile}>
                      <CustomTextField
                        isError={errorData?.dead_weight}
                        errorText={errorData?.dead_weight}
                        label={"Dead weight"}
                        type={"number"}
                        value={form?.dead_weight}
                        onTextChange={(text) => {
                          changeTextData(text, "dead_weight");
                        }}
                        onBlur={() => {
                          onBlurHandler("dead_weight");
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
                        isError={errorData?.max_capacity}
                        errorText={errorData?.max_capacity}
                        label={"Capacity"}
                        type={"number"}
                        value={form?.max_capacity}
                        onTextChange={(text) => {
                          changeTextData(text, "max_capacity");
                        }}
                        onBlur={() => {
                          onBlurHandler("max_capacity");
                        }}
                      />
                      <div>KG</div>
                    </div>
                  </div>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.lanes}
                      errorText={errorData?.lanes}
                      label={"No of lanes  "}
                      value={form?.lanes}
                      onTextChange={(text) => {
                        changeTextData(text, "lanes");
                      }}
                      onBlur={() => {
                        onBlurHandler("lanes");
                      }}
                    />
                  </div>
                </div>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    {/* <Autocomplete
                    
                      id="tags-outlined"
                      onChange={(e, value) => {
                        changeTextData(value, "applicable_for");
                      }}
                      value={form.applicable_for || []}
                      options={listData?.CATEGORIES} // listData ||
                      getOptionLabel={(option) => option?.name}
                      defaultValue={form?.applicable_for || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={"Applies to"}
                          error={errorData?.applicable_for}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {form?.applicable_for ? (
                                  <Clear
                                    onClick={() =>
                                      changeTextData(null, "applicable_for")
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
                    /> */}
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      onChange={(e, value) => {
                        changeTextData(value, "applicable_for");
                      }}
                      value={form?.applicable_for || []}
                      options={listData?.CATEGORIES || []}
                      getOptionLabel={(option) =>
                        option?.name || option?.name_en
                      }
                      defaultValue={form.applicable_for || []}
                      getOptionSelected={(option, value) =>
                        option?.id === value?.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={"Applies to"}
                          error={errorData?.applicable_for}
                        />
                      )}
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
                  value={form?.sub_category_id}
                  onOpen={() => {
                    if (!form?.category_id) {
                      setTimeout(() => {
                        SnackbarUtils.error("Please select the category first");
                      }, 500);
                    }
                  }}
                  handleChange={(value) => {
                    changeTextData(value, "sub_category_id");
                  }}
                >
                  {data?.map((dT) => {
                    return (
                      <MenuItem value={dT?.id} key={dT?.id}>
                        {dT?.name_en}
                      </MenuItem>
                    );
                  })}
                </CustomSelectField>
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomTextField
                  isError={errorData?.min_qty}
                  errorText={errorData?.min_qty}
                  label={"Min Quantity"}
                  value={form?.min_qty}
                  onTextChange={(text) => {
                    changeTextData(text, "min_qty");
                  }}
                  type={"number"}
                  onBlur={() => {
                    onBlurHandler("min_qty");
                  }}
                />
                {unitSelected}
              </div>

              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomTextField
                  isError={errorData?.max_qty}
                  errorText={errorData?.max_qty}
                  label={"Max Quantity"}
                  value={form?.max_qty}
                  onTextChange={(text) => {
                    changeTextData(text, "max_qty");
                  }}
                  type={"number"}
                  onBlur={() => {
                    onBlurHandler("max_qty");
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
                  isError={errorData?.expire_day}
                  errorText={errorData?.expire_day}
                  label={"Days until expiration"}
                  value={form?.expire_day}
                  onTextChange={(text) => {
                    changeTextData(text, "expire_day");
                  }}
                  onBlur={() => {
                    onBlurHandler("expire_day");
                  }}
                />
                {/* {unitSelected} */}
              </div>

              <div className={classNames("formGroup", styles.unitWrap)}>
                <CustomSelectField
                  isError={errorData?.gst_slab}
                  errorText={errorData?.gst_slab}
                  label={"GST Slab"}
                  value={form?.gst_slab} //
                  handleChange={(value) => {
                    changeTextData(value, "gst_slab");
                  }}
                >
                  <MenuItem value="0">0%</MenuItem>
                  <MenuItem value="5">5%</MenuItem>
                  <MenuItem value="12">12%</MenuItem>
                  <MenuItem value="18">18%</MenuItem>
                </CustomSelectField>
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.unit_ids}
                  errorText={errorData?.unit_ids}
                  label={"Units"}
                  value={form?.unit_ids}
                  handleChange={(value) => {
                    changeTextData(value, "unit_ids");
                  }}
                >
                  {listData?.UNITS?.map((val) => {
                    return <MenuItem value={val?.id}>{val?.name}</MenuItem>;
                  })}
                  {/* <MenuItem value="5">5%</MenuItem>
                  <MenuItem value="12">12%</MenuItem>
                  <MenuItem value="18">18%</MenuItem> */}
                </CustomSelectField>
                {/* <Autocomplete
                      //  multiple
                      id="tags-outlined"
                      onChange={(e, value) => {
                        changeTextData(value, "unit_ids");
                      }}
                      value={form?.unit_ids || [] }
                      options={listData?.UNITS || []}
                      getOptionLabel={(option) =>
                        option?.label || option?.name
                      }
                      defaultValue={form.unit_ids || [] }
                      getOptionSelected={(option, value) =>
                        option?.id === value?.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={"Units"}
                          error={errorData?.unit_ids}
                        />
                      )}
                    /> */}
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_negative_allowed"}
                    value={"is_negative_allowed"}
                    onChange={() => {
                      changeTextData(
                        !form?.is_negative_allowed,
                        "is_negative_allowed"
                      );
                    }}
                    id="vehicle1"
                    checked={form?.is_negative_allowed}
                  />{" "}
                  <label htmlFor="vehicle"> Is negative stock allowed?</label>
                  {/* <br /> */}
                </div>
              </div>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_batch_wise"}
                    value={"is_batch_wise"}
                    onChange={() => {
                      changeTextData(!form?.is_batch_wise, "is_batch_wise");
                    }}
                    id="vehicle2"
                    checked={form?.is_batch_wise}
                  />{" "}
                  <label htmlFor="vehicle"> Batch-wise stock?</label>
                  {/* <br /> */}
                </div>
              </div>
              <div className={"formGroup"}>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    name={"is_first_in_first_out"}
                    value={"is_first_in_first_out"}
                    onChange={() => {
                      changeTextData(
                        !form?.is_first_in_first_out,
                        "is_first_in_first_out"
                      );
                    }}
                    id="vehicle3"
                    checked={form?.is_first_in_first_out}
                  />{" "}
                  <label htmlFor="vehicle"> First-in, First-out?</label>
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
