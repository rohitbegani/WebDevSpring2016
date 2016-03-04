(function () {
    $(init);

    var $movieTitleText;
    var $searchBtn;
    var $searchResults;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE"

    function init() {
        //alert("Hello!");
        $movieTitleText = $('#movieTitleText');
        $searchBtn = $('#searchBtn');
        $searchResults = $('#searchResults tbody');
        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $('#movieTitleText').val();
        console.log(title);
        var url = SEARCH_URL.replace('TITLE', title);
        //alert("Search for " + title);
        //alert("URL: " + url);
        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){
        //console.log(response);
        var totalResults = response.totalResults;
        var movies = response.Search;  // Gives us the total number of movies

        for (var m=0; m<movies.length; m++){
            var movie = movies[m];
            //console.log(movie);
            var posterUrl = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;

            var $tr = $('<tr>')
                .attr("id", imdbID)
                .click(fetchMovieDetails);

            var $img = $('<img>')
                .attr("src", posterUrl)
                .addClass("posterThmb");
            //console.log(movie.Poster);
            var $td = $('<td>')
                .append($img)
                $td.appendTo($tr);  // appends td to tr

            $td = $('<td>')
                .append(title)
                .appendTo($tr); //appends td to tr

            $td = $('<td>')
                .append(year)
                .appendTo($tr);

            $td = $('<td>')
                .append(imdbID)
                .appendTo($tr);

            $searchResults.append($tr); // appends tr to the search results
        }
    }

    function fetchMovieDetails(event) {
        //alert(fetchMovieDetails);
        console.log(event);
    }
})();