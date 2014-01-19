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
	width : pWidth,
	height : pHeight,
	top : 0,
	left : 0,
	backgroundImage : 'background.png',
	url : 'tentang.js',
	title : 'Tentang SatuLayanan',
	barImage : 'navbar.png',
	
	exitOnClose : true
});

var tab1 = Titanium.UI.createTab({
	icon : 'images/tentang-tab-icon.png',
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
	backgroundImage : 'background.png',
	url : 'modules.js',
	title : 'Modules',
	barImage : 'navbar.png'
});

var tab2 = Titanium.UI.createTab({
	icon : 'images/module-tab-icon.png',
	title : 'Modul',
	window : win2
});

//Tab for Daftar Kategori

var win3 = Titanium.UI.createWindow({
	width : pWidth,
	height : pHeight,
	top : 0,
	left : 0,
	backgroundImage : 'background.png',
	url : 'categories.js',
	title : 'Kategori',
	barImage : 'navbar.png'
});

var tab3 = Titanium.UI.createTab({
	icon : 'images/category-tab-icon.png',
	title : 'Kategori',
	window : win3
});



//
//  add tabs
//
win3.open;
tabGroup.addTab(tab3); //Categories.js
tabGroup.addTab(tab2); //Modules.js
tabGroup.addTab(tab1); //Tentang.js


// open tab group
tabGroup.open();
