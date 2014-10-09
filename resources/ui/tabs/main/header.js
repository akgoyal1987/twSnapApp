function Header(title) {
    
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'20dp',};
    
    var header = Titanium.UI.createView({
       top:0,
       width:'100%',
       backgroundColor:'#333',
       height:'50dp'
    });
    
    
    var welcomeLabel = Titanium.UI.createLabel({
        text:'Welcome!',
        left:'10dp',
        font:customFont,
        color:'#fff'
    });
    
    var logoutButton = Titanium.UI.createLabel({
       text:'Logout',
       right:'10dp',
       font:customFont,
       color:'#fff'
    });
    
    header.add(welcomeLabel);
    header.add(logoutButton);
    logoutButton.addEventListener('click', function(e){
    	/*params = {
            'tokenId': Ti.App.accountData.id,
        };
        var url = "http://104.131.33.138:3000/api/Users/logout";
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {

                 accountData = JSON.parse(this.responseText);
                 Ti.API.info(accountData);
                 LoadAppbuilder();
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 if (e.error == '400')alert('You have to input email and password.');
                 else if (e.error == '401')alert('You account information is wrong.');
             },
             timeout : 5000  // in milliseconds
        });
        client.open("POST", url);
        client.send(params);*/
       
		Ti.App.Properties.setList('accountData', []);
		Ti.App.Properties.setList('pages', []);
	    Ti.App.Properties.setObject('pageIndex',[]);
	    var LoginWindow = require('ui/tabs/login');
	    var LoginWin = new LoginWindow(L('Login'));
	    LoginWin.open();
    });
    
return header;
};
module.exports = Header;