
(function() {
	var accountData = Ti.App.Properties.getList('accountData');
	if(accountData == null || accountData.length == 0){
	    Ti.App.Properties.setList('pages', []);
	    Ti.App.Properties.setObject('pageIndex',[]);
	    var LoginWindow = require('ui/tabs/login');
	    var LoginWin = new LoginWindow(L('Login'));
	    LoginWin.open();
	}
	else{
		var BuildWindow = require('ui/tabs/main/builderWindow');
        var buildWin = new BuildWindow(L('Build'));
        buildWin.open();
	}
})();
