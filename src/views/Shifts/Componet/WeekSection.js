import React from "react";
import CustomRadio from "../../../components/FormFields/CustomRadio";

const WeekSection = () => {
  return (
    <>
      {" "}
      <CustomRadio label={"Week off"} />
      <CustomRadio label={"Occasional Working"} />
      <CustomRadio label={"Working Day"} checked/>
    </>
  );
};

export default WeekSection;
