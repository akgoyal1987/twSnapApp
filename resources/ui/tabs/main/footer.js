function Footer(title) {
    
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'20dp',};
    
    var footer = Titanium.UI.createView({
       width:'100%',
       backgroundColor:'#333',
       height:'50dp',
       bottom:0
    });
    
    var privacyLabel = Titanium.UI.createLabel({
        text:'Privacy Policy',
        left:'10dp',
        font:customFont,
        color:'#fff'
    });
    
    var termsLabel = Titanium.UI.createLabel({
        text:'Terms Of Service',
        right:'10dp',
        font:customFont,
        color:'#fff'
    });
    
    var mfaLabel = Titanium.UI.createLabel({
        text:'SnapAppPro.com',
        font:customFont,
        color:'#fff'
    });
    
    footer.add(privacyLabel);
    footer.add(termsLabel);
    footer.add(mfaLabel);
    
return footer;
};
module.exports = Footer;