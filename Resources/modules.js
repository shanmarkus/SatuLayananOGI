/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow; 

//the data storage empty array
var data = []; 

//declare the ht tp cl ient object
var modulesHTTPClient = Titanium.Network.createHTTPClient();

//define search bar which will attach to  table view
var searchBar = Titanium.UI.createSearchBar({
	showCancel:true,
	height :43,
	top:0
});

//print out the searchbar value whenever it changes 
searchBar.addEventListener('change' , function(e){
	
	Ti.API.info('user searching for: ' + e.value);
});
//when the return key is hit, make searchBar get blur
searchBar.addEventListener('return' , function(e){
	searchBar.blur(); 
});

//when the cancel but ton is tapped,make searchBar get blur too
searchBar.addEventListener('cancel', function(e){
	searchBar.blur();
});
//end of search bar

//create refresh view and relative variable
var pulling = false;
var reloading = false;

var tableHeader = Titanium.UI.createView({
	backgroundImage:'img/header.png',
	width: 320,
	height: 120
});

var arrowImage = Titanium.UI.createImageView({
	backgroundImage:"img/refreshArrow.png",
	width:22,
	height:54,
	bottom:20,
	left:20
});

var statusLabel = Ti.UI.createLabel({ 
	text:"Pull to refresh...",
	left:85,
	width:200,
	bottom:28,
	height:"auto",
	color:"#FFF",
	textAlign:"center",
	font :{fontSize:14, fontWeight :"bold"},
	shadowColor:"#89a",
	shadowOffset:{x:0,y:1}
});
var actIndicator = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:20,
	width: 40,
	height: 40
});
tableHeader.add(actIndicator);
tableHeader.add(arrowImage);
tableHeader.add(statusLabel);

//create a table view
var moduleTable = Titanium.UI.createTableView({
	height: 366,
	width: 	320,
	top: 	0,
	left: 	0,
	search: searchBar,
	filterAttribute:'filter'
}); 
moduleTable.headerPullView = tableHeader;
win.add(moduleTable);

//table scrolling function
moduleTable.addEventListener('scroll', function(e){
	if(Ti.Platform.osname != 'iphone'){
		Titanium.API.info("Ti.Platform.osname != 'iPhone':"+Ti.Platform.osname);
		return;
	}
	
	var offset = e.contentOffset.y;
	if(offset < -80.0 && !pulling)
	{
		pulling = true;
		arrowImage.backgroundImage = 'img/refreshArrow_up.png';
		statusLabel.text = "Release to refresh...";
	}else{
		pulling = false;
		arrowImage.backgroundImage = 'img/refreshArrow.png';
		statusLabel.text = "Pull to refresh...";
	}
});
moduleTable.addEventListener('scroll', function(e){
	if(Ti.Platform.osname != 'iphone'){
		return;
	}
	var offset = e.contentOffset.y;
	if(pulling && !reloading && e.contentOffset.y <= -80.0)
	{
		reloading = true;
		pulling = false;
		arrowImage.hide();
		actIndicator.show();
		statusLabel.text = "Reloading modules...";
		moduleTable.setContentInsets({top:80},{animated:true});
		
		//null out the existing module data
		moduleTable.data = null;
		data =[];
		
		loadModules();
	}
});
//tablerow selected function: create new window
moduleTable.addEventListener('click', function(e){
	
	//get the selected row index
	var selectedRow = e.rowData;
	
	// create detail window
	var detailWindow = Titanium.UI.createWindow({
		_title:selectedRow._title, 
		_id:selectedRow._id,
		backgroundColor:'#fff',
		url: 'detailModule.js',
		title:selectedRow._title,
		id:0
	});
	
	Titanium.UI.currentTab.open(detailWindow);
});
// this method will process the remote data 
modulesHTTPClient.onload = function(e) {
	
	//create a json object using the JSON.PARSE function
	
	var jsonObject = JSON.parse(this.responseText);
	
	//get through each item 
	for(var i = 0; i < jsonObject.module.length; i++)
	{
		var aFeed = jsonObject.module[i];
		
		//create table row
		var row = Titanium.UI.createTableViewRow({
			_title:aFeed.module_name,
			_id:aFeed.id_module,
			hasChild: true,
			className: 'module-row',
			filter: aFeed.module_name,
			height:'auto',
			backgroundColor: '#fff'
		});
		//title label for row at index i
		var titleLabel = Titanium.UI.createLabel({
			text: aFeed.module_name,
			font : {fontSize: 14, fontWeight : ' bold' },
			left: 70,
			top: 5,
			height: 20,
			width: 210,
			color:'#232'
		});
		
		row.add(titleLabel);
		
		//description view for row at index i
		var descriptionLabel = Titanium.UI.createLabel({
				font : {fontSize: 10, fontWeight : ' normal ' },
				left: 	70,
				top: 	titleLabel.height+5,
				width: 	200,
				color:	'#9a9'
		});
		
		if(aFeed.module_name.length == 0) {
			
			row._description = 'No description is available.';
			descriptionLabel.height = 20;
				
		}else{
			descriptionLabel.height = 45;
					
		}
		
		descriptionLabel.text = row._description; 
		row.add(descriptionLabel);
		
		row.height = titleLabel.height + descriptionLabel.height +15;
		//add our little icon to the left of the row 
		var imageDir = "http://satulayanan.net/uploads/thumbnail/";
		var image = aFeed.image;
		var iconImage = Titanium.UI.createImageView({
			image: imageDir.concat(image),
			width: 50,
			height: 50,
			left: 10,
			top: 10 
		});
		row.add(iconImage);
		//add the row to data array
		data.push(row);
	}
	// set the data to tableview's data
	moduleTable.data = data;
	
	if(reloading == true){
		//when done, reset the header to its original style 
		moduleTable.setContentInsets({top:0},{animated:true});
		reloading = false;
		statusLabel.text = "Pull to refresh...";
		actIndicator.hide();
		arrowImage.backgroundImage = 'img/refreshArrow.png';
		arrowImage.show();
	 }
};


//this method will fire if there's an error in accessing the //remote data
modulesHTTPClient.onerror = function() {
	// log the error to our Ti tanium Studio console
	Ti.API.error(this.status + ' - ' + this.statusText);
};

loadModules();



// function
function loadModules(){	
	//open the modules xml feed
	var module_id = win._id;
	if(module_id == null){
	modulesHTTPClient.open('GET' , 'http://satulayanan.net/api/index?tag=get_module&id=0');
	} else{
		var httpTemp = 'http://satulayanan.net/api/index?tag=get_module&id=';
		modulesHTTPClient.open('GET' , httpTemp.concat(module_id));
	}
	//execute the call to the remote feed 
	modulesHTTPClient.send();
}



