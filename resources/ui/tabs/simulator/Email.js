    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
    var pageTitleFont = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#fff'};
    var pageTitleFont1 = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#000'};
   
    

    scrollView = Titanium.UI.createScrollView({
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#eee'
    });
    
    var selectPageLabel = Ti.UI.createButton({
        top:'0dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#333',
    });
    var selectPageTitle= Titanium.UI.createLabel({
       text:'Mail To:',
       font:pageTitleFont
    });
    selectPageLabel.add(selectPageTitle);
    scrollView.add(selectPageLabel);
    
    
     var callingLabel = Ti.UI.createButton({
        top:'120dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#fff',
    });
    var callingLabelTitle= Titanium.UI.createLabel({
       text:pageData.pageField,
       font:pageTitleFont1
    });
    
    callingLabel.add(callingLabelTitle);
    scrollView.add(callingLabel);

    saveButton = Ti.UI.createButton({
       title:'Back',
       left:'0dp',
       top:'0dp',
       width:'20%',
       height:'60dp',       
    });
    
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    //scrollView.add(fbURL);
    
    
    win.add(scrollView);
    win.add(saveButton);
