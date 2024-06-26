import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationListSkeleton = ({ count }) => {
    return (
        <>
            {Array.from(new Array(count)).map((item, index) => (
                <div key={index}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="rectangular" height={118} />
                </div>
            ))}
        </>
    );
};

NotificationListSkeleton.propTypes = {
    count: PropTypes.number,
};

NotificationListSkeleton.defaultProps = {
    count: 1,
};

export default NotificationListSkeleton;