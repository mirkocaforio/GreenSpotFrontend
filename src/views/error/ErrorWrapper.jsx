// material-ui
import { styled } from '@mui/material/styles';

// project imports

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const ErrorWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    minHeight: '100vh'
}));

export default ErrorWrapper;
