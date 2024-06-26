import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

// ===========================|| FORM PICKER - DATE PICKER ||=========================== //

const FormDatePicker = ({ label,handleBlur, handleChange, valueName, value, setValue, dataFormat, outputFormat }) => {

    let format = dataFormat ? dataFormat : 'YYYY-MM-DD';
    let output = outputFormat ? outputFormat : 'YYYY-MM-DDTHH:mm:ss';

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    id={"outlined-adornment-date-register"}
                    name={valueName}
                    onBlur={handleBlur}
                    onChange={(data) => {
                        const formattedDate = dayjs(data).isValid() ? dayjs(data).format(output) : '';
                        setValue && setValue(data);
                        handleChange && handleChange({target: {name: valueName, value: formattedDate}});
                    }}
                    label={label}
                    inputFormat={format}
                    value={value ? value : ""}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}/>
            </LocalizationProvider>
        </>
    );
}

FormDatePicker.propTypes = {
    label: PropTypes.string,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    valueName: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    dataFormat: PropTypes.string,
    outputFormat: PropTypes.string
}

export default FormDatePicker;