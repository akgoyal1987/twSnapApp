function LoginWindow(title) {    
    loginToggle = true;
    registerToggle = false;
    
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'18dp'};
    var customFontButton = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#fff'};
    
    var main = Titanium.UI.createWindow({
       height:'100%',
       width:'100%',
       title : 'MyFreeApp',
       backgroundImage:'images/snappapp.jpg',
    });
    
    var snappappLogo = Titanium.UI.createImageView({
        image:'images/snapapplogo.png',
        top:'0dp',
        left:'0dp'
    });
    
    main.add(snappappLogo);
    
    var topRight = Titanium.UI.createImageView({
        image:'images/topRightLogo2.png',
        top:0,
        right:0
    });
    //main.add(topRight);
    
    var bottomLeft = Titanium.UI.createImageView({
        image:'images/catalyst.png',
        bottom:0,
        right:0
    });
    main.add(bottomLeft);

    var authView = Titanium.UI.createView({
        //top:'30%',
        height : '400dp',
        backgroundColor:'#eee',
        width:'500dp'
    });
    
    authView.authControl = Titanium.UI.createView({
        width:'500dp',
        layout:'horizontal',
        height:'60dp',
        top:0
    });
    
    authView.Login = Titanium.UI.createButton({
       width:'250dp',
       height:'60dp',
       backgroundColor:'#1fabe2',
       
    });
    loginLabel = Titanium.UI.createLabel({
       text:'Login',
       font : customFontButton
    });
    authView.Login.add(loginLabel);
    
    authView.Register = Titanium.UI.createButton({
       width:'250dp',
       height:'60dp',
       backgroundColor:'#97ca52',

    });
    registerLabel = Titanium.UI.createLabel({
       text:'Register',
       font : customFontButton
    });
    authView.Register.add(registerLabel);
    
    authView.authControl.add(authView.Login);
    authView.authControl.add(authView.Register);
    authView.add(authView.authControl);
    
    authView.Login.addEventListener('click', function(e){
        if(loginToggle==false){
            registerToggle=false;
            registerView.hide();
            loginToggle=true;
            loginView.show();
        }
    });
    
    authView.Register.addEventListener('click', function(e){
        if(registerToggle==false){
            registerToggle=true;
            registerView.show();
            loginToggle=false;
            loginView.hide();
        }
    });
    
    var loginView = Titanium.UI.createView({
        title : 'New Account',
        height : '340dp',
        top:'59dp',
        navBarHidden: true,
        tabBarHidden:true,
        backgroundColor:'#1fabe2'
    });
    
    loginView.UserBack = Titanium.UI.createImageView({
        image:'images/emailField@2x.png',
        top : '80dp',
        height : '39dp',
        width : '300dp',
    });

    loginView.Username = Titanium.UI.createTextField({
        color : '#336699',
        top : '80dp',
        height : '39dp',
        width : '240dp',
        hintText : 'email',
        borderStyle:'rounded',
        right: '105dp',
        font : customFont
    });
    
    loginView.PassBack = Titanium.UI.createImageView({
        image:'images/password@2x.png',
        top : '130dp',
        height : '39dp',
        width : '300dp',
    });

    loginView.Pass = Titanium.UI.createTextField({
        color : '#336699',
        top : '130dp',
        height : '39dp',
        width : '240dp',
        hintText : 'password',
        borderStyle:'rounded',
        right: '105dp',
        passwordMask : true,
        font : customFont
    });
    
    loginView.Login = Titanium.UI.createButton({
       top:'260dp',
       width:'250dp',
       height:'60dp',
       backgroundColor:'#1780bd',
    });
    loginLabel2 = Titanium.UI.createLabel({
       text:'Login',
       font : customFontButton
    });
    loginView.Login.add(loginLabel2);
    
    loginView.add(loginView.UserBack);
    loginView.add(loginView.Username);
    loginView.add(loginView.PassBack);
    loginView.add(loginView.Pass);
    loginView.add(loginView.Login);
    
    loginView.Login.addEventListener('click', function(e){
        LoadAppbuilder();
        //Login(loginView.Username.value,loginView.Pass.value);
    });
    
    loginView.Username.addEventListener('change', function(e) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
     
        if(reg.test(e.value) === false) {
            loginView.Username._valid_flag = false;
            loginView.Username.borderColor = 'red';
        } else {
            loginView.Username._valid_flag = true;
            loginView.Username.borderColor = 'white';
        }
    });
    
    loginView.Pass.addEventListener('change', function(e) {
       if(e.value.length<6){
            loginView.Pass._valid_flag = false;
            loginView.Pass.borderColor = 'red';
        } else {
            loginView.Pass._valid_flag = true;
            loginView.Pass.borderColor = 'white';
        }
    });
    
    var registerView = Titanium.UI.createView({
        title : 'New Account',
        height : '340dp',
        top:'59dp',
        navBarHidden: true,
        tabBarHidden:true,
        backgroundColor:'#97ca52'
    });

    registerView.UserBack = Titanium.UI.createImageView({
        image:'images/emailField@2x.png',
        top : '30dp',
        height : '39dp',
        width : '300dp',
    });

    registerView.Username = Titanium.UI.createTextField({
        color : '#336699',
        top : '30dp',
        height : '39dp',
        width : '240dp',
        hintText : 'email',
        borderStyle:'rounded',
        right: '105dp',
        font : customFont
    });
    
    registerView.PassBack = Titanium.UI.createImageView({
        image:'images/password@2x.png',
        top : '80dp',
        height : '39dp',
        width : '300dp',
    });

    registerView.Pass = Titanium.UI.createTextField({
        color : '#336699',
        top : '80dp',
        height : '39dp',
        width : '240dp',
        borderStyle:'rounded',
        hintText:'password',
        passwordMask : true,
        right: '105dp',
        font : customFont
    });
    
    registerView.PassBackAgain = Titanium.UI.createImageView({
        image:'images/password@2x.png',
        top : '130dp',
        height : '39dp',
        width : '300dp',
    });

    registerView.PasswordAgain = Titanium.UI.createTextField({
        color : '#336699',
        top : '130dp',
        height : '39dp',
        width : '240dp',
        borderStyle:'rounded',
        hintText : 'repeat pasword',
        passwordMask : true,
        right: '105dp',
        font : customFont
    });
    
    registerView.PromoBack = Titanium.UI.createImageView({
        image:'images/password@2x.png',
        top : '180dp',
        height : '39dp',
        width : '300dp',
    });
    
    registerView.PromoCode = Titanium.UI.createTextField({
        color : '#336699',
        top : '180dp',
        height : '39dp',
        width : '240dp',   
        right: '105dp',
        hintText : 'PromoCode',
        borderStyle:'rounded',
        font : customFont
    });
    
    registerView.Register = Titanium.UI.createButton({
       top:'260dp',
       width:'250dp',
       height:'60dp',
       backgroundColor:'#6f9e3c',
    });
    registerLabel2 = Titanium.UI.createLabel({
       text:'Register',
       font : customFontButton
    });
    registerView.Register.add(registerLabel2);
    

    registerView.Username.addEventListener('change', function(e) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
     
        if(reg.test(e.value) === false) {
            registerView.Username._valid_flag = false;
            registerView.Username.borderColor = 'red';
        } else {
            registerView.Username._valid_flag = true;
            registerView.Username.borderColor = 'white';
        }
    });
    
    registerView.Pass.addEventListener('change', function(e) {
       if(e.value.length<6){
            registerView.Pass._valid_flag = false;
            registerView.Pass.borderColor = 'red';
        } else {
            registerView.Pass._valid_flag = true;
            registerView.Pass.borderColor = 'white';
        }
    });
    
    registerView.PasswordAgain.addEventListener('change', function(e) {
       if(e.value.length!=6){
            registerView.PasswordAgain._valid_flag = false;
            registerView.PasswordAgain.borderColor = 'red';
        } else {
            registerView.PasswordAgain._valid_flag = true;
            registerView.PasswordAgain.borderColor = 'white';
        }
    });
    
    registerView.PromoCode.addEventListener('change', function(e) {
       if(e.value.length<6){
            registerView.PromoCode._valid_flag = false;
            registerView.PromoCode.borderColor = 'red';
        } else {
            registerView.PromoCode._valid_flag = true;
            registerView.PromoCode.borderColor = 'white';
        }
    });
    
    errorLabel = Titanium.UI.createLabel({
       text: ''
    });
    
    registerView.add(registerView.UserBack);
    registerView.add(registerView.Username);
    registerView.add(registerView.PassBack);
    registerView.add(registerView.Pass);
    registerView.add(registerView.PassBackAgain);
    registerView.add(registerView.PasswordAgain);
    registerView.add(registerView.PromoBack);
    registerView.add(registerView.PromoCode);
    registerView.add(registerView.Register);
    registerView.add(errorLabel);

    registerView.Register.addEventListener('click', function(e){
        errorLabel.text = validateData();
        regParams = {
            'data[AppUser][email]': registerView.Username.value,
            'data[AppUser][password]':registerView.Pass.value,
            'data[AppUser][promocode]':registerView.PromoCode.value
        };
        Register(regParams);
        //AppUser
    });
    
    function validateData() {
        var errors = '';
        if (!(registerView.Username.value)) {
            errors += '\n Please enter valid Email';
        }  else if (!(registerView.Pass.value)) {
            errors += '\n Please enter valid Password';
        } else if (!(registerView.PasswordAgain.value)) {
            errors += '\n Please enter valid \Password again';
        } else if ((registerView.Pass.value) != (registerView.PasswordAgain.value)) {
            errors += '\n Your Passwords do not match';
        }
        return errors.replace(/\n/, '');
    }
    
    function Login(_email,_pass){
    	//var encoded = Ti.Network.encodeURIComponent('encode this & that');
    	var email = Ti.Network.encodeURIComponent(_email);
    	var pass = Ti.Network.encodeURIComponent(_pass);
    	
        var url = "http://104.131.33.138:3000/api/appdata?filter=%7B%20%22where%22%20%3A%20%7B%20%22email%22%20%3A%20%22" + email +"%22%2C%20%22fbfeed%22%3A%22" + pass + "%22%20%7D%20%7D";
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
				if(_email=='cat1@example.com'){
					Ti.App.Properties.setInt('appToLoad', 7);
					LoadAppbuilder();
				}else if(_email=='cat2@example.com'){
					Ti.App.Properties.setInt('appToLoad', 8);
					LoadAppbuilder();
				}else if(_email=='cat3@example.com'){
					Ti.App.Properties.setInt('appToLoad', 9);
					LoadAppbuilder();
				}
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
             },
             timeout : 5000  // in milliseconds
        });
        client.open("GET", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send();
    }
    
    function Register(params){
        var url = "http://104.131.33.138:3000/api/appdata";
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
        client.open("POST", url);
        // Send the request.
        client.send(params);
    }

    function LoadAppbuilder(){
        var BuildWindow = require('ui/tabs/main/builderWindow');
        var buildWin = new BuildWindow(L('Build'));
        buildWin.open();
    }
    
    main.add(authView);
    authView.add(loginView);
    authView.add(registerView);
    registerView.hide();
    return main;
}
module.exports = LoginWindow;