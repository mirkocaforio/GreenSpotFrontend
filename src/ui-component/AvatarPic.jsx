
//mui
import Avatar from "@mui/material/Avatar";
import {useTheme} from "@mui/material/styles";

//react
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

//project imports
import {useEffect, useState} from "react";
import {stringToColor} from "../utils/random-color";

export default function AvatarPic({anchorRef,open}) {
    const theme = useTheme();
    const {profile} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (profile === null) {
            setLoading(true);
        } else {
            setLoading(false);
        }

    }, [profile]);

    const stringAvatar = (name) => {
        return {
            sx: {
                ...theme.typography.mediumAvatar,
                margin: '8px 0px 8px 5px !important',
                width: 38,
                height: 38,
                cursor: 'pointer',
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return <>{ !loading ? (<Avatar
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
                {...stringAvatar(`${profile.name} ${profile.surname}`)}
            />)
            : (<Avatar aria-controls={open ? 'menu-list-grow' : undefined}
                       aria-haspopup="true"
                       ref={anchorRef}
                       sx={{bgcolor: 'transparent'}}
                       color="inherit" />) }</>

}

AvatarPic.propTypes = {
    anchorRef: PropTypes.object,
    open: PropTypes.bool
}