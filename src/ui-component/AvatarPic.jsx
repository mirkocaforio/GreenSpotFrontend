import Avatar from "@mui/material/Avatar";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function AvatarPic({anchorRef,open}) {
    const theme = useTheme();
    const {profile} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(true);

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 13)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    useEffect(() => {
        if (profile === null) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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