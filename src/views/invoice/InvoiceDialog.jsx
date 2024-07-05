import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import SubCard from "../../ui-component/cards/SubCard";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import React from "react";
import {dateFormatBeauty} from "../../utils/date-beauty";
import {InvoiceItemsTable} from "./InvoiceItemsTable";
import {Logo32} from "../../ui-component/Logo";

export const InvoiceDialog = ({open, handleClose, handleConfirm, action, element}) => {
    const getStatusChip = (element) => {
        switch (element) {
            case "PAID":
                return (
                    <Chip
                        label="Paid"
                        color="success"
                        size="small"
                        sx={{cursor: "default"}}
                    />
                );
            case "PENDING":
                return (
                    <Chip
                        label="Pending"
                        color="warning"
                        size="small"
                        sx={{cursor: "default"}}
                    />
                );
            case "OVERDUE":
                return (
                    <Chip
                        label="Overdue"
                        color="error"
                        size="small"
                        sx={{cursor: "default"}}
                    />
                );
        }
    }

    const getInvoiceDetails = (element) => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h3">
                        Invoice Details
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <SubCard title={"Invoice #" +element.invoiceNumber} secondary={<Logo32/>}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                    <Typography variant="subtitle1">Invoice description:</Typography>
                                    <Typography variant="body1">{element.invoiceDescription}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">User details:</Typography>
                                <Typography variant="body1">{element.userSurname + " " + element.userName}</Typography>
                                <Typography variant="body1">{element.userResidenceCity + ", " + element.userResidenceAddress}</Typography>
                                <Typography variant="body1">{element.userEmail}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">Invoice Details:</Typography>
                                <Typography variant="body1">
                                    Overdue Date: {dateFormatBeauty(element.invoiceOverdueDate, "dd/MM/yyyy")}
                                </Typography>
                                <Typography variant="body1">
                                    Status: {getStatusChip(element.invoiceStatus)}
                                </Typography>
                                <Typography variant="body1">
                                    Payment Date: {element.invoicePaymentDate ? dateFormatBeauty(element.invoicePaymentDate, "dd/MM/yyyy") : "Not paid yet"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <InvoiceItemsTable invoiceItems={element.invoiceItems}/>
                            </Grid>
                            <Grid item xs={12}>
                                <SubCard sx={{ bgcolor: '#e0f7fa'}}>
                                    <Grid container>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Typography variant="h5">Sub Total:</Typography>
                                            <Typography variant="h5">Delay interest:</Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="subtitle1">Total:</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Typography variant="body1">€{element.invoicePartialAmount.toFixed(2)}</Typography>
                                            <Typography variant="body1">€{element.invoiceDelayAmount.toFixed(2)}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="subtitle1">€{element.invoiceTotalAmount.toFixed(2)}</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </SubCard>
                </DialogContent>
                <DialogActions>
                    <AnimateButton>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>
        );
    }

    const getPaymentMessage = (element) => {
        switch (element.invoiceStatus) {
            case "PENDING":
                return "Would you like to confirm payment of €" + element.invoiceTotalAmount.toFixed(2) + " for Invoice #" + element.invoiceNumber + "?"
            case "OVERDUE":
                return "Would you like to confirm payment of €" + element.invoiceTotalAmount.toFixed(2) + " for Invoice #" + element.invoiceNumber + "? NOTE: The amount of this invoice will be increased because it is overdue"
            default:
                return `Invoice #${element.invoiceNumber} is due.`

        }
    }

    const getPaymentDetails = (element) => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h3">
                        Pay Invoice #{element.invoiceNumber}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            getPaymentMessage(element)
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    const getDialog = (action) => {
        switch (action) {
            case "View":
                return getInvoiceDetails(element);
            case "Pay":
                return getPaymentDetails(element)
            default:
                return `Are you sure you want to ${action} ${element.title}?`;
        }
    }

    return (
        getDialog(action)
    );

}

InvoiceDialog.propTypes = {
    open: PropTypes.bool,
    handleClose:
    PropTypes.func,
    handleConfirm:
    PropTypes.func,
    content:
    PropTypes.string,
    object:
    PropTypes.object,
    action:
    PropTypes.string,
    element:
    PropTypes.object
}