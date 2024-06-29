// react
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

// project
import MainCard from "../../ui-component/cards/MainCard";
import ClassicTable from "../../ui-component/table/ClassicTable";
import AvatarPic from "../../ui-component/AvatarPic";
import FilterButton from "../../ui-component/extended/FilterButton";

// utils
import {dateFormatBeauty} from "../../utils/date-beauty";
import {disableProfile, enableProfile} from "../../actions/profile";
import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";


// material-ui
import Grid from "@mui/material/Grid";
import {Badge, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import {BlockTwoTone, CheckCircleOutlineTwoTone} from "@mui/icons-material";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Transitions from "../../ui-component/extended/Transitions";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

/**
 * UsersBadge
 * @param picSize
 * @param user
 * @returns {Element}
 * @constructor
 */
export const UsersBadge = ({picSize, user}) => {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Grid container spacing={2}>
                <Grid item>
                    <AvatarPic size={picSize} type="badge" staticProfile={user}/>
                </Grid>
                <Grid item>
                    <Typography variant="h5" gutterBottom>
                        {user?.email}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {user?.name} {user?.surname}
                    </Typography>
                </Grid>
            </Grid>
        </Badge>
    )
}
UsersBadge.propTypes = {
    picSize: PropTypes.string,
    user: PropTypes.object
}


/**
 * AlertDialog
 * @param open
 * @param handleClose
 * @param handleConfirm
 * @param action
 * @returns {Element}
 * @constructor
 */
export const AlertDialog = ({open, handleClose, handleConfirm, action}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth>
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h3">
                    {action} User
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to {action} this user?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

}
AlertDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
    content: PropTypes.string,
    object: PropTypes.object,
    action: PropTypes.string
}


