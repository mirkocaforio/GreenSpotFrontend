import React, {useEffect, useState} from 'react';
import {
    TextField,
    IconButton,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AccordionDetails, AccordionSummary, Accordion
} from '@mui/material';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {format, setMinutes, setHours} from 'date-fns';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import {gridSpacing} from "../../../../store/constant";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import EventNoteIcon from "@mui/icons-material/EventNote";
import moment from "moment/moment";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import SubCard from "../../../../ui-component/cards/SubCard";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityPicker = ({fullWidth, value, onBlur, onChange, name, label, helperText}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [availability, setAvailability] = useState(
        daysOfWeek.map(day => ({dayOfWeek: day, startTime: null, endTime: null, selected: false}))
    );
    const [savedAvailability, setSavedAvailability] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        const selectedAvailability = availability
            .filter(day => day.selected)
            .map(day => ({
                dayOfWeek: day.dayOfWeek,
                startTime: day.startTime ? format(day.startTime, 'HH:mm') : null,
                endTime: day.endTime ? format(day.endTime, 'HH:mm') : null,
            }));
        onChange({
            target: {
                name: name,
                value: selectedAvailability
            }
        });
    }, [availability]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (day) => {
        setAvailability(prevState =>
            prevState.map(d =>
                d.dayOfWeek === day.dayOfWeek ? {...d, selected: !d.selected} : d
            )
        );
    };

    const handleTimeChange = (time, day, type) => {
        setAvailability(prevState =>
            prevState.map(d =>
                d.dayOfWeek === day.dayOfWeek ? {...d, [type]: time} : d
            )
        );
    };

    const handleSave = () => {
        const selectedAvailability = availability
            .filter(day => day.selected)
            .map(day => ({
                dayOfWeek: day.dayOfWeek,
                startTime: day.startTime ? format(day.startTime, 'HH:mm') : null,
                endTime: day.endTime ? format(day.endTime, 'HH:mm') : null,
            }));
        setSavedAvailability(selectedAvailability);
        handleClose();
    };

    const handleReset = () => {
        setAvailability(
            daysOfWeek.map(day => ({dayOfWeek: day, startTime: null, endTime: null, selected: false}))
        );
    };

    const renderSummary = () => (
        <SubCard title="Summary">
            <List>
                {savedAvailability.map(({dayOfWeek, startTime, endTime}) => (
                    <div key={dayOfWeek}>
                        <ListItem>
                            <ListItemIcon>
                                <EventNoteIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={moment().day(dayOfWeek).format('dddd')}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="body2">
                                    {`${moment(startTime, 'hh:mm A').format('HH:mm')} - ${moment(endTime, 'hh:mm A').format('HH:mm')}`}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="middle" sx={{my: 2}}/>
                    </div>
                ))}
            </List>
        </SubCard>
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{padding:0}}
                >
                    <TextField
                        fullWidth={fullWidth}
                        label={label}
                        variant="outlined"
                        helperText={helperText}
                        onBlur={onBlur}
                        InputProps={{
                            endAdornment: (
                                <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                                    <IconButton onClick={handleClick}>
                                        <Tooltip title={"Set availability period"}>
                                            <EventNoteIcon/>
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton onClick={handleExpandClick}>
                                        <Tooltip title={"Show summary"}>
                                            <ExpandMoreIcon sx={{
                                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s'
                                            }}/>
                                        </Tooltip>
                                    </IconButton>
                                </Box>
                            ),
                        }}
                    />
                </AccordionSummary>
                <AccordionDetails sx={{padding:0}}>
                    {renderSummary()}
                </AccordionDetails>
            </Accordion>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: matches ? 'right' : 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: matches ? 'right' : 'left',
                }}
            >
                {availability.map((day) => (
                    <MenuItem key={day.dayOfWeek}>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={day.selected}
                                        onChange={() => handleCheckboxChange(day)}
                                    />}
                                    label={day.dayOfWeek}
                                />
                            </Grid>
                            {day.selected && (
                                <>
                                    <Grid item xs={4}>
                                        <TimePicker
                                            label="Start Time"
                                            value={day.startTime}
                                            onChange={(time) => handleTimeChange(time, day, 'startTime')}
                                            renderInput={(params) => <TextField {...params} />}
                                            minutesStep={30}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TimePicker
                                            label="End Time"
                                            value={day.endTime}
                                            onChange={(time) => handleTimeChange(time, day, 'endTime')}
                                            renderInput={(params) => <TextField {...params} />}
                                            minutesStep={30}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </MenuItem>
                ))}
                <MenuItem>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <AnimateButton>
                            <Button onClick={handleSave} variant="contained" color="primary">
                                Save
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button onClick={handleReset} variant="outlined" color="secondary"
                                    style={{marginLeft: '10px'}}>
                                Reset
                            </Button>
                        </AnimateButton>
                    </Box>
                </MenuItem>
            </Menu>
        </LocalizationProvider>
    );
};

AvailabilityPicker.propTypes = {
    fullWidth: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.array,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    label: PropTypes.string,
    helperText: PropTypes.string,
};

export default AvailabilityPicker;
