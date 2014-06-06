/**
 * This Javascript file returns "DetailPageHandler" as a class.
 * This class provides API to perform manipulation of detail pages
 * such as appending, detaching, sorting test file bars and drawing
 * charts on detail page.
 */
define(['chartTool', 'dataController'], function (chartTool, DataController) {
	'use strict';

	/**
	 * @class DetailPageHandler
	 * @constructor
	 * @param {DOM} testBarContainer The DOM element which conatains test bars.
	 * @param {DOM} inputTab The DOM element as a tab which is associated with
	 * this detail page.
	 * @param {String} fileName The name of clicked test file.
	 * @param {Array} inputData All data this detail page handles.
	 */
	function DetailPageHandler(testBarContainer, inputTab, fileName, inputData) {
		this.container = testBarContainer;
		this.tab = inputTab;
		this.testFileName = fileName;
		this.data = inputData;
		this.dataController = new DataController(testBarContainer.find("table.tb_header"));
		this.dataController.setButtonType(this.dataController.linkButton);

		this.dataController.appendData(this.data);
	}

	/**
	 * Public methods and variables.
	 */
	DetailPageHandler.prototype = {
		/**
		 * Draw chart on canvas belongs to this detail page. The content of
		 * chart is about the history of test file this detail page handles. 
		 */
		drawChart: function () {
			var tempDates = [],
				tempErrorCounts = [],
				i,
				max = this.data.length;

			for (i = 0; i < max; i += 1) {
				tempDates.push(this.data[i].date);
				tempErrorCounts.push(this.data[i].error);
			}

			chartTool.drawChart($(this.container).find("canvas.chart_table"), {
				dates : tempDates,
				errorCounts : tempErrorCounts
			});
		},

		/**
		 * Get the test data controller belongs to it.
		 */
		getController: function () {
			return this.dataController;
		}
	};

	return DetailPageHandler;
});