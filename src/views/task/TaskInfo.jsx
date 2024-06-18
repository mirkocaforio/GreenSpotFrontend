import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SubCard from "../../ui-component/cards/SubCard";


const TaskInfo = ({ task, open, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="task-dialog-title" maxWidth="lg" fullWidth fullScreen={fullScreen} scroll="paper">
            <DialogTitle id="task-dialog-title" fontSize="medium">{task.name}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SubCard title="Computing Power">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Max Computing Power</Typography>
                                    <Typography variant="body1">{task.maxComputingPower}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Min Computing Power</Typography>
                                    <Typography variant="body1">{task.minComputingPower}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Max CUDA Power</Typography>
                                    <Typography variant="body1">{task.maxCudaPower}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Min CUDA Power</Typography>
                                    <Typography variant="body1">{task.minCudaPower}</Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={6}>
                        <SubCard title="Energy Consumption">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Max Energy Consumption</Typography>
                                    <Typography variant="body1">{task.maxEnergyConsumption}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Min Energy Consumption</Typography>
                                    <Typography variant="body1">{task.minEnergyConsumption}</Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={6}>
                        <SubCard title="Task Time Params">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Task Duration</Typography>
                                    <Typography variant="body1">{task.taskDuration}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Min Working Time</Typography>
                                    <Typography variant="body1">{task.minWorkingTime}</Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Task Details">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Description</Typography>
                                    <Typography variant="body1">{task.description}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" >Script</Typography>
                                    <Typography variant="body1">{task.script}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Running</Typography>
                                    <Typography variant="body1">{task.running ? 'Yes' : 'No'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Enabled</Typography>
                                    <Typography variant="body1">{task.enabled ? 'Yes' : 'No'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Start Time</Typography>
                                    <Typography variant="body1">{task.startTime}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >End Time</Typography>
                                    <Typography variant="body1">{task.endTime}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Assigned Resources</Typography>
                                    <Typography variant="body1">{task.assignedResources}</Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

TaskInfo.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
};

export default TaskInfo;