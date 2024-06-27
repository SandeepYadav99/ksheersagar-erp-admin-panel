import React from "react";
import CustomRadio from "../../../components/FormFields/CustomRadio";
import { Typography } from "@material-ui/core";
import styles from "./Style.module.css"
const WeekSection = () => {
  return (
    <>
      {" "}
      <CustomRadio  label={<span className={styles.fontSize}>Week off</span>} />
      <CustomRadio label={<span className={styles.fontSize}>Occasional Working</span>} />
      <CustomRadio label={<span className={styles.fontSize}>Working Day</span>} checked/>
    </>
  );
};

export default WeekSection;
