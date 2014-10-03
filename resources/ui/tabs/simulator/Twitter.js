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

    scrollView = Titanium.UI.createView({
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#fff'
    });
    
    var Codebird = require("/libs/codebird");
    var cb = new Codebird();
    cb.setConsumerKey('FrsxffyVFv0ciPy0h0oI9oUwd', 'lOay5qyuEcpdyJJ9Eir32IkTixohPoAjniOzigKKGmvXuA9whV');
    
    var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
    if(bearerToken == null){
        cb.__call(
            'oauth2_token',
            {},
            function (reply) {
                var bearer_token = reply.access_token;
                //cb.setBearerToken(bearer_token);
                //Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
                //fetchTwitter();
            }
        );
    } else {
        Ti.API.info("We do have a bearer token...");
        //cb.setBearerToken(bearerToken);
        //fetchTwitter();
    }
    
    
    function fetchTwitter(){
        cb.__call(
            'search_tweets',
            "q="+Ti.Network.encodeURIComponent("#awesome"),
            function (reply) {
                // ...
                Ti.API.info(reply);
            },
            true // this parameter required
        );
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
    
    win.add(scrollView);
    win.add(saveButton);

    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    win.add(scrollView);
    win.add(saveButton);
