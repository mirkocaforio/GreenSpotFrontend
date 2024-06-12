

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clearMessage} from "../../actions/message";
import {useSnackbar} from "notistack";


export default function AlertNotificationStack() {
    const dispatch = useDispatch();
    const {message, type} = useSelector((state) => state.message);
    const { enqueueSnackbar } = useSnackbar();

    const clear = () => {
        dispatch(clearMessage());
    }

    useEffect(() => {
        if(message){
            enqueueSnackbar(message,
                {   variant: type,
                    anchorOrigin:
                        {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                })
        }
        return () => {
            clear();
        }

    },[enqueueSnackbar, message, type]);

}
