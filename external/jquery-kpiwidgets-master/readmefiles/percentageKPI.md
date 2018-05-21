<img src="https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/percentageKPI.png" />

## Installation

```sh
npm install jquery-kpiwidgets
```

## Usage

```js
var percentageKPI = $("#percentage").PercentageKPI({
    title: "Top grossing age group",
    footer: "3,334 users",
    data: {
        value: "18-25",
        partial: 326,
        total : 3334
    },

    clickHandler: function(){
        alert("this is a click");
    }
});
```

```html
<div class="kpi-container-div">
    <div id="percentage" class="kpi-item"></div>
</div>
```


## Configuration Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `title`   | string | "" | Widget Title |
| `data`    | JSON Object | {} | widget parameters needed for calculations |
| `footer`  | string | "" | text that will appear inside the widget footer |
| `height`  | integer | 148 | widget height in px |
| `width`   | integer | 230 | widget width in px |
| `clickHandler` | function | null | click handler that triggers when the widget panel is being clicked



## Style Classes Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `containerStyleClass`   | string | percentage-kpi-container | style class for the widget container |
| `headerStyleClass`   | string | kpi-title | style class for the header |
| `headerTextStyleClass`   | string | kpi-title-text | style class for the header text |
| `valueStyleClass`   | string | percentage-kpi-data-text | style class for the value text |
| `subValueStyleClass`   | string | percentage-kpi-sub-data-text | style class for the sub value text |
| `footerStyleClass`   | string | percentage-kpi-footer | style class for the footer |
| `footerTextStyleClass`   | string | kpi-footer-text | style class for the footer text |



## Methods

```js
setData(data) - sets the value/trend/symbol in the widget object and refreshes the view accordingly
  param - JSON Array
  usage:
      var data = {
          value: "25-35",
          partial: 274,
          total : 3334
      }
      
      kpi = $("#percentage").PercentageKPI(....);
      kpi.PercentageKPI("setData", data);

getData() - gets the value from the widget object
  return - JSON Array
  usage:
      kpi = $("#percentage").PercentageKPI(....);
      kpi.PercentageKPI("getData");
```


## Dependencies

- [jQuery](http://jquery.com/): write less, do more
- [jQuery-ui](http://jqueryui.com/): jQuery user interface
