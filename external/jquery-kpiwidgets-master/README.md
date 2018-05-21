

NumTrendKPI   |  TopThreeKPI  |   PercentageKPI
------------- | ------------- | ----------------
![NumTrendKPI](https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/numTrendKPI.png)  |   ![TopThreeKPI](https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/topThreeKPI.png)  |  ![PercentageKPI](https://raw.githubusercontent.com/inneractive-opensrc/jquery-kpiwidgets/master/readmeImages/percentageKPI.png)






## Installation

```sh
npm install jquery-kpiwidgets
```
### Usage

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

var topThreeKPI = $("#topThreeKPI").TopThreeKPI({
    title: "TOP GROSSING APPS",
    footer: "GOAL SET: $2400/DAY",
    
    data: [{
        name: "My App",
        value: 1000,
        symbol: "$",
        trend: "up"
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
    <div id="numAndTrendKPI" class="kpi-item"></div>
    <div id="topThreeKPI" class="kpi-item"></div>
    <div id="percentage" class="kpi-item"></div>
</div>
```

## [Complete Documentation]
#### [NumTrendKPI](https://github.com/inneractive-opensrc/jquery-kpiwidgets/wiki/NumTrendKPI)
#### [TopThreeKPI](https://github.com/inneractive-opensrc/jquery-kpiwidgets/wiki/TopThreeKPI)
#### [PercentageKPI](https://github.com/inneractive-opensrc/jquery-kpiwidgets/wiki/PercentageKPI)

***
