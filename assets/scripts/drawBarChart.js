let drawBarChart = function (jQuery, data, options, element) {

  // Set height and widths for optimal graph display. Also add "px" to some
  // strings. 
  let totalArray = [];
  let barMax = 0;
  let chartWidth = options.width + "px";
  let chartHeight = options.height + "px";
  let areaWidth = "90%";
  let yAxisWidth = 5;
  let titleAxisHeight = "6%";
  let xaxisHeight = "6%";
  let areaHeight = "78%";
  let barVal = [];

  // Generates the inital DOM elements required to build the chart. 
  function generateDOMElements(yAxisWidth, areaWidth) {
    // create main container
    let container = $("<div id=\"container\">");
    container.css({
      "display": "flex",
      "flex-direction": "column",
      "width": chartWidth,
      "height": chartHeight
    })
    container.appendTo(element);

    // create upper block for title
    let upper = $("<div id = \"upper\">");
    upper.css({
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-start",
      "width": chartWidth,
      "height": titleAxisHeight,
      "margin-block-end": "0px !important"
    })
    upper.appendTo("#container");

    // create upper block for Legend
    let legend = $("<div id = \"legend\">");
    legend.css({
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-start",
      "width": chartWidth,
      "height": titleAxisHeight,
      "margin-block-end": "0px !important"
    })
    legend.appendTo("#container");

    // create middle block for y-axis and chart area. 
    let middle = $("<div id = \"middle\">");
    middle.css({
      "display": "flex",
      "flex-direction": "row",
      "width": chartWidth,
      "height": areaHeight
    })
    middle.appendTo("#container");

    // create lower block for x-axis. 
    let lower = $("<div id = \"lower\">");
    lower.css({
      "display": "flex",
      "width": chartWidth,
      "height": xaxisHeight,
    })
    lower.appendTo("#container");

    let spacer1 = $("<h1></h1>")
    spacer1.css({
      "display": "flex",
      "width": 2 * yAxisWidth + 2 + "%",
      "padding-top": "40px",
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "flex-end",
      "margin-left": "0px",
      "margin-block-end": "0px !important"
    })
    spacer1.appendTo("#upper");

    //spacer to ensure Legend labels are spaced out properly. 
    let spacer3 = $("<h1></h1>")
    spacer3.css({
      "display": "flex",
      "width": 2 * yAxisWidth + 2 + "%",
      "padding-top": "40px",
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "flex-end",
      "margin-left": "0px",
      "margin-block-end": "0px !important"
    })
    spacer3.appendTo("#legend");

    // Title for chart
    let title = $("<h1 id = \"title\"><u>" + options.chartTitle + "</u></h1>")
    title.css({
      "display": "flex",
      "width": chartWidth,
      "color": options.titleFontColour,
      "font-size": options.titleFontSize + "px",
      "align-items": "flex-end",
      "justify-content": "center",
      "margin-block-end": "0px !important"
    })
    title.appendTo("#upper");

    // Container for legend entries. Necessary to make sure Legend is centered properly. 
    let legendContainer = $("<div id = \"legendContainer\">");
    legendContainer.css({
      "display": "flex",
      "flex-direction": "row",
      "width": chartWidth,
      "justify-content": "center",
      "margin-block-end": "0px !important"
    })
    legendContainer.appendTo("#legend");

    // Y-Axis Title
    let yAxisTitle = $("<div id = \"yAxisTitle\"><h4 class=\"rotated\">" + options.yAxisTitle + "</h4></div>")
    yAxisTitle.css({
      "align-items": "center",
      "display": "flex",
      "width": yAxisWidth + "%",
      "margin-right": "1%",
      "font-size": options.yAxisTitleFontSize + "px"
    })
    yAxisTitle.appendTo("#middle");

    // Y-axis holder
    let yaxis = $("<div id = \"yaxis\"></div>")
    yaxis.css({
      "display": "flex",
      "width": yAxisWidth + "%",
      "padding-top": (options.barPaddingTop + options.borderWidth - options.yLabelFontSize) + "px",
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
      "width": areaWidth,
      "background": options.chartBackgroundColour,
      "border-color": options.chartBorderColour,
      "border-width": options.borderWidth + "px",
      "padding-top": options.barPaddingTop + "px",
      "flex-direction": "row",
      "justify-content": "space-around",
      "align-items": "flex-end",
    })
    border.appendTo("#middle");

    // Lower spacer (to align x-axis labels)
    let spacer2 = $("<h1 id = \"spacer2\"></h1>")
    spacer2.css({
      "margin-left": "0px",
      "width": 2 * yAxisWidth + 1 + "%",
      "align-self": "flex-start",
      "align-items": "flex-start",
      "background-color": "blueviolet"
    })
    spacer2.appendTo("#lower");

    // X-axis holder
    let xaxis = $("<div id=\"xaxis\"></div>");
    xaxis.css({
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "space-around",
      "width": areaWidth,
      "border-width": "5px",
      "border-color": "transparent",
      "border-style": "solid"
    })
    xaxis.appendTo("#lower");
  }

  // Format data into arrays of arrays. Ensures compatibility for stacked bars. 
  function formatData() {
    let formData = [];
    for (let i = 0; i <= data.length - 1; i++) {
      formData.push([]);
      if (typeof data[i] === "number") {
        formData[i].push(data[i]);
      } else if (typeof data[i] === "object") {
        for (let j = 0; j <= data[i].length - 1; j++) {
          formData[i].push(data[i][j]);
        }
      }
    }
    console.log("ok")
    return formData
  }

  // Generates the legend above the chart area
  function drawLegend() {
    // Create legend and labels/box. 
    for (let i = 0; i <= options.barLegend.length - 1; i++) {
      let legendEntry = $("<div id=\"legendEntry" + i + "\"></div>");
      legendEntry.css({
        "display": "flex",
        "justify-content": "space-between",
        "align-items": "center"
      })
      let legendText = $("<h4 id=\"legendText" + i + "\">" + options.barLegend[i] + "</h4>");
      legendText.css({
        "display": "flex",
        "margin-left": "5px",
        "font-size": options.legendFontSize + "px",
        "margin-right": "10px"
      }
      )
      let legendBox = $("<h4></h4>");
      legendBox.css({
        "background": options.barColour[i],
        "display": "flex",
        "width": options.legendBoxSize + "px",
        "height": options.legendBoxSize + "px",
        "border-style": "solid",
        "border-color": "black",
        "border-width": options.legendBorderSize + "px",
      })

      legendEntry.appendTo(legendContainer);
      legendBox.appendTo(legendEntry);
      legendText.appendTo(legendEntry);
    }
  }

  // Creates array of bar-group values as percentage of the maximum total.
  function createBarDataArray() {
    let barGroupVal = [];
    for (let i = 0; i <= formattedData.length - 1; i++) {
      barGroupVal.push([]);
      barGroupVal[i].push(100 * totalArray[i] / barMax + "\%");
    }
    return barGroupVal;
  }

  // Creates an array of individual percentages of each bar-group total.
  function calcBarVal() {
    for (let i = 0; i <= formattedData.length - 1; i++) {
      barVal.push([]);
      for (let j = 0; j <= formattedData[i].length - 1; j++) {
        barVal[i].push(100 * formattedData[i][j] / totalArray[i] + "\%");
      }
    }
    return barVal
  }

  // Generate bars and assign CSS. Assign labels to x & y axis. 
  function generateChart() {
    let barWidth = (100 / (data.length)) + "%";
  
    // Generates the bars, and assigns CSS. 
    for (let i = 0; i <= formattedData.length - 1; i++) {
      // barDiv is each grouping of bars
      let barDiv = $("<div id=\"barGroup" + i + "\"></div>")
      barDiv.css({
        "width": barWidth,
        "margin-left": options.barSpacing + "px",
        "margin-right": options.barSpacing + "px",
        "height": barGroupVal[i]
      })
      barDiv.appendTo("#border")
      for (let j = 0; j <= formattedData[i].length - 1; j++) {
        let barToMake = $("<div id=\"bar" + i + j + "\"></div>");
        let barLabelPosition = "flex-start";
        // assign barLabel position
        switch (options.barLabelPosition) {
          case "top": barLabelPosition = "flex-start"; break;
          case "center": barLabelPosition = "center"; break;
          case "bottom": barLabelPosition = "flex-end"; break;
        }
        let barLabel = $("<h4>" + formattedData[i][j] + "</h4>");
        barLabel.css({
          "font-size": options.barLabelFontSize + "px",
          "color": options.barLabelColour[j],
          "align-items": "flex-end",
          "margin-block-start": "0px !important",
          "margin-block-end": "0px !important",
        })
  
        barToMake.css({
          "height": barVal[i][j],
          "background": options.barColour[j],
          "align-items": barLabelPosition,
          "display": "flex",
          "justify-content": "center",
        });
        // Adds the bars to the "border" <div> element (ie chart area).
        barToMake.appendTo(barDiv);
        barLabel.appendTo(barToMake);
      }
    }
  
    // Assign labels to x-axis
    for (let i = 0; i <= formattedData.length - 1; i++) {
      let xlabel = $("<div id=\"xlabel" + i + "\"><h5 class=\"xLabels\">" + options.xLabels[i] + "</h5></div>");
      xlabel.css({
        "text-align": "center",
        "font-size": options.xLabelFontSize + "px"
      })
      xlabel.appendTo("#xaxis");
    }
  
    // Calculate y-label spacing and apply to DOM. Add y-label values. 
    let yTickCount = options.yTickCount;
    let yLabelValues = [];
    for (let i = 0; i <= yTickCount; i++) {
      yLabelValues.push(((i / yTickCount) * barMax).toFixed(options.yLabelDecimalCount))
    }
  
    // Assign y-label values into DOM
    for (let i = yTickCount; i >= 0; i--) {
      let labelToMake = $("<div id=\"ytick" + i + "\"></div>");
      labelToMake.css({
        "display": "flex",
        "align-items": "center",
        "margin-block-end": "0px !important",
        "margin-block-start": "0 px !important",
        "font-size": options.yLabelFontSize,
        "color": options.yLabelColour
      })
  
      let tickLabel = $("<h4 class=\"tickLabels\"s>" + yLabelValues[i] + "</h4>");
      tickLabel.css({
        "display": "flex",
        "margin-block-end": "0px !important",
        "margin-block-start": "0px !important",
        "margin-right": "5px",
        "align-self": "flex-end"
      })
  
      let tickToMake = $("<h5 class=\"tickLabels\"></h5>");
      tickToMake.css({
        "background-color": "black",
        "width": "10px",
        "height": options.yTickThickness,
        "align-self": "flex-end",
        "margin-block-end": "0px !important",
        "margin-block-start": "0px !important"
      })
      labelToMake.appendTo("#yaxis");
      tickLabel.appendTo(labelToMake);
      tickToMake.appendTo(labelToMake);
    }
    }

  generateDOMElements(yAxisWidth, areaWidth);
  let formattedData = formatData();
  drawLegend();

  // Find the largest bar data size. Also creates an array with the sum of
  // all values in each array. 
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

  let barGroupVal = createBarDataArray();
  barVal = calcBarVal();
  generateChart();

  // Over-rides User-Agent style-sheet for margin-block label values. 
  // let $label = $('h4');
  // $label.attr('style', $label.attr('style') + '; ' + 'margin-block-start: 0px !important');
  // $label.attr('style', $label.attr('style') + '; ' + 'margin-block-end: 0px !important');

  // let $label2 = $('h5');
  // $label2.attr('style', $label.attr('style') + '; ' + 'margin-block-start: 0px !important');
  // $label2.attr('style', $label.attr('style') + '; ' + 'margin-block-end: 0px !important');
}
