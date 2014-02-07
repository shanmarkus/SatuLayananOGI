/**
 * @author Shan Markus
 */

var win = Titanium.UI.currentWindow;
//create empty day
//declare the ht tp cl ient object
var isLoad=false;
var akademisiHTTPClient = Titanium.Network.createHTTPClient({
    onload : function(e) {

        //create a json object using the JSON.PARSE function

        var jsonObject = JSON.parse(this.responseText);
        var length = jsonObject.user.length;

        //get through each item
        for (var i = 0; i < jsonObject.user.length; i++) {
            var aFeed = jsonObject.user[i];

            //create table row
            var row = Titanium.UI.createTableViewRow({
                _title : aFeed.username,
                _id : aFeed.id_user,
                hasChild : true,
                className : 'category-row',
                filter : aFeed.username,
                height : 'auto',
                backgroundColor : '#fff'
            });

            Ti.API.info(row._title);
            //title label for row at index i
            var titleLabel = Titanium.UI.createLabel({
                text : aFeed.username,
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

            row.height = titleLabel.height + 15;
            row.selectedBackgroundColor = "#4bd762";
            //add the row to data array
            data.push(row);
        }
        // set the data to tableview's data
        akademisiTable.data = data;

        if (reloading == true) {
            //when done, reset the header to its original style
            akademisiTable.setContentInsets({
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
        isLoad=true;

    },

    //this method will fire if there's an error in accessing the //remote data
    onerror : function(e) {
        // log the error to our Ti tanium Studio console
        reloading = false;
        pulling = false;
        arrowImage.hide();
        actIndicator.hide();
        statusLabel.text = "";
        akademisiTable.setContentInsets({
            top : 0
        }, {
            animated : true
        });
        Ti.API.debug(e.error);
        alert("Failed to retrieve data. \n Please make sure you're connected to internet.");
        if(!isLoad)isLoad=false;
        //Ti.API.error(this.status + ' - ' + this.statusText);
    },
    timeout : 3000
});

var data = [];

//define search bar which will attach to  table view
var searchBar = Titanium.UI.createSearchBar({
    showCancel : true,
    height : 43,
    top : 0
});

//print out the searchbar value whenever it changes
searchBar.addEventListener('change', function(e) {

    Ti.API.info('user searching for: ' + e.value);
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
    height : Ti.Platform.displayCaps.platformHeight,
    minRowHeight : 50
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
var akademisiTable = Titanium.UI.createTableView({
    height : Ti.Platform.displayCaps.platformHeight - 118,
    width : 320,
    top : 0,
    left : 0,
    search : searchBar,
    filterAttribute : 'filter'

});

akademisiTable.headerPullView = tableHeader;
win.add(akademisiTable);

//load all categories

//click button
win.addEventListener('click', function(e) {

    //get the selected row index
    var selectedRow = e.rowData;

    // create detail window
    var detailWindow = Titanium.UI.createWindow({
        _title : selectedRow._title,
        _id : selectedRow._id,
        backgroundColor : '#fff',
        url : 'detailPengelola.js',
        font : {
            fontSize : 12,
            fontWeight : ' bold'
        },
        title : selectedRow._title,
        id : 0
    });

    Titanium.UI.currentTab.open(detailWindow);
});
var offset = 0;
//table scrolling function
akademisiTable.addEventListener('scroll', function(e) {
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
akademisiTable.addEventListener('dragEnd', function(e) {
    if (Ti.Platform.osname != 'iphone') {
        return;
    }
    // offset = e.contentOffset.y;
    if (pulling && !reloading && offset <= -65.0) {
        reloading = true;
        pulling = false;
        arrowImage.hide();
        actIndicator.show();
        statusLabel.text = "Reloading modules...";
        akademisiTable.setContentInsets({
            top : 65
        }, {
            animated : true
        });

        //null out the existing module data
         if(!isLoad)akademisiTable.data = null;
        data = [];

        loadAkademisi();
    }
});

// if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
// alert("you need internet connection");
//
// }

loadAkademisi();

//methods for Categories

function loadAkademisi() {
    //open the recipes xml feed
    var bool = akademisiHTTPClient.open('GET', 'http://satulayanan.net/api/index?tag=get_user_role&id=4');
    //execute the call to the remote feed
    akademisiHTTPClient.send();

}
