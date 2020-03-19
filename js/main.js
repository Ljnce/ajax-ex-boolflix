
source = $("#template-film-list").html(); //Trovo il mio template
var template = Handlebars.compile(source); //

//Inserisco l'URL dell'Api
var apiBaseUrl = 'https://api.themoviedb.org/3';

//Il mio link all'api da suddividere
//https://api.themoviedb.org/3/movie/550?api_key=ccb9c8ef6b3a33f07b7be007336fd3e2
$('#bottone').click(function(){  //----> CON CLICK <-----
    myListMoovie()
});

$('#input').keypress(function(event){ //---------> CON TASTO ENTER <--------
    if (event.keyCode == 13) { //---------> CON TASTO ENTER <--------
        myListMoovie()
    }
});

function myListMoovie(){
    var filmCercato = $('#input').val(); //Cerco nell'input
    $('#input').val('');//Cancello quello che c'' all'interno dell'input
    $('.container-film').text(''); //Cancello il risultato precedente

    $.ajax({
    url: apiBaseUrl + '/search/movie',
    data:{
        api_key:'ccb9c8ef6b3a33f07b7be007336fd3e2', //la chiave api senza
        query: 'iron man', //insierisco la query
        language: 'it-IT' //lingua da riprodurre
    },
    method:'GET',
    success: function (tv) {
        var films = tv.results //mi ricavo l'"array"
        //console.log(films); //trovo tutti i film
            for (var i = 0; i < films.length; i++) {
                var film = films[i] //trovo i singoli film il ciclo);
                var schedaFilm = { //creo la mia scheda film in cui ricavo tutto quello che mi servirà
                    titolo:film.title,
                    titoloOriginale:film.original_title,
                    lingua:film.original_language,
                    voto:film.vote_average
                }
                var titolo = schedaFilm.titoloOriginale; //creo variabile che mi trova solo i titoli dei film
                ricercamiIFilm(filmCercato, titolo, schedaFilm);
            /* ALTERNATIVA DENTRO ALLA FUNZIONE, SENZA CHIAMARE UNA FUNZIONE ESTERNA
            if (filmCercato.toLowerCase() == titolo.toLowerCase()) { //Se il testo che ho inserito è uguale a uno dei titoli, compare
                var thisIsMyTemplate = template(schedaFilm); // Creo una variabile - template composta dal mio "array[i]" di elementi
                $('.container-film').append(thisIsMyTemplate); //Appendo in '.container-list' il mio template (thisIsMyTemplate)
            }
            */
            }
        },
        error: function(){
            alert('errore');
        }
    });

};

function ricercamiIFilm(filmCercato, titolo, schedaFilm) {
    if (filmCercato.toLowerCase() == titolo.toLowerCase()) { //Se il testo che ho inserito è uguale a uno dei titoli, compare
        var thisIsMyTemplate = template(schedaFilm); // Creo una variabile - template composta dal mio "array[i]" di elementi
        $('.container-film').append(thisIsMyTemplate); //Appendo in '.container-list' il mio template (thisIsMyTemplate)
    }
};
