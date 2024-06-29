import {FilterList} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import {forwardRef} from "react";

const FilterButton = forwardRef(({ title, clicked, onClick }, ref) => {
    return (
        <Tooltip title={title} placement="top" arrow disableInteractive>
            <IconButton onClick={onClick} ref={ref}>
                <FilterList color="secondary"
                            sx={{
                                transform: clicked ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                />
            </IconButton>
        </Tooltip>
    );
});

FilterButton.propTypes = {
    clicked: PropTypes.bool,
    title: PropTypes.string.isRequired,
    sortDirection: PropTypes.string,
    onClick: PropTypes.func,
};

export default FilterButton;