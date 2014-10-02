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

    var addr = pageData.pageField;
    
    var replaced = addr.split(' ').join('+');
    
    
    
    scrollView = Titanium.Map.createView({
        region: {latitude:26.102758, longitude:-80.110847, latitudeDelta:8, longitudeDelta:8},
        width : '100%',
        top : '60dp',
        height:'100%',
    });
        
    
    
        var objLocationAnnotation = Titanium.Map.createAnnotation({
            latitude: '26.165874',
            longitude: '-80.166816',
            pincolor: Titanium.Map.ANNOTATION_RED
        });
    scrollView.addAnnotation(objLocationAnnotation);
    
    
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