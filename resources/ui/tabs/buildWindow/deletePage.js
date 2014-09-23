    var winBorder = Titanium.UI.currentWindow;
    var tableData = [];
    var appData =[];
    var pageTitleFont = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#fff'};
    var customFont = {fontFamily:'CoconOT-LightCond',fontSize:'26dp', color:'#333'};
    var deletePageLabel = Ti.UI.createButton({
        top:'0dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#333',
    });
    var deletePageTitle= Titanium.UI.createLabel({
       text:'Select Page To Delete',
       font:pageTitleFont
    });
    deletePageLabel.add(deletePageTitle);
    
    var bottomBar = Ti.UI.createButton({
        bottom:'0dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#333',
    });
    
    var cancelPageLabel = Ti.UI.createButton({
        bottom:'0dp',
        width: '30%',
        height:'60dp',
        right:'0dp',
        backgroundColor:'#333',
    });
    var cancelPageTitle= Titanium.UI.createLabel({
       text:'Cancel',
       font:pageTitleFont,
       color:'#e9292a',
       right:'60dp'
    });
    var cancelPageIcon = Titanium.UI.createImageView({
        image:'images/build/cancel.png',
        right:'17.5dp'
    });
    cancelPageLabel.add(cancelPageIcon);
    cancelPageLabel.add(cancelPageTitle);
    
    var savePageLabel = Ti.UI.createButton({
        bottom:'0dp',
        width: '40%',
        height:'60dp',
        left:'0dp',
        backgroundColor:'#333',
    });
    var savePageTitle= Titanium.UI.createLabel({
       text:'Save',
       font:pageTitleFont,
       color:'#97ca52',
       left:'17.5dp'
    });
    var savePageIcon = Titanium.UI.createImageView({
        image:'images/build/save.png',
        left:'90dp',
    });
    savePageLabel.add(savePageIcon);
    savePageLabel.add(savePageTitle);
    
    var win = Ti.UI.createView({
        width:'450dp',
        height:'698dp',
        backgroundColor:'#eee',
        borderColor:'#333',
        borderWidth:2,
        borderRadius:8, 
    });
    winBorder.add(win);
    
    var pageData = Ti.App.Properties.getObject('pageIndex',{});
    
    for (var i=0; i<pageData.length; i++)
    {
        var row = Titanium.UI.createTableViewRow({
            height:'60dp',
            pageType:pageData[i].pageType,
            pagePosition:pageData[i].pagePosition,
            pageIcon:pageData[i].pageIcon,
            pageTitle:pageData[i].pageTitle
        });
        
        var rowIcon = Titanium.UI.createImageView({
            image:'images/dashboard/'+pageData[i].pageType+'.png',
            left:'10dp',
            height:'50dp',
        });
        
        var rowTitle = Titanium.UI.createLabel({
            text:pageData[i].pageType,
            font:customFont,
            left:'70dp'
        });
        
        var rowDeleteButton = Titanium.UI.createImageView({
            image:'images/build/delete.png',
            right:'17.5dp',
            id:'save'
        });
        
        row.add(rowIcon);
        row.add(rowTitle);
        row.add(rowDeleteButton);
        tableData.push(row);
    }
    
    var tableview = Ti.UI.createTableView({
        top:'61dp',
        left:'6dp',
        right:'6dp',
        bottom:'60dp',
        data:tableData,
        separatorColor:'#333',
        backgroundColor:'transparent'
    });

    win.add(deletePageLabel);
    win.add(tableview);
    win.add(bottomBar);
    win.add(cancelPageLabel);
    win.add(savePageLabel);
    
    cancelPageLabel.addEventListener('click', function (e){
        winBorder.close();
    });
    
    tableview.addEventListener('click', function(e)
    {
        if (e.source.id){
            rowToDelete = e.index;
            tableview.deleteRow(rowToDelete);
            //tableData = tableview.data;
        }
    });
    
    savePageLabel.addEventListener('click', function(e){

        for(l=0; l<tableview.data[0].rowCount;l++){ 
            pageData = {     

                pageIcon : tableview.data[0].rows[l].pageIcon,
                pageTitle : tableview.data[0].rows[l].pageTitle,
                pageType : tableview.data[0].rows[l].pageType,
                pagePosition : tableview.data[0].rows[l].pagePosition,
                pageIndex : l
            };
            appData.push(pageData);
        }
        Ti.App.Properties.setObject('pageIndex', appData);
        Ti.App.fireEvent('updatePage');
        winBorder.close();
    });
