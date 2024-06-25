class BuyRewardModel {
    constructor(redeemId, rewardId, userEmail, quantity) {
        this.redeemId = redeemId;
        this.rewardId = rewardId;
        this.userEmail = userEmail;
        this.quantity = quantity;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = typeof json === 'string' ? JSON.parse(json) : json;
        return new BuyRewardModel(obj.redeemId, obj.rewardId, obj.userEmail, obj.quantity);
    }

}

export default BuyRewardModel;