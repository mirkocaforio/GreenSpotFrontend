import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import {register} from "../../../../actions/auth";

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Alert} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";


// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = () => {
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1500);
    }


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //name,surname,date,city,address,tel,email, password
  const handleRegister = (values) => {
    return dispatch(register(
        values.name,
        values.surname,
        values.birthDate+"T00:00:00",
        values.city,
        values.address,
        values.phone,
        values.email,
        values.password)).then(
      () => {
          //window.location.reload();
          return Promise.resolve();
      }).catch((error) => {
          return Promise.reject(error);
        }
    );
  }

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              Registration
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Fill all fields to complete registration</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          birthDate: '',
          name: '',
          surname: '',
          phone: '',
          city: '',
          address: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
            birthDate: Yup.string().max(255).required('Date is required'),
            name: Yup.string().max(255).required('Last Name is required'),
            surname: Yup.string().max(255).required('First Name is required'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits')
        })}
       onSubmit={(values,{setSubmitting, setErrors }) => {
           setSubmitting(true);
           handleRegister(values).then(() => {
               setSubmitting(false);
               setErrors({ success: 'Registration successful' });
               handleSuccess();
            }).catch((error) => {
                setErrors({ submit: error });
                setSubmitting(false);
            });
       }}>
        {({ errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-name-register">First Name</InputLabel>
                        <OutlinedInput
                          fullWidth
                          label="First Name"
                          name="name"
                          type="text"
                          onChange={handleChange}
                          value={values.name}
                        />
                      {touched.name && errors.name && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.name}
                          </FormHelperText>
                      )}
                  </FormControl>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.surname && errors.surname)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-surname-register">Last Name</InputLabel>
                        <OutlinedInput
                          fullWidth
                          label="Last Name"
                          name="surname"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.surname}
                          inputProps={{}}
                        />
                      {touched.surname && errors.surname && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.surname}
                          </FormHelperText>
                      )}
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth error={Boolean(touched.birthDate && errors.birthDate)} sx={{ ...theme.typography.dateInput }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                            id={"outlined-adornment-date-register"}
                            onChange={(data) => {
                                const formattedDate = dayjs(data).format('DD/MM/YY');
                                setDate(data);
                                handleChange({target: {name: "birthDate", value: formattedDate}});
                                console.log(formattedDate);}}
                            label={"Date of Birth"}
                            inputFormat="DD/MM/YYYY"
                            value={date}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}/>
                </LocalizationProvider>
                {/*<OutlinedInput id={"outlined-adornment-date-register"}
                               type="date"
                               value={values.birthDate}
                               name="birthDate"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               inputProps={{}}/>*/}
                {touched.birthDate && errors.birthDate && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.birthDate}
                    </FormHelperText>
                )}
            </FormControl>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(touched.city && errors.city)} sx={{ ...theme.typography.customInput }}>
                          <InputLabel htmlFor="outlined-adornment-city-register">City</InputLabel>
                          <OutlinedInput
                              fullWidth
                              label="City"
                              name="city"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.city}
                              inputProps={{}}
                          />
                          {touched.city && errors.city && (
                              <FormHelperText error id="standard-weight-helper-text--register">
                                  {errors.city}
                              </FormHelperText>
                          )}
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                          <InputLabel htmlFor="outlined-adornment-address-register">Address</InputLabel>
                          <OutlinedInput
                              fullWidth
                              label="Address"
                              name="address"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.address}
                              inputProps={{}}
                          />
                          {touched.address && errors.address && (
                              <FormHelperText error id="standard-weight-helper-text--register">
                                  {errors.address}
                              </FormHelperText>
                          )}
                      </FormControl>
                  </Grid>
              </Grid>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-phone-register"
                        type="text"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    />
                    {touched.phone && errors.phone && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.phone}
                        </FormHelperText>
                    )}
                </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
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

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
                {errors.submit && typeof errors.submit === 'string' && (
                  <Box sx={{ mt: 3 }}>
                      <Alert severity="error">{errors.submit}</Alert>
                  </Box>
                )}

              {errors.success && typeof errors.success === 'string' && (
                  <Box sx={{ mt: 3 }}>
                      <Alert severity="success">{errors.success}</Alert>
                  </Box>
              )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
