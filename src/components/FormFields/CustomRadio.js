import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import { Radio } from "@material-ui/core";

const CustomRadio = ({ handleChange, label, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Radio
        size="small"
       style={{height:"11px"}}
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
        />
      }
      label={label}
      {...rest}
    />
  );
};

export default CustomRadio;
