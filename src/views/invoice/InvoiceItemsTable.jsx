import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PropTypes from "prop-types";

export const InvoiceItemsTable = ({ invoiceItems }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="invoice items table">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount (€)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoiceItems.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {item.description}
                            </TableCell>
                            <TableCell align="right">{item.amount.toFixed(2)} Credits</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

InvoiceItemsTable.propTypes = {
    invoiceItems: PropTypes.array.isRequired
}