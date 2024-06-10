import PropTypes from 'prop-types';
import {useState} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

// ===========================|| FORM PICKER - DATE PICKER ||=========================== //

const FormDatePicker = ({ handleChange, valueName, value, setValue }) => {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    id={"outlined-adornment-date-register"}
                    onChange={(data) => {
                        const formattedDate = dayjs(data).format('DD/MM/YY');
                        setValue(data);
                        handleChange({target: {name: {valueName}, value: formattedDate}});}}
                    label={"Date of Birth"}
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}/>
            </LocalizationProvider>
        </>
    );
}

FormDatePicker.propTypes = {
    handleChange: PropTypes.func,
    valueName: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default FormDatePicker;