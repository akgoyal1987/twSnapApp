
(function() {
    Ti.App.Properties.setList('pages', []);
    Ti.App.Properties.setObject('pageIndex',[]);
    var LoginWindow = require('ui/tabs/login');
    var LoginWin = new LoginWindow(L('Login'));
    LoginWin.open();
})();
