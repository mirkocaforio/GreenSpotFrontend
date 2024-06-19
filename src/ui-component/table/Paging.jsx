import Pagination from "@mui/material/Pagination";
import React from "react";
import PropTypes from "prop-types";


const Paging = ({ setPage, totalRows, maxRows, color = "primary" }) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const pageCount = () =>{
        const count = Math.round(totalRows / maxRows);
        return count === 0 ? 1 : count;
    }

    return (
        <Pagination count={pageCount()} color={color} onChange={handleChangePage} />
    );
}

Paging.propTypes = {
    setPage: PropTypes.func.isRequired,
    totalRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default Paging;