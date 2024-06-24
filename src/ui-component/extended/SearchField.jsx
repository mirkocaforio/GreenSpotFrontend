import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";

const SearchField = ({ placeHolder ,value, onChange, sx = {} }) => (
    <TextField
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
            sx: {
                borderRadius: '20px',
                backgroundColor: '#f9f9f9',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d3d3d3',
                },
            },
        }}
        sx={{
            paddingRight: "16px",
            paddingLeft: "16px",
            width: '100%',
            maxWidth: 400,
            minWidth: 100,
            '& .MuiInputBase-input': {
                paddingLeft: 1,
            },
            ...sx,
        }}
    />
);

SearchField.propTypes = {
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    sx: PropTypes.object
};

export default SearchField;