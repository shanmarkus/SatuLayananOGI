// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');

Ti.App.addEventListener('pause', function() {
    Ti.API.info('App Paused');

});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// get platform window size
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//
// Daftar Tentang about
//

var win1 = Titanium.UI.createWindow({
    width : "100%",
    height : pHeight,
    top : 0,
    left : 0,
    //backgroundImage : 'background.png',
    url : 'tentang.js',
    title : 'Tentang SatuLayanan',
    barImage : 'navbar.png',
    orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
    exitOnClose : true
});

var tab1 = Titanium.UI.createTab({
    icon : 'images/info30x30.png',
    title : 'Tentang',
    window : win1
});

//
// Daftar Module
//

var win2 = Titanium.UI.createWindow({
    width : pWidth,
    height : pHeight,
    top : 0,
    left : 0,
    //backgroundImage : 'background.png',
    url : 'modules.js',
    title : 'Modul',
    orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
    barImage : 'navbar.png'

});

var tab2 = Titanium.UI.createTab({
    icon : 'images/module30x30.png',
    title : 'Modul',
    window : win2
});

//Tab for Daftar Kategori

var win3 = Titanium.UI.createWindow({
    width : pWidth,
    height : pHeight,
    top : 0,
    left : 0,
    //backgroundImage : 'background.png',
    url : 'categories.js',
    title : 'Kategori',
    orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
    barImage : 'navbar.png'
});

var tab3 = Titanium.UI.createTab({
    icon : 'images/categories30x30.png',
    title : 'Kategori',
    window : win3
});

var win4 = Titanium.UI.createWindow({
    width : pWidth,
    height : pHeight,
    top : 0,
    left : 0,
    //backgroundImage : 'background.png',
    url : 'pengelolaLayanan.js',
    title : 'Pengelola Layanan',
    orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
    barImage : 'navbar.png'
});

var tab4 = Titanium.UI.createTab({
    icon : 'images/people30x30.png',
    title : 'Pengelola Layanan',
    window : win4
});

//
//  add tabs
//
win3.open;
tabGroup.addTab(tab3);
//Categories.js
tabGroup.addTab(tab2);
//Modules.js
tabGroup.addTab(tab4);
//pengelolaLayanan.js
tabGroup.addTab(tab1);
//Tentang.js

// open tab group
tabGroup.open();
