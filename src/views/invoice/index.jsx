import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import MainCard from "../../ui-component/cards/MainCard";
import {dateFormatBeauty} from "../../utils/date-beauty";
import React, {useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {IconButton} from "@mui/material";
import {VisibilityTwoTone} from "@mui/icons-material";
import PaymentIcon from '@mui/icons-material/Payment';
import FilterButton from "../../ui-component/extended/FilterButton";
import ClassicTable from "../../ui-component/table/ClassicTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import Chip from "@mui/material/Chip";
import {invoiceFilters} from "./Filters";
import Transitions from "../../ui-component/extended/Transitions";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Popper from "@mui/material/Popper";
import {InvoiceDialog} from "./InvoiceDialog";
import {payInvoice} from "../../actions/payment";

const InvoicePage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState(invoiceFilters);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [handleAction, setHandleAction] = useState(() => () => {});
    const [element, setElement] = useState(null);

    const {invoicesList} = useSelector((state) => state.payment);
    const [invoiceList, setInvoiceList] = useState(null);
    const [filteredInvoice, setFilteredInvoice] = useState(null);

    useEffect(() => {
        if (invoicesList) {
            setInvoiceList(invoicesList.invoicesList);
        }

    }, [invoicesList]);

    useEffect(() => {
        if (invoiceList) {
            const invoiceStatus = filter?.invoiceStatus;

            if (filter?.invoiceStatus?.all?.status) {
                setFilteredInvoice(invoiceList);
            } else {
                setFilteredInvoice(invoiceList.filter(element =>
                    Object.keys(invoiceFilters.invoiceStatus)
                        .some(status => invoiceStatus[status]?.status && element.invoiceStatus === invoiceFilters.invoiceStatus[status]?.value)
                ));
            }
        }

    }, [invoiceList, filter?.invoiceStatus?.all?.status, filter?.invoiceStatus]);

    const handleFilterToggle = () => {
        setFilterOpen(!filterOpen);
    }

    const handleFilterClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setFilterOpen(false);
    }

    const handleRoleCheckboxChange = (event) => {
        const {name, checked} = event.target;

        setFilter(prevFilter => {
            if (name) {
                const newFilter = {
                    ...prevFilter,
                    invoiceStatus: {
                        ...prevFilter.invoiceStatus,
                        [name]: {
                            ...prevFilter.invoiceStatus[name],
                            status: checked
                        },
                        all: {
                            ...prevFilter.invoiceStatus.all,
                            status: false
                        }
                    }
                };

                newFilter.invoiceStatus.all.status = !!(
                    (newFilter.invoiceStatus?.paid?.status && newFilter.invoiceStatus?.pending?.status && newFilter.invoiceStatus?.overdue?.status)
                    ||
                    (!newFilter.invoiceStatus?.paid?.status && !newFilter.invoiceStatus?.pending?.status && !newFilter.invoiceStatus?.overdue?.status)
                );

                return newFilter;
            }
        });
    }

    const handleView = () => {
        handleClose();
    }

    const handlePay = (element) => {
        dispatch(payInvoice(element?.invoiceNumber));
        handleClose();
    }

    const handleOpen = (element, handleAction, action) => {
        setAction(action);
        setHandleAction(handleAction);
        setOpen(true);
        setElement(element);
    }

    const handleClose = () => {
        setOpen(false);
        setAction(null);
        setHandleAction(null);
        setElement(null);
    }

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

    const getActions = (element) => {
        let actions = [];

        if (element?.invoiceStatus === "PAID") {
            actions.push(
                <Tooltip title={"View"} key={"view_" + element?.invoiceNumber} disableInteractive>
                    <IconButton aria-label="view" onClick={() => {
                        handleOpen(element, () => () => handleView(), "View")
                    }}>
                        <VisibilityTwoTone color="primary"/>
                    </IconButton>
                </Tooltip>
            );
        } else {
            actions.push(
                <Tooltip title={"View"} key={"view_" + element?.invoiceNumber} disableInteractive>
                    <IconButton aria-label="view" onClick={() => {
                        handleOpen(element, () => () => handleView(), "View")
                    }}>
                        <VisibilityTwoTone color="primary"/>
                    </IconButton>
                </Tooltip>
            );

            actions.push(
                <Tooltip title={"Pay"} key={"pay_" + element?.invoiceNumber} disableInteractive>
                    <IconButton aria-label="pay" onClick={() => {
                        handleOpen(element, () => () => handlePay(element), "Pay")
                    }}>
                        <PaymentIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            );
        }

        return actions;
    }

    const columns = [
        {
            id: 'invoiceNumber',
            numeric: false,
            disablePadding: false,
            label: 'Invoice Number',
            searchable: true,
            key: true,
            content: (element) => {
                return (
                    <Typography variant="subtitle1">
                        # {element?.invoiceNumber}
                    </Typography>
                )
            }
        },
        {
            id: 'invoiceStatus',
            numeric: false,
            disablePadding: false,
            label: 'Status',
            align: 'left',
            content: (element) => {
                return (
                    getStatusChip(element?.invoiceStatus)
                )
            }
        },
        {
            id: 'invoiceOverdueDate',
            numeric: false,
            disablePadding: false,
            label: 'Overdue Date',
            content: (element) => {
                return (
                    dateFormatBeauty(element?.invoiceOverdueDate, "dd/MM/yyyy")
                )
            }
        },
        {
            id: 'invoiceTotalAmount',
            numeric: false,
            disablePadding: false,
            label: 'Amount',
            align: 'left',
            disableOrdering: true,
            content: (element) => {
                return (
                    <Typography variant="subtitle1">
                        {"€ " + element?.invoiceTotalAmount.toFixed(2)}
                    </Typography>
                )
            }
        },
        {
            id: 'action',
            numeric: false,
            disablePadding: true,
            label: 'Actions',
            align: 'center',
            disableOrdering: true,
            content: (element) => {
                return (
                    getActions(element)
                )
            }
        }
    ];

    return (
        <MainCard>
            <ClassicTable
                searchLabel={"Search by invoice number"}
                data={filteredInvoice}
                columns={columns}
                header={
                    <FilterButton
                        title={"Filter"}
                        clicked={filterOpen}
                        onClick={handleFilterToggle}
                        ref={anchorRef}
                    />
                }
            />
            {
                open && (
                <InvoiceDialog open={open} action={action} handleClose={handleClose} handleConfirm={handleAction} element={element}/>
            )}
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={filterOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={filterOpen} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleFilterClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2} sx={{padding: 2, paddingRight: 3}}>
                                        <Grid item>
                                            <Typography variant="h5" gutterBottom>
                                                Invoice Status
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Stack direction={matchesXs ? 'column' : 'row'} spacing={2}>
                                                {Object.keys(invoiceFilters.invoiceStatus)
                                                    .filter(status => invoiceFilters.invoiceStatus[status].show)
                                                    .map(status => (
                                                        <FormControlLabel
                                                            key={status}
                                                            control={
                                                                <Checkbox
                                                                    checked={filter?.invoiceStatus[status]?.status}
                                                                    onChange={handleRoleCheckboxChange}
                                                                    name={status}
                                                                    color={invoiceFilters.invoiceStatus[status].color}
                                                                />
                                                            }
                                                            label={status.charAt(0).toUpperCase() + status.slice(1)}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </MainCard>
    );
}

export default InvoicePage;