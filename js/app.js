$("#searchBox").click(function(){
  $("#communication").empty();
});

//enter button causes same effect as click on search button
$('#searchBox').keyup(function(event){    
    if(event.keyCode==13){
       $('#searchButton').trigger('click');
    }
});


//button click  to retrieve search info
$("#searchButton").click(function(event) {
  
  //empty previous search results
  $("#wikiContent").empty();
  //empty communication div 
  $("#communication").empty();
  
  //make sure search contains text and put into variable
  var searchText = $("#searchBox").val();
  if (searchText == "") {
    $("#communication").html("Please enter search terms.");
    return false;
  }

  //url variables
  var wikiUrl1 = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
  var wikiUrl2 = "&format=json&callback=?";
  //replace spaces with %
  var wikiQuery = searchText.replace(/ /g, "%");
  
  //request
  $.getJSON({
    type: "GET",
    url: wikiUrl1 + wikiQuery + wikiUrl2,
    success: function(data) {
      //for loop to seperate entires from object
      for (i = 0; i < data.query.search.length; i++) {
        var wikiInfo = data.query.search[i].snippet;
        var wikiTitle = data.query.search[i].title;
        var heading = ("<h4><strong>" + wikiTitle + "</strong></h4>");
        wikiTitle = wikiTitle.replace(/ /g, "_");
        var wikipedia = "https://wikipedia.org/wiki/";
        var titleUrl = wikipedia + wikiTitle;
        var $wikiList = ("<li><a id='wikiLink' target='_blank'>");
        $wikiList += heading;
        $wikiList += ("</a><p>");
        $wikiList += wikiInfo;
        $wikiList += "..."
        $wikiList += ("</p></li>");
        //add all information entries to ul
        $("#wikiLink").attr("href", titleUrl);
        console.log(titleUrl);
        $("#wikiContent").append($wikiList).css({"background-color": "white", "padding": "10px 20px", "border": " 1px solid gray"});
       
      }

    },
    failure: function() {
      $("#communication").html("Something went wrong. Try again.");
    }
  });

});
