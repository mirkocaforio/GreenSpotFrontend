import PropTypes from "prop-types";

const RedeemInfo = ({redeem, isLoading}) => {
    return (
        <div>
            <h3>Redeem Info</h3>
            <p>Redeem Id: {redeem.redeemId}</p>
            <p>Reward Id: {redeem.rewardId}</p>
            <p>User Email: {redeem.userEmail}</p>
            <p>Quantity: {redeem.quantity}</p>
            <p>Redeem Date: {redeem.redeemDate}</p>
            <p>Redeemed: {redeem.redeemed}</p>
            <p>Redeem Code: {redeem.redeemCode}</p>
            <p>Used: {redeem.used}</p>
            <p>Used Date: {redeem.usedDate}</p>
        </div>
    )
}

RedeemInfo.propTypes = {
    redeem: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default RedeemInfo;