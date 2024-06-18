import TaskForm from "./TaskForm";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import MainCard from "../../ui-component/cards/MainCard";
import {updateTask} from "../../actions/task";
import Button from "@mui/material/Button";


const TaskUpdate = ({open, onClose, task}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="task-dialog-title" maxWidth="lg" fullWidth fullScreen={fullScreen} scroll="paper">
            <DialogTitle id="task-dialog-title" fontSize="medium">Task Update</DialogTitle>
            <DialogContent dividers>
                <MainCard>
                    <TaskForm action="Update" task={task} handleAssign={updateTask}/>
                </MainCard>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

TaskUpdate.propTypes = {
    task: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default TaskUpdate;
