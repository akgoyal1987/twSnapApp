    var win = Titanium.UI.currentWindow;
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);


	
	Register();

    function Register(){
        var url = 'https://graph.facebook.com/garbagegoneglam/feed?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 ///////////////////////////////////////////////
                 // Redirect here to Thank you / Welcome Page //
                 ///////////////////////////////////////////////
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 //alert('error');
             },
             timeout : 5000  // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
    }

   
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

    