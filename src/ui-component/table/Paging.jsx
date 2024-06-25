import Pagination from "@mui/material/Pagination";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


const Paging = ({ page, setPage, totalRows, maxRows, setMaxRows, color = "primary" }) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const pageCount = () =>{
        const count = Math.ceil(totalRows / maxRows);

        return count === 0 ? 1 : count;
    }

    return (
        <Grid container={true} spacing={2} justifyContent={"flex-end"} alignItems="center">
            {setMaxRows && (
                <>
            <Grid item>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Rows per page:
                </Typography>
            </Grid>
            <Grid item>
                <Select value={maxRows}
                        onChange={(e) => {
                            setPage(0);
                            setMaxRows(e.target.value);
                        }}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </Grid>
                </>)}
            <Grid item>
                <Pagination count={pageCount()} color={color} onChange={handleChangePage} />
            </Grid>
        </Grid>
    );
}

Paging.propTypes = {
    setPage: PropTypes.func.isRequired,
    totalRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired,
    setMaxRows: PropTypes.func,
    color: PropTypes.string,
}

export default Paging;