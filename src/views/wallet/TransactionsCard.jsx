import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {CurrentUser} from "../../services/AuthUtils";
import SkeletonTransactionCard from "../../ui-component/cards/Skeleton/TransactionCard";

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import TransactionsDialog from "./TransactionsDialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";





// ==============================|| TRANSACTION CARD ||============================== //

const TransactionsCard = ({maxRows = 10}) => {
  const { transactions: jsonData } = useSelector((state) => state.transaction);
  const [isLoading, setLoading] = useState(true);
  const loggedInUserEmail = CurrentUser() ? CurrentUser().email : '';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (jsonData === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [jsonData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getAmountStyle = (transaction) => {
    if (transaction.senderEmail === loggedInUserEmail) {
      return { color: 'red' };
    } else if (transaction.receiverEmail === loggedInUserEmail) {
      return { color: 'green' };
    } else {
      return {};
    }
  };

  const readableKeys = {
    id: 'ID',
    creationDate: 'Date',
  //transactionOwner: 'Owner',
    senderEmail: 'Sender',
    receiverEmail: 'Receiver',
    amount: 'Amount',
    description: 'Description',
  };

  const keys = Object.keys(readableKeys);
  const sortedTransactions = isLoading
      ? []
      : [...jsonData.transactions].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, maxRows);

  return (
    <>
      {isLoading ? (
        <SkeletonTransactionCard />
      ) : sortedTransactions.length !== 0
          ? (
        <MainCard content={false}>
            <TableContainer >
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {keys.map((key) => (
                        <TableCell key={key}>{readableKeys[key]}</TableCell>
                    ))}
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id} hover>
                        {keys.map((key) => (
                            <TableCell key={key} sx={key === 'amount' ? getAmountStyle(transaction) : {}} >{transaction[key]}</TableCell>
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
          <Divider sx={{border: 0, height: 20}} />
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" onClick={handleClickOpen} disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
            <TransactionsDialog onClose={handleClose} transactions={jsonData.transactions} open={open} owner={loggedInUserEmail}/>
          </CardActions>
        </MainCard>
      )
      : (
        <MainCard>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" fontSize="large">No Transactions</Typography>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TransactionsCard.propTypes = {
    maxRows: PropTypes.number,
};

export default TransactionsCard;
