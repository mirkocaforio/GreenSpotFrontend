import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import TaskInfoComponent from "./TaskInfoComponent";


const TaskInfo = ({ task, analytics, open, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="task-dialog-title" maxWidth="lg" fullWidth fullScreen={fullScreen} scroll="paper">
            <DialogTitle id="task-dialog-title" fontSize="medium">{task.name}</DialogTitle>
            <DialogContent dividers>
                <TaskInfoComponent values={task} analytics={analytics}/>
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
    analytics: PropTypes.object
};

export default TaskInfo;