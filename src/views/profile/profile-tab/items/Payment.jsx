import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {gridSpacing} from "../../../../store/constant";
import Grid from "@mui/material/Grid";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import SubCard from "../../../../ui-component/cards/SubCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormDatePicker from "../../../../ui-component/extended/DatePicker";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";
import {updateProfile} from "../../../../actions/profile";
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/lib/styles.scss";
import {useState} from "react";
import DialogContentText from "@mui/material/DialogContentText";
import moment from "moment";

const PaymentTab = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {profile} = useSelector((state) => state.profile);
    const [focus, setFocus] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
    };

    const handleInputFocus = (e) => {
        const name = e.target.name;
        let focusField;
        switch (name) {
            case 'cardNumber':
                focusField = 'number';
                break;
            case 'cardExpiryDate':
                focusField = 'expiry';
                break;
            case 'cardCvv':
                focusField = 'cvc';
                break;
            default:
                focusField = name;
                break;
        }
        setFocus(focusField);
    }

    function handleUpdate(values) {
        return dispatch(updateProfile(
            profile.name,
            profile.surname,
            profile.birthDate,
            profile.residenceCity,
            profile.residenceAddress,
            profile.phoneNumber,
            profile.fiscalCode,
            values.cardNumber,
            values.cardExpiryDate,
            values.cardCvv)
        ).then(() => {
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
                        name: profile?.name ? profile.name : '',
                        surname: profile?.surname ? profile.surname : '',
                        cardNumber: profile?.cardNumber ? profile.cardNumber : '',
                        cardExpiryDate: profile?.cardExpiryDate ? profile.cardExpiryDate : '',
                        cardCvv: profile?.cardCvv ? profile.cardCvv : '',
                    }}
                    validationSchema={Yup.object().shape({
                        cardNumber: Yup.string()
                            .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
                            .required('Card Number is required'),
                        cardExpiryDate: Yup.string()
                            .required('Expiry Date is required')
                            .test('expiryDate', 'Expiry Date cannot be in the past or invalid', function (value) {
                                if (!value) return false;
                                const expiryDate = moment(value, "MM/YY");
                                const now = moment();
                                return expiryDate.isValid() && expiryDate.isSameOrAfter(now, 'month');
                            }),
                        cardCvv: Yup.string()
                            .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
                            .required('CVV is required')
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        handleUpdate(values).then(() => {
                            handleConfirm();
                            setSubmitting(false);
                        }).catch(() => {
                            handleConfirm();
                            setSubmitting(false);
                        });
                    }}>
                    {({
                          errors,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          values
                      }) => (
                        <Form noValidate>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Payment method">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth
                                                             error={Boolean(touched.surname && errors.surname)}
                                                             sx={{...theme.typography.customInput}}>
                                                    <InputLabel htmlFor="outlined-adornment-surname-register">Card
                                                        Holder Surname</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        disabled
                                                        label="Card Holder Surname"
                                                        name="surname"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        onFocus={handleInputFocus}
                                                        value={values.surname}
                                                    />
                                                    {touched.surname && errors.surname && (
                                                        <FormHelperText error id="standard-weight-helper-text--surname">
                                                            {errors.surname}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.name && errors.name)}
                                                             sx={{...theme.typography.customInput}}>
                                                    <InputLabel htmlFor="outlined-adornment-name-register">Card Holder
                                                        Name</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        disabled
                                                        label="Card Holder Name"
                                                        name="name"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        onFocus={handleInputFocus}
                                                        value={values.name}
                                                    />
                                                    {touched.name && errors.name && (
                                                        <FormHelperText error id="standard-weight-helper-text--name">
                                                            {errors.name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth
                                                             error={Boolean(touched.cardNumber && errors.cardNumber)}
                                                             sx={{...theme.typography.customInput}}>
                                                    <InputLabel htmlFor="outlined-adornment-city-register">Card
                                                        Number</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Card Number"
                                                        name="cardNumber"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        onFocus={handleInputFocus}
                                                        value={values.cardNumber}
                                                        inputProps={{maxLength: 16}}
                                                    />
                                                    {touched.cardNumber && errors.cardNumber && (
                                                        <FormHelperText error
                                                                        id="standard-weight-helper-text--register">
                                                            {errors.cardNumber}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth
                                                             error={Boolean(touched.cardExpiryDate && errors.cardExpiryDate)}
                                                             sx={{...theme.typography.dateInput}}>
                                                    <FormDatePicker
                                                        label={"Expiry Date"}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                        handleFocus={handleInputFocus}
                                                        valueName={"cardExpiryDate"}
                                                        value={values.cardExpiryDate}
                                                        dataFormat={"MM/YYYY"}
                                                        outputFormat={"MM/YY"}
                                                    />
                                                    {touched.cardExpiryDate && errors.cardExpiryDate && (
                                                        <FormHelperText error
                                                                        id="standard-weight-helper-text--birthDate">
                                                            {errors.cardExpiryDate}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth
                                                             error={Boolean(touched.cardCvv && errors.cardCvv)}
                                                             sx={{...theme.typography.customInput}}>
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-address-register">CVV</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="CVV"
                                                        name="cardCvv"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        onFocus={handleInputFocus}
                                                        value={values.cardCvv}
                                                        inputProps={{maxLength: 4}}
                                                    />
                                                    {touched.cardCvv && errors.cardCvv && (
                                                        <FormHelperText error
                                                                        id="standard-weight-helper-text--register">
                                                            {errors.cardCvv}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Card Preview">
                                        <Cards
                                            number={values.cardNumber}
                                            expiry={values.cardExpiryDate}
                                            cvc={values.cardCvv}
                                            name={values.surname + ' ' + values.name}
                                            focused={focus}
                                        />
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <SubCard title="Advanced Settings">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12}>
                                                <Typography variant="body1">
                                                    Change your payment method
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <AnimateButton>
                                                        <Button
                                                            disabled={isSubmitting}
                                                            onClick={handleClickOpen}
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Confirm Changes"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to save these changes?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <AnimateButton>
                                        <Button
                                            onClick={() => {
                                                handleClose();
                                                setSubmitting(false);
                                            }}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button onClick={handleSubmit} color="primary">
                                            Confirm
                                        </Button>
                                    </AnimateButton>
                                </DialogActions>
                            </Dialog>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

export default PaymentTab;