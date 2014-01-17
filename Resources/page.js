/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];

var ContentHTTPClient = Titanium.Network.createHTTPClient();

//create a table view
var ContentTable = Titanium.UI.createTableView({
	height : 366,
	width : 320,
	top : 0,
	left : 0,
});

//methods for detailModule

//getting title
var namaHalamanTemp = win.getTitle();
loadContent();

win.add(ContentTable);

// this method will process the remote data
ContentHTTPClient.onload = function() {

	//create a json object using the JSON.PARSE function

	var jsonObject = JSON.parse(this.responseText);
	//alert(jsonObject.query);
	//get through each item
	//alert(jsonObject.content);
	var row = Titanium.UI.createTableView({
		text : jsonObject.content,
		_title : win._title,
		className : 'content-row',
		height : 'auto',
		backgroundColor : '#fff'
	});
	
	//title label for row at index i
	var titleLabel = Titanium.UI.createLabel({
		text : aFeed.content,
		font : {
			fontSize : 14,
			fontWeight : ' bold'
		},
		left : 70,
		top : 5,
		height : 100,
		width : 210,
		color : '#232'
	});

	row.add(titleLabel);


	//add the row to data array
	data.push(row);
	// set the data to tableview's data
	ContentTable.data = data;

};

//this method will fire if there's an error in accessing the //remote data
ContentHTTPClient.onerror = function() {
	// log the error to our Ti tanium Studio console
	Ti.API.error(this.status + ' - ' + this.statusText);
};

loadContent();

// function
function loadContent() {
	//open the Content xml feed
	var id_page = win._idPage;
	var httpClient = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsatulayanan.net%2Fapi%2Findex%3Ftag%3Dget_content%26id%3';
	var lastHttpClient = '%22&format=json&diagnostics=true';
	var temp = httpClient.concat(id_page).concat(lastHttpClient);
	ContentHTTPClient.open('GET', temp);
	//execute the call to the remote feed
	ContentHTTPClient.send();
}