

import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import RedeemInfo from "./RedeemInfo";



const RedeemInfoDialog = ({ data, open, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(data) {
            setIsLoading(false);
        } else{
            setIsLoading(true);
        }
    }, [data]);

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="task-dialog-title" maxWidth="lg" fullWidth fullScreen={fullScreen} scroll="paper">
            <DialogTitle id="task-dialog-title" fontSize="medium">{data?.redeemId}</DialogTitle>
            <DialogContent dividers>
                <RedeemInfo isLoading={isLoading} redeem={data}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

RedeemInfoDialog.propTypes = {
    data: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RedeemInfoDialog;

