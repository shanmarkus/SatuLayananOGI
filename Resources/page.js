/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];

var ContentHTTPClient = Titanium.Network.createHTTPClient();

//create a table view
var ContentTable = Titanium.UI.createWebView({
	width : Ti.Platform.displayCaps.platformWidth,
	height : Ti.Platform.displayCaps.platformHeight,
});

//methods for detailModule

//getting title
var namaHalamanTemp = win.getTitle();

// this method will process the remote data

ContentHTTPClient.onload = function() {

	//create a json object using the JSON.PARSE function

	var jsonObject = JSON.parse(this.responseText);
	alert(jsonObject.content[0].content);

	// var row = Titanium.UI.createTableView({
	// text : jsonObject.content[0].content,
	// _title : win._title,
	// className : 'content-row',
	// height : 'auto',
	// backgroundColor : '#fff'
	// });

	//title label for row at index i
	var titleLabel = Titanium.UI.createLabel({
		text : jsonObject.content[0].content,
		font : {
			fontSize : 14,
			fontWeight : ' normal'
		},
		top : 5,
		left : 5,
		right : 5,
		width : Ti.Platform.displayCaps.platformWidth,
		height : Ti.Platform.displayCaps.platformHeight,
		color : '#232'
	});
	ContentTable.add(titleLabel);
};

win.add(ContentTable);

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
	var httpClient = 'http://satulayanan.net/api/index?tag=get_content&id=';
	var temp = httpClient.concat(id_page);
	ContentHTTPClient.open('GET', temp);
	//execute the call to the remote feed
	ContentHTTPClient.send();
}