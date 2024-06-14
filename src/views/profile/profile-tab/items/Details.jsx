
//react
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import * as Yup from "yup";

// material-ui
import Grid from "@mui/material/Grid";
import {Box, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";

// project imports
import SubCard from "../../../../ui-component/cards/SubCard";
import { gridSpacing } from 'store/constant';
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import FormDatePicker from "../../../../ui-component/extended/DatePicker";
import Divider from "@mui/material/Divider";
import {updateProfile} from "../../../../actions/profile";


const DetailsTab = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);


    function handleRegister(values) {
        return dispatch(updateProfile(values.name, values.surname, values.birthDate, values.city, values.address, values.phone, values.fiscalCode)).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <Formik
                    initialValues={{
                        birthDate: profile ? profile.birthDate : '',
                        name: profile ? profile.name : '',
                        surname: profile ? profile.surname : '',
                        phone: profile ? profile.phoneNumber : '',
                        city: profile ? profile.residenceCity : '',
                        address: profile ? profile.residenceAddress : '',
                        fiscalCode: (profile && profile.fiscalCode !== null) ? profile.fiscalCode : '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        birthDate: Yup.string().max(255).required('Date is required'),
                        name: Yup.string().max(255).required('Last Name is required'),
                        surname: Yup.string().max(255).required('First Name is required'),
                        phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
                        city: Yup.string().max(255).required('City is required'),
                        address: Yup.string().max(255).required('Address is required')
                    })}
                    onSubmit={(values,{setSubmitting }) => {
                        setSubmitting(true);
                        handleRegister(values).then(() => {
                            setSubmitting(false);
                        }).catch(() => {
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
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Personal information">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-name-register">First Name</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="First Name"
                                                        name="name"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.name}
                                                    />
                                                    {touched.name && errors.name && (
                                                        <FormHelperText error id="standard-weight-helper-text--name">
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
                                                    />
                                                    {touched.surname && errors.surname && (
                                                        <FormHelperText error id="standard-weight-helper-text--surname">
                                                            {errors.surname}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.birthDate && errors.birthDate)} sx={{ ...theme.typography.dateInput }}>
                                                    <FormDatePicker label={"Birthdate"} handleBlur={handleBlur} handleChange={handleChange} valueName={"birthDate"} value={values.birthDate}/>
                                                    {touched.birthDate && errors.birthDate && (
                                                        <FormHelperText error id="standard-weight-helper-text--birthDate">
                                                            {errors.birthDate}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
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
                                                    />
                                                    {touched.address && errors.address && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.address}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth error={Boolean(touched.fiscalCode && errors.fiscalCode)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-fiscalCode-register">Fiscal Code</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Fiscal Code"
                                                        name="fiscalCode"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.fiscalCode}
                                                    />
                                                    {touched.fiscalCode && errors.fiscalCode && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.fiscalCode}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Contact Information">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={profile ? profile.email : ''}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Phone Number"
                                                        name="phone"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                    />
                                                    {touched.phone && errors.phone && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.phone}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <SubCard title="Advanced Settings">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12}>
                                                <Typography variant="body1">
                                                    Change your account information and settings
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <AnimateButton>
                                                        <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
                                                            Save Changes
                                                        </Button>
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>)};


export default DetailsTab;