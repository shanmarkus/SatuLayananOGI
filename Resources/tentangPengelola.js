
var win = Titanium.UI.currentWindow;

var data = [];

var ContentHTTPClient = Titanium.Network.createHTTPClient({
	onload : function(e) {

		//create a json object using the JSON.PARSE function

		Ti.App.addEventListener('openURL', function(e) {
			Ti.Platform.openURL(e.url);
		});
		Ti.App.addEventListener('sendEmail', function(e) {

			var emailDialog = Titanium.UI.createEmailDialog();
			emailDialog.toRecipients = [e.url];
			emailDialog.open();
		});

		var jsonObject = JSON.parse(this.responseText);

		var footer = "<style>.footer{font-size:12px;}</style>" + "</br><div class='footer'><hr>" + "Jika terdapat masukan atau saran terhadap informasi di Modul Layanan ini silahkan kirimkan email kepada pengelola masing-masing Modul Layanan. " + "Apabila pada Modul Layanan tersebut belum ada pengelolanya, maka Modul Layanan tersebut belum ada pengelolanya, maka masukan atau saran dapat di sampaikan melalui " + "network@opengovindonesia.org " + "atau mention lewat akun twitter " + "@OpenGovIndo " + "<div class='lapor'>Jika terdapat permasalahan dalam layanan publik ini, silahkan melaporkan ke <a><img src='http://satulayanan.net/img/lapor.png'></a><hr></div>" + "</div>";


		//generating json content to web view
		var webview = Ti.UI.createWebView({
			html : "<head><meta name=\"viewport\" content=\"width=device-width, user-scalable=no\"></head><style>"+"a.button-link {color: white; width: 81px; height: 23px; float: left; display: block; background: url('http://satulayanan.net/img/btn-link.png'); margin-right: 5px;}"+"body{font-family:'HelveticaNeue-Light';font-size:15px}" + "img{max-width:300px;} " + ".content{padding:5px}" + "td, th{ width: 4rem;height: 2rem;border: 1px solid #ccc;text-align: center;}" + "th {background: lightblue;border-color: white;}" + "body {padding: 1rem;}</style><div class='content'>" + pengelolaHTML + regex(jsonObject.description) + footer + "</div>",
			top : 5,
			height : 480,

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

	},
	onerror : function(e) {
		// log the error to our Ti tanium Studio console
		//Ti.API.debug(e.error);
		alert("Failed to retrieve data. \n Please make sure you're connected to internet.");
		//Ti.API.error(this.status + ' - ' + this.statusText);
	},
	timeout : 3000
});
var moduleSlug = win.moduleSlug;
var pageSlug = win.pageSlug;


//getting title
var namaHalamanTemp = win.getTitle();

loadDiscus();
// this method will process the remote data

//add web view to window

//win.add(disqusView);

//win.add(disqusView);
//this method will fire if there's an error in accessing the //remote data
ContentHTTPClient.onerror = loadContent();

// function
function loadContent() {
    //open the Content xml feed
    var id_page = win.user_id;
    var httpClient = 'http://satulayanan.net/api/index?tag=get_user&id=';
    var temp = httpClient.concat(id_page);
    ContentHTTPClient.open('GET', temp);
    //execute the call to the remote feed
    ContentHTTPClient.send();
}

function regex(jsonObject){
	var compiledContent = jsonObject.content[0].content;
	
        compiledContent = compiledContent.replace("&lt;", "<");
        compiledContent = compiledContent.replace("&gt;", ">");
        compiledContent = compiledContent.replace("</p>", "");
        compiledContent = compiledContent.replace("</br>", "");
        compiledContent = compiledContent.replace("<p>", "");
        compiledContent = compiledContent.replace("<br>", "");
        compiledContent = compiledContent.replace("&nbsp;", " ");
        compiledContent = compiledContent.replace("&#9;", "");
        compiledContent = compiledContent.replace("&#40;", "(");
        compiledContent = compiledContent.replace("&#41;", "(");
        compiledContent = compiledContent.replace("&amp;nbsp;", " ");
        compiledContent = compiledContent.replace("&amp;ldquo;", "\"");
        compiledContent = compiledContent.replace("&amp;rdquo;", "\"");
        compiledContent = compiledContent.replace("&amp;quot;", "\"");
        compiledContent = compiledContent.replace("&amp;ndash;", "-");
        compiledContent = compiledContent.replace("&amp;", "&");
        compiledContent = compiledContent.replace("<a href=\"http://www.twitter.com/search/#39\">#39</a>;", "'");
        compiledContent = compiledContent.replace("href=\"<a href=\"", "href=\"");
        compiledContent = compiledContent.replace("</a>/</a>", "</a>");
        compiledContent = compiledContent.replace("</a>\"></a>", "</a>");
        compiledContent = compiledContent.replace("</a>/\"></a>", "</a>");
        compiledContent = compiledContent.replace("</a>/\n\"></a>", "</a>");
        compiledContent = compiledContent.replace("</a>/&#8206;\"></a>\"", "</a>");
        compiledContent = compiledContent.replace("<a\\s+[^>]*href=(['\"])(.*?)\\1[^>]*>+[^>]*>+/\">+<a\\s+href", "<a href");
        compiledContent = compiledContent.replace("<a\\s+[^>]*href=(['\"])(.*?)\\1[^>]*>+[^>]*>+\">+<a\\s+href", "<a href");
     
        var temp = compiledContent.match("<a\\s+class=\"button-link\"\\s+target=\"_blank\"\\s+href=(['\"])(.*?)\\1[^>]*>+(.*?)\\1*[^>]*>"); 
        // for(var i=0 ; i<temp.length; i++){
            // alert(temp);
        // }
//var res = temp.match(/ain/g);
 return compiledContent;
	
	
}

// CURRENT WINDOW
