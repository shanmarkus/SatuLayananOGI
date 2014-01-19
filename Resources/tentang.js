/**
 * @author ewish
 */
var win = Titanium.UI.currentWindow;

Ti.App.addEventListener('openURL', function(e){
    Ti.Platform.openURL(e.url);
});
Ti.App.addEventListener('sendEmail', function(e) {

var emailDialog = Titanium.UI.createEmailDialog();
emailDialog.toRecipients = [e.url];
emailDialog.open();
   });
   
var tentang_webview = Ti.UI.createWebView({
    url:'tentang.html'
}); 
// tentang_webview.height='auto';
win.add(tentang_webview);
