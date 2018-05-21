/**
 * jQuery Top 3 Items Widget
 *
 * Author: Guy Ben Shoshan 12/2014.
 * Tested: FF 33, Chrome 39, IE 11, Opera 12, Safari 5
 *
 * Copyright (c) 2017 Inneractive
 * Dual licensed under the MIT and GPL licenses:
 *
 * Depends:
 *    jquery core 1.11.1 - http://code.jquery.com/jquery-1.11.1.min.js
 *    jquery ui 1.11 - http://jqueryui.com/resources/download/jquery-ui-1.11.2.zip
 *
 * Description:
 *      This widget is intended to present a tabular view of 3 items in a KPI box
 *
 * options:
 *      title - widget title - default: ""
 *      data  - items data - JSON Array of up to 3 elements - default []
 *          name - string
 *          value - number
 *          symbol - currency (or any other) symbol that will be placed before the value    - default: ""
 *          trend - trend of value change. "up" / "down" / "flat"                           - default: ""
 *          delta - percentage of change.  integer                                          - default: 0
 *
 *          example
 *          [{
 *              name: "",
 *              value: "",
 *              symbol: "",
 *              trend: "",
 *              delta: 0
 *          }, {
 *              name: "",
 *              value: "",
 *              symbol: "",
 *              trend: "",
 *              delta: 0
 *          }, {
 *              name: "",
 *              value: "",
 *              symbol: "",
 *              trend: "",
 *              delta: 0
 *          }]
 *             - default: 0
 *
 *      footer - text that will appear inside the widget footer                         - default: ""
 *      height - widget height in px                                                    - default: 148
 *      width  - widget width in px                                                     - default: 230
 *      showDecimalPoint - show 2 digits after the decimal point                        - default: true
 *      maxDeltaThreshold - above this number the delta value will not appear           - default: 999
 *                            next to the delta symbol (ui considerations)
 *      clickHandler -    click handler that triggers when the widget value             - default: null
 *                        is being clicked
 *
 *      style classes:
 *      --------------------------------------------------------------------------------------------------------------------
 *      containerStyleClass     - style class for the widget container                  - default: "top-three-kpi-container"
 *      headerStyleClass        - style class for the header                            - default: "kpi-title"
 *      headerTextStyleClass    - style class for the header text                       - default: "kpi-title-text"
 *      nameStyleClass          - style class for the item name                         - default: "top-3-name"
 *      valueStyleClass         - style class for the item value                        - default: "top-3-value"
 *      trendUpStyleClass       - style class for the trend up img                      - default: "kpi-trend-up-small"
 *      trendDownStyleClass     - style class for the trend down img                    - default: "kpi-trend-down-small"
 *      trendFlatStyleClass     - style class for the trend flat img                    - default: "kpi-trend-flat-small"
 *      deltaUpStyleClass       - style class for the delta up                          - default: "kpi-delta-up"
 *      deltaDownStyleClass     - style class for the delta down                        - default: "kpi-delta-down"
 *      deltaFlatStyleClass     - style class for the delta flat                        - default: "kpi-delta-flat"
 *      footerStyleClass        - style class for the footer                            - default: "top-3-kpi-footer"
 *      footerTextStyleClass    - style class for the footer text                       - default: "kpi-footer-text"
 *
 *
 *      methods:
 *      setData(data) - sets the 3 items in the widget object and refreshes the view accordingly
 *          param - JSON Array
 *          usage:
 *              var data = [{
 *                  name: "My App",
 *                  value: 202300,
 *                  symbol: "$",
 *                  trend: "down"
 *              }, {
 *                  name: "Anothe App of Mine",
 *                  value: 2323444,
 *                  symbol: "$",
 *                  trend: "up"
 *              }];
 *
 *              kpi1 = $("#topThree1").TopThreeKPI(...);
 *              kpi1.TopThreeKPI("setData", data);
 *
 *      getData() - gets the value from the widget object
 *          return - JSON Array
 *          usage:
 *              kpi1 = $("#topThree1").TopThreeKPI(...);
 *              kpi1.TopThreeKPI("getData");
 */

