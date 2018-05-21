/**
 * jQuery Number & Trend Widget
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
 *      This widget is intended to present a percentile indicator in a KPI box
 *
 * options:
 *      title - widget title - default: ""
 *      data  -  JSON Object of the widget parameters needed for calculations - default {}
 *          value - string - name of the calculated dimension
 *          partial - integer -  value of the calculated dimension
 *          total - integer -  total value of all dimensions
 *
 *          example
 *          data: {
 *               value: "18-25",
 *               partial: 34,
 *               total : 3334
 *           }
 *
 *      footer - text that will appear inside the widget footer                         - default: ""
 *      height - widget height in px                                                    - default: 150
 *      width - widget width in px                                                      - default: 250
 *      clickHandler -    click handler that triggers when the widget value             - default: null
 *                        is being clicked
 *
 *
 *      style classes:
 *      --------------------------------------------------------------------------------------------------------------------
 *      containerStyleClass     - style class for the widget container                  - default: "percentage-kpi-container"
 *      headerStyleClass        - style class for the header                            - default: "kpi-title"
 *      headerTextStyleClass    - style class for the header text                       - default: "kpi-title-text"
 *      valueStyleClass         - style class for the value text                        - default: "percentage-kpi-data-text"
 *      subValueStyleClass      - style class for the sub value text                    - default: "percentage-kpi-sub-data-text"
 *      footerStyleClass        - style class for the footer                            - default: "percentage-kpi-footer"
 *      footerTextStyleClass    - style class for the footer text                       - default: "kpi-footer-text"
 *
 *
 * methods:
 *      setData(data) - sets the value/trend/symbol in the widget object and refreshes the view accordingly
 *          param - JSON Array
 *          usage:
 *              kpi = $("#percentage").PercentageKPI(....);
 *              kpi.PercentageKPI("setData", {
 *                  value: "25-35",
 *                  partial: 274,
 *                  total : 3334
 *              });
 *
 *      getData() - gets the value from the widget object
 *          return - JSON Array
 *          usage:
 *              kpi = $("#percentage").PercentageKPI(....);
 *              kpi.PercentageKPI("getData");
 */

(function ($, undefined) {
    $.widget("inneractive.PercentageKPI", {
        // Default options.
        options: {
            title: "",
            data: [{
                value: "",
                partial: 0,
                total: 0
            }],
            footer: "",
            height: 148,
            width: 230,
            clickHandler: null,

            /* css style classes */
            containerStyleClass: "percentage-kpi-container",
            headerStyleClass: "kpi-title",
            headerTextStyleClass: "kpi-title-text",
            valueStyleClass: "percentage-kpi-data-text",
            subValueStyleClass: "percentage-kpi-sub-data-text",
            footerStyleClass: "percentage-kpi-footer",
            footerTextStyleClass: "kpi-footer-text"
        },

        _create: function () {
            var _that = this;
            var titleHeight = this.options.height / 4;
            var footerHeight = titleHeight / 2;
            var dataHeight = this.options.height - titleHeight - footerHeight;
            var dataCursor = (typeof(_that.options.clickHandler) == "function") ? "pointer" : "";

            var containerDiv = $('<div/>', {
                "height": this.options.height + "px",
                "width": this.options.width + "px",
                "class": this.options.containerStyleClass
            });

            var titleDiv = $('<div/>', {
                html: "<div class=\"" + this.options.headerTextStyleClass + "\">" + this.options.title + "</div>",
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

        _createDataDiv: function(dataCursor){
            var titleHeight = this.options.height / 4;
            var footerHeight = titleHeight / 2;
            var dataHeight = this.options.height - titleHeight - footerHeight;

            var htmlDataStr =
                "<div style=\"display:inline-table;height:" + dataHeight + ";\">" +
                "<div class=\"" + this.options.valueStyleClass + "\">" +
                this.options.data.value +
                "</div>";

            if(this.options.data.total > 0){
                htmlDataStr += "<div class='" + this.options.subValueStyleClass +  "'>" + (this.options.data.partial * 100 / this.options.data.total).toFixed(2) + "%</div>";
            }

            htmlDataStr += "</div>";

            var dataDiv = $('<div />', {
                html: htmlDataStr,
                "class": "kpi-data percentage-kpi-data",
                "style": "cursor:" + dataCursor,
                height: dataHeight,
            });

            return dataDiv;
        },


        setData: function (data) {
            this.options.data = data;
            var dataDiv = this._createDataDiv();

            this.element.find($(".percentage-kpi-data")).remove();
            this.element.find($("." + this.options.headerStyleClass)).after(dataDiv);
        },

        getData: function () {
            return this.options.data;
        }
    });
}(jQuery));