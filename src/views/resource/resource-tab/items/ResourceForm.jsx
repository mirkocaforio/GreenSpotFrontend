import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {insertResource} from "../../../../actions/resource";
import {gridSpacing} from "../../../../store/constant";
import Grid from "@mui/material/Grid";
import {Form, Formik} from "formik";
import SubCard from "../../../../ui-component/cards/SubCard";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Autocomplete} from "@mui/material";
import Divider from "@mui/material/Divider";
import AvailabilityPicker from "./AvailabilityPicker";
import Box from "@mui/material/Box";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const ResourceForm = ({cpuNameList, gpuNameList}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const [socNameList, setSocNameList] = useState([]);
    const types = [{type: "CPU"}, {type: "GPU"}, {type: "SoC"}];
    const greenEnergyTypes = [{type: "Photovoltaic"}, {type: "Solar Thermal"}, {type: "Biomass"}, {type: "Geothermal"}, {type: "Non-Renewable"}];
    const [nameList, setNameList] = useState([]);

    useEffect(() => {
        if (cpuNameList.length > 0) {
            setSocNameList(cpuNameList.filter(item => item.name.includes('Apple')));
        }
    }, [cpuNameList]);

    const handleResourceTypeChange = (event) => {
        const selectedType = event.target.value;
        switch (selectedType) {
            case 'CPU':
                setNameList(cpuNameList);
                break;
            case 'GPU':
                setNameList(gpuNameList);
                break;
            case 'SoC':
                setNameList(socNameList);
                break;
            default:
                setNameList([]);
        }
    };

    const initialValues = {
        type: '',
        name: '',
        greenEnergyType: '',
        kwh: '',
        country: '',
        region: '',
        city: '',
        availability: [],
        isAvailable: ''
    };

    const validationSchema = Yup.object().shape({
        type: Yup.string().oneOf(types.map(type => type.type), `Resource type must be one of ${types.map(type => type.type).join(', ')}`).required('Type is required'),
        name: Yup.object().shape({
            name: Yup.string().oneOf(nameList.map(item => item.name), `Resource name must be one of ${nameList.map(item => item.name).join(', ')}`).required('Resource name is required')
        }),
        greenEnergyType: Yup.string().oneOf(greenEnergyTypes.map(type => type.type), `Green energy supply must be one of ${greenEnergyTypes.map(type => type.type).join(', ')}`).required('Green energy supply is required'),
        country: Yup.string().required('Country is required'),
        region: Yup.string().required('Region is required'),
        city: Yup.string().required('City is required'),
        availability: Yup.array().of(
            Yup.object().shape({
                dayOfWeek: Yup.string().required(),
                startTime: Yup.string().required(),
                endTime: Yup.string().required()
            })
        ).required('Availability period is required'),
        kwh: Yup.number().required('kWh consumed is required'),
        isAvailable: Yup.string().required('Availability status is required')
    });

    const handleInsertResource = (values) => {
        return dispatch(insertResource(
            values.name.name,
            values.type.toLowerCase(),
            values.greenEnergyType,
            values.country,
            values.region,
            values.city,
            values.availability,
            values.kwh,
            user?.email,
            values.isAvailable === 'true'
        )).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        handleInsertResource(values)
                            .then(() => {
                                setSubmitting(false);
                            }).catch(() => {
                            setSubmitting(false);
                        });
                    }}
                >
                    {({
                          values,
                          errors,
                          handleBlur,
                          handleChange,
                          submitForm,
                          resetForm,
                          isSubmitting,
                          touched
                      }) => (
                        <Form noValidate>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12}>
                                    <SubCard title={"Resource information"}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="type"
                                                        label="Resource type"
                                                        select
                                                        error={touched.type && !!errors.type}
                                                        value={values.type}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleResourceTypeChange(e);
                                                        }}
                                                        helperText="Please insert the resource type"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    >
                                                        {types.map((item, index) => (
                                                            <MenuItem key={index} value={item.type}>
                                                                {item.type}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    <Autocomplete
                                                        fullWidth
                                                        name="name"
                                                        options={nameList}
                                                        getOptionLabel={(item) => item ? item.name : ""}
                                                        value={values.name ? values.name : null}
                                                        onBlur={handleBlur}
                                                        onChange={(event, newValue) => {
                                                            handleChange({
                                                                target: {
                                                                    name: 'name',
                                                                    value: newValue
                                                                }
                                                            });
                                                        }}
                                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                name="name"
                                                                error={touched['name'] && !!errors['name']}
                                                                helperText={"Please insert the resource name"}
                                                                label="Resource name"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="greenEnergyType"
                                                        label="Green energy supply"
                                                        select
                                                        error={touched.greenEnergyType && !!errors.greenEnergyType}
                                                        value={values.greenEnergyType}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please insert the energy supply"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    >
                                                        {greenEnergyTypes.map((item, index) => (
                                                            <MenuItem key={index} value={item.type}>
                                                                {item.type}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="kwh"
                                                        label="Consumed kWh"
                                                        type="number"
                                                        value={values.kwh}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please insert the kWh consumed by the resource"
                                                        error={touched.kwh && !!errors.kwh}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>

                                    <Divider variant="middle" sx={{my: 2}}/>

                                    <SubCard title={"Location information"}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="country"
                                                        label="Country"
                                                        value={values.country}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please insert the country"
                                                        error={touched.country && !!errors.country}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="region"
                                                        label="Region"
                                                        value={values.region}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please insert the region"
                                                        error={touched.region && !!errors.region}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="city"
                                                        label="City"
                                                        value={values.city}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please insert the city"
                                                        error={touched.city && !!errors.city}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>

                                    <Divider variant="middle" sx={{my: 2}}/>

                                    <SubCard title={"Availability information"}>
                                        <Grid container spacing={gridSpacing}>
                                            {/*TODO: VEDERE COME SI PUO' SISTEMARE l'onBlur e gli errori*/}
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    <AvailabilityPicker
                                                        fullWidth
                                                        name="availability"
                                                        label={"Availability period"}
                                                        helperText={"Please set availability period"}
                                                        value={values.availability ? values.availability : null}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        error={touched.availability && !!errors.availability}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        name="isAvailable"
                                                        label="Resource Availability"
                                                        select
                                                        error={touched.isAvailable && !!errors.isAvailable}
                                                        value={values.isAvailable}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText="Please set the resource availability"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    >
                                                        <MenuItem value={"true"}>Available</MenuItem>
                                                        <MenuItem value={"false"}>Not Available</MenuItem>
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>

                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} sm={12}>
                                            <Box
                                                sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                                                <AnimateButton>
                                                    <Button
                                                        type="reset"
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={isSubmitting}
                                                        onClick={() => {
                                                            resetForm();
                                                        }}
                                                    >
                                                        Reset
                                                    </Button>
                                                </AnimateButton>
                                                <AnimateButton>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        onClick={submitForm}
                                                        style={{marginLeft: '10px'}}
                                                    >
                                                        Submit
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

ResourceForm.propTypes = {
    cpuNameList: PropTypes.array,
    gpuNameList: PropTypes.array
};

export default ResourceForm;