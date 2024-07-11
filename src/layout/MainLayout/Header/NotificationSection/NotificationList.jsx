import PropTypes from 'prop-types';

// material-ui
import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-import
import Chip from 'ui-component/extended/Chip';

// assets
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';

import {format} from 'date-fns';
import {readPopupNotification} from "../../../../actions/notification";
import {useDispatch} from "react-redux";

const ListItemWrapper = ({children}) => {
    return (
        <Box
            sx={{
                p: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'primary.light'
                }
            }}
        >
            {children}
        </Box>
    );
};

ListItemWrapper.propTypes = {
    children: PropTypes.node
};

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({notificationList, limit, dialogSize}) => {
    const dispatch = useDispatch();
    const sortedNotificationList = [...notificationList].sort((a, b) => new Date(b.sendAt) - new Date(a.sendAt));
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };

    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px',
        '&:hover': {
            backgroundColor: theme.palette.orange.dark
        },
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        },
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
    };

    const handleMarkAsRead = (id) => {
        return dispatch(readPopupNotification(id, true))
            .then(() => {
                return Promise.resolve();
            }).catch(() => {
                return Promise.reject();
            });
    }

    const getAvatar = (type) => {
        switch (type) {
            case 'SUCCESS':
            return (
                <Avatar
                    sx={{
                        color: theme.palette.secondary.main,
                        backgroundColor: theme.palette.secondary.light,
                        border: 'none',
                        borderColor: theme.palette.secondary.main
                    }}
                >
                    <CheckCircleOutlineIcon stroke={1.5} size="1.3rem"/>
                </Avatar>
            );
        case 'INFO':
            return (
                <Avatar
                    sx={{
                        color: theme.palette.primary.dark,
                        backgroundColor: theme.palette.primary.light,
                        border: 'none',
                        borderColor: theme.palette.primary.main
                    }}
                >
                    <InfoIcon stroke={1.5} size="1.3rem"/>
                </Avatar>
            );
        }
    }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: dialogSize ? ('100%') : ('330px'),
                py: 0,
                borderRadius: '10px',
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {
                sortedNotificationList.slice(0, limit).map((notification, index) => (
                    <ListItemWrapper key={index}>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                {getAvatar(notification.type)}
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">{notification.subject}</Typography>}
                                secondary={format(new Date(notification.sendAt), 'HH:mm - EEEE, d MMMM yyyy')}
                            />
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{pb: 2}}>
                                <Typography variant="caption">{notification.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    {
                                        notification.read ? (
                                            <Grid item>
                                                <Chip
                                                    label="Read"
                                                    sx={chipSuccessSX}
                                                />
                                            </Grid>
                                        ) : (
                                            <>
                                                <Grid item>
                                                    <Chip
                                                        label="Unread"
                                                        sx={chipErrorSX}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Chip
                                                        label="Mark as read"
                                                        sx={chipSuccessSX}
                                                        onDelete={() => handleMarkAsRead(notification.id)}
                                                        deleteIcon={<DoneIcon/>}
                                                    />
                                                </Grid>
                                            </>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                ))
            }
        </List>
    );
};

NotificationList.propTypes = {
    notificationList: PropTypes.array.isRequired,
    limit: PropTypes.number,
    dialogSize: PropTypes.bool
};

export default NotificationList;
