import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


const Paging = ({ page,setPage, totalRows, maxRows, setMaxRows, color = "primary" }) => {

    const [currPage, setCurrPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        let page = newPage - 1;

        setPage(page); //Parent state
        setCurrPage(newPage); //Internal state
    };

    const pageCount = () =>{
        const count = Math.ceil(totalRows / maxRows);

        return count === 0 ? 1 : count;
    }

    useEffect(() => {
        if((!isNaN(page)) && (page !== currPage - 1)){
            setCurrPage(page + 1);
        }
    }, [currPage, page]);

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
                            handleChangePage(null, 1);
                            setMaxRows(e.target.value);
                        }}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </Grid>
                </>)}
            <Grid item>
                <Pagination page={currPage} count={pageCount()} color={color} onChange={handleChangePage} />
            </Grid>
        </Grid>
    );
}

Paging.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func.isRequired,
    totalRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired,
    setMaxRows: PropTypes.func,
    color: PropTypes.string,
}

export default Paging;