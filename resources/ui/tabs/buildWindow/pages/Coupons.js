var scrollView = Titanium.UI.currentWindow;
scrollView.width = '615dp';
//scrollView.height='600dp';
var data = scrollView.pageData;
var pageName = data.pagePosition;
var pageData = Ti.App.Properties.getObject(pageName, {});
var customFont = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '26dp',
    color : '#fff'
};
var customFont1 = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '26dp',
    color : '#555'
};
var formFont = {
    fontFamily : 'HelveticaNeue-Thin',
    fontSize : '20dp',
    color : '#000'
};
var formFontSm = {
    fontFamily : 'HelveticaNeue-Thin',
    fontSize : '16dp',
    color : '#000'
};
var tableHeaderFont = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '22dp',
    color : '#fff'
};
var tableRowFont = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '20dp',
    color : '#000'
};

data1 = [];
pageHeader = Titanium.UI.createView({
    height : '60dp',
    width : '100%',
    backgroundColor : '#333'
});
var webview = Ti.UI.createWebView({
    url : 'html/filechooser.html',
    height:'0dp'
});
scrollView.add(webview);
pageHeaderTitle = Titanium.UI.createLabel({
    text : 'Edit Page: ' + data.pageType,
    font : customFont
});
pageHeader.add(pageHeaderTitle);

pageIconView = Titanium.UI.createView({
    height : '110dp',
    left : '10dp',
    right : '10dp',
    width : '60dp'
});
pageIconLabel = Titanium.UI.createLabel({
    text : 'Icon',
    font : customFont1,
    top : '0dp',
    left : '0dp'
});
pageIcon = Titanium.UI.createImageView({
    top : '35dp',
    width : '60dp',
    height : '60dp',
    image : pageData.pageIcon,
    left : '0dp'
});
pageIconEdit = Titanium.UI.createImageView({
    image : 'images/build/editIcon.png',
    top : '75dp',
    right : '0dp'
});
pageIconView.add(pageIconLabel);
pageIconView.add(pageIcon);
pageIconView.add(pageIconEdit);
pageIcon.addEventListener('click', showIcons);
pageIconEdit.addEventListener('click', showIcons);

pageTitleView = Titanium.UI.createView({
    height : '110dp',
    layout : 'vertical',
    left : '20dp',
});
pageTitleLabel = Titanium.UI.createLabel({
    text : 'Title',
    font : customFont1,
    top : '0dp',
    left : '0dp'
});
pageTitle = Titanium.UI.createTextField({
    font : formFont,
    width : '95%',
    left : '0dp',
    right : '10dp',
    height : '40dp',
    hintText : 'Page Name',
    value : pageData.pageTitle || '',
    borderColor : '#fff',
    borderWidth : 1,
    borderRadius : 4,
    backgroundColor : '#fff'
});
pageTitleView.add(pageTitleLabel);
pageTitleView.add(pageTitle);

pageConstants = Titanium.UI.createView({
    layout : 'horizontal',
    height : 'auto',
    width : '100%'
});
pageConstants.add(pageIconView);
pageConstants.add(pageTitleView);

pageFieldLabel = Titanium.UI.createView({
    width : '94%',
    layout : 'horizontal',
    height : '50dp',
    top : '10dp',
    bottom : '10dp',
});

addCategoryLabel = Titanium.UI.createLabel({
    text : 'Add Coupon',
    font : customFont1,
});

addCatButton = Titanium.UI.createImageView({
    image : 'images/build/add.png',
});

pageFieldLabel.add(addCatButton);
pageFieldLabel.add(addCategoryLabel);

catalogTable = Titanium.UI.createTableView({
    height : '40%',
    data : data1,
    width : '94%',
    backgroundColor : '#bee3eb'
});

catalogTable.addEventListener('click', function(e) {
    if (e.source.id == 'delete') {
        rowToDelete = e.index;
        catalogTable.deleteRow(rowToDelete);
    }

});

