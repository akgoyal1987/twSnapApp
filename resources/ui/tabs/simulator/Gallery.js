    var win = Titanium.UI.currentWindow;
    win.backgroundColor = '#ccc';
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
    var fbURL = pageData.pageField;
    //var fbURL = 'NaninkPhotoDesign';

    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#fff'};
    var customFont1 = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#555'};
    var formFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'20dp',color:'#000'};
    var bigFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#000'};
    var smFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#000'};
    
    var header = Titanium.UI.createView({
        width:'100%',
        height:'60dp',
        backgroundColor:'#999',
        top:'0dp'
    });
    
    win.add(header);
    
    var LoadingLabel = Ti.UI.createLabel({
        text:'Loading... Please Wait',
        font:customFont
    });
    
    win.add(LoadingLabel);
    
    var pageTitle = Titanium.UI.createLabel({
        text:pageData.pageTitle,
        font:formFont
    });
    
    header.add(pageTitle);
    
    var scrollView = Ti.UI.createView({
       top:'60dp',
       height:Ti.UI.FILL,
       width: '277dp',
       layout:'horizontal',
       scrollType:'vertical'
    });
    win.add(scrollView);
    
    var tabledata = [];
    
    //var profilePic;
    
    getProfileImage();
    //Register();
    
    function getProfileImage(){
        var url = 'https://graph.facebook.com/' + fbURL + '/photos?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk&fields=picture,images';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 var data = JSON.parse(this.responseText).data;
                 createDisplayTable(data);
                 LoadingLabel.text = '';
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
        for (var i=0; i < data.length; i++) {
            thumbNail = Ti.UI.createImageView({
                image:data[i].picture,
                top:'5dp',
                left:'1dp',
                width:'67dp',
            });
            scrollView.add(thumbNail);
        };
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

    