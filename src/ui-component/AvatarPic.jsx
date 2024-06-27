
//mui
import MuiAvatar from "@mui/material/Avatar";
import {useTheme} from "@mui/material/styles";

//react
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

//project imports
import {useEffect, useState} from "react";
import {stringToColor} from "../utils/random-color";


export default function AvatarPic({anchorRef,open,size,type,staticProfile}) {
    const theme = useTheme();
    const {profile: currProfile} = useSelector((state) => state.profile);
    const [profile, setProfile] = useState({})

    const [loading, setLoading] = useState(true);
    let sizeSX = {};
    let marginSX = {};
    let pointerSX = {};

    switch (type) {
        case 'profile-pic':
            marginSX = {margin: '8px 0px 8px 5px !important'};
            pointerSX = {cursor: 'pointer'};
            break;
        case 'badge':
            marginSX = {margin: '-3px 0px 0px 0px !important'};
            pointerSX = {cursor: 'default'};
            break;
        default:
            marginSX = {};

    }

    switch (size) {
        case 'badge':
            sizeSX = {width: 28, height: 28};
            break;
        case 'xs':
            sizeSX = {width: 34, height: 34};
            break;
        case 'sm':
            sizeSX = {width: 40, height: 40};
            break;
        case 'lg':
            sizeSX = {width: 72, height: 72};
            break;
        case 'xl':
            sizeSX = {width: 82, height: 82};
            break;
        case 'md':
            sizeSX = {width: 60, height: 60};
            break;
        default:
            sizeSX = {width: 40, height: 40};
    }

    useEffect(() => {
        if(!staticProfile) {
            if (currProfile === null) {
                setLoading(true);
            } else {
                setProfile(currProfile);
                setLoading(false);
            }
        } else {
            setProfile(staticProfile);
            setLoading(false);
        }

    }, [currProfile, staticProfile]);

    const stringAvatar = (name) => {
        return {
            sx: {
                ...theme.typography.mediumAvatar,
                ...sizeSX,
                ...marginSX,
                ...pointerSX,
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return <>{ !loading ? (<MuiAvatar
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
                {...stringAvatar(`${profile ? profile.name : "User"} ${profile ? profile.surname : "User"}`)}
            />)
            : (<MuiAvatar aria-controls={open ? 'menu-list-grow' : undefined}
                       aria-haspopup="true"
                       ref={anchorRef}
                       sx={{bgcolor: 'transparent'}}
                       color="inherit" />) }</>

}

AvatarPic.propTypes = {
    anchorRef: PropTypes.object,
    open: PropTypes.bool,
    size: PropTypes.string,
    type: PropTypes.string,
    staticProfile: PropTypes.object
}