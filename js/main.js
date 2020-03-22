//Apro heroflix
$('.image').on('click', '.utente', function(){
    $('.container-user-choice').slideUp();
});

//Border on/off entrata immagini e profili
$('.elementi').on('mouseenter', 'img', function(){
    var thisImage = $(this);
    thisImage.addClass('border');
    thisImage.siblings('h5').addClass('text');
});

$('.elementi').on('mouseleave', 'img', function(){
    var thisImage = $(this);
    thisImage.removeClass('border');
    thisImage.siblings('h5').removeClass('text');
});

$('.elementi').on('mouseenter', 'h5', function(){
    var thisImage = $(this);
    thisImage.addClass('text');
    thisImage.siblings('img').addClass('border');

});

$('.elementi').on('mouseleave', 'h5', function(){
    var thisImage = $(this);
    thisImage.removeClass('text');
    thisImage.siblings('img').removeClass('border');
});

//Orange icona plus
$('.elementi').on('mouseenter', 'i.fas.fa-plus-circle', function(){
    var thisIcon = $(this);
    thisIcon.addClass('color');
});

$('.elementi').on('mouseleave', 'i.fas.fa-plus-circle', function(){
    var thisIcon = $(this);
    thisIcon.removeClass('color');
});

//Border on/off entrata 'gestione profili'
$('.gestisci').mouseenter(function(){
    var thisText = $(this);
    thisText.addClass('color-border');
});

$('.utenti').on('mouseleave', '.gestisci', function(){
    var thisText = $(this);
    thisText.removeClass('color-border');
});


// Template film/telefilm
source = $("#template-film-list").html(); //Trovo il mio template
var template = Handlebars.compile(source); //

//Il mio link all'api da suddividere
//https://api.themoviedb.org/3/movie/550?api_key=ccb9c8ef6b3a33f07b7be007336fd3e2
$('#bottone').click(function(){  //----> CON CLICK <-----
    var filmCercato = $('#input').val(); //Cerco nell'input
    $('#input').val('');//Cancello quello che c'' all'interno dell'input
    $('.container-film').text(''); //Cancello il risultato precedente
    ('.container-telefilm').text('');
    myListMoovie(filmCercato);
    myListSeries(filmCercato);
});
//$('#bottone').click(myListMoovie);


$('#input').keypress(function(event){ //---------> CON TASTO ENTER <--------
    if (event.keyCode == 13) { //---------> CON TASTO ENTER <--------
        var filmCercato = $('#input').val(); //Cerco nell'input
        $('#input').val('');//Cancello quello che c'' all'interno dell'input
        $('.container-film').text(''); //Cancello il risultato precedente
        $('.container-telefilm').text(''); //Cancello il risultato precedente
        myListMoovie(filmCercato);
        myListSeries(filmCercato);
    }
});


