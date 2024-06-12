import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import {Snackbar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Fade from "@mui/material/Fade";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {clearMessage} from "../../actions/message";
import {NOTIFICATION_DURATION} from "../../config";



export default function AlertNotificationBox({location}) {
    const theme = useTheme();
    const {message, type, location: loc} = useSelector((state) => state.message);
    const [open, setOpen] = useState(false);
    const [arrived, setArrived] = useState(false);
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearMessage());
        setOpen(false);
    }

    useEffect(() => {
        if(message !== null && message !== undefined && message !== "") {
            setArrived(true);
            setOpen(true);
        } else {
            setArrived(false);
        }
    }, [dispatch, message]);



    return <>
        { arrived && ((location && loc === location) || location === undefined) // if a location is specified, show the message only if it matches
            ? (<Box>
                <Snackbar open={open}
                          autoHideDuration={NOTIFICATION_DURATION}
                          onClose={clear}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          TransitionComponent={Fade}
                          sx={{
                              zIndex: theme.zIndex.speedDial,
                              position: 'fixed',
                              borderRadius: 0,}}>

                    <Alert
                        severity={type}
                        variant="filled"
                        onClose={clear}
                    >{message}</Alert>
                </Snackbar>
            </Box>)
            : (<></>)
        }
    </>

}


AlertNotificationBox.propTypes = {
    location: PropTypes.string
}