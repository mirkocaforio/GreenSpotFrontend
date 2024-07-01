import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../store/constant";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import LinkIcon from "@mui/icons-material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";


const CreditForm = ({isLoading, data}) => {

    const theme = useTheme();

    return(
            <Formik
                initialValues={{
                    creditConstant: data ? data?.creditConstant : 0.0,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                })}
                onSubmit={(values,{setSubmitting }) => {
                    setSubmitting(true);
                    handleSubmit(values);
                    setSubmitting(false);
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
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.creditConstant && errors.creditConstant)} sx={{ ...theme.typography.customInput }} >
                                    <InputLabel htmlFor="outlined-adornment-reward-image">Image</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        name="creditConstant"
                                        type="number"
                                        step={0.01}
                                        value={values.image}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.creditConstant && errors.creditConstant)}
                                    />
                                    {touched.creditConstant && errors.creditConstant && (
                                        <FormHelperText error>
                                            {errors.creditConstant}
                                        </FormHelperText>)}

                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
    )
}

CreditForm.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
}


export default CreditForm;