    var scrollView = Titanium.UI.currentWindow;
    scrollView.width = '680px';
    scrollView.height = '900px';
    var data = scrollView.pageData;
    var pageName = data.pagePosition;
    var pageData = Ti.App.Properties.getObject(pageName,{});
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#fff'};
    var customFont1 = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#555'};
    var formFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'16dp',color:'#000'};
    
    pageHeader = Titanium.UI.createView({
        height:'60dp',
        width:'100%',
        backgroundColor:'#333'
    });
    pageHeaderTitle = Titanium.UI.createLabel({
        text:'Edit Page: ' + data.pageType,
        font: customFont
    });
    pageHeader.add(pageHeaderTitle);
    
    pageIconView = Titanium.UI.createView({
        height:'110dp',
        left:'10dp',
        right:'10dp',
        width:'60dp'
    });
    pageIconLabel = Titanium.UI.createLabel({
       text:'Icon',
       font:customFont1,
       top:'0dp',
       left:'0dp'
    });
    pageIcon = Titanium.UI.createImageView({
    	top:'35dp',
        width : '60dp',
        height : '60dp',
        image: pageData.pageIcon,
        left:'0dp'
    });
    pageIconEdit = Titanium.UI.createImageView({
    	image:'images/build/editIcon.png',
    	top:'75dp',
    	right:'0dp'
    });
    pageIconView.add(pageIconLabel);
    pageIconView.add(pageIcon);
    pageIconView.add(pageIconEdit);
    pageIcon.addEventListener('click', showIcons);
    pageIconEdit.addEventListener('click', showIcons);
    
    pageTitleView = Titanium.UI.createView({
        height:'110dp',
        layout:'vertical',
        left:'20dp',
    });
    pageTitleLabel = Titanium.UI.createLabel({
       text:'Title',
       font:customFont1,
       top:'0dp',
       left:'0dp'
    });
    pageTitle = Titanium.UI.createTextField({
        font:formFont,
        width : '95%',
        left:'0dp',
        right:'10dp',
        height : '40dp',
        hintText : 'Page Name',
        value: pageData.pageTitle || '',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#fff'
    });    
    pageTitleView.add(pageTitleLabel);
    pageTitleView.add(pageTitle);
    
    pageConstants = Titanium.UI.createView({
        layout:'horizontal',
        height:'auto',
        width:'100%'
    });
    pageConstants.add(pageIconView);
    pageConstants.add(pageTitleView);
    
    pageFieldLabel = Titanium.UI.createLabel({
       text:'Field Title',
       font:customFont1,
       top:'10dp',
       left:'3%'
    });
    pageField = Titanium.UI.createTextField({
        color : '#336699',
        width : '94%',
        height : '40dp',
        hintText : 'Field Title',
        value:pageData.pageField || '',
        borderColor:'#111',
        borderWidth:1
    });
    pageFieldLabel1 = Titanium.UI.createLabel({
       text:'Field Title',
       font:customFont1,
       top:'10dp',
       left:'3%'
    });
    pageField1 = Titanium.UI.createTextField({
        color : '#336699',
        width : '94%',
        height : '40dp',
        hintText : 'Field Title',
        value:pageData.pageField1 || '',
        borderColor:'#111',
        borderWidth:1
    });
    pageFieldLabel2 = Titanium.UI.createLabel({
       text:'Field Title',
       font:customFont1,
       top:'10dp',
       left:'3%'
    });
    pageField2 = Titanium.UI.createTextField({
        color : '#336699',
        width : '94%',
        height : '40dp',
        hintText : 'Field Title',
        value:pageData.pageField2 || '',
        borderColor:'#111',
        borderWidth:1
    });
    buttonBar = Titanium.UI.createView({
        top:'20dp',
        bottom:'0dp',
        width:'100%',
        height:'60dp',
        backgroundColor:'#333'
    });
    
    saveButton = Ti.UI.createButton({
       width:'40%',
       left:'0dp',
       height:'60dp',
       backgroundColor:'transparent'
    });
    saveButtonLabel = Titanium.UI.createLabel({
       text: 'Save',
       font:customFont,
       color:'#97ca52',
       left:'60dp'
    });
    saveButton.add(saveButtonLabel);
    savePageIcon = Titanium.UI.createImageView({
        image:'images/build/save.png',
        left:'17.5dp',
    });
    saveButton.add(savePageIcon);
    
    cancelButton = Ti.UI.createButton({
       width:'40%',
       height:'60dp',
       right:'0dp',
       backgroundColor:'transparent'
    });
    cancelButtonLabel = Titanium.UI.createLabel({
       text: 'Cancel',
       font:customFont,
       color:'#e9292a',
       right:'60dp'
    });
    cancelPageIcon = Titanium.UI.createImageView({
        image:'images/build/cancel.png',
        right:'17.5dp'
    });
    cancelButton.add(cancelButtonLabel);
    cancelButton.add(cancelPageIcon);
    
    buttonBar.add(saveButton);
    buttonBar.add(cancelButton);
    
    saveButton.addEventListener('click', function()
    {
        pageData = {
            pageIcon:pageIcon.image,
            pageTitle:pageTitle.value,
            pageType:data.pageType,
            pagePosition:data.pagePosition,
            pageField:pageField.value,
            pageField1:pageField1.value,
            pageField2:pageField2.value,
            pageIndex:data.pageIndex
        };
        var appData = Ti.App.Properties.getObject('pageIndex',[]);
        appData[pageData.pageIndex] = pageData;
        Ti.App.Properties.setObject('pageIndex',appData);
        Ti.App.Properties.setObject(pageName,pageData);
        scrollView.close();
        Ti.App.fireEvent('updatePage', pageData);
    });
    cancelButton.addEventListener('click', function(){
        scrollView.close(); 
    });
    Ti.App.addEventListener('changeIcon', function(data) {
        pageIcon.image = data.image;
    });
	function showIcons(e){
        var allIcons = Ti.UI.createWindow({
                url:'/ui/tabs/buildWindow/iconSelect.js',
                height:'610dp',
                width:'745dp',
                backgroundColor:'transparent',
                fullscreen:false,
                pageData:data,
                modal:true,
            });
        allIcons.open();
    }
    
    formwebView = Titanium.UI.createWebView({
        url:'/ui/form/index.html',
        width:'675px',
        height:'650px'
    });
    
    scrollView.add(pageHeader);
    scrollView.add(pageConstants);
    scrollView.add(formwebView);
    /*scrollView.add(pageFieldLabel);
    scrollView.add(pageField);
    scrollView.add(pageFieldLabel1);
    scrollView.add(pageField1);
    scrollView.add(pageFieldLabel2);
    scrollView.add(pageField2);*/
    scrollView.add(buttonBar);
