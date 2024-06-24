import React, {useEffect, useState} from 'react';
import SubCard from "../../../../ui-component/cards/SubCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IconCalendarWeek} from '@tabler/icons-react';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import BoltIcon from '@mui/icons-material/Bolt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ListItemIcon from "@mui/material/ListItemIcon";
import moment from 'moment';
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import {gridSpacing} from "../../../../store/constant";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {useDispatch, useSelector} from "react-redux";
import ResourceDialog from "./ResourceDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import {makeResourceAvailable, makeResourceUnavailable} from "../../../../actions/resource";

const ResourceCard = ({resource}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const {cpusList} = useSelector((state) => state.score);
    const {gpusList} = useSelector((state) => state.score);

    const [cpuNameList, setCpuNameList] = useState([]);
    const [gpuNameList, setGpuNameList] = useState([]);

    const [openAvailableDialog, setOpenAvailableDialog] = useState(false);
    const [openUnavailableDialog, setOpenUnavailableDialog] = useState(false);

    useEffect(() => {
        if (cpusList && gpusList) {
            setCpuNameList(cpusList.list);
            setGpuNameList(gpusList.list);
        }
    }, [cpusList, gpusList]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setOpen(true);
        handleMenuClose();
    };

    const handleMakeAvailable = () => {
        setOpenAvailableDialog(true);
        handleMenuClose();
    };

    const handleMakeUnavailable = () => {
        setOpenUnavailableDialog(true);
        handleMenuClose();
    };

    const handleCancelAvailable = () => {
        setOpenAvailableDialog(false);
    }

    const handleConfirmAvailable = () => {
        return dispatch(makeResourceAvailable(
            resource.id
        )).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    };

    const handleCancelUnavailable = () => {
        setOpenUnavailableDialog(false);
    }

    const handleConfirmUnavailable = () => {
        return dispatch(makeResourceUnavailable(
            resource.id
        )).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    };

    return (
        <SubCard
            title={resource.name}
            secondary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <IconButton onClick={handleMenuOpen}>
                        <Tooltip title={"Edit"}>
                            <MoreVertIcon/>
                        </Tooltip>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={handleEdit}
                            sx={{
                                '&:hover': {
                                    borderRadius: '12px',
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <EditIcon fontSize="small"/>
                            </ListItemIcon>
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={handleMakeAvailable}
                            sx={{
                                '&:hover': {
                                    borderRadius: '12px',
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <CheckCircleIcon fontSize="small" color="success"/>
                            </ListItemIcon>
                            Make available
                        </MenuItem>
                        <MenuItem
                            onClick={handleMakeUnavailable}
                            sx={{
                                '&:hover': {
                                    borderRadius: '12px',
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <CancelIcon fontSize="small" color="error"/>
                            </ListItemIcon>
                            Make unavailable
                        </MenuItem>
                    </Menu>
                </Box>
            }
        >
            <ResourceDialog openState={open} handleClose={handleClose} resource={resource} cpuNameList={cpuNameList}
                            gpuNameList={gpuNameList}/>
            <Dialog
                open={openAvailableDialog}
                onClose={handleCancelAvailable}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Make Available"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Are you sure you want to make this resource available?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <AnimateButton>
                        <Button onClick={handleCancelAvailable}>
                            Cancel
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button onClick={() => {
                            handleConfirmAvailable()
                                .then(() => {
                                    setOpenAvailableDialog(false);
                                }).catch(() => {
                                setOpenAvailableDialog(false);
                            });
                        }}
                                color="primary">
                            Confirm
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openUnavailableDialog}
                onClose={() => setOpenUnavailableDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Make Unavailable"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Are you sure you want to make this resource unavailable?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <AnimateButton>
                        <Button onClick={handleCancelUnavailable}>
                            Cancel
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                            onClick={() => {
                                handleConfirmUnavailable()
                                    .then(() => {
                                        setOpenAvailableDialog(false);
                                    }).catch(() => {
                                    setOpenAvailableDialog(false);
                                });
                            }}
                            color="primary"
                        >
                            Confirm
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>


            <Box display="flex" alignItems="center" flexDirection="column" sx={{overflow: 'auto'}}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={3} sm={4} md={4}>
                                <Tooltip title={"Green Energy Supply"}>
                                    <EnergySavingsLeafIcon fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={9} sm={8} md={8}>
                                <Typography variant="body1">
                                    {resource.greenEnergyType}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={3} sm={4} md={4}>
                                <Tooltip title={"Country, region, city"}>
                                    <LocationOnIcon fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={9} sm={8} md={8}>
                                <Typography variant="body1">
                                    {resource.country}, {resource.region}, {resource.city}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={2} sm={3.5} md={3.8}>
                                <Tooltip title={"Availability period"}>
                                    <IconCalendarWeek fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={10} sm={8.5} md={8.2}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={
                                            <Tooltip title={"Availability period details"}>
                                                <ExpandMoreIcon/>
                                            </Tooltip>
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography variant="body1">
                                            Availability period
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <SubCard title={"Details"}>
                                            <List>
                                                <Grid container spacing={gridSpacing} alignItems="center">
                                                {resource.availability.map((availability, index) => (
                                                    <Grid item xs={12} key={index}>
                                                        <ListItem>
                                                            <Grid container spacing={8} alignItems="center">
                                                                <Grid item xs={"auto"} sm={"auto"} md={"auto"}>
                                                                    <Box sx={{display: 'flex', justifyContent: "flex-start"}}>
                                                                        <ListItemIcon>
                                                                            <EventNoteIcon/>
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={moment().day(availability.dayOfWeek).format('dddd')}
                                                                        />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={"auto"} sm={"auto"} md={"auto"}>
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="body2">
                                                                    {`${moment(availability.startTime, 'HH:mm').format('HH:mm')} - ${moment(availability.endTime, 'HH:mm').format('HH:mm')}`}
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                                </Grid>
                                                            </Grid>
                                                        </ListItem>
                                                        <Divider variant="middle" sx={{my: 2}}/>
                                                    </Grid>
                                                ))}
                                                </Grid>
                                            </List>
                                        </SubCard>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={3} sm={4} md={4}>
                                <Tooltip title={"Energy consumption"}>
                                    <BoltIcon fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={9} sm={8} md={8}>
                                <Typography variant="body1">{resource.kwh} kWh</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={3} sm={4} md={4}>
                                <Typography variant="subtitle1">Status:</Typography>
                            </Grid>
                            <Grid item xs={9} sm={8} md={8}>
                                {resource.isAvailable ? (
                                    <Chip label="Available" color="success"/>
                                ) : (
                                    <Chip label="Unavailable" color="error"/>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={12} sm={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={
                                            <Tooltip title={"Resource details"}>
                                                <ExpandMoreIcon/>
                                            </Tooltip>
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <SubCard title={"Resource details"}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={3} sm={4} md={4}>
                                                            <Typography variant="subtitle1">Brand:</Typography>
                                                        </Grid>
                                                        <Grid item xs={9} sm={8} md={8}>
                                                            <Typography variant="body1">{resource.brand}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={3} sm={4} md={4}>
                                                            <Typography variant="subtitle1">Model:</Typography>
                                                        </Grid>
                                                        <Grid item xs={9} sm={8} md={8}>
                                                            <Typography variant="body1">{resource.model}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                {
                                                    resource.singleCoreScore ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={3} sm={4} md={4}>
                                                                        <Typography variant="subtitle1">
                                                                            Single Core Score:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9} sm={8} md={8}>
                                                                        <Typography variant="body1">
                                                                            {resource.singleCoreScore}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    resource.multicoreScore ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={3} sm={4} md={4}>
                                                                        <Typography variant="subtitle1">
                                                                            Multicore Score:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9} sm={8} md={8}>
                                                                        <Typography variant="body1">
                                                                            {resource.multicoreScore}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    resource.openclScore ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={3} sm={4} md={4}>
                                                                        <Typography variant="subtitle1">
                                                                            OpenCL Score:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9} sm={8} md={8}>
                                                                        <Typography variant="body1">
                                                                            {resource.openclScore}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    resource.vulkanScore ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={3} sm={4} md={4}>
                                                                        <Typography variant="subtitle1">
                                                                            Vulkan Score:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9} sm={8} md={8}>
                                                                        <Typography variant="body1">
                                                                            {resource.vulkanScore}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    resource.cudaScore ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={3} sm={4} md={4}>
                                                                        <Typography variant="subtitle1">
                                                                            CUDA Score:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9} sm={8} md={8}>
                                                                        <Typography variant="body1">
                                                                            {resource.cudaScore}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                }
                                            </Grid>
                                        </SubCard>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </SubCard>
    );
}

ResourceCard.propTypes = {
    resource: PropTypes.object.isRequired
}

export default ResourceCard;