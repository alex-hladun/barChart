let drawBarChart = function (jQuery, data, options, element) {


  function generateDOMElements(yAxisWidth, areaWidth) {
    // create main container
    let container = $("<div id=\"container\">");
    container.css({
      "display": "flex",
      "flex-direction": "column",
      "width": options.width,
      "height": options.height
    })
    container.appendTo("#chart");

    // create upper block for title
    let upper = $("<div id = \"upper\">");
    upper.css({
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-start",
      "width": options.width,
      "height" : titleAxisHeight,
      "margin-block-end": "0px !important"
    })
    upper.appendTo("#container");

    // create middle block for y-axis and chart area. 
    let middle = $("<div id = \"middle\">");
    middle.css({
      "display": "flex",
      "flex-direction": "row",
      "width": options.width,
      "height": areaHeight
    })
    middle.appendTo("#container");

    // create lower block for x-axis. 
    let lower = $("<div id = \"lower\">");
    lower.css({
      "display": "flex",
      "width": options.width,
      "height" : titleAxisHeight,
    })
    lower.appendTo("#container");

    // change from 60 px to yAxisWidth later. Some of these probably
    // not necessary, just inherited from the y class. 
    let spacer1 = $("<h1 id = \"spacer\"></h1>")
    spacer1.css({
      "display": "flex",
      "width": yAxisWidth,
      "padding-top": "40px",
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "flex-end",
      "margin-left": "0px",
      "margin-block-end": "0px !important"
    })
    spacer1.appendTo("#upper");

    // Title for chart
    let title = $("<h1 id = \"title\">"+options.chartTitle+"</h1>")
    title.css({
      "display": "flex",
      "width": chartWidth,
      "color" : "black",
      "justify-content": "center",
      "margin-block-end": "0px !important"
    })
    title.appendTo("#upper");

    // Y-axis holder
    let yaxis = $("<div id = \"yaxis\"></div>")
    yaxis.css({
      "display": "flex",
      "width": yAxisWidth,
      // "height" : areaHeight,
      "padding-top": "40px",
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "flex-end"
    })
    yaxis.appendTo("#middle"); 

    // Chart area holder
    let border = $("<div id = \"border\"></div>")
    border.css({
      "border-style": "solid",
      "border-color": "black",
      "border-width": "5px",
      "display": "flex",
      // "height" : areaHeight,
      "width" : areaWidth,
      "background": options.chartBackgroundColour,
      "border-color": options.chartBorderColour,
      "border-width": options.borderWidth,
      "padding-top": "60px",
      "flex-direction": "row",
      "justify-content": "space-around",
      "align-items": "flex-end",
    })
    border.appendTo("#middle");

    // Lower spacer (to align x-axis labels)
    let spacer2 = $("<h1 id = \"spacer2\"></h1>")
    spacer2.css({
      "margin-left": "0px",
      "width": yAxisWidth,
      "align-self": "flex-start",
      "align-items": "flex-start",
      "background-color": "blueviolet"
    })
    spacer2.appendTo("#lower");

    let xaxis = $("<div id=\"xaxis\"></div>");
    xaxis.css({
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "space-around",
      "width": areaWidth,
      "border-width": "10px",
      "border-color": "transparent",
      "border-style": "solid"
    })
    xaxis.appendTo("#lower");
  }

  // Calculate widths required for border, y-axis, x-axis, title. 
  let chartWidth = options.width;
  let chartHeight = options.height;
  // let areaWidth = chartWidth - 60;
  let areaWidth = "90%";
  let yAxisWidth = "10%";
  let titleAxisHeight = "12%";
  let areaHeight = "76%";

    // // Assigns CSS to the chart area
    // $("#border").css({
    //   "height": options.height,
    //   "width": options.width,
    //   "background": options.chartBackgroundColour,
    //   "border-color": options.chartBorderColour,
    //   "border-width": options.borderWidth
    // })


  generateDOMElements(yAxisWidth, areaWidth);

  // Format data into arrays of arrays. Ensures compatibility for stacked bars. 
  let formattedData = [];
  for (let i = 0; i <= data.length - 1; i++) {
    formattedData.push([]);
    if (typeof data[i] === "number") {
      formattedData[i].push(data[i]);
    } else if (typeof data[i] === "object") {
      for (let j = 0; j <= data[i].length - 1; j++) {
        formattedData[i].push(data[i][j]);
      }
    }
  }

  // Find the largest bar data size. Also creates an array with the sum of
  // all values in each array. 
  let totalArray = [];
  let barMax = 0;
  for (let i = 0; i <= formattedData.length - 1; i++) {
    let arraySum = 0;
    totalArray.push([]);
    for (let j = 0; j <= formattedData[i].length - 1; j++) {
      arraySum += formattedData[i][j];
    }
    totalArray[i].push(arraySum);
    if (arraySum >= barMax) {
      barMax = arraySum;
    }
  }

  // Creates array of bar-group values as percentage of the max value
  let barGroupVal = [];
  for (let i = 0; i <= formattedData.length - 1; i++) {
    barGroupVal.push([]);
    barGroupVal[i].push(100 * totalArray[i] / barMax + "\%");
  }

  // Creates an array of individual percentages of each bar-group total.
  let barVal = [];
  for (let i = 0; i <= formattedData.length - 1; i++) {
    barVal.push([]);
    for (let j = 0; j <= formattedData[i].length - 1; j++) {
      barVal[i].push(100 * formattedData[i][j] / totalArray[i] + "\%");
    }
  }

  // Calculate bar width percentages. 
  let barWidth = (100 / (data.length)) + "%";


  // Generates the bars, and assigns CSS 
  for (let i = 0; i <= formattedData.length - 1; i++) {
    // barDiv is each grouping of bars
    let barDiv = $("<div id=\"barGroup" + i + "\" class=\"barGroup\"></div>")
    barDiv.css({
      "width": barWidth,
      "margin-left": options.barSpacing,
      "margin-right": options.barSpacing,
      "height": barGroupVal[i]
    })
    barDiv.appendTo("#border")
    for (let j = 0; j <= formattedData[i].length - 1; j++) {
      let barToMake = $("<div id=\"bar" + i + j + "\" class=\"bar\"><h4>" + formattedData[i][j] + "</h4></div>");
      barToMake.css({
        "height": barVal[i][j],
        "background": options.barColour[j]
      });
      // Adds the bars to the "border" <div> element (ie chart area)
      barToMake.appendTo(barDiv);
    }
  }

  // assign x-labels 
  for (let i = 0; i <= formattedData.length - 1; i++) {
    let xlabel = $("<div id=\"xlabel" + i + "\" class=\"xLabels\"><h5 class = \"xLabels\">" + options.xLabels[i] + "</h5></div>")
    xlabel.css({
    })
    xlabel.appendTo("#xaxis")
  }

  // <div id="xlabel1" class ="xLabels"><h5 class ="xLabels">Eggs</h5></div>

  // Assigns CSS to the labels
  $("h4").css({
    "font-size": options.barLabelFontSize,
    "color": options.barLabelColour
  })

  // Calculate y-label spacing and apply to DOM
  let yTickCount = options.yTickCount;
  let yLabelValues = [];
  for (let i = 0; i <= yTickCount; i++) {
    yLabelValues.push(((i / yTickCount) * barMax).toFixed(1))
  }


  // Assign y-label values into DOM
  for (let i = yTickCount; i >= 0; i--) {
    let labelToMake = $("<div id=\"ytick" + i + "\"><h5 class=\"tickLabels\">" + yLabelValues[i] + "</h4><h5 class=\"tickBox\"></h5></div>")
    labelToMake.css({
      "display": "flex",
      "margin-block-end": "0px !important"
    })
    labelToMake.appendTo("#yaxis");
  }





}

// let options = {width: "900px", height: "500px", barSpacing: "20px", 
// barLabelPosition: "top", barColour: ["#944BBB"], barLabelColour: ["black"],
// barLabelFontSize : "10px", 
// xAxisTitle: "X-Axis Title", yAxisTitle: "Y-Axis Title", yTickCount: 5, 
// chartTitle: "Chart Title", titleFontSize: 32, titleFontColour: "black",
// chartBackgroundColour: "#CC92C2", chartBorderColour: "black", borderWidth: "20 px"};