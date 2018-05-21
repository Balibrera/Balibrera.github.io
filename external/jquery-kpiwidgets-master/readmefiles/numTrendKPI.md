<img src="https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/numTrendKPI.png" />

## Installation

```sh
npm install jquery-kpiwidgets
```

## Usage

```js
var numTrend = $("#numAndTrendKPI").NumTrendKPI({
    title: "TOTAL REVENUE",
    footer: "GOAL SET: $3500/WEEK",
    data: {
        value: 4900,
        trend: "up",
        symbol: "$"
    },
    clickHandler: function () {
        alert("this is a click");
    }
});
```

```html
<div class="kpi-container-div">
    <div id="numAndTrendKPI" class="kpi-item"></div>
</div>
```


## Configuration Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `title`   | string | "" | Widget Title |
| `value`   | integer | 0 | Widget Value |
| `trend`   | string | "" | trend of value change. "up" / "down" / "flat".  this value is used for the placement of an optional trend image.  in case of "", no image will be shown|
| `symbol`  | string | "" | currency (or any other) symbol that will be placed before the value |
| `footer`  | string | "" | text that will appear inside the widget footer |
| `height`  | integer | 148 | widget height in px |
| `width`   | integer | 230 | widget width in px |
| `maxValueForSize`   | integer | 100000 | above this number, the widget font size wil decrease and get the num-trend-kpi-data-text-small style class|
| `clickHandler` | function | null | click handler that triggers when the widget value is being clicked



## Style Classes Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `containerStyleClass`   | string | num-trend-kpi-container | style class for the widget container |
| `headerStyleClass`   | string | kpi-title | style class for the header |
| `headerTextStyleClass`   | string | kpi-title-text | style class for the header text |
| `valueStyleClass`   | string | num-trend-kpi-data-text | style class for the value text |
| `trendUpStyleClass`  | string | kpi-trend-up | style class for the trend up img |
| `trendDownStyleClass`  | string | kpi-trend-down | style class for the trend down img |
| `trendFlatStyleClass`  | string | kpi-trend-flat | style class for the trend flat img |
| `footerStyleClass`   | string | num-trend-kpi-footer | style class for the footer |
| `footerTextStyleClass`   | string | kpi-footer-text | style class for the footer text |



## Methods

```js
setData(data) - sets the value/trend/symbol in the widget object and refreshes the view accordingly
   param - JSON Array
   usage:
       numTrend = $("#numAndTrendKPI").NumTrendKPI(....);
       numTrend.NumTrendKPI("setData", {
           value: 102300,
            trend: "up",
            symbol : "$"
       });
 
getData() - gets the value from the widget object
   return - JSON Array
   usage:
       numTrend = $("#numAndTrendKPI").NumTrendKPI(....);
       numTrend.NumTrendKPI("getData");
```


## Dependencies

- [jQuery](http://jquery.com/): write less, do more
- [jQuery-ui](http://jqueryui.com/): jQuery user interface
