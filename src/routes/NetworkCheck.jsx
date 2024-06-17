import React, { useEffect, useState } from 'react';
import { useSnackbar} from "notistack";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const { enqueueSnackbar } = useSnackbar();
    const {closeSnackbar } = useSnackbar();

    const action = snackbarId => (
        <>
            <Button color="inherit" onHo onClick={() => { closeSnackbar(snackbarId) }}>
                <CloseIcon />
            </Button>
        </>
    );

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {!isOnline && (
                enqueueSnackbar("You're offline. Check your network connection.",
                    {   variant: "error",
                        anchorOrigin:
                            {
                                vertical: 'bottom',
                                horizontal: 'center'
                            },
                        persist: true,
                        action
                    })
            )}
        </>
    );
};

export default NetworkStatus;
