import { Link } from 'react-router-dom';

// material-ui
//import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from "@mui/material/Divider";

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import {Logo64} from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { RECOVERY_PATH} from "../../../config";

import RecoveryPasswordForm from "./recovery-form/RecoveryPasswordForm";

// ================================|| PASSOWORD RESET ||================================ //

const RecoveryPassword = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));


    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="logo">
                                            <Logo64 />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                                        Reset your password
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                                                        Enter a new password for your account
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RecoveryPasswordForm />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to={RECOVERY_PATH} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Didn&apos;t receive the email?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default RecoveryPassword;
