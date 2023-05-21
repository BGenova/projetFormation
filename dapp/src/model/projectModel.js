import BigNumber from "bignumber.js";

export class Project {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    /**
     * @constructor
     * @param id
     * @param address
     * @param name
     * @param description
     * @param imageUrl
     * @param fundingGoal
     * @param totalSupply
     * @param endTime
     */
    constructor(id,address, name, description, imageUrl, fundingGoal, totalSupply, endTime) {
        this._id = id;
        this._owner = address;
        this._name = name;
        this._description = description;
        this._imageUrl = imageUrl;
        if (fundingGoal !== 0) {
            const fundingGoalBig = new BigNumber(fundingGoal._hex);
            this._fundingGoal = fundingGoalBig["c"][0];
        } else {
            this._fundingGoal = 0;
        }
        this._fundsRaised = 0;
        console.log(endTime);
        if (endTime && endTime !== 0) {
            const endTimeBig = new BigNumber(endTime._hex);
            const date = new Date(endTimeBig["c"][0]);
            this._endTime = date.toLocaleDateString();
        } else {
            this._endTime = 0;
        }

        if (totalSupply !== 0) {
            const totalSupplyBig = new BigNumber(totalSupply._hex);
            this._totalSupply = totalSupplyBig["c"][0];
        } else {
            this._totalSupply = 0;
        }
        this._contributions = {};
        this._rewards = {};
        this._closed = false;
    }

    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = value;
    }

    get rewards() {
        return this._rewards;
    }

    set rewards(value) {
        this._rewards = value;
    }

    get contributions() {
        return this._contributions;
    }

    set contributions(value) {
        this._contributions = value;
    }

    get totalSupply() {
        return this._totalSupply;
    }

    set totalSupply(value) {
        this._totalSupply = value;
    }

    get endTime() {
        return this._endTime;
    }

    set endTime(value) {
        this._endTime = value;
    }

    get fundsRaised() {
        return this._fundsRaised;
    }

    set fundsRaised(value) {
        this._fundsRaised = value;
    }

    get fundingGoal() {
        return this._fundingGoal;
    }

    set fundingGoal(value) {
        this._fundingGoal = value;
    }

    get owner() {
        return this._owner;
    }

    set owner(value) {
        this._owner = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        this._imageUrl = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}
