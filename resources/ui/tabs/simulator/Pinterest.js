    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);

    Ti.Facebook.appid = '103458446491218';
    Ti.Facebook.permissions = ['publish_stream']; // Permissions your app needs
    Ti.Facebook.addEventListener('login', function(e) {
        if (e.success) {
            alert('Logged In');
        } else if (e.error) {
            alert(e.error);
        } else if (e.cancelled) {
            alert("Canceled");
        }
    });
    Ti.Facebook.authorize();

    scrollView = Titanium.UI.createWebView({
        url:'http://m.pinterest.com' + pageData.pageField,
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

    