const UsersManagement = () => {

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const { profiles } = useSelector(state => state.profile);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [handleAction, setHandleAction] = useState(() => () => {});

    const anchorRef = useRef(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({
        enabled: false,
        disabled: false,
        roles: {
            admin: false,
            member: false,
            user: false,
            all: true
        },
        all: true
    });

    const dispatch = useDispatch();


    // DATA SET and STATUS FILTER
    useEffect(() => {

        if (profiles) {
            if(profiles?.enabled && profiles?.disabled && filter?.all){
                setData(profiles?.enabled?.concat(profiles?.disabled));
            }else if(profiles?.enabled && filter?.enabled){
                setData(profiles?.enabled);
            }else if(profiles?.disabled && filter?.disabled){
                setData(profiles?.disabled);
            }
        }

    }, [ filter, profiles]);

    // ROLE FILTER
    useEffect(() => {

        const roleConstants = {
            admin: ROLE_ADMIN,
            member: ROLE_MEMBER,
            user: ROLE_UTENTE
        };

        //Filter by roles
        if(data){

            const roles = filter?.roles;

            if(filter?.roles?.all) {
                setFilteredData(data);
            } else{

                setFilteredData(data.filter(element =>
                    Object.keys(roleConstants).some(role => roles[role] && element.role === roleConstants[role])
                ));
            }

        }
    }, [data, filter?.roles]);

    // ###### FILTER ######
    const handleFilterToggle = () => {
        setFilterOpen(!filterOpen);
    }

    const handleFilterClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setFilterOpen(false);
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setFilter(prevFilter => {
            if (name) {
                const newFilter = { ...prevFilter, [name]: checked, all: false };

                newFilter.all = !!((newFilter?.enabled && newFilter?.disabled) || (!newFilter?.enabled && !newFilter?.disabled));

                return newFilter;
            }
        });

    };

    const handleRoleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setFilter(prevFilter => {
            if (name) {
                const newFilter = { ...prevFilter, roles: {...prevFilter.roles, [name]: checked, all: false}};

                newFilter.roles.all = !!((newFilter.roles?.admin && newFilter.roles?.member && newFilter.roles?.user) || (!newFilter.roles?.admin && !newFilter.roles?.member && !newFilter.roles?.user));

                return newFilter;
            }
        });
    }

    // ###### ACTIONS ######
    const handleDisable = (element) => {
        dispatch(disableProfile(element?.email));
        handleClose();
    }

    const handleEnable = (element) => {
        dispatch(enableProfile(element?.email));
        handleClose();
    }

    const handleOpen = (element,handleAction,action) => {
        setAction(action);
        setHandleAction(handleAction);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAction(null);
        setHandleAction(null);
    }

    // ###### TABLE ######
    const getRoleChip = (role) => {
        switch (role) {
            case ROLE_ADMIN:
                return (
                    <Chip
                        label="Admin"
                        color="primary"
                        size="small"
                    />
                )
            case ROLE_MEMBER:
                return (
                    <Chip
                        label="Member"
                        color="default"
                        size="small"
                    />
                )
            case ROLE_UTENTE:
                return (
                    <Chip
                        label="User"
                        color="secondary"
                        size="small"
                    />
                )
            default:
                return (
                    <Chip
                        label="Unknown"
                        color="default"
                        size="small"
                    />
                )
        }
    }

    const getStatusChip = (element) => {
        //Devo controllare se l'elemento è in profiles.enabled o profiles.disabled
        if(profiles?.enabled){
            if(profiles?.enabled.includes(element)){
                return (
                    <Chip
                        label="Enabled"
                        color="success"
                        size="small"
                    />
                )
            }else if(profiles?.disabled.includes(element)){
                return (
                    <Chip
                        label="Disabled"
                        color="error"
                        size="small"
                    />
                )
            }
        }

    }

    const getActions = (element) => {
        let actions = [];

        if(profiles?.enabled.includes(element)){
            actions.push(
                <Tooltip title={"Disable"} key={"disable_"+element?.email} disableInteractive >
                    <IconButton  aria-label="stop" onClick={() => {
                        handleOpen(element,() => () => handleDisable(element) ,"Disable")
                    }}>
                        <BlockTwoTone color="error"/>
                    </IconButton>
                </Tooltip>);
        }else if(profiles?.disabled.includes(element)){
            actions.push(
                <Tooltip title={"Enable"} key={"enable_"+element?.email} disableInteractive >
                    <IconButton  aria-label="play" onClick={() => {
                        handleOpen(element,() => () => handleEnable(element) ,"Enable")
                    }}>
                        <CheckCircleOutlineTwoTone color="success"/>
                    </IconButton>
                </Tooltip>);
        }

        return actions;
    }

    const columns = [

        {   id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'User',
            searchable: true,
            key: true,
            content: (element) => {
                return (
                    <UsersBadge picSize="sm" user={element}/>
                )
            }
        },{
            id: 'role',
            numeric: false,
            disablePadding: false,
            label: 'Role',
            align: 'left',
            content: (element) => {
                return (
                    getRoleChip(element?.role)
                )
            }
        },
        {   id: 'registrationDate',
            numeric: false,
            disablePadding: false,
            label: 'Registered On',
            content: (element) => {
                return (
                    dateFormatBeauty(element?.registrationDate, "dd/MM/yyyy HH:mm")
                )
            }
        },{
            id: 'enabled',
            numeric: false,
            disablePadding: false,
            label: 'Enabled',
            align: 'left',
            disableOrdering: true,
            content: (element) => {
                return (
                    getStatusChip(element)
                )
            }
        },
        {   id: 'action',
            numeric: false,
            disablePadding: true,
            label: 'Actions',
            align: 'center',
            disableOrdering: true,
            content: (element) => {
                return(
                    getActions(element)
                )
            }
        }
    ];

    return(
        <MainCard>
            <ClassicTable 
                searchLabel={"Search by email"} 
                data={filteredData}
                columns={columns}
                header={<FilterButton
                    title={"Filter"}
                    clicked={filterOpen}
                    onClick={handleFilterToggle}
                    ref={anchorRef}
                />}
            />
            {open && (
                <AlertDialog open={open} action={action} handleClose={handleClose} handleConfirm={handleAction}/>
            )}
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={filterOpen}
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
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={filterOpen} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleFilterClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2} sx={{padding: 2, paddingRight:3}}>
                                        <Grid item container direction="column" spacing={2}>
                                            <Grid item>
                                                <Typography variant="h5" gutterBottom>
                                                    Status
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Stack direction={matchesXs ? 'column' : 'row'} spacing={2}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={filter?.enabled}
                                                                onChange={handleCheckboxChange}
                                                                name="enabled"
                                                                color="success"
                                                                //disabled={filter?.all}
                                                            />
                                                        }
                                                        label="Enabled"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={filter?.disabled}
                                                                onChange={handleCheckboxChange}
                                                                name="disabled"
                                                                color="error"
                                                                //disabled={filter?.all}
                                                            />
                                                        }
                                                        label="Disabled"
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" gutterBottom>
                                                Role
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={matchesXs ? 'column' : 'row'} spacing={2}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={filter?.roles?.admin}
                                                            onChange={handleRoleCheckboxChange}
                                                            name="admin"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Admin"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={filter?.roles?.member}
                                                            onChange={handleRoleCheckboxChange}
                                                            name="member"
                                                            color="default"
                                                        />
                                                    }
                                                    label="Member"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={filter?.roles?.user}
                                                            onChange={handleRoleCheckboxChange}
                                                            name="user"
                                                            color="secondary"
                                                        />
                                                    }
                                                    label="User"
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </MainCard>
    )
}


export default UsersManagement;