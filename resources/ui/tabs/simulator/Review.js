var win = Titanium.UI.currentWindow;
var pageName = win.pageData;
var pageData = Ti.App.Properties.getObject(pageName);

var customFont = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '26dp',
    color : '#fff'
};
var customFont1 = {
    fontFamily : 'CoconOT-LightCond',
    fontSize : '26dp',
    color : '#555'
};
var formFont = {
    fontFamily : 'HelveticaNeue-Thin',
    fontSize : '20dp',
    color : '#000'
};

var header = Titanium.UI.createView({
    width : '100%',
    height : '60dp',
    backgroundColor : '#999',
    top : '0dp'
});

win.add(header);

var pageTitle = Titanium.UI.createLabel({
    text : pageData.pageTitle,
    font : formFont
});

header.add(pageTitle);
var yelpURL = 'http://m.yelp.com/biz/' + pageData.pageField;
var cityURL = 'http://m.citysearch.com/profile/' + pageData.pageField,

scrollView = Titanium.UI.createWebView({
    width : '277dp',
    url : pageData.reviewer == 'yelp' ? yelpURL : cityURL,
    top : '60dp',
    height : '100%',
    backgroundColor : '#fff'
});

imageView = Titanium.UI.createImageView({
    image : 'images/dashboard/' + pageData.pageType + '.png',
    top : '15%'
});
notSupportedLabel = Titanium.UI.createLabel({
    text : pageData.pageType + '\n\nThis view is not supported in the simulator',
    font : formFont,
    width : '90%',
    textAlign : 'center'
});

scrollView.add(imageView);
scrollView.add(notSupportedLabel);

saveButton = Ti.UI.createImageView({
    image : '/images/simulator/backButton.png',
    left : '5dp',
    top : '15dp',
});

saveButton.addEventListener('click', function() {
    win._sim.remove(win);
});

win.add(scrollView);
win.add(saveButton);

saveButton.addEventListener('click', function() {
    win._sim.remove(win);
});

win.add(scrollView);
win.add(saveButton);
