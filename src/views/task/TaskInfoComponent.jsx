import Grid from "@mui/material/Grid";
import SubCard from "../../ui-component/cards/SubCard";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {EnergySavingsLeafTwoTone, MemoryTwoTone} from "@mui/icons-material";
import {getTaskAnalytics} from "../../utils/analytics-range";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import {dateFormatBeauty} from "../../utils/date-beauty";


const TaskInfoComponent = ({ values, analytics }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            { analytics && (
                <Grid item xs={12}>
                    <SubCard title="Task Analytics">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid container spacing={2} alignItems="center" justifyItems={"center"}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" >Energy Saved</Typography>
                                    </Grid>
                                    <Grid item>
                                        <EnergySavingsLeafTwoTone fontSize={"large"} sx={{color: theme.palette.success.dark}}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">
                                            {getTaskAnalytics(analytics?.list, values?.id, "energyConsumption")} kW/h
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>

                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" >Computing Power Used</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MemoryTwoTone fontSize={"large"} sx={{color: theme.palette.orange.dark}}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">
                                            {getTaskAnalytics(analytics?.list, values?.id, "computingPower")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            )}
            <Grid item xs={12}>
                <SubCard title="Computing Power">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Max Computing Power</Typography>
                            <Typography variant="body1">{values?.maxComputingPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min Computing Power</Typography>
                            <Typography variant="body1">{values?.minComputingPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Max CUDA Power</Typography>
                            <Typography variant="body1">{values?.maxCudaPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min CUDA Power</Typography>
                            <Typography variant="body1">{values?.minCudaPower}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={6}>
                <SubCard title="Energy Consumption Params">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Max Energy Consumption</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">{values?.maxEnergyConsumption}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Min Energy Consumption</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">{values?.minEnergyConsumption}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={6}>
                <SubCard title={<>{"Task Time Params"}</>}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Task Duration</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">{values?.taskDuration}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Min Working Time</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">{values?.minWorkingTime}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Task Details">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" >Description</Typography>
                            <Typography variant="body1">{values?.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" >Script</Typography>
                            <Typography variant="body1">{values?.script}</Typography>
                        </Grid>
                        { values?.running !== undefined && (<>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" >Running</Typography>
                                <Typography variant="body1">{values?.running ? 'Yes' : 'No'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" >Enabled</Typography>
                                <Typography variant="body1">{values?.enabled ? 'Yes' : 'No'}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" >Start Time</Typography>
                                <Typography variant="body1">{dateFormatBeauty(values?.startTime, 'HH:mm - EEEE, d MMMM yyyy')}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" >End Time</Typography>
                                <Typography variant="body1">{dateFormatBeauty(values?.endTime, 'HH:mm - EEEE, d MMMM yyyy')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" >Assigned Resources</Typography>
                                <Typography variant="body1">{values?.assignedResources?.length}</Typography>
                            </Grid>
                        </>)}
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    )
}

TaskInfoComponent.propTypes = {
    values: PropTypes.object.isRequired,
    analytics: PropTypes.object,
}

export default TaskInfoComponent;