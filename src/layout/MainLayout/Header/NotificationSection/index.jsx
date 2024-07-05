import {useEffect, useRef, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import {IconBell} from '@tabler/icons-react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useDispatch, useSelector} from "react-redux";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Tooltip from "@mui/material/Tooltip";
import {
    getPopupNotificationByEmail,
    readAllPopupNotifications
} from "../../../../actions/notification";
import NotificationListSkeleton from "../../../../ui-component/cards/Skeleton/NotificationListSkeleton";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'read',
        label: 'Read'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const {popupNotifications} = useSelector((state) => state.notification);

    const [popupList, setPopupList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (popupNotifications) {
            setPopupList(popupNotifications.notificationsList);
            switch (value) {
                case 'all':
                    setPopupList(popupNotifications.notificationsList);
                    break;
                case 'read':
                    setPopupList(popupNotifications.notificationsList.filter(notification => notification.read));
                    break;
                case 'unread':
                    setPopupList(popupNotifications.notificationsList.filter(notification => !notification.read));
                    break;
                default:
                    setPopupList(popupNotifications.notificationsList);
            }
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [popupNotifications, value]);

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) {
            setValue(event?.target.value);
            switch (event?.target.value) {
                case 'all':
                    setPopupList(popupNotifications.notificationsList);
                    break;
                case 'read':
                    setPopupList(popupNotifications.notificationsList.filter(notification => notification.read));
                    break;
                case 'unread':
                    setPopupList(popupNotifications.notificationsList.filter(notification => !notification.read));
                    break;
                default:
                    setPopupList(popupNotifications.notificationsList);
            }
        }
    };

    const handleRefresh = () => {
        return dispatch(getPopupNotificationByEmail(false)
        ).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    }

    const handleMarkAllRead = () => {
        return dispatch(readAllPopupNotifications(true))
            .then(() => {
                return Promise.resolve();
            }).catch(() => {
                return Promise.reject();
            });
    }

    return (
        <>
            <Box sx={{ml: 2, mr: 3, [theme.breakpoints.down('md')]: {mr: 2}}}>
                <ButtonBase sx={{borderRadius: '12px'}}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem"/>
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between"
                                                  sx={{pt: 2, px: 2}}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">Notifications</Typography>
                                                        <Chip
                                                            size="small"
                                                            label={popupList.length}
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button onClick={() => {
                                                            handleMarkAllRead()
                                                                .then(() => {
                                                                    setValue('unread')
                                                                }).catch(() => {
                                                                setValue('unread')
                                                            });
                                                        }}>
                                                            <Tooltip title={"Mark all as read"}>
                                                                <DoneAllIcon/>
                                                            </Tooltip>
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button onClick={() => {
                                                            handleRefresh()
                                                                .then(() => {
                                                                    setValue('unread')
                                                                }).catch(() => {
                                                                setValue('unread')
                                                            });
                                                        }}>
                                                            <Tooltip title={"Refresh"}>
                                                                <RefreshIcon/>
                                                            </Tooltip>
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar style={{
                                                height: '100%',
                                                maxHeight: 'calc(100vh - 205px)',
                                                overflowX: 'hidden'
                                            }}>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{px: 2, pt: 0.25}}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{my: 0}}/>
                                                    </Grid>
                                                </Grid>
                                                {
                                                    isLoading ? (
                                                        <NotificationListSkeleton/>
                                                    ) : popupList.length === 0 ? (
                                                        <Box display="flex" justifyContent="center" sx={{p: 2}}>
                                                            <Typography variant="caption" align="center">
                                                                There are no notifications
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <NotificationList notificationList={popupList} limit={3}/>
                                                    )
                                                }
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <CardActions sx={{p: 1.25, justifyContent: 'center'}}>
                                        <Button size="small" disableElevation onClick={handleDialogOpen}>
                                            View All
                                        </Button>
                                    </CardActions>
                                    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWith>
                                            <DialogTitle>
                                                <Typography variant="h4">All Notifications</Typography>
                                            </DialogTitle>
                                        <DialogContent>
                                            {
                                                isLoading ? (
                                                    <NotificationListSkeleton/>
                                                ) : popupList.length === 0 ? (
                                                    <Box display="flex" justifyContent="center" sx={{p: 2}}>
                                                        <Typography variant="caption" align="center">
                                                            There are no notifications
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <NotificationList notificationList={popupList} dialogSize={true}/>
                                                )
                                            }
                                        </DialogContent>
                                        <DialogActions>
                                            <AnimateButton>
                                                <Button onClick={handleDialogClose}>Close</Button>
                                            </AnimateButton>
                                        </DialogActions>
                                    </Dialog>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
