import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../store/constant";
import SubCard from "../../ui-component/cards/SubCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";
import {Formik} from "formik";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import {updatePaymentSettings} from "../../actions/settings";
import {useDispatch} from "react-redux";
import SkeletonSettingsForm from "../../ui-component/cards/Skeleton/SettingsForm";

const PaymentSettingsForm = ({paymentSettings}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = (values) => {
        return dispatch(updatePaymentSettings({
            id: paymentSettings.id,
            mediumEnergyCost: values.mediumEnergyCost,
            mediumResourceConsumption: values.mediumResourceConsumption,
            changeConstant: values.changeConstant,
            delayInterest: values.delayInterest
        }))
    }

    useEffect(() => {
        if (paymentSettings) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [paymentSettings]);

    return (
        isLoading ? (
                <SkeletonSettingsForm/>
            )
            :
            (
                <Formik
                    initialValues={{
                        mediumEnergyCost: paymentSettings ? paymentSettings?.mediumEnergyCost : 0.1,
                        mediumResourceConsumption: paymentSettings ? paymentSettings?.mediumResourceConsumption : 0.1,
                        changeConstant: paymentSettings ? paymentSettings?.changeConstant : 0.1,
                        delayInterest: paymentSettings ? paymentSettings?.delayInterest : 0.1
                    }}
                    validationSchema={Yup.object().shape({
                        mediumEnergyCost: Yup.number().required("This field is required").min(0.01, "This field must be greater than 0"),
                        mediumResourceConsumption: Yup.number().required("This field is required").min(0.01, "This field must be greater than 0"),
                        changeConstant: Yup.number().required("This field is required").min(0.01, "This field must be greater than 0"),
                        delayInterest: Yup.number().required("This field is required").min(0.01, "This field must be greater than 0")
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        handleSubmit(values).then(() => {
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
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={12} sm={12} lg={12}>
                                    <SubCard title="Payment settings">
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.mediumEnergyCost && errors.mediumEnergyCost)}
                                            sx={{...theme.typography.customInput}}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-reward-image">
                                                Medium energy cost
                                            </InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="mediumEnergyCost"
                                                type="number"
                                                inputProps={{
                                                    step: 0.01
                                                }}
                                                value={values.mediumEnergyCost}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.mediumEnergyCost && errors.mediumEnergyCost)}
                                            />
                                            {touched.mediumEnergyCost && errors.mediumEnergyCost ? (
                                                    <FormHelperText error>
                                                        {errors.mediumEnergyCost}
                                                    </FormHelperText>) :
                                                (
                                                    <FormHelperText>
                                                        This is the actual medium energy cost
                                                    </FormHelperText>

                                                )}
                                        </FormControl>
                                        <FormControl fullWidth
                                                     error={Boolean(touched.mediumResourceConsumption && errors.mediumResourceConsumption)}
                                                     sx={{...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-reward-image">
                                                Medium resource consumption
                                            </InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="mediumResourceConsumption"
                                                type="number"
                                                inputProps={{
                                                    step: 0.01
                                                }}
                                                value={values.mediumResourceConsumption}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.mediumResourceConsumption && errors.mediumResourceConsumption)}
                                            />
                                            {touched.mediumResourceConsumption && errors.mediumResourceConsumption ? (
                                                    <FormHelperText error>
                                                        {errors.mediumResourceConsumption}
                                                    </FormHelperText>) :
                                                (
                                                    <FormHelperText>
                                                        This is the actual medium resource consumption in kWh
                                                    </FormHelperText>

                                                )}
                                        </FormControl>
                                        <FormControl fullWidth
                                                     error={Boolean(touched.changeConstant && errors.changeConstant)}
                                                     sx={{...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-reward-image">
                                                Money change constant
                                            </InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="changeConstant"
                                                type="number"
                                                inputProps={{
                                                    step: 0.01
                                                }}
                                                value={values.changeConstant}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.changeConstant && errors.changeConstant)}
                                            />
                                            {touched.changeConstant && errors.changeConstant ? (
                                                    <FormHelperText error>
                                                        {errors.changeConstant}
                                                    </FormHelperText>) :
                                                (
                                                    <FormHelperText>
                                                        This is the constant that determines how much money a user
                                                        pay.
                                                    </FormHelperText>

                                                )}
                                        </FormControl>
                                        <FormControl fullWidth
                                                     error={Boolean(touched.delayInterest && errors.delayInterest)}
                                                     sx={{...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-reward-image">
                                                Delay interest
                                            </InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="delayInterest"
                                                type="number"
                                                inputProps={{
                                                    step: 0.01
                                                }}
                                                value={values.delayInterest}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.delayInterest && errors.delayInterest)}
                                            />
                                            {touched.delayInterest && errors.delayInterest ? (
                                                    <FormHelperText error>
                                                        {errors.delayInterest}
                                                    </FormHelperText>) :
                                                (
                                                    <FormHelperText>
                                                        This is the delay interest that determines how much money a
                                                        user pay with overdue invoice.
                                                    </FormHelperText>

                                                )}
                                        </FormControl>
                                    </SubCard>
                                </Grid>
                                <Grid item container justifyContent={"flex-end"} xs={12} md={12} sm={12} lg={12}>
                                    <AnimateButton>
                                        <Button disabled={isSubmitting} variant="contained" color="primary"
                                                type="submit">
                                            Save
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            )
    );
}

PaymentSettingsForm.propTypes = {
    paymentSettings: PropTypes.object
}

export default PaymentSettingsForm;