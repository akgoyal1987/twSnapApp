    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#fff'};
    var customFont1 = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#555'};
    var formFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'20dp',color:'#000'};


    var header = Titanium.UI.createView({
        width:'100%',
        height:'60dp',
        backgroundColor:'#999',
        top:'0dp'
    });
    
    win.add(header);
    
    var pageTitle = Titanium.UI.createLabel({
        text:pageData.pageTitle,
        font:formFont
    });
    
    header.add(pageTitle);
    
    scrollView = Titanium.UI.createView({
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#fff'
    });
    
    
    var customFont = {fontFamily:'CoconOT-LightCond',fontSize:'20dp', color:'#333'};
    var cellWidth = '80dp';
    var cellHeight = '80dp';
    var xSpacer = '3dp';
    var ySpacer = '5dp';
    var xGrid = 3;
    var yGrid = 4;
    var tableData = [];
    var cellIndex = 0;
    
    for (var y=0; y<yGrid; y++){
        var thisRow = Ti.UI.createTableViewRow({
            className: "grid",
            layout: "horizontal",
            height: '90dp'    
        });
            
        for (var x=0; x<xGrid; x++){
        	if (pageData.stampOptions==cellIndex) {
        		var thisView = Ti.UI.createImageView({
            	image:pageData.freebieIcon,
                objIndex:cellIndex.toString(),
                borderWidth:0,      
                borderColor:'#333',
                borderRadius:8,
                left: ySpacer,
                height: cellHeight,
                width: cellWidth,
                top:'0.5dp',
                //bottom:'2dp',
                backgroundColor:'#ddd',
            });
                
            
            	thisRow.add(thisView);
            	cellIndex++;
        		break;
        	}else if (pageData.stampOptions<=cellIndex) {break;}
            var thisView = Ti.UI.createImageView({
            	image:'images/build/placeholder.png',
                objIndex:cellIndex.toString(),
                borderWidth:0,      
                borderColor:'#333',
                borderRadius:8,
                left: ySpacer,
                height: cellHeight,
                width: cellWidth,
                top:'0.5dp',
                //bottom:'2dp',
                backgroundColor:'#ddd',
            });
                
            
            thisRow.add(thisView);
            cellIndex++;
        }
        tableData.push(thisRow);
    }
        
    var tableview = Ti.UI.createTableView({
    	top:'5dp',
        left:'6dp',
        data:tableData,
        separatorColor:'transparent',
        backgroundColor:'transparent'
    });
    
    var loyaltyLabel = Ti.UI.createLabel({
    	width:'80%',
    	textAlign:'center',
    	text:pageData.freebieOptions + '\n' + pageData.pageField,
    	font:formFont,
    	top:'375dp',
    	color:'black'
    });

    
	scrollView.add(tableview);
	
	tableview.addEventListener('click', function(data){
		var opaqueView = Ti.UI.createView({
			height:Ti.UI.FILL,
			width:Ti.UI.FILL,
			backgroundColor:'#000',
			opacity:0.4
		});
		var popUp=Ti.UI.createView({
			width:'80%',
			height:Ti.UI.SIZE,
			layout:'vertical',
			backgroundColor:'#fff'
		});
		var codeField = Ti.UI.createTextField({
			width:'80%',
			height:'40dp',
			top:'5dp',
			bottom:'5dp'
		});
		var codeLabel = Ti.UI.createLabel({
			text:'Enter Verification Code',
			top:'5dp',
			bottom:'5dp'
		});
		var okButton = Ti.UI.createButton({
			title:'Verify',
			top:'5dp',
			bottom:'5dp'
		});
		popUp.add(codeLabel);
		popUp.add(codeField);
		popUp.add(okButton);
		
		okButton.addEventListener('click',function(e){
			if(codeField.value==pageData.code){
				data.source.image = pageData.stampIcon;
			}
			win.remove(opaqueView);
			win.remove(popUp);
		});
		win.add(opaqueView);
		win.add(popUp);
	});
    
    saveButton = Ti.UI.createImageView({
       image:'/images/simulator/backButton.png',
       left:'5dp',
       top:'15dp',
    });
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    win.add(scrollView);
    scrollView.add(loyaltyLabel);
    win.add(saveButton);

    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    win.add(scrollView);
    win.add(saveButton);
