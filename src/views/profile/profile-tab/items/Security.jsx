
//react
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";

// material-ui
import Grid from "@mui/material/Grid";
import {Box, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";

// project imports
import SubCard from "../../../../ui-component/cards/SubCard";
import { gridSpacing } from 'store/constant';
import AlertBoxMsg from "../../../../ui-component/form/AlertBoxMsg";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import {strengthColor, strengthIndicator} from "../../../../utils/password-strength";
import {changePassword} from "../../../../actions/auth";


const SecurityTab = () => {
    const dispatch = useDispatch();

    const theme = useTheme();
    //const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    //const customization = useSelector((state) => state.customization);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePasswordField = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };


    const handleRecover = (values) => {
        return dispatch(changePassword(values.oldPassword, values.password)).then(
            () => {
                return Promise.resolve();
            },
            () => {
                return Promise.reject();
            }
        );
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <SubCard title="Change Password">
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">Choose a new password</Typography>
                        </Box>
                        <Formik
                            initialValues={{
                                oldPassword: '',
                                password: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                oldPassword: Yup.string().max(255).required('Old Password is required'),
                                password: Yup.string().max(255).required('Password is required')
                            })}
                            onSubmit={(values, {setSubmitting }) => {
                                setSubmitting(true);
                                handleRecover(values).then(() => {
                                    setSubmitting(false);
                                }).catch(() => {
                                    setSubmitting(false);
                                });

                            }} >
                            {({ errors,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                  touched,
                                  values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)} sx={{ ...theme.typography.customInput }}>
                                        <InputLabel htmlFor="outlined-adornment-old-password-login">Old Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-old-password-login"
                                            type={showOldPassword ? 'text' : 'password'}
                                            value={values.oldPassword}
                                            name="oldPassword"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowOldPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            inputProps={{}}
                                        />
                                        {touched.oldPassword && errors.oldPassword && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.oldPassword}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                                        <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePasswordField(e.target.value);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {strength !== 0 && (
                                        <FormControl fullWidth>
                                            <Box sx={{ mb: 2 }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                            {level?.label}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </FormControl>
                                    )}

                                    <AlertBoxMsg location="reset-password"/>

                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                                Change Password
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                </SubCard>
            </Grid>
        </Grid>)};


export default SecurityTab;