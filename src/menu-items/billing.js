// assets
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import {IconCreditCardRefund} from '@tabler/icons-react';

// constant
const icons = { PaymentsOutlinedIcon, ReceiptOutlinedIcon, IconCreditCardRefund };

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
                    title: 'Invoice',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.ReceiptOutlinedIcon
                },
                {
                    id: 'funds',
                    title: 'Add funds',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.IconCreditCardRefund
                }
            ]
        }
    ]
};

export default billing;