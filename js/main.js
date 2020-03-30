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
$('.elementi').on('mouseenter', '.fas.fa-plus-circle', function(){
    var thisIcon = $(this);
    thisIcon.addClass('orange');
});

$('.elementi').on('mouseleave', '.fas.fa-plus-circle', function(){
    var thisIcon = $(this);
    thisIcon.removeClass('orange');
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

// Scroll header
$(document).on("scroll", function() {
    if($(window).scrollTop() > 30) {
        $(".head").addClass("black");
    } else {
        $(".head").removeClass("black");
    }
});

// Icona volume
$('i.fas.fa-volume-up').click(function(){
    alert('Volume off');
    $('i.fas.fa-volume-up').hide();
    $('i.fas.fa-volume-mute').show();
});

$('i.fas.fa-volume-mute').click(function(){
    alert('Volume on');
    $('i.fas.fa-volume-mute').hide();
    $('i.fas.fa-volume-up').show();
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
    $('.container-telefilm').text('');
    $('.film-actor').hide();
    $('.favourite').hide();
    $('.title-search').show();
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
        $('.film-actor').hide();
        $('.favourite').hide();
        $('.title-search').show();
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
        language: 'it-IT', //lingua da riprodurre
    },
    method:'GET',
    success: function (tv) {
        var films = tv.results //mi ricavo l'"array"
        //console.log(films); //trovo tutti i film
            for (var i = 0; i < films.length; i++) {
                var film = films[i]
                //console.log(film);//trovo i singoli film il ciclo);
                var schedaFilm = { //creo la mia scheda film in cui ricavo tutto quello che mi servirà
                    image:poster(film.poster_path, foto),
                    titolo:film.title,
                    titoloOriginale:film.original_title,
                    dataUscita:film.release_date,
                    flag:flag(film.original_language),//flag(film.original_language),
                    stella:stars('<i class="far fa-star"></i>', votos),
                    voto: voto,
                    overview: film.overview,
                    genere:film.genre_ids
                };

                var voto = film.vote_average;
                var votos = parseInt(Math.ceil(voto/ 2));// ------>     da eliminare se si vogliono usare le 10 stelle
                var foto = 'https://image.tmdb.org/t/p/w342';
                var num = film.id;

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
                var schedaSerie = {
                    image:poster(serie.poster_path, foto),
                    nome:serie.name,
                    nomeOriginale:serie.original_name,
                    dataUscita:serie.first_air_date,
                    flags:flag(serie.original_language),
                    stella:stars('<i class="far fa-star"></i>', votos),
                    voto: voto,
                    overview: serie.overview,
                    genere:serie.genre_ids
                }

                var voto = serie.vote_average;
                var votos = parseInt(Math.ceil(voto/ 2)); //  -------> da eliminare se si vogliono usare le 10 stelle
                var foto = 'https://image.tmdb.org/t/p/w342';

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
function poster(poster, foto){
    if (poster !== null) {
        poster = foto + '' + poster;
    } else{
        poster = 'img/default.png';
    }
    return poster;
};

//5 Stelle
function stars(icona, votos){
    if (votos == 0) {
        icona = '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (votos == 1) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (votos == 2) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>'+ '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (votos == 3) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (votos == 4) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="far fa-star"></i>';
    } else if (votos == 5) {
        icona = '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>' + '' + '<i class="fas fa-star"></i>';;
    } else {
        icona = '<i class="fas fa-medal"></i>';
    }
    return icona;
};

/*
//5 Stelle alternativa
function vote(votos){
    var votos = parseInt(Math.ceil(votos/ 2));
    var stringaStelle = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= votos) {
            stringaStelle += '<i class="fas fa-star"></i>';
        } else{
            stringaStelle += '<i class="far fa-star"></i>';
        }
    }
    return stringaStelle;
};
*/

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

//Scelta se film o serie
$('.data-type').change(function(){
    var thisType = $(this).val();
    if (thisType == 'scegli') {
        $('.lista').show();
    } else{
        film(thisType);
        telefilm(thisType);
    }
});

function film(thisType){
    $('.lista.films').each(function(){
        var thisListType = $(this).attr('data-type');
        if (thisType !== thisListType) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
};

function telefilm(thisType){
    $('.lista.series').each(function(){
        var thisListType = $(this).attr('data-type');
        if (thisType !== thisListType) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
};

//Scelta generi film/serie
$('.mood-type').change(function(){
    var thisGenre = $(this).val();
        if (thisGenre == 'scegli') {
        $('.lista').show();
    } else{
        filmGenere(thisGenre);
        telefilmGenere(thisGenre);
    }
});

function filmGenere(thisGenre){
    $('.lista.films').each(function(){
        var thisGenreType = parseInt($(this).attr('data-genere'));
        if (thisGenre == thisGenreType) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
};

function telefilmGenere(thisGenre){
    $('.lista.series').each(function(){
        var thisGenreType = parseInt($(this).attr('data-genere'));
        if (thisGenre == thisGenreType) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
};


//Play
$('.look-this-info').on('mouseenter', '.play', function(){
    var thisPlay = $(this);
    thisPlay.addClass('grey');
});

$('.look-this-info').on('mouseleave', '.play', function(){
    var thisPlay = $(this);
    thisPlay.removeClass('grey');
});

//
$('.look-this-info').on('mouseenter', '.avengers-actor-list', function(){
    var thisActor = $(this).children('#bottone-attore');
    thisActor.addClass('grey');
});

$('.look-this-info').on('mouseleave', '.avengers-actor-list', function(){
    var thisActor = $(this).children('#bottone-attore');
    thisActor.removeClass('grey');
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

// Comparsa scritte sull'hover all'immagine
/*
$('.listaa').on('mouseenter', '.lista', function(){
    var thisCard = $(this);
    thisCard.addClass('active');
});

$('.listaa').on('mouseleave', '.lista', function(){
    var thisCard = $(this);
    thisCard.removeClass('active');
});
*/

$('.listaa').on('mouseenter', '.lista', function (){
    var thisPoster = $(this).children('.background-poster');
    var thisInfo = $(this).children('.info');

    thisPoster.addClass('noactive');
    thisInfo.addClass('active');
})

$('.listaa').on('mouseleave', '.lista', function (){
    var thisPoster = $(this).children('.background-poster');
    var thisInfo = $(this).children('.info');

    thisPoster.removeClass('noactive');
    thisInfo.removeClass('active');
});

// Lista attori "in costruzione".....
source = $("#template-actor").html(); //Trovo il mio template
var templateOne = Handlebars.compile(source); //

// Template attori avengers
$('.avengers-actor-list').on('click', '#bottone-attore-avengers', function(){
    if ($('.look-this-actor').is(':hidden')) {
        $('.look-this-actor').slideDown(500);
    } else if ($('.look-this-actor').is(':visible')){
        $('.look-this-actor').slideUp(500);
    };
    $('.container-actor').text('');
    var crediti = '/299536/credits';
    var appendActor = '.look-this-actor .container-actor';
    opera(crediti, appendActor);
});

// Template attori Il signore degli anelli
$('#bottone-attore-lord').on('click', function(){
    ok()
    var crediti = '/121/credits';
    var appendActor = '.film-actor .container-actor-film';
    opera(crediti, appendActor);
});

// Tempalete attori batman
$('#bottone-attore-civil').on('click', function(){
    ok()
    var crediti = '/271110/credits';
    var appendActor = '.film-actor .container-actor-film';
    opera(crediti, appendActor);
});

$('#bottone-attore-batman').on('click', function(){
    ok()
    var crediti = '/155/credits';
    var appendActor = '.film-actor .container-actor-film';
    opera(crediti, appendActor);
});

// Funzione per slide Up e Down su attori
function ok(){
    if ($('.film-actor').is(':hidden')) {
        $('.film-actor').slideDown(500);
    } else if ($('.film-actor').is(':visible')){
        $('.film-actor').slideUp(500);
    };
    $('.container-actor-film').text('');
}

// Ajax unico per gli attori
function opera(crediti, appendActor){
    var apiBaseUrl = 'https://api.themoviedb.org/3';

    $.ajax({
        url:apiBaseUrl + '/movie' + crediti,
        data:{
            api_key:'ccb9c8ef6b3a33f07b7be007336fd3e2',
            query:'',
            language: 'it-IT',
        },
        method:'GET',
        success: function(actors){
            var attori = casts(actors.cast);
            for (var i = 0; i < attori.length; i++) {
            var attore = attori[i];
            var actorList = {
                nome:attore.name,
                personaggio:attore.character,
                fotoattore: attore.profile_path
                }
            var templateActor = templateOne(actorList);
            $(appendActor).append(templateActor);
            }
        },
        error: function(){
        alert('errore');
        }
    })
};

function casts(actor1){
    actor1 = actor1.slice(0, 5);
    return actor1;
};

//Click pause
$('.play').on('click', '.start', function(){
    $('.start').hide();
    $('.pause').show();
});

$('.play').on('click', '.pause', function(){
    $('.pause').hide();
    $('.start').show();
});

/*
//Generi film
$('.mood-type').change(function(){
var thisGenre = $(this).val();

var apiBaseUrl = 'https://api.themoviedb.org/3';

$.ajax({
        url: apiBaseUrl + '/genre/movie/list',
        data:{
            api_key:'ccb9c8ef6b3a33f07b7be007336fd3e2',
            query: '',
            language: 'it-IT'
        },
        method:'GET',
        success: function (type) {
        var types = type.genres;
        for (var i = 0; i < types.length; i++) {
            var oneType = types[i];
            var idGenre = oneType.id;
            var typeGenre = oneType.name;

            scelta(thisGenre, idGenre);
        };
    }
});
});

function scelta(thisGenre, idGenre){
        if (thisGenre == "scegli"){
            $('.lista').show();
        }
};

*/
