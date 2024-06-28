import MainCard from "../../ui-component/cards/MainCard";
import ClassicTable from "../../ui-component/table/ClassicTable";
import React, {useEffect, useState} from "react";
import AvatarPic from "../../ui-component/AvatarPic";
import Grid from "@mui/material/Grid";
import {Badge, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";
import Chip from "@mui/material/Chip";
import {dateFormatBeauty} from "../../utils/date-beauty";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import {BlockTwoTone, CheckCircleOutlineTwoTone} from "@mui/icons-material";
import {disableProfile, enableProfile} from "../../actions/profile";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";

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

    const { profiles } = useSelector(state => state.profile);
    const [data, setData] = useState(null);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [handleAction, setHandleAction] = useState(() => () => {});

    const dispatch = useDispatch();

    useEffect(() => {
        if (profiles) {
            if(profiles?.enabled && profiles?.disabled){
                setData(profiles?.enabled?.concat(profiles?.disabled));
            }else if(profiles?.enabled){
                setData(profiles?.enabled);
            }else {
                setData(profiles?.disabled);
            }
        }
    }, [profiles]);

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
            <ClassicTable searchLabel={"Search by email"} data={data} columns={columns} />
            {open && (
                <AlertDialog
                    open={open}
                    action={action}
                    handleClose={handleClose}
                    handleConfirm={handleAction}
                />
            )}
        </MainCard>
    )
}


export default UsersManagement;