import Grid from "@mui/material/Grid";
import SubCard from "../../ui-component/cards/SubCard";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";


const TaskInfoComponent = ({ values }) => {
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard title="Computing Power">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Max Computing Power</Typography>
                            <Typography variant="body1">{values.maxComputingPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min Computing Power</Typography>
                            <Typography variant="body1">{values.minComputingPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Max CUDA Power</Typography>
                            <Typography variant="body1">{values.maxCudaPower}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min CUDA Power</Typography>
                            <Typography variant="body1">{values.minCudaPower}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={6}>
                <SubCard title="Energy Consumption">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Max Energy Consumption</Typography>
                            <Typography variant="body1">{values.maxEnergyConsumption}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min Energy Consumption</Typography>
                            <Typography variant="body1">{values.minEnergyConsumption}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={6}>
                <SubCard title="Task Time Params">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Task Duration</Typography>
                            <Typography variant="body1">{values.taskDuration}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Min Working Time</Typography>
                            <Typography variant="body1">{values.minWorkingTime}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Task Details">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" >Description</Typography>
                            <Typography variant="body1">{values.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" >Script</Typography>
                            <Typography variant="body1">{values.script}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Running</Typography>
                            <Typography variant="body1">{values.running ? 'Yes' : 'No'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Enabled</Typography>
                            <Typography variant="body1">{values.enabled ? 'Yes' : 'No'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Start Time</Typography>
                            <Typography variant="body1">{values.startTime}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >End Time</Typography>
                            <Typography variant="body1">{values.endTime}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Assigned Resources</Typography>
                            <Typography variant="body1">{values?.assignedResources.length}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    )
}

TaskInfoComponent.propTypes = {
    values: PropTypes.object.isRequired
}

export default TaskInfoComponent;