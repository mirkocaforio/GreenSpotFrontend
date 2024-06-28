import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import {useState} from "react";

function generateViews(formatString) {
    let views = [];

    if (formatString.includes("DD") && formatString.includes("MM") && formatString.includes("YYYY")) {
        return null; // Se il formato include sia giorno, mese che anno, ritorna un array vuoto
    }

    if (formatString.includes("DD")) {
        views.push("day");
    }

    if (formatString.includes("MM")) {
        views.push("month");
    }

    if (formatString.includes("YYYY")) {
        views.push("year");
    }

    return views;
}

// ===========================|| FORM PICKER - DATE PICKER ||=========================== //

const FormDatePicker = ({ label,handleBlur, handleChange, handleFocus, valueName, value, setValue, dataFormat, outputFormat }) => {

    let format = dataFormat || 'YYYY-MM-DD';
    let output = outputFormat || 'YYYY-MM-DDTHH:mm:ss';

    const [date, setDate] = useState(null);

    const views = generateViews(format);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                id={"outlined-adornment-date-register"}
                name={valueName}
                onBlur={handleBlur}
                onFocus={handleFocus}
                views={views}
                onChange={(data) => {
                    const formattedDate = dayjs(data).isValid() ? dayjs(data).format(output) : '';

                    setValue && setValue(dayjs(formattedDate, output));
                    !value && setDate(dayjs(data, output));

                    handleChange && handleChange({target: {name: valueName, value: formattedDate}});
                }}
                label={label}
                inputFormat={format}
                value={value ? dayjs(value, output) : date}
                renderInput={(params) => <TextField {...params} variant="outlined"/>}/>
        </LocalizationProvider>
    );
}

FormDatePicker.propTypes = {
    label: PropTypes.string,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    valueName: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    dataFormat: PropTypes.string,
    outputFormat: PropTypes.string
}

export default FormDatePicker;