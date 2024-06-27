import SkeletonTransactionCard from "../../../ui-component/cards/Skeleton/TransactionCard";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import SearchField from "../../../ui-component/extended/SearchField";
import {useDispatch, useSelector} from "react-redux";
import {visuallyHidden} from "@mui/utils";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {EditTwoTone, LockOpenTwoTone, LockTwoTone, VisibilityTwoTone} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import {dateBeauty} from "../../../utils/date-beauty";
import AddIcon from "@mui/icons-material/Add";
import Paging from "../../../ui-component/table/Paging";
import CardActions from "@mui/material/CardActions";
import {useNavigate} from "react-router-dom";
import RewardView from "./RewardView";
import {NEW_REWARD} from "../../../config";
import {disableReward, enableReward} from "../../../actions/reward";

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Product Name'},
    { id: 'addDate', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'cost', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'oldCost', numeric: true, disablePadding: false, label: 'Old Price' },
    { id: 'quantity', numeric: false, disablePadding: false, label: 'Status', align: 'center'},
    { id: 'action', numeric: false, disablePadding: true, label: 'Action', align: 'center', disableOrdering: true}
];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const RewardList = () => {

    const [isLoading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const {rewards} = useSelector(state => state.reward);
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };


    useEffect(() => {
        if(rewards) {
            setLoading(false);
            setFilteredProducts(rewards?.rewards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));

            if(searchQuery) {
                setFilteredProducts(
                    rewards?.rewards.filter(reward => reward?.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                );
            }

        }else{
            setLoading(true);
        }
    }, [page, rewards, rowsPerPage, searchQuery]);

    const handleEditClick = (id)  => {
        navigate("/store/management/" + id);
    }

    const handleViewClick = (id) => {
        setSelectedReward(id);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedReward(null);
    }

    const handleDisableClick = (id) => {
        dispatch(disableReward(id));
    }

    const handleEnableClick = (id) => {
        dispatch(enableReward(id));
    }

    const getActions =  (product) => {

        let actions = [];

        actions.push(
            <Tooltip title={"View"} key={"view_" + product?.id} disableInteractive>
                <IconButton aria-label="view" onClick={() => {
                    handleViewClick(product?.id);
                }}>
                    <VisibilityTwoTone color="primary" />
                </IconButton>
            </Tooltip>);

        actions.push(
            <Tooltip title={"Edit"} key={"edit_" + product?.id} disableInteractive>
                <IconButton aria-label="edit" onClick={() => {
                    handleEditClick(product?.id);
                }}>
                    <EditTwoTone color="secondary"/>
                </IconButton>
            </Tooltip>
        );

        if(product?.active){
            actions.push(
                <Tooltip title={"Disable"} key={"disable_" + product?.id} disableInteractive>
                    <IconButton aria-label="disable" onClick={() => {
                        handleDisableClick(product?.id);
                    }}>
                        <LockTwoTone color="error"/>
                    </IconButton>
                </Tooltip>
            )
        } else{
            actions.push(
                <Tooltip title={"Enable"} key={"enable_" + product?.id} disableInteractive>
                    <IconButton aria-label="enable" onClick={() => {
                        handleEnableClick(product?.id);
                    }}>
                        <LockOpenTwoTone color="success"/>
                    </IconButton>
                </Tooltip>
            )
        }


       return actions;
    }

    const handleAddClick = () => {
        navigate("/store/management/" + NEW_REWARD);
    }

    return (<>
        <Paper>
            <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={12}>
                <Grid item>
                    <SearchField placeHolder={"Search products"}
                                 value={searchQuery}
                                 sx={{
                                     padding: 0
                                 }}
                                 onChange={handleSearchChange} />
                </Grid>
                <Grid item>
                    <Tooltip title={"Add product"} disableInteractive >
                            <IconButton
                                color="primary"
                                aria-label="add"
                                variant="contained"
                                size={"small"}
                                sx={{backgroundColor: "primary.main",
                                    color: "white",
                                    "&:hover": {backgroundColor: "primary.dark"}
                                }}
                                onClick={() => {
                                   handleAddClick();
                                }}>
                                <AddIcon/>
                            </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        { isLoading ? (<SkeletonTransactionCard />)
            : filteredProducts.length !== 0
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
                                    {stableSort(filteredProducts, getComparator(order, orderBy)).map((product) => {

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={product.id}
                                            >
                                                <TableCell align="center" scope="row" padding="none">
                                                    <Avatar src={product.image} sx={{  borderRadius: "4px" }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="body1" fontWeight={500}
                                                        >{product.name}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{dateBeauty(product?.addDate)}</TableCell>
                                                <TableCell align="right">{product.cost}</TableCell>
                                                <TableCell align="right">{product.oldCost}</TableCell>
                                                <TableCell align="center">
                                                    { product?.quantity > 0
                                                        ? (
                                                            <Chip label="In Stock" color="success" size="small"  sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                                        ) : (
                                                            <Chip label="Out of Stock" color="error" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />
                                                        )
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    {getActions(product)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'right' }}>
                                <Paging page={page} setPage={setPage} totalRows={searchQuery ? filteredProducts?.length : rewards?.rewards?.length} maxRows={rowsPerPage} setMaxRows={setRowsPerPage}/>
                            </CardActions>
                            {selectedReward &&
                                <RewardView onClose={handleDialogClose} id={selectedReward} open={dialogOpen}/>
                            }
                        </TableContainer>
                    )

                : (
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                        <Typography variant="h6" color="textSecondary">No products found</Typography>
                    </Box>
                )}
        </Paper>
    </>);
}

export default RewardList;