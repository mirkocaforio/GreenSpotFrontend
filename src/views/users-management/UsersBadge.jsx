import PropTypes from "prop-types";

//mui
import {Badge} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project
import AvatarPic from "../../ui-component/AvatarPic";


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
            <Grid container alignItems={"center"} spacing={2}>
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