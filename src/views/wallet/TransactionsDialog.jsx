import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    TableSortLabel, DialogActions
} from '@mui/material';
import React, {useState} from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Button from "@mui/material/Button";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paging from "../../ui-component/table/Paging";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const TransactionsDialog = ({ open, onClose, transactions, owner }) => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('creationDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const getAmountStyle = (transaction) => {
        if (transaction.senderEmail === owner) {
            return { color: 'red' };
        } else if (transaction.receiverEmail === owner) {
            return { color: 'green' };
        } else {
            return {};
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortData = (data, order, orderBy) => {
        return data.sort((a, b) => {
            if (orderBy === 'amount') {
                return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
            } else if (orderBy === 'creationDate') {
                return order === 'asc' ? new Date(a[orderBy]) - new Date(b[orderBy]) : new Date(b[orderBy]) - new Date(a[orderBy]);
            } else if(orderBy === 'status'){
                return order === 'asc' ? a.completed - b.completed : b.completed - a.completed;
            }else {
                if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
                if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
                return 0;
            }
        });
    };

    const readableKeys = {
        id: 'ID',
        creationDate: 'Date',
        transactionOwner: 'Owner',
        senderEmail: 'Sender',
        receiverEmail: 'Receiver',
        amount: 'Amount',
        description: 'Description',
    };
    const keys = Object.keys(readableKeys);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth fullScreen={fullScreen} aria-labelledby="responsive-dialog-title" scroll="paper">
            <DialogTitle id="responsive-dialog-title">
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Typography variant="h3">
                        All Transactions
                    </Typography>
                </CardActions>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper} sx={{ minWidth: "40%", overflow: 'auto' , wordBreak: 'break-word' }}>
                    <Table  aria-label="sortable table" sx={{tableLayout: 'fixed'}}>
                        <TableHead>
                            <TableRow>
                                {keys.map((key) => (
                                    <TableCell key={key}>
                                        <TableSortLabel
                                            active={orderBy === key}
                                            direction={orderBy === key ? order : 'asc'}
                                            onClick={() => handleRequestSort(key)}
                                        >
                                            {readableKeys[key]}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'status'}
                                        direction={orderBy === 'status' ? order : 'asc'}
                                        onClick={() => handleRequestSort('status')}
                                    >
                                        Status
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortData([...transactions], order, orderBy)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    {keys.map((key) => (
                                        <TableCell
                                            key={key}
                                            sx={key === 'amount' ? getAmountStyle(transaction) : {}}
                                        >
                                            {transaction[key]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {transaction.completed ? (
                                            <Chip label="Completed" style={{ backgroundColor: '#e8f5e9', color: '#4caf50' }} />
                                        ) : transaction.completed === null ? (
                                            <Chip label="Pending" style={{ backgroundColor: '#fff8e1', color: '#ffa000' }} />
                                        ) : (
                                            <Chip label="Failed" style={{ backgroundColor: '#ffebee', color: '#f44336' }} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
{/*                <TablePagination
                    rowsPerPageOptions={[30, 50, 100]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />*/}
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item container justifyContent={"flex-end"} alignItems={"center"}>
                        <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'right' }}>
                            <Paging setPage={setPage} totalRows={transactions?.length} maxRows={rowsPerPage} setMaxRows={setRowsPerPage} />
                        </CardActions>
                    </Grid>
                    <Grid item container justifyContent={"center"} alignItems={"center"}>
                        <Box sx={{ paddingBottom: 2, justifyContent: 'center' }}>
                            <Button size="medium" onClick={onClose} disableElevation>
                                Close
                                <ChevronRightOutlinedIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </DialogActions>
        </Dialog>
    );
}

TransactionsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    owner: PropTypes.string.isRequired,
}

export default TransactionsDialog;