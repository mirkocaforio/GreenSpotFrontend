
class RedeemModel {
    constructor(redeemId, rewardId, userEmail, quantity, redeemDate, redeemed, redeemCode, used, usedDate) {
        this.redeemId = redeemId;
        this.rewardId = rewardId;
        this.userEmail = userEmail;
        this.quantity = quantity;
        this.redeemDate = redeemDate;
        this.redeemed = redeemed;
        this.redeemCode = redeemCode;
        this.used = used;
        this.usedDate = usedDate;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new RedeemModel(obj.redeemId, obj.rewardId, obj.userEmail, obj.quantity, obj.redeemDate, obj.redeemed, obj.redeemCode, obj.used, obj.usedDate);
    }

    // Getter and setter methods for each property...
    getRredeemId() {
        return this.redeemId;
    }

    setRredeemId(redeemId) {
        this.redeemId = redeemId;
    }

}

export function findRedeemById(list, id) {
    return list.find(redeem => redeem.getRredeemId() === id);
}

export default RedeemModel;