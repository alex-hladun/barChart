## barChart
A library to create bar charts using JQuery, JS, HTML &amp; CSS. 

# About
This library will take your data and format it into a simple, beautiful bar-chart for sharing and presentations.

# Setup
For proper functionality, the following is required in your html where you would like to render the chart: 
* A CSS style-reset, such as the one in /assets/stylesheets/styles.css
  * It is important that the margin, padding, and border are set to 0 in order to avoid chart-rendering problems.
* Call the API using:
  * ````

# Screenshots
![Example Screenshot](/assets/screenshots/screenshot.png)

# API
The API uses the following function: 
`drawBarChart(jQuery, data, options, element)`

You will supply:
* data
  * An array of numbers, or an array of arrays for stacked bar-charts
  * i.e. `[2, 4, 5]` or `[[2, 4, 5], 3, [3, 6]]`
* options
  * A javascript object which contains over 20 chart customization options such as colors, widths and font sizes. 
  * See below for a full list of options. 
* element
  * the #identifier of the dom element you would like the chart to be rendered into. 
  * ie "#body"

# Features/Options
The javascript object should be formatted as follows with the following options: 
  ````
  let options = {
    // Width of chart, in px.
    width: 900,
    // Height of chart, in px.
    height: 500,
    // Space next to each bar, in px. 20 would be a spacing of 40 px between bars, and
    // 20 px between left/right sides.
    barSpacing: 20,
    // Sets the bar colors for a stacked bar. Corresponds to order data was assigned.
    barColour: ["#7B9E87", "#B6BE9C", "#D2D0BA", "#E5C1BD", "#A49CBF", "#9E7B91", "#BEE1E5"],
    // Assign the bar legend descriptors, corresponding to the order the data was assigned.
    barLegend: ["STEM Students", "Arts Students", "Psychology Students", "Nursing Students", "Education Students"],
    // Individual bar label colours, corresponding to the order the data was assigned.
    barLabelColour: ["White", "white", "white", "white", "white"],
    // Sets the size of the bar label font.
    barLabelFontSize: 14,
    // Sets position of in-bar labels. Can be top, center, or bottom.
    barLabelPosition: "center",
    // Space between bars and top of chart area.
    barPaddingTop: 50,
    // Sets the font size for the legend.
    legendFontSize: 13,
    // Sets the border thickness of the legend boxes.
    legendBorderSize: 2,
    // Sets the width/height of the legend box.
    legendBoxSize: 10,
    // Labels on the x-axis, from left to right.
    xLabels: ["2017", "2018", "2019", "2020"],
    // Font size of x-axis labels, in px.
    xLabelFontSize: 20,
    // How many ticks above the origin you would like on the y-axis.
    yTickCount: 5,
    // Thickness, in px, of the ticks on the y-axis.
    yTickThickness: 3,
    // Font-size of the y-axis numbers.
    yLabelFontSize: 15,
    // How many decimals you would like to include on the y-axis labels.
    yLabelDecimalCount: 0,
    // Colour of the y-axis labels.
    yLabelColour: "black",
    // Colour of the y-ticks.
    yTickColour: "black",
    // Title of the y-axis.
    yAxisTitle: "Number of Students",
    // Font size of the y-axis title.
    yAxisTitleFontSize: 17,
    // Title of the chart.
    chartTitle: "Graduating Class Size",
    // Font size of the title.
    titleFontSize: 30,
    // Colour of the title.
    titleFontColour: "black",
    // Colour of the chart background.
    chartBackgroundColour: "#5E747F",
    // Colour of the chart border.
    chartBorderColour: "black",
    // Width of the chart border, in px.
    borderWidth: 3
  };
  ````

# Known Issues/Bugs

# Roadmap

# External resources
The following tutorials/resources were used to make this project:
* https://www.w3schools.com/css/css_howto.asp
* https://www.geeksforgeeks.org/how-to-float-three-div-side-by-side-using-css/
* https://www.freecodecamp.org/learn/responsive-web-design/css
* https://api.jquery.com/category/manipulation/
* https://stackoverflow.com/questions/5790615/can-you-make-an-invisible-border
* https://love2dev.com/blog/absolute-centering-css/
* https://stackoverflow.com/questions/2655925/how-to-apply-important-using-css
* https://stackoverflow.com/questions/4860244/how-to-delete-px-from-245px
* https://appdividend.com/2018/12/29/how-to-configure-eslint-in-visual-studio-code-on-mac/
* https://api.jquery.com/click/
