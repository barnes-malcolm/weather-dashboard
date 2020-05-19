  // Initial array of cities
  var cities = ["Houston", "New York", "Los Angeles", "Chicago"];

  // Function for dumping the JSON content for each button into the div
  function displaycityInfo() {

    var city = $(this).attr("data-name");
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3b687b94b325905faf9803cf5949e7d3";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response) 

      $("#current-city").text(JSON.stringify(response));
    });
  }

  // Function for displaying city data
  function renderButtons() {

    // Deleting the buttons prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#cities-view").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

      // Then dynamically generating buttons for each city in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of city to our button
      a.addClass("add-city");
      // Adding a data-attribute
      a.attr("data-name", cities[i]);
      // Providing the initial button text
      a.text(cities[i]);
      // Adding the button to the cities-view div
      $("#cities-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-city").on("click", function(event) {
      console.log(event)
    event.preventDefault();

    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();

    // Adding the city from the textbox to our array
    cities.push(city);
    console.log(cities);

    // Calling renderButtons which handles the processing of our city array
    renderButtons();
  });

  // Function for displaying the city info
  // Using $(document).on instead of $(".city").on to add event listeners to dynamically generated elements
  $(document).on("click", ".add-city", displaycityInfo);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();