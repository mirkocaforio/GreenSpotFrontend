class RewardModel {
    constructor(id, name, cost, oldCost, description, image, category, subcategory, addDate, active, quantity, sold) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.oldCost = oldCost;
        this.description = description;
        this.image = image;
        this.category = category;
        this.subcategory = subcategory;
        this.addDate = addDate;
        this.active = active;
        this.quantity = quantity;
        this.sold = sold;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new RewardModel(obj.id, obj.name, obj.cost, obj.oldCost, obj.description, obj.image, obj.category, obj.subcategory, obj.addDate, obj.active, obj.quantity, obj.sold);
    }

    // Getter and setter methods for each property...
    // For example:
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Repeat for the rest of the properties...
}

export function findRewardById(rewardList, id) {
    return rewardList.find(reward => reward.getId() === id);
}

export default RewardModel;