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
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Paging from "../../../ui-component/table/Paging";
import CardActions from "@mui/material/CardActions";
import {getComparator, stableSort} from "../../../utils/table-utils";
import {RedeemTwoTone, VisibilityTwoTone} from "@mui/icons-material";
import RedeemInfoDialog from "./RedeemInfoDialog";
import {useRedeem} from "../../../actions/reward";

const headCells = [
    { id: 'redeemId', numeric: false, disablePadding: true, label: '#' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'redeemDate', numeric: false, disablePadding: false, label: 'Status', align: 'center', disableOrdering: true},
    { id: 'action', numeric: false, disablePadding: true, label: 'Action', align: 'center', disableOrdering: true}
];


const RedeemHistoryList = () => {

    //Data
    const {redeems: data} = useSelector(state => state.reward);

    const [isLoading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');

    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const getDataLenght = () => {
        return searchQuery ?  filteredData?.length : data?.redeems?.length;
    }

    const getDataList = () => {
        return data?.redeems;
    }

    const getDataSearchFields = (data) => {
        return data?.redeemId;
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleViewRedeem = (data) => {
       //Visualizza informazioni sul redeem
        setSelectedElement(data);
        setDialogOpen(true);
    }

    const handleCompleteRedeem = (data) => {
        // Dispatch action per confermare il redeem
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(useRedeem(data?.redeemCode));
    }

    const getStatus = (data) => {

        if(!data?.redeemDate){
            return <Chip label="Pending" color="warning" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />;
        }

        if(data?.redeemDate && !data?.redeemed){
            return <Chip label="Rejected" color="error" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />;
        }

        if(data?.used){
            return <Chip label="Used" color="primary" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />;
        }else{
            return <Chip label="Ready" color="success" size="small" sx={{ cursor:"default", borderRadius: "4px"}} clickable />;
        }

    }


    useEffect(() => {
        if(data) {
            setLoading(false);
            setFilteredData(getDataList().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));

            if(searchQuery) {
                setFilteredData(
                    getDataList().filter(element => getDataSearchFields(element).toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                );
            }

        }else{
            setLoading(true);
        }
    }, [data, page, rowsPerPage, searchQuery]);


    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedElement(null);
    }

    const getActions =  (data) => {
        let actions = [];
        // Transaction success, code ready to be redeemed
        if(data?.redeemDate && data?.redeemed && !data?.used){
            actions.push(
                <Tooltip title="Complete Redeem" key={"complete_"+data?.redeemId}>
                    <IconButton onClick={() => {
                        handleCompleteRedeem(data);
                        setSelectedElement(data.id);
                        setDialogOpen(true);
                    }}
                    color="secondary"
                    >
                        <RedeemTwoTone />
                    </IconButton>
                </Tooltip>
            );
        }

        if(data?.used){
            actions.push(
                <Tooltip title="View Redeem" key={"view_"+data?.redeemId}>
                    <IconButton color="primary"
                        onClick={() => {
                            handleViewRedeem(data);
                        }}>
                        <VisibilityTwoTone />
                    </IconButton>
                </Tooltip>
            );
        }

        return actions;
    }


    return (<>
        <Paper>
            <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={12}>
                <Grid item>
                    <SearchField placeHolder={"Search Redeem ID"}
                                 value={searchQuery}
                                 sx={{
                                     padding: 0
                                 }}
                                 onChange={handleSearchChange} />
                </Grid>
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
                                                key={element?.redeemId}
                                            >
                                                <TableCell>
                                                    <Typography variant="body1" fontWeight={500}
                                                    >{element?.redeemId}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {element?.quantity}
                                                </TableCell>
                                                <TableCell align="center">{getStatus(element)}</TableCell>
                                                <TableCell align="center">
                                                    {getActions(element)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'right' }}>
                                <Paging page={page} setPage={setPage} totalRows={getDataLenght()} maxRows={rowsPerPage} setMaxRows={setRowsPerPage}/>
                            </CardActions>
                            {selectedElement &&
                                (<RedeemInfoDialog onClose={handleDialogClose} data={selectedElement} open={dialogOpen}/>)
                            }
                        </TableContainer>
                    )

                    : (
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                            <Typography variant="h6" color="textSecondary">No redeems found</Typography>
                        </Box>
                    )}
        </Paper>
    </>);
}

export default RedeemHistoryList;