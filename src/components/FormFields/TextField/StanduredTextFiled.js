import React, {useCallback, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


const StanduredTextField = ({isError, errorText, icon, label, onChange, onTextChange, inputProps, ...rest }) => {

    const handleChange = useCallback((e) => {
        onChange && onChange(e);
        onTextChange && onTextChange(e.target.value);
    }, [onChange, onTextChange]);

   return (
    <>
    
    <TextField
        error={isError}
        //  helperText={errorText}
        label={label}
        InputProps={{
            startAdornment: icon ? (
                <InputAdornment position="start">
                    {icon ? <img className={'fieldIcon'} src={icon}/> : '' }
                </InputAdornment>
            ):'',
            ...(inputProps ? inputProps : {})
        }}
        onChange={handleChange}
        variant={ 'standard'}
        margin={"dense"}
        fullWidth={true}
        {...rest}
    />
     <p style={{textAlign: "right", fontSize:"12px",color: "#FF0000", marginTop:"0px"}}>{errorText ? errorText : ""}</p>
    </>
   )
}

export default StanduredTextField;
