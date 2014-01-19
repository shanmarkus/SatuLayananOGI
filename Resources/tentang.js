/**
 * @author ewish
 */
var win = Titanium.UI.currentWindow;

Ti.App.addEventListener('openURL', function(e) {
	Ti.Platform.openURL(e.url);
});
Ti.App.addEventListener('sendEmail', function(e) {

	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.toRecipients = [e.url];
	emailDialog.open();
});

var tentang_webview = Ti.UI.createWebView({
	url : 'tentang.html',
	
});

var categoriesTable = Titanium.UI.createTableView({
    height: Ti.Platform.displayCaps.platformHeight - 100,
    width:  320,
    top:    0,
    left:   0,
    
}); 

categoriesTable.add(tentang_webview);
// tentang_webview.height='auto';
win.add(categoriesTable);
