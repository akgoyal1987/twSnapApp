    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);

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
    
    win.add(scrollView);
    win.add(saveButton);