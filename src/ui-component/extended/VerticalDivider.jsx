import Divider from "@mui/material/Divider";
import React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const VerticalDivider = ({sx = {}}) => {
    const theme = useTheme();
    return (
        <Divider orientation="vertical"
                 variant="middle"
                 style={{ height: "70%",
                     borderRightWidth: 1.5,
                     borderColor: theme.palette.grey[400],
                     ...sx}} />
    );
}

VerticalDivider.propTypes = {
    sx: PropTypes.object
};


export default VerticalDivider;