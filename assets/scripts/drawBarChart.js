let drawBarChart = function(jQuery, data, options, element) {
  // size the data properly
  let barMax = data[0];
  for (let i = 1; i <= data.length - 1; i++) {
    if (data[i] >= barMax) {
      barMax = data[i];
    }
  }
  console.log(barMax);

  // assign bar percentages
  let barVal = [];
  for (let i = 0; i <= data.length - 1; i++) {
    barVal.push(100*data[i]/barMax+"\%");
  }
  console.log(barVal);



  console.log(data);
  for (let i = 0; i <= data.length - 1; i++) {
    console.log("Loop")
    // generates the bars 
    let barToMake = $("<div id=\"bar"+i+"\" class=\"bar bar-padding\"><h4>"+data[i]+"</h4></div>");
    barToMake.css("height",barVal[i]);
    // adds the bars to the "border" <div> element
    barToMake.appendTo("#border");
  }
  // $("#bar0").css("height","50px")
  // $("#bar1").css("height","100%")
  // $("#bar2").css("height","250px")
  console.log("CSS applied");
}