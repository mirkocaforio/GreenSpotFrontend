// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <div></div>
    <Typography variant="subtitle2" component={Link} href="https://github.com/mirkocaforio/GreenSpotFrontend" target="_blank" underline="hover">
      &copy; GreenSpot
    </Typography>
  </Stack>
);

export default AuthFooter;
