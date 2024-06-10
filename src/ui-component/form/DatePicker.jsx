
import {useState, useEffect} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from "@mui/material/TextField";

// ===========================|| FORM PICKER - DATE PICKER ||=========================== //

const FormDatePicker = ({ ...handleChange }) => {

    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic Date Picker"
                    inputFormat="MM/dd/yyyy"
                    onChange={(newValue) => handleChange(newValue)}
                    slotProps={{
                        field: { clearable: true, onClear: () => setCleared(true) },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  value={null}/>
            </LocalizationProvider>
        </>
    );
}

export default FormDatePicker;