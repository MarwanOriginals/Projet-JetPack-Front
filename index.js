const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');
const Jetpack = require('./src/Entity/Jetpack');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);

var jetpacksArray = [];

/*
 * Gestion et affichage des "pages"
 */
document.getElementById("list-main-button").onclick = function(){
    document.getElementById('button2').classList.remove("active");
    document.getElementById('button1').classList.add("active");

    document.getElementById('jetpacks-container').style.display = 'block';
    document.getElementById('add-form').style.display = 'block';
    document.getElementById('search-form').style.display = 'none';
    document.getElementById('bookings-container').style.display = 'none';
}
document.getElementById("search-main-button").onclick = function(){
    document.getElementById('button1').classList.remove("active");
    document.getElementById('button2').classList.add("active");

    document.getElementById('jetpacks-container').style.display = 'none';
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('search-form').style.display = 'block';

    document.getElementById('startDate').defaultValue = new Date().toJSON().slice(0,10);
    document.getElementById('endDate').defaultValue = new Date().toJSON().slice(0,10);
}

/*
 * Page 1 : liste des jetpacks et ajout d'un jetpack
 */
jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        jetpacksArray.push(jetpack);

        html +=
            '<div class="col-md-4">\n' +
            '<div class="card mb-4 shadow-sm" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." width="100%" height="225">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
            '    <a href="#" class="btn btn-outline-primary">Modifier</a>\n' +
            '  </div>\n' +
            '</div>' +
            '</div>'

    });

    document.getElementById('jetpacks').innerHTML = html;

    document.getElementById("add-button").onclick = function(){
  
  
      let jetpack = new Jetpack()
      jetpack.name = document.getElementById('name').value;
      jetpack.image = document.getElementById('image').value;
      jetpackService.save(jetpack);
      jetpacksArray.push(jetpack);

      console.log(window.location.href);
      let html =
                '<div class="col-md-4">\n' +
                '<div class="card mb-4 shadow-sm" style="width: 18rem;">\n' +
                '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
                '  <div class="card-body">\n' +
                '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
                '    <a href="#" class="btn btn-outline-primary">Modifier</a>\n' +
                '  </div>\n' +
                '</div>' +
                '</div>'
    
        console.log(html);
        document.getElementById('jetpacks').innerHTML += html;
    }

});

/*
 * Page 2 : Recherche des jetpacks disponibles et réservation
 */
document.getElementById("search-button").onclick = function(){

    jetpackService.getBookings().then(bookings => {
        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;
        console.log(bookings);

        let html = '';
        bookings.forEach((booking) => {
            jetpacksArray.forEach((jetpack) => {
                if (isFree(jetpack, booking, startDate, endDate)){
                    html +=
                        '<div class="col-md-4">\n' +
                        '<div class="card mb-4 shadow-sm" style="width: 18rem;">\n' +
                        '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." width="100%" height="225">\n' +
                        '  <div class="card-body">\n' +
                        '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
                        '    <a href="#" class="btn btn-outline-primary" id="book-button">Réserver</a>\n' +
                        '  </div>\n' +
                        '</div>\n' +
                        '</div>'
                }
            });
        });

        document.getElementById('bookings').innerHTML = html;
        document.getElementById('bookings-container').style.display = 'block';
    });
}

function isFree(jetpack, booking, startDate, endDate){
    if (jetpack.id == booking.jetpackId &&
        (startDate >= booking.startDate && startDate <= booking.endDate ||
         endDate >= booking.startDate   && endDate <= booking.endDate   ||
         startDate <= booking.startDate && endDate >= booking.endDate)){
        return false;
    }

    return true;
}
