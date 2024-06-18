import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel
} from '@mui/material';
import {Visibility, Edit, BlockTwoTone, PauseCircleFilled, PlayArrowTwoTone} from '@mui/icons-material';
import TaskModel from "../../services/TaskModel";
import {useDispatch, useSelector} from "react-redux";
import SkeletonTransactionCard from "../../ui-component/cards/Skeleton/TransactionCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainCard from "../../ui-component/cards/MainCard";
import Chip from "@mui/material/Chip";
import {useTheme} from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {IconSearch} from "@tabler/icons-react";
import OutlinedInput from "@mui/material/OutlinedInput";
import TaskInfo from "./TaskInfo";
import TaskUpdate from "./TaskUpdate";
import {disableTask, enableTask, stopTask} from "../../actions/task";
import Tooltip from "@mui/material/Tooltip";


const TaskTable = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {tasks: tasksData} = useSelector((state) => state.tasks);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [isLoading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false);

    useEffect(() => {
        if(tasksData){
            const tasksDataDeb = tasksData.tasks.map(task => TaskModel.fromJson(task));
            setTasks(tasksDataDeb);
            setLoading(false);
        }else{
            setLoading(true);
        }
    }, [tasksData]);

    const handleViewClick = (task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleModifyClick = (task) => {
        setSelectedTask(task);
        setModifyDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setModifyDialogOpen(false);
        setSelectedTask(null);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleKillTask = (task) => {
        dispatch(stopTask(task));
    }

    const handlePauseTask = (task) => {
        dispatch(disableTask(task));
    }

    const handleResumeTask = (task) => {
        dispatch(enableTask(task));
    }

    const getTaskActions = (task) => {
        let actions = [];
        actions.push(
            <Tooltip title={"View"}>
                <IconButton aria-label="view" onClick={() => {
                handleViewClick(task);
            }}>
                <Visibility color="primary" />
            </IconButton>
            </Tooltip>);
        if(!task?.endTime && task?.enabled) {
            actions.push(
                <Tooltip title="Pause">
                    <IconButton key={"pause_" + task?.id} aria-label="pause" onClick={() => {
                    handlePauseTask(task);
                    }}>
                        <PauseCircleFilled color="warning"/>
                    </IconButton>
                </Tooltip>);
        }
        if(!task?.endTime && !task?.enabled) {
            actions.push(
                <Tooltip title="Resume">
                    <IconButton key={"play_"+task?.id} aria-label="play" onClick={() => {
                    handleResumeTask(task);
                    }}>
                        <PlayArrowTwoTone color="success"/>
                    </IconButton>
                </Tooltip>);
        }
        if(task?.running) {
            actions.push(
                <Tooltip title={"Kill"}>
                    <IconButton key={"stop_"+task?.id} aria-label="stop" onClick={() => {
                    handleKillTask(task);
                    }}>
                        <BlockTwoTone color="error"/>
                    </IconButton>
                </Tooltip>);
        }
        if(!task?.endTime) {
            actions.push(
                <Tooltip title={"Edit"}>
                    <IconButton key={"edit_"+task?.id} aria-label="edit" onClick={() => {
                        handleModifyClick(task);
                    }}>
                        <Edit color="secondary"/>
                    </IconButton>
                </Tooltip>);
        }

        return actions;
    }

    const getStatus = (status,enabled,endTime) => {

        if(endTime){
            return <Chip label="Completed" color="primary" variant="outlined" sx={{ cursor:"default"}} clickable />;
        } else if(status && enabled){
            return <Chip label="Running" color="success" variant="filled" sx={{ cursor:"default"}} clickable />;
        } else {
            return <Chip label="Pending" color="warning" variant="filled" sx={{ cursor:"default"}} clickable />;
        }
    }

    const handleRequestSort = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search.toLowerCase())
    );

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (orderBy === 'status') {
            if (a.running === b.running) return 0;
            return (a.running ? 1 : -1) * (order === 'asc' ? 1 : -1);
        } else {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
            return 0;
        }
    });

    return (<>
        { isLoading ? (<SkeletonTransactionCard />)
            : sortedTasks.length !== 0
                ? (
        <Paper>
            <Box sx={{padding: "0px 0px 0px 0px"}}>
                <OutlinedInput
                    sx={{ pr: 1, pl: 2, my: 2 }}
                    id="input-search-task"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search task by Name"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('name')}
                                >
                                    Task Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'assignedResources'}
                                    direction={orderBy === 'assignedResources' ? order : 'asc'}
                                    onClick={() => handleRequestSort('assignedResources')}
                                >
                                    Assigned Resources
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'status'}
                                    direction={orderBy === 'status' ? order : 'asc'}
                                    onClick={() => handleRequestSort('status')}
                                >
                                    Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTasks.map((task) => (
                            <TableRow key={task?.id} hover>
                                <TableCell>{task?.name}</TableCell>
                                <TableCell>{task?.assignedResources ? task?.assignedResources : 0 }</TableCell>
                                <TableCell>{getStatus(task?.running, task?.enabled, task?.endTime)}</TableCell>
                                <TableCell align="center">
                                    {getTaskActions(task)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedTask && (
                <>
                <TaskInfo task={selectedTask} open={dialogOpen} onClose={handleDialogClose} />
                <TaskUpdate task={selectedTask} open={modifyDialogOpen} onClose={handleDialogClose} />
                </>
            )}
        </Paper>)

            : (<MainCard>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontSize="large">No Tasks</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>)}
    </>);
};

export default TaskTable;
