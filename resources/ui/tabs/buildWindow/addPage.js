    var winBorder = Titanium.UI.currentWindow;
    var pageTitleFont = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#fff'};
    var selectPageLabel = Ti.UI.createButton({
        top:'0dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#333',
    });
    var selectPageTitle= Titanium.UI.createLabel({
       text:'Select Page To Add',
       font:pageTitleFont
    });
    selectPageLabel.add(selectPageTitle);

    var cancelPageLabel = Ti.UI.createButton({
        bottom:'0dp',
        width: '100%',
        height:'60dp',
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

    var win = Ti.UI.createView({
        width:'585dp',
        height:'698dp',
        //layout:'vertical',
        backgroundColor:'#eee',
        borderColor:'#333',
        borderWidth:2,
        borderRadius:8, 
    });
    winBorder.add(win);
    var customFont = {fontFamily:'CoconOT-LightCond',fontSize:'20dp', color:'#333'};
    var cellWidth = '110dp';
    var cellHeight = '140dp';
    var xSpacer = '3dp';
    var ySpacer = '3dp';
    var xGrid = 5;
    var yGrid = 4;
    var tableData = [];
    var cellIndex = 0;
    var labels = ['About','Call','Catalog','Forms','Coupons','Shop','Email', 'Facebook', 'Gallery', 'Twitter', 'RSS', 'Reviews','Video','Webpage', 'Html', 'Loyalty', 'Locations', 'Instagram', 'Pinterest','Foursquare'];   
    //var labels = ['About','Call','Email', 'Facebook', 'Gallery', 'Twitter', 'RSS', 'Reviews','Video','Webpage','Locations', 'Instagram', 'Pinterest','Foursquare'];
    for (var y=0; y<yGrid; y++){
        var thisRow = Ti.UI.createTableViewRow({
            className: "grid",
            layout: "horizontal",
            height: '141dp'    
        });
            
        for (var x=0; x<xGrid; x++){
            if (!labels[cellIndex]) {break;}
            var thisView = Ti.UI.createView({
                objName:"grid-view",
                objIndex:cellIndex.toString(),
                borderWidth:0,      
                borderColor:'#333',
                borderRadius:8,
                left: ySpacer,
                height: cellHeight,
                width: cellWidth,
                top:'0.5dp',
                //bottom:'2dp',
                label:labels[cellIndex],
                backgroundColor:'#ddd',
            });
                
            var itemImage = Ti.UI.createImageView({
                top:'5dp',
                image:'images/dashboard/'+labels[cellIndex]+'.png',
                width:'100dp',
                height:'100dp',
                label:labels[cellIndex],
            });
            thisView.add(itemImage);
                
            var textlabel = Ti.UI.createLabel({
                bottom:'2dp',
                text:labels[cellIndex],
                label:labels[cellIndex],
                font: customFont
            });
            thisView.add(textlabel);
            thisRow.add(thisView);
            cellIndex++;
        }
        tableData.push(thisRow);
    }
        
    var tableview = Ti.UI.createTableView({
        top:'61dp',
        left:'6dp',
        data:tableData,
        separatorColor:'transparent',
        backgroundColor:'transparent'
    });   
    win.add(selectPageLabel);
    win.add(tableview);
    win.add(cancelPageLabel);
    cancelPageLabel.addEventListener('click', function (e){
        winBorder.close();
    });
    
    tableview.addEventListener('click', function(e)
    {
        if (e.source.label){
            var appData = Ti.App.Properties.getObject('pageIndex',[]);
            pageIndex = appData.length;
            pageData = {
                pageIcon:'images/dashboard/' + e.source.label + '.png',
                pageTitle:e.source.label,
                pageType:e.source.label,
                pagePosition: e.source.label + pageIndex.toString(),
                pageIndex:pageIndex
            };
            
            appData.push(pageData);
            Ti.App.Properties.setObject('pageIndex', appData);
            Ti.App.Properties.setObject(pageData.pagePosition, pageData);
            
            Ti.App.fireEvent('updatePage', {id:pageIndex});
            Ti.API.debug(pageData);
        }
        winBorder.close();
    });