import {Box, IconButton, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";


const ValueIncrementer = ({ value, onIncrement, onDecrement }) => {

    const theme = useTheme();
    const { borderRadius } = useSelector((state) => state.customization);

    return (
        <Box display="flex" alignItems="center"
             sx={{border: 1,
                 borderRadius: {borderRadius},
                 borderColor: theme.palette.grey[400],
             }}>
            <IconButton onClick={onDecrement} sx={{borderRadius: {borderRadius}}}>
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2 }}>
                {value}
            </Typography>
            <IconButton onClick={onIncrement} sx={{borderRadius: {borderRadius}}}>
                <AddIcon />
            </IconButton>
        </Box>
    )
}
ValueIncrementer.propTypes = {
    value: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
}

export default ValueIncrementer;