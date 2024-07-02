import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../store/constant";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import {setAssignmentSettings} from "../../actions/settings";
import SubCard from "../../ui-component/cards/SubCard";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";


const CreditForm = ({data}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleSubmit = (values) => {
        return dispatch(setAssignmentSettings({
            creditConstant: values.creditConstant
        }))
    }

    return(
        <Formik
            initialValues={{
                creditConstant: data ? data?.creditConstant : 1.0,
            }}
            validationSchema={Yup.object().shape({
                creditConstant: Yup.number().required("This field is required").min(1.0, "This field must be greater than 0")
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
                            <SubCard title="Credit/Cost Conversion">
                                <FormControl fullWidth
                                             error={Boolean(touched.creditConstant && errors.creditConstant)}
                                             sx={{...theme.typography.customInput}}>
                                    <InputLabel htmlFor="outlined-adornment-reward-image">Work To Credit
                                        Conversion Constant</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        name="creditConstant"
                                        type="number"
                                        inputProps={{
                                            step: 0.01
                                        }}
                                        value={values.creditConstant}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.creditConstant && errors.creditConstant)}
                                    />
                                    {touched.creditConstant && errors.creditConstant ? (
                                            <FormHelperText error>
                                                {errors.creditConstant}
                                            </FormHelperText>) :
                                        (
                                            <FormHelperText>
                                                This is the constant that determines how much credit a
                                                user gets for a resource work.
                                            </FormHelperText>

                                        )}

                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item container justifyContent={"flex-end"} xs={12} md={12} sm={12}
                              lg={12}>
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
}

CreditForm.propTypes = {
    data: PropTypes.object
}


export default CreditForm;