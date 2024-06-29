import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";


/**
 * AlertDialog
 * @param open
 * @param handleClose
 * @param handleConfirm
 * @param action
 * @returns {Element}
 * @constructor
 */
export const AlertDialog = ({open, handleClose, handleConfirm, action}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth>
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h3">
                    {action} User
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to {action} this user?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

}
AlertDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
    content: PropTypes.string,
    object: PropTypes.object,
    action: PropTypes.string
}