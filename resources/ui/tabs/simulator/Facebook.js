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
    var tabledata = [];
    var displayTable = Ti.UI.createTableView({
        data:tabledata,
        width:'100%',
        top:'60dp'
    });
    win.add(displayTable);
	
	Register();

    function Register(){
        var url = 'https://graph.facebook.com/garbagegoneglam/posts?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 var data = JSON.parse(this.responseText).data;
                 createDisplayTable(data);
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
    
    function createDisplayTable(data){
        Ti.API.info(data);
        tabledata = [];
        for (var i=0; i < data.length; i++) {
            var newRow = Titanium.UI.createTableViewRow({
                height:'120dp',
                width:'100%',
                backgroundColor: i % 2 == 0 ? '#fff' : '#ddd'
            });
            
            //var 
            tabledata.push(newRow);
        };
        displayTable.setData(tabledata);
    }

   
    saveButton = Ti.UI.createImageView({
       image:'/images/simulator/backButton.png',
       left:'5dp',
       top:'15dp',
    });
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    

    win.add(saveButton);

    