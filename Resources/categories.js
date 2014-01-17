/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;
//create empty day
//declare the ht tp cl ient object
var categoriesHTTPClient = Titanium.Network.createHTTPClient();

var data = [];

//define search bar which will attach to  table view
var searchBar = Titanium.UI.createSearchBar({
	showCancel : true,
	height : 43,
	top : 0
});

searchBar.addEventListener('change', function(e) {

	Ti.API.info('user searching for: ' + e.value);
});
//when the return key is hit, make searchBar get blur
searchBar.addEventListener('return', function(e) {
	searchBar.blur();
});

//when the cancel but ton is tapped,make searchBar get blur too
searchBar.addEventListener('cancel', function(e) {
	searchBar.blur();
});
//end of search bar

//create a table view
var categoriesTable = Titanium.UI.createTableView({
	width: Ti.Platform.displayCaps.platformWidth,
	height: Ti.Platform.displayCaps.platformHeight,
	search : searchBar,
	filterAttribute : 'filter'
});

win.add(categoriesTable);
//load all categories


//click button
win.addEventListener('click', function(e) {

	//get the selected row index
	var selectedRow = e.rowData;

	// create detail window
	var detailWindow = Titanium.UI.createWindow({
		_title : selectedRow._title,
		_id : selectedRow._id,
		backgroundColor : '#fff',
		url : 'modules.js',
		font : {
			fontSize : 12,
			fontWeight : ' bold'
		},
		title : selectedRow._title,
		id : 0
	});

	Titanium.UI.currentTab.open(detailWindow);
});

categoriesHTTPClient.onload = function (e) {

	//create a json object using the JSON.PARSE function

	var jsonObject = JSON.parse(this.responseText);
	var length = jsonObject.category.length;
	if(length == null){
		loadCategories();
	}
	//get through each item
	for (var i = 0; i < jsonObject.category.length; i++) {
		var aFeed = jsonObject.category[i];

		//create table row
		var row = Titanium.UI.createTableViewRow({
			_title : aFeed.category_name,
			_id : aFeed.id_category,
			hasChild : true,
			className : 'category-row',
			filter : aFeed.category_name,
			height : 'auto',
			backgroundColor : '#fff'
		});
		
		Ti.API.info(row._title);
		//title label for row at index i
		var titleLabel = Titanium.UI.createLabel({
			text : aFeed.category_name,
			font : {
				fontSize : 14,
				fontWeight : ' bold'
			},
			left : 70,
			top : 5,
			height : 20,
			width : 210,
			color : '#232'
		});

		row.add(titleLabel);


		row.height = titleLabel.height + 15;
		//add the row to data array
		data.push(row);
	}
	// set the data to tableview's data
	categoriesTable.data = data;

};

//this method will fire if there's an error in accessing the //remote data
categoriesHTTPClient.onerror = function() {
	// log the error to our Ti tanium Studio console
	Ti.API.error(this.status + ' - ' + this.statusText);
};

loadCategories();

//methods for Categories

function loadCategories() {
	//open the recipes xml feed
	categoriesHTTPClient.open('GET', 'http://satulayanan.net/api/index?tag=get_category&id=0');
	//execute the call to the remote feed
	categoriesHTTPClient.send();
}