(function ($, undefined) {
    $.widget("inneractive.TopThreeKPI", {
        // Default options.
        options: {
            title: "",
            data: {},
            footer: "",
            height: 300,
            width: 230,
            showDecimalPoint: true,
            clickHandler: null,
            maxDeltaThreshold: 999,
            itemCount:4.3,

            /* css style classes */
            containerStyleClass: "top-three-kpi-container",
            headerStyleClass: "kpi-title",
            headerTextStyleClass: "kpi-title-text",
            nameStyleClass: "top-3-name",
            valueStyleClass: "top-3-value",
            trendUpStyleClass: "kpi-trend-up-small",
            trendDownStyleClass: "kpi-trend-down-small",
            trendFlatStyleClass: "kpi-trend-flat-small",

            deltaUpStyleClass: "kpi-delta-up",
            deltaDownStyleClass: "kpi-delta-down",
            deltaFlatStyleClass: "kpi-delta-flat",

            footerStyleClass: "top-3-kpi-footer",
            footerTextStyleClass: "kpi-footer-text"
        },

        _create: function () {
            var _that = this;
            var titleHeight = this.options.height / 6;
            var footerHeight = (this.options.footer != "") ? (titleHeight / 2) : 0;
            var titleCursor = "";
            var dataCursor = (typeof(_that.options.clickHandler) == "function") ? "pointer" : "";

            var containerDiv = $('<div/>', {
                "height": this.options.height + "px",
                "width": this.options.width + "px",
                "class": this.options.containerStyleClass
            });

            var titleDiv = $('<div/>', {
                html: "<div class=\"" + this.options.headerTextStyleClass + "\" style=\"cursor:" + titleCursor + ";\">" + this.options.title + "</div>",
                "class": this.options.headerStyleClass,
                height: titleHeight
            });

            var dataDiv = this._createDataDiv(dataCursor).click(function () {
                if (typeof(_that.options.clickHandler) == "function") {
                    _that.options.clickHandler.apply()
                }
            });

            var footerDiv = $('<div/>', {
                html: "<div class=\"" + this.options.footerTextStyleClass + "\">" + this.options.footer + "</div>",
                "class": this.options.footerStyleClass,
                height: footerHeight
            });

            containerDiv.append(titleDiv).append(dataDiv).append(footerDiv);
            this.element.append(containerDiv);
        },

        _createDataDiv: function (dataCursor) {
            var titleHeight = this.options.height / 4;
            var footerHeight = (this.options.footer != "") ? (titleHeight / 2) : 0;
            var dataHeight = this.options.height - titleHeight - footerHeight;
            var rowItemHeight = dataHeight / this.options.itemCount;
            var deltaThreshold = this.options.maxDeltaThreshold;

            var dataDiv = $('<div/>', {
                "class": "kpi-data top-three-kpi-data",
                height: dataHeight
            });

            var _that = this;

            if(this.options.data.length > 0){
                $.each(this.options.data, function (key, value) {
                    var rowData = value;

                    var trendClass = _that.options.trendFlatStyleClass;
                    var deltaClass = _that.options.deltaFlatStyleClass;

                    if (rowData.trend != "") {
                        if (rowData.trend == "down") {
                            trendClass = _that.options.trendDownStyleClass;
                            deltaClass = _that.options.deltaDownStyleClass;
                        } else if (rowData.trend == "flat") {
                            trendClass = _that.options.trendFlatStyleClass;
                            deltaClass = _that.options.deltaFlatStyleClass;
                        } else if (rowData.trend == "up") {
                            trendClass = _that.options.trendUpStyleClass;
                            deltaClass = _that.options.deltaUpStyleClass;
                        }
                    }

                    var rowDataName = rowData.name;
                    var rowDataValue = rowData.value;
                    var rowDataDelta = rowData.delta;

                    try{
                        if(rowDataName.length > 14){
                            rowDataName = rowDataName.substr(0, 14) + "..."
                        }
                    }catch(exception){

                    }

                    try{
                        if(rowDataValue % 1 == 0 || !_that.options.showDecimalPoint){
                            rowDataValue = parseInt(rowDataValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }else{
                            rowDataValue = parseFloat(rowDataValue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }catch(exception){

                    }

                    var htmlStr = "<div style=\"height: 100%; width: 100%; display: table;cursor:" + dataCursor + "\">" +
                        "<div title=\"" + rowData.name + "\" class=\"" + _that.options.nameStyleClass + "\">" + rowDataName + "</div>" +
                        "<div class=\"" + _that.options.valueStyleClass + "\">" + rowData.symbol + rowDataValue + "</div>";

                    if(rowDataDelta <= deltaThreshold){ // we dont show the delta, so we dont need to add the the delta title attribute to the div
                        htmlStr += "<div class=\"" + trendClass + "\" />";
                    }else{
                        htmlStr += "<div class=\"" + trendClass + "\" title=\"" + rowDataDelta + "%\" />";
                    }

                    if(rowDataDelta > 0 && rowDataDelta <= deltaThreshold){
                        htmlStr += "<div class=\"" + deltaClass + "\">" + rowDataDelta + "%</div>";
                    }else if(rowDataDelta > deltaThreshold){
                        htmlStr += "<div class=\"" + deltaClass + "\" style=\"width:20px;\"></div>";
                    }

                    htmlStr += "</div>";

                    var rowItemDiv = $('<div/>', {
                        "html": htmlStr,
                        "height": rowItemHeight + "px",
                        "width": _that.options.width + "px",
                        "class": (key == 4) ? "top-3-row-item-noborder" : "top-3-row-item"
                    });

                    dataDiv.append(rowItemDiv);
                });
            }else{
                var htmlStr = "<div style=\"height: 100%; width: 100%; display: inline-table;\">" +
                    "<div class=\"" + _that.options.nameStyleClass + "\" style=\"text-align:center;\">No data to display</div>";


                htmlStr += "</div>";

                dataDiv.append(htmlStr);
            }


            return dataDiv;
        },

        setData: function (data) {
            this.options.data = data;
            var dataDiv = this._createDataDiv();
            var footerDiv = this.element.find($("." + this.options.footerStyleClass));

            this.element.find($(".top-three-kpi-data")).remove();
            this.element.find($("." + this.options.footerStyleClass)).remove();

            this.element.find($("." + this.options.containerStyleClass)).append(dataDiv).append(footerDiv);
        },

        getData: function () {
            return this.options.data;
        }
    });
}(jQuery));
