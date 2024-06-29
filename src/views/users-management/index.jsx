// react
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// project
import MainCard from "../../ui-component/cards/MainCard";
import ClassicTable from "../../ui-component/table/ClassicTable";
import FilterButton from "../../ui-component/extended/FilterButton";
import {UsersBadge} from "./UsersBadge";
import {AlertDialog} from "./AlertDialog";
import {usersFilters} from "./Filters";

// utils
import {dateFormatBeauty} from "../../utils/date-beauty";
import {disableProfile, enableProfile} from "../../actions/profile";
import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";


// material-ui
import Grid from "@mui/material/Grid";
import { IconButton, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import {BlockTwoTone, CheckCircleOutlineTwoTone} from "@mui/icons-material";
import Transitions from "../../ui-component/extended/Transitions";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";





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
    const [filter, setFilter] = useState(usersFilters);

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

        //Filter by roles
        if(data){

            const roles = filter?.roles;

            if(filter?.roles?.all?.status) {
                setFilteredData(data);
            } else{

                setFilteredData(data.filter(element =>
                    Object.keys(usersFilters.roles)
                        .some(role => roles[role]?.status && element.role === usersFilters.roles[role]?.value)
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
                const newFilter = {
                    ...prevFilter,
                    roles: {
                        ...prevFilter.roles,
                        [name]: {
                            ...prevFilter.roles[name],
                            status: checked
                        },
                        all: {
                            ...prevFilter.roles.all,
                            status: false
                        }
                    }};

                newFilter.roles.all.status = !!(
                    (newFilter.roles?.admin?.status && newFilter.roles?.member?.status && newFilter.roles?.user?.status)
                    ||
                    (!newFilter.roles?.admin?.status && !newFilter.roles?.member?.status && !newFilter.roles?.user?.status)
                );

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
                        sx={{ cursor:"default", borderRadius: "4px"}}
                    />
                )
            }else if(profiles?.disabled.includes(element)){
                return (
                    <Chip
                        label="Disabled"
                        color="error"
                        size="small"
                        sx={{ cursor:"default", borderRadius: "4px"}}
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
                                                {Object.keys(usersFilters.roles)
                                                    .filter(role => usersFilters.roles[role].show)
                                                    .map(role => (
                                                    <FormControlLabel
                                                        key={role}
                                                        control={
                                                            <Checkbox
                                                                checked={filter?.roles[role]?.status}
                                                                onChange={handleRoleCheckboxChange}
                                                                name={role}
                                                                color={usersFilters.roles[role].color}
                                                            />
                                                        }
                                                        label={role.charAt(0).toUpperCase() + role.slice(1)}
                                                    />
                                                ))
                                                }
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