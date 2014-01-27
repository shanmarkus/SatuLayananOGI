/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];

var ContentHTTPClient = Titanium.Network.createHTTPClient();
var moduleSlug = win.moduleSlug;
var pageSlug = win.pageSlug;

//getting title
var namaHalamanTemp = win.getTitle();

// this method will process the remote data

ContentHTTPClient.onload = function() {

	//create a json object using the JSON.PARSE function

	var jsonObject = JSON.parse(this.responseText);

	//generating json content to web view
	var webview = Ti.UI.createWebView({
		html : "<head><meta name=\"viewport\" content=\"width=device-width, user-scalable=no\"></head><style>body{font-family:'HelveticaNeue-Light';font-size:16px}" + "img{max-width:300px;} " + ".content{padding:5px}" + "td, th{ width: 4rem;height: 2rem;border: 1px solid #ccc;text-align: center;}" + "th {background: lightblue;border-color: white;}" + "body {padding: 1rem;}</style><div class='content'>" + jsonObject.content[0].content + "</div>",
		top:5,
		height:260,
		
	});

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
	win.add(webview);

};

//add web view to window

var disqusView = Ti.UI.createWebView({
	url : "http://satulayanan.net/comment/index/" + moduleSlug + "/" + pageSlug + "",
	scalesPageToFit : true,
	top : 280,
});
//win.add(disqusView);

win.add(disqusView);
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