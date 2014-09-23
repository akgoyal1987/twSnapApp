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
    
return header;
};
module.exports = Header;