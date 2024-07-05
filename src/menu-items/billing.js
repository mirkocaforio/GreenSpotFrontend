// assets
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

// constant
const icons = { PaymentsOutlinedIcon, ReceiptOutlinedIcon };

const billing = {
    id: 'billing',
    title: 'Billing',
    type: 'group',
    children: [
        {
            id: 'bill',
            title: 'Billing',
            type: 'collapse',
            icon: icons.PaymentsOutlinedIcon,

            children: [
                {
                    id: 'invoice',
                    title: 'Invoices',
                    type: 'item',
                    url: '/billing/invoice',
                    icon: icons.ReceiptOutlinedIcon
                }
            ]
        }
    ]
};

export default billing;