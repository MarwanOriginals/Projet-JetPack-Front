const JetpackEntity = require('../../Entity/Jetpack');
const BookingEntity = require('../../Entity/Booking');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetpacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {

            return rows.map(row => {
                let jetpack = new JetpackEntity();
                jetpack.id = row.id;
                jetpack.name = row.name
                jetpack.image = row.image;
                return jetpack
            });
        });
    }
    
    save(jetpack){
        return this.httpClient.fetch('/jetpacks', {method:"POST"}).then(row => {
            jetpack.id = row.id;
            return jetpack
        });
    };

    getBookings() {
        return this.httpClient.fetch('/bookings', {}).then(rows => {

            return rows.map(row => {
                let booking = new BookingEntity();
                booking.id = row.id;
                booking.jetpackId = row.jetpackId;
                booking.startDate = row.startDate;
                booking.endDate = row.endDate;
                return booking;
            });
        });
    }
}