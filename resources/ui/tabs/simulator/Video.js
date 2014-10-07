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

    scrollView = Titanium.UI.createWebView({
    	url:'http://www.youtube.com/embed/' + pageData.pageField,
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#fff'
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
    win.add(saveButton);

    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    win.add(scrollView);
    win.add(saveButton);
