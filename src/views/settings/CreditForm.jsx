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
import {setAssignmentSettings} from "../../actions/settings";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import SkeletonSettingsForm from "../../ui-component/cards/Skeleton/SettingsForm";

export const CreditForm = ({settings}) => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = (values) => {
        return dispatch(setAssignmentSettings({
            creditConstant: values.creditConstant
        }))
    }

    useEffect(() => {
        if(settings){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [settings]);

    return (
        isLoading ? (
            <SkeletonSettingsForm/>
        ) : (
        <Formik
            initialValues={{
                creditConstant: settings ? settings?.creditConstant : 1.0,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                creditConstant: Yup.number().required("This field is required").min(1.0, "This field must be greater than 0")
            })}
            onSubmit={(values,{setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values).then(() => {
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
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <SubCard title="Credit/Cost Conversion">
                                <FormControl fullWidth error={Boolean(touched.creditConstant && errors.creditConstant)} sx={{ ...theme.typography.customInput }} >
                                    <InputLabel htmlFor="outlined-adornment-reward-image">Work To Credit Conversion Constant</InputLabel>
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
                                                This is the constant that determines how much credit a user gets for a resource work.
                                            </FormHelperText>

                                        )}

                                </FormControl>
                                <Grid item container justifyContent={"flex-end"} xs={12} md={12} sm={12} lg={12}>
                                    <AnimateButton>
                                        <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">
                                            Save
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
        )
    )
}

CreditForm.propTypes = {
    settings: PropTypes.object.isRequired
};

export default CreditForm;