// assets
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {IconCreditCardRefund} from '@tabler/icons-react';

// constant
const icons = { PaymentsOutlinedIcon, ReceiptOutlinedIcon, PaymentOutlinedIcon, IconCreditCardRefund };

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
            breadcrumbs: false,

            children: [
                {
                    id: 'invoice',
                    title: 'Invoice',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.ReceiptOutlinedIcon,
                    breadcrumbs: false
                },
                {
                    id: 'funds',
                    title: 'Add funds',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.IconCreditCardRefund,
                    breadcrumbs: false
                },
                {
                    id: 'payment',
                    title: 'Payment Method',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.PaymentOutlinedIcon,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default billing;