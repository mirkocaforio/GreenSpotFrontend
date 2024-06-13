import { Badge, Typography} from "@mui/material";
import AvatarPic from "./AvatarPic";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

const UserBadge = ({picSize}) => {

    const [loading, setLoading] = useState(true);
    const {profile} = useSelector((state) => state.profile);

    useEffect(() => {
        if(profile){
            setLoading(false);
        }else{
            setLoading(true);
        }
    }, [profile]);

    return (<Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
/*                    badgeContent={<>{ !loading && (
                        <Typography
                            variant="caption"
                            color="primary"
                            sx={{
                                backgroundColor: 'blue',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '4px 8px',
                            }}
                        >
                            {profile.role}
                        </Typography>)}</>
                    }*/>
                    <Grid container spacing={2}>
                        <Grid item>
                        <AvatarPic size={picSize} type="badge"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitile1" gutterBottom>
                                { !loading ? (<>{profile.name} {profile.surname}</>) : ('User')}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {!loading ? (profile.role): ('Role')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Badge>);

}

UserBadge.propTypes = {
    picSize: PropTypes.string
};

export default UserBadge;