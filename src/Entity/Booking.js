module.exports = class {
    constructor() {
        this._id = null;
        this._jetpackId = null;
        this._startDate = null;
        this._endDate = null;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get jetpackId() {
        return this._jetpackId;
    }

    set jetpackId(value) {
        this._jetpackId = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(jsonDate) {
        let date = new Date(jsonDate);
        
        if( isNaN(date) || date === new Date(0) )
            throw 'date is not valid';
            
        this._startDate = jsonDate;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(jsonDate) {
        let date = new Date(jsonDate);
        
        if( isNaN(date) || date === new Date(0) )
            throw 'date is not valid'

        else if( new Date(this._startDate) > date )
            throw 'end date should be greater than start date'

        this._endDate = jsonDate;
    }

    toJson() {
        return {
            id : this.id,
            jetpackId : this.jetpackId,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }
};