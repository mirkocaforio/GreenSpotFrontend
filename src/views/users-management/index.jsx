import MainCard from "../../ui-component/cards/MainCard";
import ClassicTable from "../../ui-component/table/ClassicTable";
import React, {useEffect, useState} from "react";
import AvatarPic from "../../ui-component/AvatarPic";
import Grid from "@mui/material/Grid";
import {Badge, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";
import Chip from "@mui/material/Chip";
import {dateFormatBeauty} from "../../utils/date-beauty";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import {BlockTwoTone} from "@mui/icons-material";
import {disableProfile} from "../../actions/profile";
import FilterButton from "../../ui-component/extended/FilterButton";

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


const UsersManagement = () => {

    const { profiles } = useSelector(state => state.profile);
    const [data, setData] = useState(null);

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
                <Tooltip title={"Disable"} key={"disable_"+element?.email}>
                    <IconButton  aria-label="stop" onClick={() => {
                        handleDisable(element);
                    }}>
                        <BlockTwoTone color="error"/>
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
        </MainCard>
    )
}


export default UsersManagement;