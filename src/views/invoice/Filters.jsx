export const invoiceFilters = {
    enabled: true,
    disabled: false,
    invoiceStatus: {
        paid: {
            status: false,
            value: "Paid",
            show: true,
            color: 'success'
        },
        pending: {
            status: false,
            value: "Pending",
            show: true,
            color: 'warning'
        },
        overdue: {
            status: false,
            value: "Overdue",
            show: true,
            color: 'error'
        },
        all: {
            status: true,
            show: false
        }
    },
    all: false
}