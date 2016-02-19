(function () {
    $(init);

    var $movieTitleText;
    var $searchBtn;

    function init() {
        //alert("Hello!");
        $movieTitleText = $('#movieTitleText');
        $searchBtn = $('#searchBtn');

        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $movieTitleText.val();

        alert("Search for " + title);
    }
})();