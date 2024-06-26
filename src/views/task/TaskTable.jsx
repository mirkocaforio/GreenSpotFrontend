import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

// material-ui
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel, CircularProgress
} from '@mui/material';
import {
    BlockTwoTone,
    PlayArrowTwoTone,
    EditTwoTone, VisibilityTwoTone, PauseCircleTwoTone
} from '@mui/icons-material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {useTheme} from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {IconSearch} from "@tabler/icons-react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import CardActions from "@mui/material/CardActions";

// project
import TaskModel from "../../services/Model/TaskModel";
import SkeletonTransactionCard from "../../ui-component/cards/Skeleton/TransactionCard";
import TaskInfo from "./TaskInfo";
import TaskUpdate from "./TaskUpdate";
import {disableTask, enableTask, stopTask} from "../../actions/task";
import Paging from "../../ui-component/table/Paging";

// third-party
import {useDispatch, useSelector} from "react-redux";
import CircularProgressBar from "../../ui-component/CircularProgress";
import {getAnalyticsRange, getTaskAnalytics} from "../../utils/analytics-range";


const TaskTable = ({maxRows = 2}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {tasks: tasksData} = useSelector((state) => state.tasks);

    const {tasksAnalytics} = useSelector((state) => state.analytics);
    const [analyticsRange, setAnalyticsRange] = useState({});
    const [isAnalyticsLoading, setAnalyticsLoading] = useState(true);

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [isLoading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
    const [rowsPerPage,setMaxRows] = useState(maxRows);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if(tasksData){
            const tasksDataDeb = tasksData.tasks.map(task => TaskModel.fromJson(task));
            setTasks(tasksDataDeb);
            setLoading(false);
        }else{
            setLoading(true);
        }

        if(tasksAnalytics){
            setAnalyticsLoading(false);
            setAnalyticsRange({
                computingPower: getAnalyticsRange(tasksAnalytics?.list, 'computingPower'),
                energyConsumption: getAnalyticsRange(tasksAnalytics?.list, 'energyConsumption')
        });
        } else {
            setAnalyticsLoading(true);
        }
    }, [tasksAnalytics, tasksData]);

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
            <Tooltip title={"View"} key={"view_"+task?.id}>
                <IconButton aria-label="view" onClick={() => {
                handleViewClick(task);
            }}>
                <VisibilityTwoTone color="primary" />
            </IconButton>
            </Tooltip>);
        if(!task?.endTime && task?.enabled) {
            actions.push(
                <Tooltip title="Pause" key={"pause_" + task?.id}>
                    <IconButton aria-label="pause" onClick={() => {
                    handlePauseTask(task);
                    }}>
                        <PauseCircleTwoTone color="warning"/>
                    </IconButton>
                </Tooltip>);
        }
        if(!task?.endTime && !task?.enabled) {
            actions.push(
                <Tooltip title="Resume" key={"play_"+task?.id}>
                    <IconButton  aria-label="play" onClick={() => {
                    handleResumeTask(task);
                    }}>
                        <PlayArrowTwoTone color="success"/>
                    </IconButton>
                </Tooltip>);
        }
        if(task?.running && task?.enabled) {
            actions.push(
                <Tooltip title={"Kill"} key={"stop_"+task?.id}>
                    <IconButton  aria-label="stop" onClick={() => {
                    handleKillTask(task);
                    }}>
                        <BlockTwoTone color="error"/>
                    </IconButton>
                </Tooltip>);
        }
        if(!task?.endTime) {
            actions.push(
                <Tooltip title={"Edit"} key={"edit_"+task?.id}>
                    <IconButton  aria-label="edit" onClick={() => {
                        handleModifyClick(task);
                    }}>
                        <EditTwoTone color="secondary"/>
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
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (orderBy === 'status') {
            if (a.running === b.running) return 0;
            return (a.running ? 1 : -1) * (order === 'asc' ? 1 : -1);
        } else if (orderBy === 'energyPercentage' || orderBy === 'powerPercentage') {
            const aValue = getTaskAnalytics(tasksAnalytics?.list, a?.id, orderBy);
            const bValue = getTaskAnalytics(tasksAnalytics?.list, b?.id, orderBy);
            return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
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
                            <TableCell align="center">
                                <TableSortLabel
                                    align="center"
                                    active={orderBy === 'energyPercentage'}
                                    direction={orderBy === 'energyPercentage' ? order : 'asc'}
                                    onClick={() => handleRequestSort('energyPercentage')}
                                    >Consumption (kW/h)</TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    align="center"
                                    active={orderBy === 'powerPercentage'}
                                    direction={orderBy === 'powerPercentage' ? order : 'asc'}
                                    onClick={() => handleRequestSort('powerPercentage')}
                                >Computational Power</TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
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
                                <TableCell align="center">
                                    { isAnalyticsLoading ? (<CircularProgress />)
                                        :(<CircularProgressBar values={analyticsRange?.energyConsumption}
                                                                                    progress={getTaskAnalytics(tasksAnalytics?.list, task?.id, "energyConsumption")}
                                                               sx={{color: theme.palette.success[200],}}
                                                               />)}
                                </TableCell>
                                <TableCell align="center">
                                    { isAnalyticsLoading ? (<CircularProgress />) : (
                                    <CircularProgressBar values={analyticsRange?.computingPower}
                                                         progress={getTaskAnalytics(tasksAnalytics?.list, task?.id, "computingPower")}
                                                         sx={{
                                                             color: theme.palette.orange.dark,
                                                         }}/>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {getStatus(task?.running, task?.enabled, task?.endTime)}
                                </TableCell>
                                <TableCell align="center">
                                    {getTaskActions(task)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'right' }}>
                <Paging setPage={setPage} totalRows={tasks.length} maxRows={rowsPerPage} setMaxRows={setMaxRows}/>
            </CardActions>
            {selectedTask && (
                <>
                <TaskInfo task={selectedTask} analytics={tasksAnalytics} open={dialogOpen} onClose={handleDialogClose} />
                <TaskUpdate task={selectedTask} open={modifyDialogOpen} onClose={handleDialogClose} />
                </>
            )}
        </Paper>)

            : (<Paper>
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
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontSize="large">No Tasks</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>)}
    </>);
};

TaskTable.propTypes = {
    maxRows: PropTypes.number
};

export default TaskTable;
