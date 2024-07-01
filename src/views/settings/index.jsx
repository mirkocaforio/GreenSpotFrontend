import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import {gridSpacing} from "../../store/constant";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import {Formik} from "formik";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {setAssignmentSettings} from "../../actions/settings";


const SettingsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {settings} = useSelector((state) => state.settings);

    const theme = useTheme();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        return dispatch(setAssignmentSettings({
            creditConstant: values.creditConstant
        }))
    }

    useEffect(() => {
        console.log(settings);
        if(settings){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [settings]);

    return (

        <MainCard>
            {isLoading ? (<Grid container justifyContent={"center"}>
                <Grid item xs={12}>
                    <SubCard title="Loading...">
                        <p>Settings are loading...</p>
                    </SubCard>
                </Grid>
            </Grid> ):(
            <Formik
                initialValues={{
                    creditConstant: !isLoading ? settings?.assignment?.creditConstant : 1.0,
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
                                </SubCard>
                            </Grid>
                            <Grid item container justifyContent={"flex-end"} xs={12} md={12} sm={12} lg={12}>
                                <AnimateButton>
                                    <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            )}
        </MainCard>

    )
}

export default SettingsPage