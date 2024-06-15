import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

// project imports
import MainCard from 'ui-component/cards/MainCard';


// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import {useSelector} from "react-redux";
import {CurrentUser} from "../../services/AuthUtils";
import {useEffect, useState} from "react";
import SkeletonTransactionCard from "../../ui-component/cards/Skeleton/TransactionCard";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ==============================|| TRANSACTION CARD ||============================== //

const TransactionsCard = () => {
  const { transactions: jsonData } = useSelector((state) => state.transaction);
  const [isLoading, setLoading] = useState(true);
  const loggedInUserEmail = CurrentUser() ? CurrentUser().email : '';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (jsonData === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [jsonData]);

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
    senderEmail: 'Sender',
    receiverEmail: 'Receiver',
    transactionOwner: 'Owner',
    amount: 'Amount',
    description: 'Description',
  };

  const keys = Object.keys(readableKeys);

  return (
    <>
      {isLoading ? (
        <SkeletonTransactionCard />
      ) : (
        <MainCard content={false}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%", overflow: 'auto' , wordBreak: 'break-word'}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {keys.map((key) => (
                      <TableCell key={key}>{readableKeys[key]}</TableCell>
                  ))}
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.transactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      {keys.map((key) => (
                          <TableCell key={key} sx={key === 'amount' ? getAmountStyle(transaction) : {}}>{transaction[key]}</TableCell>
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
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

TransactionsCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TransactionsCard;
