// $(document).ready(function() {
    //Create a variable to hold array of movie names
    var movies = ["Deadpool", "Bad Moms", "Kingsman", "Underworld", "Iron Man", "The Time Traveler's Wife"];
   
    //Create a function that will loop through the array to create a button for each movie title
    function renderButtons() {

        $("#movieButtons").empty();

        for (var i = 0; i < movies.length; i++) {
            var a = $("<button>");
            a.addClass("movie");
            a.attr("data-movie", movies[i]);
            a.text(movies[i]);
            a.on("click", clickMovieButton);
            $("#movieButtons").append(a);
        }
    }
    renderButtons();

    function clickMovieButton() {
    
        var movie = $(this).attr("data-movie");
        console.log(movie);
        //Link Gif Url and API key
        var queryURL = "https://api.giphy.com/v1/gifs/search";

            $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    q:movie,
                    api_key: "dc6zaTOxFJmzC",
                    limit: 12
                }
            })

            .done(function (response) {
                var results = response.data;
                var gifHolder = $("#displayGifs");

                gifHolder.empty();

                for (var i = 0; i < response.data.length; i++) {
                    
                    var movieDiv = $("<div>").addClass("item");
                    var rating = results[i].rating;
                    var textRating = $("<p>").text("Rating: " + rating);
                    var movieImage = $("<img>");

                    movieImage.attr("src", results[i].images.fixed_height_still.url);
                    movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                    movieImage.attr("data-animate", results[i].images.fixed_height.url);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("states");
                    movieImage.on("click", function() {
                                var state = $(this).data("state")
                                    if (state==="still") {
                                        $(this).data("state", "animate");
                                        $(this).attr("src", $(this).data("animate"));
                                    }
                                    else {
                                        $(this).data("state", "still");
                                        $(this).attr("src", $(this).data("still"));
                                    };

                            });
                    movieDiv.append(textRating);
                    movieDiv.append(movieImage);

                    $("#displayGifs").append(movieDiv);
                }
            })
    }

   //Create a function that will display x number of Gifs for each movie
   //Create a function that will make the image still and animate when clicked on
   //Display all buttons and Gifs to HTML

// });