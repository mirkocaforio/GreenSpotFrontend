import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {clearMessage} from "../../actions/message";
import {Snackbar} from "@mui/material";

export default function AlertNotificationBox({location}) {

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
        { location && arrived && loc === location // if a location is specified, show the message only if it matches
            ? (<Snackbar open={open} autoHideDuration={6000} onClose={clear} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Box sx={{width: '100%'}}>
                    <Alert
                        severity={type}
                        variant="filled"
                        onClose={clear}
                        sx={{
                            '&.MuiSnackbar-root': { top: 0, bottom: 'auto'},
                        }}
                    >{message}</Alert>
                </Box>
            </Snackbar>)
            : arrived && location === undefined // if no location is specified, show the message anyway
                ?(<Box sx={{width: '100%'}} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                    <Alert
                        severity={type}
                        variant="filled"
                        onClose={clear}
                    >{message}</Alert>
                </Box>)
                : (<></>)
        }
    </>

}


AlertNotificationBox.propTypes = {
    location: PropTypes.string
}