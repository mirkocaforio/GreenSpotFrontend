import {FilterList} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

const SorterButton = ({ title, sortDirection = "asc", onClick }) => {

    return (
        <Tooltip title={title + " " + sortDirection} arrow disableInteractive>
            <IconButton onClick={onClick}>
                <FilterList color={"secondary"}
                            sx={{
                                transform: sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: 'transform 0.3s',
                            }}
                />
            </IconButton>
        </Tooltip>
    );

}

SorterButton.propTypes = {
    title: PropTypes.string.isRequired,
    sortDirection: PropTypes.string,
    onClick: PropTypes.func
};

export default SorterButton;