import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {clearMessage} from "../../actions/message";

export default function AlertBoxMsg({location}) {

    const {message, type, location: loc} = useSelector((state) => state.message);
    const [arrived, setArrived] = useState(false);
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearMessage());
    }

    useEffect(() => {
        if(message !== null && message !== undefined && message !== "") {
            setArrived(true);
        } else {
            setArrived(false);
        }
    }, [dispatch, message]);


    return <>
        { arrived && ((location && loc === location) || location === undefined) // if a location is specified, show the message only if it matches
        ? (<Box sx={{width: '100%'}}>
            <Alert
                severity={type}
                onClose={clear}>{message}</Alert>
           </Box>)
        : (<></>)
        }
    </>

}


AlertBoxMsg.propTypes = {
    location: PropTypes.string
}