function addRow() {
    var newRow = Titanium.UI.createTableViewRow({
        height : '275dp',
        backgroundColor : '#bee3eb',
    });

    var rowImage = Titanium.UI.createImageView({
        image : 'images/build/placeholder.png',
        height : '165dp',
        width : '165dp',
        left : '5dp',
        top : '5dp'
    });
    
    Ti.App.addEventListener('app:fromWebView', function(e) {
     headerImage.image = e.message;
     });

    rowImage.addEventListener('click', function(e) {
        Ti.App.fireEvent('app:fromTitanium', {
            callback : function(imageurl) {
                rowImage.image = imageurl;
            }
        });
    });

    var rowTitle = Titanium.UI.createTextField({
        font : formFontSm,
        width : '60%',
        height : '35dp',
        left : '175dp',
        top : '5dp',
        hintText : ' Deal Title',
        value : pageData.catTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });
    var rowDesc = Titanium.UI.createTextArea({
        font : formFontSm,
        width : '60%',
        height : '65dp',
        left : '175dp',
        top : '45dp',
        hintText : ' Deal Description',
        value : pageData.catTitle || ' Deal Description',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });

    var discountViews = Titanium.UI.createView({
        top : '175dp',
        width : '165dp',
        height : '36dp',
        layout : 'horizontal',
        left : '5dp'
    });
<<<<<<< HEAD

    var rowPrice = Titanium.UI.createTextField({
        font : formFontSm,
        width : '80dp',
        height : '35dp',
        hintText : 'Orig. Price',
        value : pageData.catTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff',
        textAlign : 'center',

=======
    
    function addRow(){
        var newRow = Titanium.UI.createTableViewRow({
                height:'275dp',
                backgroundColor:'#bee3eb',
            });
            
            var rowImage = Titanium.UI.createImageView({
                image:'images/build/placeholder.png',
                height:'165dp',
                width:'165dp',
                left:'5dp',
                top:'5dp'
            });
            rowImage.addEventListener('click', function(e) {
				Ti.App.fireEvent('app:fromTitanium', { callback: function(imageurl){
						rowImage.image = imageurl;
					} 
				});
			});
            var rowTitle = Titanium.UI.createTextField({
                font:formFontSm,
                width : '60%',
                height : '35dp',
                left:'175dp',
                top:'5dp',
                hintText : ' Deal Title',
                value: pageData.catTitle || '',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff'
            });    
            var rowDesc = Titanium.UI.createTextArea({
                font:formFontSm,
                width : '60%',
                height : '65dp',
                left:'175dp',
                top:'45dp',
                hintText : ' Deal Description',
                value: pageData.catTitle || ' Deal Description',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff'
            });    
            
            var discountViews = Titanium.UI.createView({
               top:'175dp',
               width:'165dp',
               height:'36dp',
               layout:'horizontal',
               left:'5dp'
            });
            
            var rowPrice = Titanium.UI.createTextField({
                font:formFontSm,
                width : '80dp',
                height : '35dp',
                hintText : 'Orig. Price',
                value: pageData.catTitle || '',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff',
                textAlign:'center',
                
            });    
            
            var rowDiscount = Titanium.UI.createTextField({
                font:formFontSm,
                width : '80dp',
                left:'5dp',
                height : '35dp',
                hintText : 'New Price',
                value: pageData.catTitle || '',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff',
                textAlign:'center',
            });    
            
            discountViews.add(rowPrice);
            discountViews.add(rowDiscount);
            
            var dateViews = Titanium.UI.createView({
               top:'215dp',
               width:'165dp',
               height:'36dp',
               layout:'horizontal',
               left:'5dp'
            });
            
            var rowStartDate = Titanium.UI.createTextField({
                font:formFontSm,
                width : '80dp',
                height : '35dp',
                hintText : 'Start Date',
                value: pageData.catTitle || '',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff',
                textAlign:'center',
            });    
            
            var rowEndDate = Titanium.UI.createTextField({
                font:formFontSm,
                width : '80dp',
                left:'5dp',
                height : '35dp',
                hintText : 'End Date',
                textAlign:'center',
                value: pageData.catTitle || '',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff'
            });    
            
            dateViews.add(rowStartDate);
            dateViews.add(rowEndDate);
            
            var rowDetails = Titanium.UI.createTextArea({
                font:formFontSm,
                width : '60%',
                height : '65dp',
                left:'175dp',
                top:'115dp',
                value: pageData.catTitle || ' Deal Details',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff'
            });    
            
            var rowDisc = Titanium.UI.createTextArea({
                font:formFontSm,
                width : '60%',
                height : '65dp',
                left:'175dp',
                top:'185dp',
                hintText : ' Disclaimer',
                value: pageData.catTitle || ' Disclaimer',
                borderColor:'#fff',
                borderWidth:1,
                borderRadius:4,
                backgroundColor:'#fff'
            });    
            
            
            var rowDeleteButton = Titanium.UI.createImageView({
                image:'images/build/delete.png',
                id:'delete',
                right:'12.5dp'
            });
            
            var rowSortUpButton = Titanium.UI.createImageView({
                image:'images/build/moveUp.png',
                right:'10dp',
                top:'10dp',
                id:'moveUp'
            });
            var rowSortDownButton = Titanium.UI.createImageView({
                image:'images/build/moveDown.png',
                right:'10dp',
                bottom:'10dp',
                id:'moveDown'
            });
            
            newRow.add(rowImage);
            newRow.add(rowTitle);
            newRow.add(rowDesc);
            newRow.add(rowDisc);
            newRow.add(discountViews);
            newRow.add(dateViews);
            newRow.add(rowDetails);
            newRow.add(rowDeleteButton);
            //newRow.add(rowSortUpButton);
            //newRow.add(rowSortDownButton);
            catalogTable.appendRow(newRow);
    };
    
    pageFieldLabel.addEventListener('click', addRow);
    
    buttonBar = Titanium.UI.createView({
        top:'20dp',
        bottom:'0dp',
        width:'100%',
        height:'60dp',
        backgroundColor:'#333'
>>>>>>> FETCH_HEAD
    });

    var rowDiscount = Titanium.UI.createTextField({
        font : formFontSm,
        width : '80dp',
        left : '5dp',
        height : '35dp',
        hintText : 'New Price',
        value : pageData.catTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff',
        textAlign : 'center',
    });

    discountViews.add(rowPrice);
    discountViews.add(rowDiscount);

    var dateViews = Titanium.UI.createView({
        top : '215dp',
        width : '165dp',
        height : '36dp',
        layout : 'horizontal',
        left : '5dp'
    });

    var rowStartDate = Titanium.UI.createTextField({
        font : formFontSm,
        width : '80dp',
        height : '35dp',
        hintText : 'Start Date',
        value : pageData.catTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff',
        textAlign : 'center',
    });

    var rowEndDate = Titanium.UI.createTextField({
        font : formFontSm,
        width : '80dp',
        left : '5dp',
        height : '35dp',
        hintText : 'End Date',
        textAlign : 'center',
        value : pageData.catTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });

    dateViews.add(rowStartDate);
    dateViews.add(rowEndDate);

    var rowDetails = Titanium.UI.createTextArea({
        font : formFontSm,
        width : '60%',
        height : '65dp',
        left : '175dp',
        top : '115dp',
        value : pageData.catTitle || ' Deal Details',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });

    var rowDisc = Titanium.UI.createTextArea({
        font : formFontSm,
        width : '60%',
        height : '65dp',
        left : '175dp',
        top : '185dp',
        hintText : ' Disclaimer',
        value : pageData.catTitle || ' Disclaimer',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });

    var rowDeleteButton = Titanium.UI.createImageView({
        image : 'images/build/delete.png',
        id : 'delete',
        right : '12.5dp'
    });

    var rowSortUpButton = Titanium.UI.createImageView({
        image : 'images/build/moveUp.png',
        right : '10dp',
        top : '10dp',
        id : 'moveUp'
    });
    var rowSortDownButton = Titanium.UI.createImageView({
        image : 'images/build/moveDown.png',
        right : '10dp',
        bottom : '10dp',
        id : 'moveDown'
    });

    newRow.add(rowImage);
    newRow.add(rowTitle);
    newRow.add(rowDesc);
    newRow.add(rowDisc);
    newRow.add(discountViews);
    newRow.add(dateViews);
    newRow.add(rowDetails);
    newRow.add(rowDeleteButton);
    //newRow.add(rowSortUpButton);
    //newRow.add(rowSortDownButton);
    catalogTable.appendRow(newRow);
};

pageFieldLabel.addEventListener('click', addRow);

buttonBar = Titanium.UI.createView({
    top : '20dp',
    bottom : '0dp',
    width : '100%',
    height : '60dp',
    backgroundColor : '#333'
});

saveButton = Ti.UI.createButton({
    width : '40%',
    left : '0dp',
    height : '60dp',
    backgroundColor : 'transparent'
});
saveButtonLabel = Titanium.UI.createLabel({
    text : 'Save',
    font : customFont,
    color : '#97ca52',
    left : '60dp'
});
saveButton.add(saveButtonLabel);
savePageIcon = Titanium.UI.createImageView({
    image : 'images/build/save.png',
    left : '17.5dp',
});
saveButton.add(savePageIcon);

cancelButton = Ti.UI.createButton({
    width : '40%',
    height : '60dp',
    right : '0dp',
    backgroundColor : 'transparent'
});
cancelButtonLabel = Titanium.UI.createLabel({
    text : 'Cancel',
    font : customFont,
    color : '#e9292a',
    right : '60dp'
});
cancelPageIcon = Titanium.UI.createImageView({
    image : 'images/build/cancel.png',
    right : '17.5dp'
});
cancelButton.add(cancelButtonLabel);
cancelButton.add(cancelPageIcon);

buttonBar.add(saveButton);
buttonBar.add(cancelButton);

saveButton.addEventListener('click', function() {
    pageData = {
        pageIcon : pageIcon.image,
        pageTitle : pageTitle.value,
        pageType : data.pageType,
        pagePosition : data.pagePosition,
        pageField : pageField.value,
        pageField1 : pageField1.value,
        pageField2 : pageField2.value,
        pageIndex : data.pageIndex
    };
    var appData = Ti.App.Properties.getObject('pageIndex', []);
    appData[pageData.pageIndex] = pageData;
    Ti.App.Properties.setObject('pageIndex', appData);
    Ti.App.Properties.setObject(pageName, pageData);
    scrollView.close();
    Ti.App.fireEvent('updatePage', pageData);
});
cancelButton.addEventListener('click', function() {
    scrollView.close();
});
Ti.App.addEventListener('changeIcon', function(data) {
    pageIcon.image = data.image;
});
function showIcons(e) {
    var allIcons = Ti.UI.createWindow({
        url : '/ui/tabs/buildWindow/iconSelect.js',
        height : '610dp',
        width : '745dp',
        backgroundColor : 'transparent',
        fullscreen : false,
        pageData : data,
        modal : true,
    });
    allIcons.open();
}

webview = Titanium.UI.createWebView({
    url : 'http://myfreeapp.com/temp/livePreviewExamples.html',
    width : '515dp',
    height : '450dp'
});

scrollView.add(pageHeader);
scrollView.add(pageConstants);
scrollView.add(pageFieldLabel);
scrollView.add(catalogTable);
//scrollView.add(webview);
scrollView.add(buttonBar);

addRow();
