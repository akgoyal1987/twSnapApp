    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);

    

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
   
    
    win.add(saveButton);
