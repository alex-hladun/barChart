let drawBarChart = function(jQuery, data, options, element) {
  // find the largest data value 
  let barMax = data[0];
  for (let i = 1; i <= data.length - 1; i++) {
    if (data[i] >= barMax) {
      barMax = data[i];
    }
  }

  // Assign bar values as percentage of the max value
  let barVal = [];
  for (let i = 0; i <= data.length - 1; i++) {
    barVal.push(100*data[i]/barMax+"\%");
  }
  
  // Calculate bar width percentages. 
  let barWidth = (100 / (data.length))+"%";

  for (let i = 0; i <= data.length - 1; i++) {
    // Generates the bars, and assigns CSS 
    let barToMake = $("<div id=\"bar"+i+"\" class=\"bar \"><h4>"+data[i]+"</h4></div>");
    barToMake.css({
      "height": barVal[i], 
      "width": barWidth,
      "margin-left" : options.barSpacing, 
      "margin-right" : options.barSpacing,
      "background" : options.barColour
    });
    // Adds the bars to the "border" <div> element (ie chart area)
    barToMake.appendTo("#border");
  }

  // Assigns CSS to the labels
  $("h4").css({
    "font-size" : options.barLabelFontSize,
    "color" : options.barLabelColour
    // "justify-content" : center
  })

  // Assigns CSS to the chart area
  $("#border").css({
    "height" : options.height, 
    "width": options.width,
    "background" : options.chartBackgroundColour,
    "border-color" : options.chartBorderColour, 
    "border-width" : options.borderWidth
  })


  // Assigns CSS to the title. 
  $("#title").css({
    "color": options.titleFontColour,
  })

}

// let options = {width: "900px", height: "500px", barSpacing: "20px", 
// barLabelPosition: "top", barColour: ["#944BBB"], barLabelColour: ["black"],
// barLabelFontSize : "10px", 
// xAxisTitle: "X-Axis Title", yAxisTitle: "Y-Axis Title", yTickCount: 5, 
// chartTitle: "Chart Title", titleFontSize: 32, titleFontColour: "black",
// chartBackgroundColour: "#CC92C2", chartBorderColour: "black", borderWidth: "20 px"};