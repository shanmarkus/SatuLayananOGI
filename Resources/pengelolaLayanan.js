/**
 * @author Shan Markus
 */

/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;

var data = [];
//create a table view
var pengelolaTable = Titanium.UI.createTableView({
	height : 500,
	width : 320,
	top : 0,
	left : 0,

});

//Tab for institusi
var institusiRow = Titanium.UI.createTableViewRow({
	id : 0,
	height : 50,
	backgroundColor : '#fff'
});

var titleLabelInstitusi = Titanium.UI.createLabel({
	text : 'Institusi',
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

//adding title to the row
institusiRow.add(titleLabelInstitusi);

//push row to the data
data.push(institusiRow);

//Tab for Komunitas
var komunitasRow = Titanium.UI.createTableViewRow({
	id : 1,
	height : 50,
	backgroundColor : '#fff',
});

var titleLabelKomunitasi = Titanium.UI.createLabel({
	text : 'Komunitas',
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

//adding title to the row
komunitasRow.add(titleLabelKomunitasi);

//push row to the data
data.push(komunitasRow);

//Tab for Akademisi
var akademisiRow = Titanium.UI.createTableViewRow({
	id : 2,
	height : 50,
	backgroundColor : '#fff'
});

var titleLabelAkademisi = Titanium.UI.createLabel({
	text : 'Akademisi',
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

//adding title to the row
akademisiRow.add(titleLabelAkademisi);

//push row to the data
data.push(akademisiRow);

//init the data to the pengelolaTable
pengelolaTable.data = data;

//Adding CLICK event listener

pengelolaTable.addEventListener('click', function(e) {

	//get the selected row index
	var selectedRowID = e.rowData.id;
	alert(selectedRowID);

	// create detail window
	if (selectedRowID == 0) {
		var detailWindow = Titanium.UI.createWindow({
			backgroundColor : '#fff',
			url : 'institusi.js',
			title : 'Institusi',
			id : 0
		});
		Titanium.UI.currentTab.open(detailWindow);
	} else if (selectedRowID == 1) {
		var detailWindow = Titanium.UI.createWindow({
			backgroundColor : '#fff',
			url : 'komunitas.js',
			title : 'Komunitas',
			id : 0
		});
		Titanium.UI.currentTab.open(detailWindow);
	} else {
		var detailWindow = Titanium.UI.createWindow({
			backgroundColor : '#fff',
			url : 'akademisi.js',
			title : 'Akademisi',
			id : 0
		});
		Titanium.UI.currentTab.open(detailWindow);
	}

});

//adding to window :D
win.add(pengelolaTable);