//Film
function myListMoovie(filmCercato){
    /*
    var filmCercato = $('#input').val(); //Cerco nell'input
    $('#input').val('');//Cancello quello che c'' all'interno dell'input
    $('.container-film').text(''); //Cancello il risultato precedente
    */
    //Inserisco l'URL dell'Api
    var apiBaseUrl = 'https://api.themoviedb.org/3';

    $.ajax({
    url: apiBaseUrl + '/search/movie',
    data:{
        api_key:'ccb9c8ef6b3a33f07b7be007336fd3e2', //la chiave api senza
        query: filmCercato,//filmCercato, //insierisco la query
        language: 'it-IT' //lingua da riprodurre
    },
    method:'GET',
    success: function (tv) {
        var films = tv.results //mi ricavo l'"array"
        //console.log(films); //trovo tutti i film
            for (var i = 0; i < films.length; i++) {
                var film = films[i]
                //console.log(film);//trovo i singoli film il ciclo);
                var schedaFilm = { //creo la mia scheda film in cui ricavo tutto quello che mi servirà
                    image:poster(film.poster_path),
                    titolo:film.title,
                    titoloOriginale:film.original_title,
                    flag:flag(film.original_language),//flag(film.original_language),
                    stella:stars('<i class="far fa-star"></i>', voto)
                };
                var voto = film.vote_average;
                var voto = parseInt(Math.ceil(voto)/ 2);// ------>     da eliminare se si vogliono usare le 10 stelle


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
    if (filmCercato.toLowerCase() !== titolo.toLowerCase()) { //Se il testo che ho inserito è uguale a uno dei titoli, compare
        var thisIsMyTemplate = template(schedaFilm); // Creo una variabile - template composta dal mio "array[i]" di elementi
        $('.container-film').append(thisIsMyTemplate); //Appendo in '.container-list' il mio template (thisIsMyTemplate)
    }
};



//Serie TV
source = $("#template-serie-list").html();
var templateSerie = Handlebars.compile(source);


function myListSeries(filmCercato){

    var apiBaseUrl = 'https://api.themoviedb.org/3';

    $.ajax({
    url: apiBaseUrl + '/search/tv',
    data:{
        api_key:'ccb9c8ef6b3a33f07b7be007336fd3e2',
        query: filmCercato,
        language: 'it-IT'
    },
    method:'GET',
    success: function (telefilm) {
        var series = telefilm.results
        //console.log(series);
            for (var i = 0; i < series.length; i++) {
                var serie = series[i];
                //sconsole.log(serie);
                var schedaSerie = {
                    image:poster(serie.poster_path),
                    nome:serie.name,
                    nomeOriginale:serie.original_name,
                    flags:flag(serie.original_language),
                    stella:stars('<i class="far fa-star"></i>', voto)
                };
                var voto = serie.vote_average;
                var voto = parseInt(Math.ceil(voto)/ 2); //  -------> da eliminare se si vogliono usare le 10 stelle

                var titoloSerie = schedaSerie.nomeOriginale;
                ricercamiLaSerieTv(filmCercato, titoloSerie, schedaSerie);
            }
        },
        error: function(){
            alert('errore');
        }
    });

};

function ricercamiLaSerieTv(filmCercato, titoloSerie, schedaSerie){
    if (filmCercato.toLowerCase() !== titoloSerie.toLowerCase()) {
        var thisIsMyTemplateSeries = templateSerie(schedaSerie);
        $('.container-telefilm').append(thisIsMyTemplateSeries);
    }
}

//Bandiere
function flag(bandiera){
    if (bandiera.includes('en') && bandiera.includes('')) {
            bandiera = 'us';
    } else if (bandiera.includes('zh')) {
        bandiera = 'cn';
    } else if (bandiera.includes('ja')) {
        bandiera = 'jp';
    }else if (bandiera.includes('ko')) {
        bandiera = 'kr';
    }
    return bandiera;
};

//Poster senza foto
function poster(poster){
    if (poster === null) {
        poster = '/7UGKZ5c0HSwro6n7GChl8uyaIfy.jpg';
    }
    return poster;
};

//5 Stelle
function stars(icona, voto){
    if (voto == 0) {
        icona = '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (voto == 1) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (voto == 2) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>'+ '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (voto == 3) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (voto == 4) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (voto == 5) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>';;
    } else {
        icona = '<i class="fas fa-medal"></i>';
    }
    return icona;
};

/*
//10 stelle
function stars(icona, voto){
    console.log(voto);
    if (voto == 0) {
    icona = '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 0 && voto <= 0.5) {
    icona = '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 0.5 && voto == 1 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>'+ '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 1 && voto <= 1.5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 1.5 && voto == 2 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 2 && voto <= 2.5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 2.5 && voto == 3 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 3 && voto <= 3.5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 3.5 && voto == 4 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 4 && voto <= 4.5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 4.5 && voto == 5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 5 && voto <= 5.5) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 5.5 && voto == 6) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 6 && voto <= 6.5 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 6.5 && voto == 7) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 7 && voto <= 7.5 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 7.5 && voto == 8) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
} else if (voto > 8 && voto <= 8.5 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' +  '<i class="fas fa-star-half-alt"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 8.5 && voto == 9) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>';
}else if (voto > 9 && voto <= 9.5 ) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star-half-alt"></i>';
}else if (voto > 9.5 && voto == 10) {
    icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>';
}else {
    icona = '<i class="fas fa-medal"></i>';
}
    return icona;
};
*/

//SCELTA SERIE TV O FilM
$('.data-type').change(function(){
    var thisType = $(this).val();
    if (thisType == "") {
        $('.lista').show();
    }
    ok(thisType);
    okk(thisType);
});

function ok(thisType){
        $('.lista.films').each(function(){
            var thisListType = $(this).attr('data-type');
            if (thisType.toLowerCase() == thisListType.toLowerCase()) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    };

function okk(thisType){
        $('.lista.series').each(function(){
            var thisListType = $(this).attr('data-type');
            if (thisType.toLowerCase() == thisListType.toLowerCase()) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    };


//PLAY
$('.look-this-info').on('mouseenter', '.play', function(){
    var thisPlay = $(this);
    thisPlay.addClass('grey');
});

$('.look-this-info').on('mouseleave', '.play', function(){
    var thisPlay = $(this);
    thisPlay.removeClass('grey');
});

//Immagine utente corrispondente in alto
$('.image').one('click', '.utente', function(){ //one click perchè cn on rischia di mettere 2 icone con 2 click rapidi
var thisData = $(this).attr('data-open');
var users = [
    {
        numero: 0,
        immagine: "max_1200/e13eb438650505.598fa118c8eab.jpg"
    },
    {
        numero: 1,
        immagine: "max_1200/1454d038650505.598fa118c9674.jpg"
    },
    {
        numero: 2,
        immagine: "max_1200/61b37438650505.598fa7a1c8da3.jpg"
    }
];

for (var i = 0; i < users.length; i++) {
    if (thisData == users[i].numero) {

        source = $("#userid").html(); //Trovo il mio template
        var templatePhoto = Handlebars.compile(source); //
        var templateUser = templatePhoto(users[i]);
        $('.search .profile-photo').append(templateUser);
    }
};
});
