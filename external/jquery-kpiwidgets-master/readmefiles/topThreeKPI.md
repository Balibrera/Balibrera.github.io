<img src="https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/topThreeKPI.png" />

## Installation

```sh
npm install jquery-kpiwidgets
```

## Usage

```js
var topThreeKPI = $("#topThreeKPI").TopThreeKPI({
    title: "TOP GROSSING APPS",
    footer: "GOAL SET: $2400/DAY",
    
    data: [{
        name: "My App",
        value: 1000,
        symbol: "$",
        trend: "up"
        //delta: 2 - change delta - optional
    }, {
        name: "Another App of mine",
        value: 20000,
        symbol: "$",
        trend: "down"
    }, {
        name: "My Third App",
        value: 300,
        symbol: "$",
        trend: "up"
    }],

    clickHandler: function () {
        alert("this is a click");
    }
});
```

```html
<div class="kpi-container-div">
    <div id="topThreeKPI" class="kpi-item"></div>
</div>
```


## Configuration Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `title`   | string | "" | Widget Title |
| `data`    | JSON Array | [] | Items data - JSON Array of up to 3 elements|
| `footer`  | string | "" | text that will appear inside the widget footer |
| `height`  | integer | 148 | widget height in px |
| `width`   | integer | 230 | widget width in px |
| `showDecimalPoint`   | boolean | true | show 2 digits after the decimal point|
| `maxDeltaThreshold`   | integer | 999 | above this number the delta value will not appear next to the delta symbol (ui considerations)|
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
| `deltaUpStyleClass`  | string | kpi-delta-up | style class for the delta up |
| `deltaDownStyleClass`  | string | kpi-delta-down | style class for the delta down |
| `deltaFlatStyleClass`  | string | kpi-delta-flat | style class for the delta flat |
| `footerStyleClass`   | string | top-3-kpi-footer | style class for the footer |
| `footerTextStyleClass`   | string | kpi-footer-text | style class for the footer text |



## Methods

```js
setData(data) - sets the 3 items in the widget object and refreshes the view accordingly
   param - JSON Array
   usage:
       var data = [{
           name: "Fruit Ninja",
           value: 202300,
           symbol: "$",
           trend: "down"
       }, {
           name: "Angry Birds",
           value: 2323444,
           symbol: "$",
           trend: "up"
       }];

       kpi1 = $("#topThree1").TopThreeKPI(...);
       kpi1.TopThreeKPI("setData", data);

getData() - gets the value from the widget object
   return - JSON Array
   usage:
       kpi1 = $("#topThree1").TopThreeKPI(...);
       kpi1.TopThreeKPI("getData");
```


## Dependencies

- [jQuery](http://jquery.com/): write less, do more
- [jQuery-ui](http://jqueryui.com/): jQuery user interface
