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
        url:'http://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2F' + pageData.pageField + '&width&height=395&colorscheme=light&show_faces=false&header=false&stream=true&show_border=false&appId=103458446491218',
        width : '100%',
        top : '60dp',
        height:'100%',
    });

    fbURL = Titanium.UI.createTextField({
        color : '#336699',
        top : '10dp',
        width : '94%',
        height : '40dp',
        hintText : 'Facebook URL',

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
