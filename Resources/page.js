/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];
var DiscusHTTPClient = Titanium.Network.createHTTPClient({
    onload : function() {
        discusPage = this.responseText;
    },
    onerror : function() {
        //Ti.API.debug(e.error);
        alert("Failed to retrieve data. \n Please make sure you're connected to internet.");
        //Ti.API.error(this.status + ' - ' + this.statusText);
    },
    timeout : 3000
});

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
        var compiledContent = jsonObject.content[0].content;
        compiledContent = compiledContent.replace("&lt;", "<", "gi");
        compiledContent = compiledContent.replace("&gt;", ">", "gi");
        compiledContent = compiledContent.replace("<p>", "", "gi");
        compiledContent = compiledContent.replace("<br>", "", "gi");
        compiledContent = compiledContent.replace("&amp;nbsp;", " ", "gi");
        compiledContent = compiledContent.replace("&nbsp;", " ", "gi");
        compiledContent = compiledContent.replace("&#9;", "", "gi");
        compiledContent = compiledContent.replace("&#40;", "(", "gi");
        compiledContent = compiledContent.replace("&#41;", "(", "gi");
        compiledContent = compiledContent.replace("&amp;ldquo;", "\"", "gi");
        compiledContent = compiledContent.replace("&amp;rdquo;", "\"", "gi");
        compiledContent = compiledContent.replace("&amp;quot;", "\"", "gi");
        compiledContent = compiledContent.replace("&amp;ndash;", "-", "gi");
        compiledContent = compiledContent.replace("&amp;", "&", "gi");
        compiledContent = compiledContent.replace("<a href=\"http://www.twitter.com/search/#39\">#39</a>;", "'", "gi");
        compiledContent = compiledContent.replace("href=\"<a href=\"", "href=\"", "gi");
        compiledContent = compiledContent.replace("</a>/</a>", "</a>", "gi");
        compiledContent = compiledContent.replace("</a>\"></a>", "</a>", "gi");
        compiledContent = compiledContent.replace("</a>/\"></a>", "</a>", "gi");
        compiledContent = compiledContent.replace("</a>/\n\"></a>", "</a>", "gi");
        compiledContent = compiledContent.replace("</a>/&#8206;\"></a>\"", "</a>", "gi");
        compiledContent = compiledContent.replace("<a\\s+[^>]*href=(['\"])(.*?)\\1[^>]*>+[^>]*>+/\">+<a\\s+href", "<a href", "gi");
        compiledContent = compiledContent.replace("<a\\s+[^>]*href=(['\"])(.*?)\\1[^>]*>+[^>]*>+\">+<a\\s+href", "<a href", "gi");
        //compiledContent= compiledContent.match("<a\\s+href=(['\"])(.*?)\\1[^>]*>+(.*?)\\1*[^>]*\">");
        // var matcher =compiledContent.match("<a\\s+href=(['\"])(.*?)\\1[^>]*>+(.*?)\\1*[^>]*\">");
        // if (matcher != 'undefined'|| matcher!='null') {
            // while (matcher.find()!=null) {
                // var replaceTag = matcher.group(3).str.replace("/^\s+</a>/", '');
                // var addTag = matcher.group(3).replaceFirst(matcher.group(3), "<a class=\"\" href=\"" + replaceTag + "\">");
                // if (matcher.group(2).equals(replaceTag)) {
                    // content = matcher.replaceFirst(addTag);
                    // matcher = p.matcher(content);
                // }
            // }
        // }
        //Ti.API.info(compiledContent);

        //compiledContent = compiledContent.replace("", "", "gi");
        //compiledContent =

        //print(newstr);

        var footer = "<style>.footer{font-size:12px;}</style>" + "<div class='footer'><hr>" + "Jika terdapat masukan atau saran terhadap informasi di Modul Layanan ini silahkan kirimkan email kepada pengelola masing-masing Modul Layanan. " + "Apabila pada Modul Layanan tersebut belum ada pengelolanya, maka Modul Layanan tersebut belum ada pengelolanya, maka masukan atau saran dapat di sampaikan melalui " + "network@opengovindonesia.org " + "atau mention lewat akun twitter " + "@OpenGovIndo " + "<div class='lapor'>Jika terdapat permasalahan dalam layanan publik ini, silahkan melaporkan ke <a><img src='http://satulayanan.net/img/lapor.png'></a><hr></div>" + "</div>";

        if (discusPage == 'undefined' || discusPage == "" || discusPage == null)
            discusPage = '';

        var pengelola = win.username;
        if (pengelola == null) {
            var pengelola = "";
        } else {
            pengelola = pengelola;
        }

        //create a table view
        var pengelolaTable = Titanium.UI.createTableView({
            height : 50,
            width : 320,
            top : 0,
            left : 0,
        });

        var pengelolaRow = Titanium.UI.createTableViewRow({
            id : 0,
            height : 50,
            hasChild : true,
            backgroundColor : '#fff'
        });

        var titlePengelolaRow = Titanium.UI.createLabel({
            text : "Oleh: " + pengelola,
            font : {
                fontSize : 14,
                fontWeight : ' bold'
            },
            left : 70,
            top : 16,
            height : 20,
            width : 210,
            color : '#232'
        });

        pengelolaRow.add(titlePengelolaRow);
        data.push(pengelolaRow);
        pengelolaTable.data = data;

        //generating json content to web view
        var webview = Ti.UI.createWebView({
            html : "<head><meta name=\"viewport\" content=\"width=device-width, user-scalable=no\"></head><style>body{font-family:'HelveticaNeue-Light';font-size:15px}" + "img{max-width:300px;} " + ".content{padding:5px}" + "td, th{ width: 4rem;height: 2rem;border: 1px solid #ccc;text-align: center;}" + "th {background: lightblue;border-color: white;}" + "body {padding: 1rem;}</style><div class='content'>" + compiledContent + discusPage + footer + "</div>",
            top : 50,
            height : 480,

        });
        if (pengelola == "") {
            webview.top = 0;
            win.add(webview);
        } else {
            win.add(pengelolaTable);
            win.add(webview);
        }

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

var discusPage;
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
    var id_page = win._idPage;
    var httpClient = 'http://satulayanan.net/api/index?tag=get_content&id=';
    var temp = httpClient.concat(id_page);
    ContentHTTPClient.open('GET', temp);
    //execute the call to the remote feed
    ContentHTTPClient.send();
}

function loadDiscus() {
    var id_page = win._idPage;
    var discusHttpClient = "http://satulayanan.net/comment/index/" + moduleSlug + "/" + pageSlug + "";
    var temp = discusHttpClient.concat(id_page);
    DiscusHTTPClient.open('GET', temp);
    //execute the call to the remote feed
    DiscusHTTPClient.send();
}

