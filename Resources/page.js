/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];

var ContentHTTPClient = Titanium.Network.createHTTPClient();


//getting title
var namaHalamanTemp = win.getTitle();

// this method will process the remote data

ContentHTTPClient.onload = function() {

	//create a json object using the JSON.PARSE function

	var jsonObject = JSON.parse(this.responseText);
	
    //generating json content to web view
    var webview= Ti.UI.createWebView({
        html: "<style>body{font-family:'HelveticaNeue-Light';font-size:16px}img{max-width:300px;} .content{padding:5px}</style><div class='content'>"+jsonObject.content[0].content+"</div>"
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
	//add web view to window
	win.add(webview);
	
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
	var httpClient = 'http://satulayanan.net/api/index?tag=get_content&id=';
	var temp = httpClient.concat(id_page);
	ContentHTTPClient.open('GET', temp);
	//execute the call to the remote feed
	ContentHTTPClient.send();
}