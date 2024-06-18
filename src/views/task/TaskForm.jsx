
//react
import {Formik} from "formik";
import * as Yup from "yup";

// material-ui
import Grid from "@mui/material/Grid";
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import LinkIcon from '@mui/icons-material/Link';

// project imports
import SubCard from "../../ui-component/cards/SubCard";
import { gridSpacing } from 'store/constant';
import AnimateButton from "../../ui-component/extended/AnimateButton";
import Divider from "@mui/material/Divider";
import {useState} from "react";
import {useDispatch} from "react-redux";
import TaskModel from "../../services/TaskModel";

import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";


const TaskForm = ({task, handleAssign, action}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [fieldsValues, setFieldsValues] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    console.log(task);

    const handleConfirm = () => {
        const data =
            new TaskModel(fieldsValues?.taskTitle,
            null,
            fieldsValues?.maxCPower,
            fieldsValues?.maxTime,
            fieldsValues?.maxPower,
            fieldsValues?.maxCudaPower,
            fieldsValues?.minCudaPower,
            fieldsValues?.minCPower,
            fieldsValues?.minPower,
            fieldsValues?.minTime,
            fieldsValues?.description,
            fieldsValues?.script,
            task?.running,
            task?.enabled,
            task?.startTime,
            task?.endTime,
            task?.assignedResources,
            task?.id);
        console.log(data.toJson());
        dispatch(handleAssign(data.toJson())).then(() => {
            navigate('/task/list', { replace: true });
        });
        setOpen(false);
    }



    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <Formik
                    initialValues={{
                        taskTitle: task?.name,
                        script: task?.script,
                        description: task?.description,
                        maxTime: task?.taskDuration ? task.taskDuration : 0,
                        minTime: task?.minWorkingTime ? task.minWorkingTime : 0,
                        minCPower: task?.minComputingPower ? task.minComputingPower : 0,
                        maxCPower: task?.maxComputingPower ? task.maxComputingPower : 0,
                        minCudaPower: task?.minCudaPower ? task.minCudaPower : 0,
                        maxCudaPower: task?.maxCudaPower ? task.maxCudaPower : 0,
                        minPower: task?.minEnergyConsumption ? task.minEnergyConsumption : 0,
                        maxPower: task?.maxEnergyConsumption ? task.maxEnergyConsumption : 0,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        maxTime: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Task duration is required'),
                        minTime: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min working time is required'),
                        minCPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min computing power is required'),
                        maxCPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max computing power is required'),
                        minCudaPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min machine learning power is required'),
                        maxCudaPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max machine learning power is required'),
                        minPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Min power is required'),
                        maxPower: Yup.string().matches(/^\d*\.?\d*$/, 'Must be only digits').required('Max power is required'),
                        taskTitle: Yup.string().required('Task title is required'),
                        script: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Invalid URL').required('Payload link is required'),
                        description: Yup.string().required('Description is required')
                    })}
                    onSubmit={(values,{setSubmitting }) => {
                        setFieldsValues(values);
                        handleClickOpen();
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
                                    <SubCard title="Task details">
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
                                                <FormControl fullWidth error={Boolean(touched.maxTime && errors.maxTime)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-maxTime-register">Task Duration</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Task Duration"
                                                        name="maxTime"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxTime}
                                                    />
                                                    {touched.maxTime && errors.maxTime ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxTime}
                                                        </FormHelperText>
                                                    ) : (
                                                    <FormHelperText id="outlined-weight-helper-text">Task duration in seconds (time to elapse after which it is interrupted)</FormHelperText>
                                                    ) }
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth error={Boolean(touched.minTime && errors.minTime)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minTime-register">Min Working Time</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min"
                                                        name="minTime"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minTime}
                                                    />
                                                    {touched.minTime && errors.minTime ? (
                                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                                {errors.minTime}
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
                                                <FormControl fullWidth error={Boolean(touched.minCPower && errors.minCPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minPower-register">Min Computing Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Computing Power"
                                                        name="minCPower"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        step={0.1}
                                                        onChange={handleChange}
                                                        value={values.minCPower}
                                                    />
                                                    {touched.minCPower && errors.minCPower ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.minCPower}
                                                        </FormHelperText>
                                                    ) : (<FormHelperText id="outlined-weight-helper-text">es: 1000 - 5000</FormHelperText>)}
                                                </FormControl>

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.maxCPower && errors.maxCPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Max Computing Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Max Computing Power"
                                                        name="maxCPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxCPower}
                                                    />
                                                    {touched.maxCPower && errors.maxCPower && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxCPower}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.minCudaPower && errors.minCudaPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minPower-register">Min ML Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Machine Learning Power"
                                                        name="minCudaPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minCudaPower}
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
                                                <FormControl fullWidth error={Boolean(touched.minPower && errors.minPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-minPower-register">Min Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Min Power"
                                                        name="minPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.minPower}
                                                    />
                                                    {touched.minPower && errors.minPower ? (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.minPower}
                                                        </FormHelperText>
                                                    ) : (<FormHelperText id="outlined-weight-helper-text">es: 10 kW/h - 50 kW/h</FormHelperText>)}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth error={Boolean(touched.maxPower && errors.maxPower)} sx={{ ...theme.typography.customInput }}>
                                                    <InputLabel htmlFor="outlined-adornment-phone-register">Max Power</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        label="Max Power"
                                                        name="maxPower"
                                                        type="number"
                                                        step={0.1}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.maxPower}
                                                    />
                                                    {touched.maxPower && errors.maxPower && (
                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                            {errors.maxPower}
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
                                                            {action} Task
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
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure you want to create this task?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Confirm the creation of the task with the following details:
                                        <br/>
                                        <br/>
                                        <strong>Title:</strong> {values.taskTitle}
                                        <br/>
                                        <strong>Payload:</strong> {values.script}
                                        <br/>
                                        <strong>Description:</strong> {values.description}
                                        <br/>
                                        <strong>Task Duration:</strong> {values.maxTime}
                                        <br/>
                                        <strong>Min Working Time:</strong> {values.minTime}
                                        <br/>
                                        <strong>Min Computing Power:</strong> {values.minCPower}
                                        <br/>
                                        <strong>Max Computing Power:</strong> {values.maxCPower}
                                        <br/>
                                        <strong>Min Machine Learning Power:</strong> {values.minCudaPower}
                                        <br/>
                                        <strong>Max Machine Learning Power:</strong> {values.maxCudaPower}
                                        <br/>
                                        <strong>Min Power:</strong> {values.minPower}
                                        <br/>
                                        <strong>Max Power:</strong> {values.maxPower}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="error" onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleConfirm} autoFocus>
                                        {action}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>)};

TaskForm.propTypes = {
    task: PropTypes.object,
    handleAssign: PropTypes.func,
    action: PropTypes.string
};

export default TaskForm;