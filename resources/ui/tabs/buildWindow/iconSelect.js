    var winBorder = Titanium.UI.currentWindow;
    
    var win = Ti.UI.createView({
        width:'565dp',
        height:'705dp',
        borderColor:'#bbb',
        backgroundColor:'#eee',
        borderWidth:2.5,
        borderRadius:10, 
    });
    winBorder.add(win);
    var pageTitleFont = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#fff'};
    var selectPageLabel = Ti.UI.createButton({
        top:'0dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#333',
    });
    var selectPageTitle= Titanium.UI.createLabel({
       text:'Select Page Icon',
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
    
    var customFont = {fontFamily:'CoconOT-LightCond',fontSize:'18dp'};
    var cellWidth = '70dp';
    var cellHeight = '70dp';
    var xSpacer = '5dp';
    var ySpacer = '5dp';
    var xGrid = 8;
    var yGrid = 8;
    var tableData = [];
    var cellIndex = 0;  
    for (var y=0; y<yGrid; y++){
        var thisRow = Ti.UI.createTableViewRow({
            className: "grid",
            layout: "horizontal",
            height: '70dp'    
        });
            
        for (var x=0; x<xGrid; x++){
            
            var thisView = Ti.UI.createView({
                objName:"grid-view",
                objIndex:cellIndex.toString(),
                height: '70dp',
                width: '70dp',
                top:'5dp',
            });
                
            var itemImage = Ti.UI.createImageView({
                image:'images/icons/'+ cellIndex +'.png',
                width:'60dp',
                height:'60dp',
            });
            thisView.add(itemImage);
                
            thisRow.add(thisView);
            cellIndex++;
        }
        tableData.push(thisRow);
    }
        
    var tableview = Ti.UI.createTableView({
        top:'61dp',
        data:tableData,
        separatorColor:'transparent',
        backgroundColor:'transparent',
    });   
    win.add(selectPageLabel);
    win.add(tableview);
    win.add(cancelPageLabel);
    cancelPageLabel.addEventListener('click', function (e){
        winBorder.close();
    });
    tableview.addEventListener('click', function(e)
    {
        if (e.source.image){
            //alert(e.source.image);
            Ti.App.fireEvent('changeIcon', {image:e.source.image});
        }
        winBorder.close();
    });