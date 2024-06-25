
import {  Grid, Typography } from '@mui/material';
import React from "react";
import PropTypes from "prop-types";
import {ContentCopy} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {setMessage} from "../actions/message";
import {MSG_SUCCESS} from "../config";
import {useTheme} from "@mui/material/styles";

const RedeemCodeCard = ({propIcon, text}) => {

    const [isHovered, setIsHovered] = React.useState(false);

    const icon =React.cloneElement(propIcon, {style: styles.icon, color: "primary"});
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        dispatch(setMessage({message: "Copied to clipboard!",
            type: MSG_SUCCESS,
            location: "redeem"}))
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{...styles.container}}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
        >
            <Grid item
                  style={{
                      ...styles.iconContainer,
                      transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.3s',
                }}>
                {icon}
            </Grid>
            <Grid item>
                <Typography variant="h5" style={styles.code}>
                    {text}
                </Typography>
            </Grid>
            <IconButton style={styles.copyButton}
                        onClick={handleCopy}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                <ContentCopy style={styles.copyIcon} />
            </IconButton>
        </Grid>
    );
};

RedeemCodeCard.propTypes = {
    propIcon: PropTypes.element,
    text: PropTypes.string,
}

export const styles = {
    container: {
        position: 'relative',
        width: '400px',
        height: '100px',
        backgroundColor: '#000000',
        borderRadius: '10px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
    iconContainer: {
        position: 'absolute',
        top: '-34px', // Adjust to make the icon overlap with the box
        backgroundColor: 'inherit',
        borderRadius: '100%',
        padding: '8px',
    },
    icon: {
        fontSize: '46px',
    },
    code: {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        color: '#fff',
    },
    copyButton: {
        position: 'absolute',
        bottom: '4px',
        right: '8px',
        color: '#fff',
    },
    copyIcon: {
        color: '#fff',
    }
};

export default RedeemCodeCard;