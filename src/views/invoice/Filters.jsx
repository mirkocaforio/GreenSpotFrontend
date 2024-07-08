export const invoiceFilters = {
    enabled: true,
    disabled: false,
    invoiceStatus: {
        paid: {
            status: false,
            value: "PAID",
            show: true,
            color: 'success'
        },
        pending: {
            status: false,
            value: "PENDING",
            show: true,
            color: 'warning'
        },
        overdue: {
            status: false,
            value: "OVERDUE",
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