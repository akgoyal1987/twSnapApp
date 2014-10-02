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

    scrollView = Titanium.UI.createScrollView({
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#eee'
    });
    
    var selectPageLabel = Ti.UI.createButton({
        top:'10dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#97ca52',
    });
    var selectPageTitle= Titanium.UI.createLabel({
       text:'Calling...',
       font:customFont1
    });
    selectPageLabel.add(selectPageTitle);
    scrollView.add(selectPageLabel);
    
    
     var callingLabel = Ti.UI.createButton({
         top:'180dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#fff',
    });
    var callingLabelTitle= Titanium.UI.createLabel({
       text:pageData.pageField,
       font:customFont1
    });
    
    callingLabel.add(callingLabelTitle);
    scrollView.add(callingLabel);
    
    var endPageLabel = Ti.UI.createButton({
        top:'360dp',
        width: '100%',
        height:'60dp',
        backgroundColor:'#e9292a',
    });
    var endPageTitle= Titanium.UI.createLabel({
       text:'End Call',
       font:customFont1
    });
    endPageLabel.add(endPageTitle);
    scrollView.add(endPageLabel);

    saveButton = Ti.UI.createImageView({
       image:'/images/simulator/backButton.png',
       left:'5dp',
       top:'15dp',
    });
    
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    //scrollView.add(fbURL);
    
    
    win.add(scrollView);
    win.add(saveButton);
