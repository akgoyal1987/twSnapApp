    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);


    scrollView = Titanium.UI.createWebView({
        url: 'http://' + pageData.pageField ,
        width : '100%',
        top : '60dp',
        height:'100%',
    });

   
    
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
