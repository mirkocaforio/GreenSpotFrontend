import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchField from "../extended/SearchField";
import SkeletonTransactionCard from "../cards/Skeleton/TransactionCard";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {getComparator, stableSort} from "../../utils/table-utils";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Paging from "./Paging";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";


/**
 * Classic table component
 *
 * <p>
 *     Columns Example:
 *     <p>[
 *         { id: 'id', numeric: false, disablePadding: true, label: '#', key: true ,
 *             content: (element) => {
 *                         return (
 *                             <Avatar src={element?.image} sx={{  borderRadius: "4px" }} />
 *                         )
 *             }
 *         },
 *     ];
 * </p>
 *
 * @param columns Params: key: bool, searchable: bool, numeric: bool, disablePadding: bool, label: '', align: 'center | left | right', disableOrdering: bool, content: (element) => {}
 * @param data Array of data
 * @param searchLabel Search label
 * @param getDataSearchFields Function to get search fields from element
 * @param header Additional header component
 * @returns {Element} Classic table component
 * @constructor
 */


const ClassicTable = ({ columns = [{}], data, searchLabel = "Search element", header }) => {

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [isLoading, setIsLoading] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const headCells = columns;

    /**
     * Get data length based on search query
     * @returns {number|undefined|*}
     */
    const getDataLength = () => {
        return searchQuery ?  filteredData?.length : data?.length;
    }

    /**
     * Handle search change
     * @param event
     */
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    /**
     * Handle request sort
     * @param event
     * @param property
     */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /**
     * Get search field from element
     * @param element Element
     * @returns {*} Search field
     */
    const getDataSearchFields = (element) => {
        const keyField = headCells.find(element => element?.searchable).id;
        return element[keyField];
    }

    /**
     * Get key field from element
     * @param element
     * @returns {*}
     */
    const getKey = (element) => {
        const keyField = headCells.find(element => element.key).id;
        return element[keyField];
    }

    /**
     * Map data to table cells
     * @param element
     * @returns {JSX.Element[]}
     */
    const mapData = (element) => {
        return headCells.map((cell) => {
            return (
                <TableCell key={cell.id} align={cell.align ? cell.align : 'left'}>
                    {cell.content ? cell.content(element) : ((cell.id in element) ? element[cell.id] : "")}
                </TableCell>
            );
        });

    }


    useEffect(() => {
        if(data) {
            setIsLoading(false);
            setFilteredData(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
            setOrderBy(headCells.find(element => element?.searchable).id);

            if(searchQuery) {
                setFilteredData(
                   data.filter(element => getDataSearchFields(element).toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                );
            }

        }else{
            setIsLoading(true);
        }
    }, [data, page, rowsPerPage, searchQuery]);

    return (<>
        <Paper>
            <Grid container alignItems={"center"}>
                <Grid container item justifyContent={"flex-start"} xs={8} sm={8} md={11.5} lg={11.5}>
                    <Grid item>
                        <SearchField placeHolder={searchLabel}
                                     value={searchQuery}
                                     sx={{
                                         padding: 0
                                     }}
                                     onChange={handleSearchChange} />
                    </Grid>
                </Grid>
            {header && (
                <Grid container item justifyContent="flex-end" xs={4} sm={2} md={0.5} lg={0.5}>
                    <Grid item>
                        {header}
                    </Grid>
                </Grid>
                )}
            </Grid>
            { isLoading ? (<SkeletonTransactionCard />)
                : filteredData.length !== 0
                    ? (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={headCell.numeric ? 'right' : (headCell?.align ? headCell?.align : 'left')}
                                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                                sortDirection={orderBy === headCell.id ? order : false}
                                            >
                                                {!headCell.disableOrdering ? (
                                                        <TableSortLabel
                                                            active={orderBy === headCell.id}
                                                            direction={orderBy === headCell.id ? order : 'asc'}
                                                            onClick={(event) => handleRequestSort(event, headCell.id)}
                                                        >
                                                            {headCell.label}
                                                            {orderBy === headCell.id ? (
                                                                <Box component="span" sx={visuallyHidden}>
                                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                </Box>
                                                            ) : null}
                                                        </TableSortLabel>)
                                                    :
                                                    headCell.label
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stableSort(filteredData, getComparator(order, orderBy)).map((element) => {

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={getKey(element)}
                                            >
                                                {mapData(element)}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'right' }}>
                                <Paging page={page} setPage={setPage} totalRows={getDataLength()} maxRows={rowsPerPage} setMaxRows={setRowsPerPage}/>
                            </CardActions>
                        </TableContainer>
                    )

                    : (
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                            <Typography variant="h6" color="textSecondary">No data found</Typography>
                        </Box>
                    )}
        </Paper>
    </>);

}

ClassicTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.oneOfType(
        [
            PropTypes.array,
            PropTypes.object
        ]
    ),
    searchLabel: PropTypes.string,
    header: PropTypes.element
}

export default ClassicTable;