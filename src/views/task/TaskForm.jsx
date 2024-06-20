
//react
import {Formik} from "formik";
import * as Yup from "yup";
import {createRef, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

// material-ui
import Grid from "@mui/material/Grid";
import {
    Box,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import LinkIcon from '@mui/icons-material/Link';
import Divider from "@mui/material/Divider";
import {
    AccessAlarmOutlined,
    ArrowBackIosRounded,
    EnergySavingsLeafOutlined,
    WorkHistory,
    WorkHistoryOutlined
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";

// project imports
import SubCard from "../../ui-component/cards/SubCard";
import { gridSpacing } from 'store/constant';
import AnimateButton from "../../ui-component/extended/AnimateButton";
import TaskModel from "../../services/TaskModel";

import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import TaskInfoComponent from "./TaskInfoComponent";
import {IconCpu, IconInputAi} from "@tabler/icons-react";



const TaskForm = ({task, handleAssign, action}) => {

    const theme = useTheme();
    const ref = createRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fieldsValues, setFieldsValues] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Task Configuration', 'Recap'];

    const handleSubmit = () => {
        handleNext();
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };


    const handleConfirm = () => {
        const data =
            new TaskModel(fieldsValues?.taskTitle,
            null,
            fieldsValues?.maxComputingPower,
            fieldsValues?.taskDuration,
            fieldsValues?.maxEnergyConsumption,
            fieldsValues?.maxCudaPower,
            fieldsValues?.minCudaPower,
            fieldsValues?.minComputingPower,
            fieldsValues?.minEnergyConsumption,
            fieldsValues?.minWorkingTime,
            fieldsValues?.description,
            fieldsValues?.script,
            task?.running,
            task?.enabled,
            task?.startTime,
            task?.endTime,
            task?.assignedResources,
            task?.id);

        dispatch(handleAssign(data.toJson())).then(() => {
            navigate('/task/list', { replace: true });
        });

    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);



    return (
        <Grid container spacing={gridSpacing} justify = "center" ref={ref}>
            <Grid item xs={12} sm={3}/>
            <Grid item xs={12} sm={6}>
                <Stepper activeStep={activeStep} >
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item xs={12} sm={3}/>
            { activeStep === steps.length ? (
                <Grid item xs={12} sm={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ mt: 2, mb: 2 }}>All steps completed - you&apos;re finished</Typography>
                    </Box>
                </Grid>
                )
                : activeStep === 0 ? (
            <Grid item xs={12} sm={12}>
                <Formik
                    initialValues={ fieldsValues ? fieldsValues : {
                        taskTitle: task?.name ? task.name : '',
                        script: task?.script ? task.script : '',
                        description: task?.description ? task.description : '',
                        taskDuration: task?.taskDuration ? task.taskDuration : 0.0,
                        minWorkingTime: task?.minWorkingTime ? task.minWorkingTime : 0.0,
                        minComputingPower: task?.minComputingPower ? task.minComputingPower : 0.0,
                        maxComputingPower: task?.maxComputingPower ? task.maxComputingPower : 0.0,
                        minCudaPower: task?.minCudaPower ? task.minCudaPower : 0.0,
                        maxCudaPower: task?.maxCudaPower ? task.maxCudaPower : 0.0,
                        minEnergyConsumption: task?.minEnergyConsumption ? task.minEnergyConsumption : 0.0,
                        maxEnergyConsumption: task?.maxEnergyConsumption ? task.maxEnergyConsumption : 0.0,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        taskDuration: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Task duration is required'),
                        minWorkingTime: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min working time is required'),
                        minComputingPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min computing power is required'),
                        maxComputingPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max computing power is required'),
                        minCudaPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min machine learning power is required'),
                        maxCudaPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max machine learning power is required'),
                        minEnergyConsumption: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min power is required'),
                        maxEnergyConsumption: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max power is required'),
                        taskTitle: Yup.string().required('Task title is required'),
                        script: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Invalid URL').required('Payload link is required'),
                        description: Yup.string().required('Description is required')
                    })}
                    onSubmit={(values,{setSubmitting }) => {
                        setFieldsValues(values);
                        handleSubmit();
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
                                <Grid item xs={12} sm={12}>
                                    <SubCard title="Task Details">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.taskTitle && errors.taskTitle)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-task-title-register">Title</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Task Title"
                                                        name="taskTitle"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.taskTitle}
                                                    />
                                                    {touched.taskTitle && errors.taskTitle && (
                                                        <FormHelperText error id="standard-weight-helper-text--name">
                                                            {errors.taskTitle}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.script && errors.script)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-script-register">Payload link</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Payload"
                                                        name="script"
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        endAdornment={<LinkIcon/>}
                                                        value={values.script}
                                                    />
                                                    {touched.script && errors.script && (
                                                        <FormHelperText error id="standard-weight-helper-text--surname">
                                                            {errors.script}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                                    <InputLabel htmlFor="outlined-adornment-description-register">Description</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        label="Description"
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.description}
                                                    />
                                                    {touched.description && errors.description && (
                                                        <FormHelperText error id="standard-weight-helper-text--birthDate">
                                                            {errors.description}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Working Time">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="body1">Determine the task&apos;s duration and the minimum working time for a resource to be assigned to it.</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.taskDuration && errors.taskDuration)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-taskDuration-register">Task Duration</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Task Duration"
                                                        name="taskDuration"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.taskDuration}
                                                        endAdornment={<AccessAlarmOutlined/>}
                                                    />
                                                    {touched.taskDuration && errors.taskDuration ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.taskDuration}
                                                        </FormHelperText>
                                                    ) : (
                                                    <FormHelperText id="outlined-weight-helper-text">Task duration in seconds (time to elapse after which it is interrupted)</FormHelperText>
                                                    ) }
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.minWorkingTime && errors.minWorkingTime)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minWorkingTime-register">Min Working Time</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min"
                                                        name="minWorkingTime"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minWorkingTime}
                                                        endAdornment={<WorkHistoryOutlined/>}
                                                    />
                                                    {touched.minWorkingTime && errors.minWorkingTime ? (
                                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                                {errors.minWorkingTime}
                                                            </FormHelperText>
                                                        )
                                                        : (<FormHelperText id="outlined-weight-helper-text">es: 1800 (s)</FormHelperText>)}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SubCard title="Computational Power Parameters">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="body1">Determine the computing power and machine learning power required for the task.</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.minComputingPower && errors.minComputingPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minEnergyConsumption-register">Min Computing Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Computing Power"
                                                        name="minComputingPower"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        step={0.1}
                                                        onChange={handleChange}
                                                        value={values.minComputingPower}
                                                        endAdornment={<IconCpu/>}
                                                    />
                                                    {touched.minComputingPower && errors.minComputingPower ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.minComputingPower}
                                                        </FormHelperText>
                                                    ) : (<FormHelperText id="outlined-weight-helper-text">es: 1000 - 5000</FormHelperText>)}
                                                </FormControl>

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.maxComputingPower && errors.maxComputingPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Max Computing Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Max Computing Power"
                                                        name="maxComputingPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxComputingPower}
                                                        endAdornment={<IconCpu/>}
                                                    />
                                                    {touched.maxComputingPower && errors.maxComputingPower && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxComputingPower}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.minCudaPower && errors.minCudaPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minEnergyConsumption-register">Min ML Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Machine Learning Power"
                                                        name="minCudaPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minCudaPower}
                                                        endAdornment={<IconInputAi/>}
                                                    />
                                                    {touched.minCudaPower && errors.minCudaPower ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.minCudaPower}
                                                        </FormHelperText>
                                                    ) : (<FormHelperText id="outlined-weight-helper-text">es: 20000 - 60000</FormHelperText>)}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.maxCudaPower && errors.maxCudaPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Max ML Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Max Machine Learning Power"
                                                        name="maxCudaPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxCudaPower}
                                                        endAdornment={<IconInputAi/>}
                                                    />
                                                    {touched.maxCudaPower && errors.maxCudaPower && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxCudaPower}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <SubCard title="Energy Consumption">
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="body1">Determine the energy consumption range for the task.</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.minEnergyConsumption && errors.minEnergyConsumption)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minEnergyConsumption-register">Min Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Power"
                                                        name="minEnergyConsumption"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minEnergyConsumption}
                                                        endAdornment={<EnergySavingsLeafOutlined/>}
                                                    />
                                                    {touched.minEnergyConsumption && errors.minEnergyConsumption ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.minEnergyConsumption}
                                                        </FormHelperText>
                                                    ) : (<FormHelperText id="outlined-weight-helper-text">es: 10 kW/h - 50 kW/h</FormHelperText>)}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.maxEnergyConsumption && errors.maxEnergyConsumption)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Max Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Max Power"
                                                        name="maxEnergyConsumption"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxEnergyConsumption}
                                                        endAdornment={<EnergySavingsLeafOutlined/>}
                                                    />
                                                    {touched.maxEnergyConsumption && errors.maxEnergyConsumption && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxEnergyConsumption}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Typography variant="subtitle2">
                                                    Fill all fields to create a new task.
                                                </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <AnimateButton>
                                                        <Button type="submit" size="large" fullWidth disabled={isSubmitting} variant="contained" color="primary">
                                                            Next
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
                )
                : (<>
                    <Grid item xs={12} sm={12}>
                        <SubCard title="Task Recap" sx={{ backgroundColor: theme.palette.grey[50]}}>
                            <TaskInfoComponent values={fieldsValues}/>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                            <Stack direction="row" justifyContent="end" spacing={2}>
                                <AnimateButton>
                                    <Button size="large" color="primary" onClick={handleBack}>
                                        <ArrowBackIosRounded fontSize="small"/> Back
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button type="submit" size="large" onClick={
                                        () => {
                                            handleNext();
                                            handleConfirm();}
                                    } fullWidth variant="contained" color="primary">
                                        {action} Task
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </>
                )}
        </Grid>)};

TaskForm.propTypes = {
    task: PropTypes.object,
    handleAssign: PropTypes.func,
    action: PropTypes.string
};

export default TaskForm;