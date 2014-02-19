/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;
var moduleSlug = win._moduleSlug;
var username = win._username;
var id_user = win.id_user;

//the data storage empty array
var data = [];
var isLoad = false;
//declare the ht tp cl ient object
var detailModulesHTTPClient = Titanium.Network.createHTTPClient({
    onload : function() {

        //create a json object using the JSON.PARSE function

        var jsonObject = JSON.parse(this.responseText);
        if (jsonObject == null || jsonObject == 'undefined' || jsonObject == '') {
            alert("Failed to retrieve data.\n Please try again and make sure you have internet connection.");
        }
        //get through each item
        if(jsonObject.page == null||jsonObject.page=='undefined' || jsonObject ==''){
            alert("Failed to retrieve data.\n Please try again and make sure you have internet connection.");   
        }
        else
        {
            
        
        for (var i = 0; i < jsonObject.page.length; i++) {
            var aFeed = jsonObject.page[i];
            
            //create table row
            var row = Titanium.UI.createTableViewRow({
                _title : aFeed.page_name,
                _idPage : aFeed.id_page,
                _pageSlug : aFeed.slug,
                moduleSlug : moduleSlug,
                hasChild : true,
                className : 'detailModule-row',
                filter : aFeed.page_name,
                height : 'auto',
                backgroundColor : '#fff'
            });
            //title label for row at index i
            var titleLabel = Titanium.UI.createLabel({
                text : aFeed.page_name,
                font : {
                    fontSize : 14,
                    fontWeight : ' bold'
                },
                left : 70,
                top : 5,
                height : 20,
                width : 210,
                color : '#232'
            });

            row.add(titleLabel);

            //description view for row at index i
            var descriptionLabel = Titanium.UI.createLabel({
                font : {
                    fontSize : 10,
                    fontWeight : ' normal '
                },
                left : 70,
                top : titleLabel.height + 5,
                width : 200,
                color : '#9a9'
            });

            descriptionLabel.text = row._description;
            row.add(descriptionLabel);

            row.height = titleLabel.height + descriptionLabel.height + 15;

            //add the row to data array
            data.push(row);
        }
        }
        // set the data to tableview's data
        detailModuleTable.data = data;

        if (reloading == true) {
            //when done, reset the header to its original style
            detailModuleTable.setContentInsets({
                top : 0
            }, {
                animated : true
            });
            reloading = false;
            statusLabel.text = "Pull to refresh...";
            actIndicator.hide();
            arrowImage.backgroundImage = 'img/refreshArrow.png';
            arrowImage.show();
        }
        isLoad = true;
    },
    onerror : function(e) {
        reloading = false;
        pulling = false;
        arrowImage.hide();
        actIndicator.hide();
        statusLabel.text = "";
        detailModuleTable.setContentInsets({
            top : 0
        }, {
            animated : true
        });
       // Ti.API.debug(e.error);
        alert("Failed to retrieve data. \n Please make sure you're connected to internet.");
        if (!isLoad)isLoad = false;
    },
    timeout : 5000

});

//define search bar which will attach to  table view
var searchBar = Titanium.UI.createSearchBar({
    showCancel : true,
    height : 43,
    top : 0
});

//print out the searchbar value whenever it changes
searchBar.addEventListener('change', function(e) {

   // Ti.API.info('user searching for: ' + e.value);
});
//when the return key is hit, make searchBar get blur
searchBar.addEventListener('return', function(e) {
    searchBar.blur();
});

//when the cancel but ton is tapped,make searchBar get blur too
searchBar.addEventListener('cancel', function(e) {
    searchBar.blur();
});
//end of search bar

//create refresh view and relative variable
var pulling = false;
var reloading = false;

var tableHeader = Titanium.UI.createView({
    backgroundImage : 'img/header.png',
    width : Ti.Platform.displayCaps.platformWidth,
    height : Ti.Platform.displayCaps.platformHeight
});

var arrowImage = Titanium.UI.createImageView({
    backgroundImage : "img/refreshArrow.png",
    width : 22,
    height : 54,
    bottom : 20,
    left : 20
});

var statusLabel = Ti.UI.createLabel({
    text : "Pull to refresh...",
    left : 85,
    width : 200,
    bottom : 28,
    height : "auto",
    color : "#FFF",
    textAlign : "center",
    font : {
        fontSize : 14,
        fontWeight : "bold"
    },
    shadowColor : "#89a",
    shadowOffset : {
        x : 0,
        y : 1
    }
});
var actIndicator = Titanium.UI.createActivityIndicator({
    left : 20,
    bottom : 20,
    width : 40,
    height : 40
});
tableHeader.add(actIndicator);
tableHeader.add(arrowImage);
tableHeader.add(statusLabel);

//create a table view
var detailModuleTable = Titanium.UI.createTableView({
    height : 366,
    width : 320,
    top : 0,
    left : 0,
    search : searchBar,
    filterAttribute : 'filter'
});
detailModuleTable.headerPullView = tableHeader;
win.add(detailModuleTable);

var offset=0;
//table scrolling function
detailModuleTable.addEventListener('scroll', function(e) {
    if (Ti.Platform.osname != 'iphone') {
        Titanium.API.info("Ti.Platform.osname != 'iPhone':" + Ti.Platform.osname);
        return;
    }

    offset = e.contentOffset.y;
    if (offset < -65.0 && !pulling) {
        pulling = true;
        arrowImage.backgroundImage = 'img/refreshArrow_up.png';
        statusLabel.text = "Release to refresh...";
    } else if (pulling && offset > -65.0 && offset < 0) {
        pulling = false;
        arrowImage.backgroundImage = 'img/refreshArrow.png';
        statusLabel.text = "Pull Down to refresh...";
    }
});
detailModuleTable.addEventListener('dragEnd', function(e) {
    if (Ti.Platform.osname != 'iphone') {
        return;
    }
    // offset = e.contentOffset.y;
    if (pulling && !reloading && offset <= -65.0) {
        reloading = true;
        pulling = false;
        arrowImage.hide();
        actIndicator.show();
        statusLabel.text = "Reloading ...";
        detailModuleTable.setContentInsets({
            top : 65
        }, {
            animated : true
        });

        //null out the existing module data
         if(!isLoad)detailModuleTable.data = null;
        data = [];

        loaddetailModules();
    }
});
//tablerow selected function: create new window
detailModuleTable.addEventListener('click', function(e) {

    //get the selected row index
    var selectedRow = e.rowData;

    // create detail window
    var detailWindow = Titanium.UI.createWindow({
        _title : selectedRow._title,
        _idPage : selectedRow._idPage,
        pageSlug : selectedRow._pageSlug,
        moduleSlug : moduleSlug,
        username : username,
        id_user : id_user,
        backgroundColor : '#fff',
        url : 'page.js',
        title : selectedRow._title,
        id : 0
    });

    Titanium.UI.currentTab.open(detailWindow);
});
// this method will process the remote data

//this method will fire if there's an error in accessing the //remote data

loaddetailModules();

// function
function loaddetailModules() {
    //open the detailModules xml feed
    var module_id = win._id;
    var httpClient = 'http://satulayanan.net/api/index?tag=get_page&id=';
    detailModulesHTTPClient.open('GET', httpClient.concat(module_id));
    //execute the call to the remote feed
    detailModulesHTTPClient.send();
}
