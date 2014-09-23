    var scrollView = Titanium.UI.currentWindow;
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
        hintText : ' Page Name',
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
       text:'Description',
       font:customFont1,
       top:'10dp',
       left:'3%'
    });
    pageField = Titanium.UI.createTextArea({
        font:formFont,
        width : '94%',
        height : '120dp',
        hintText : 'Description',
        value:pageData.pageField || ' Enter brief description here',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#fff'
    });
    
    pageFieldLabel1 = Titanium.UI.createLabel({
       text:'Hours',
       font:customFont1,
       top:'10dp',
       left:'3%'
    });
    hoursView = Titanium.UI.createView({
        width:'100%',
        height:'auto',
        layout:'horizontal',
        left:'12dp'
    });
    pageField1a = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : 'Monday',
        value:pageData.pageField1a || '',
        borderColor:'#fff',
        borderWidth:1,
        textAlign:'center',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    fieldDivider1 = Titanium.UI.createLabel({
        text:'-',
        left:'5dp',
        font:formFont,
    });
    pageField1b = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : 'Friday',
        value:pageData.pageField1b || '',
        borderColor:'#fff',
        borderWidth:1,
        left:'5dp',
        textAlign:'center',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    pageField1c = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : '9:00AM',
        value:pageData.pageField1c || '',
        borderColor:'#fff',
        borderWidth:1,
        left:'25dp',
        textAlign:'center',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    fieldDivider2 = Titanium.UI.createLabel({
         text:'-',
        left:'5dp',
        font:formFont,
    });
    pageField1d = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : '5:00PM',
        value:pageData.pageField1d || '',
        borderColor:'#fff',
        borderWidth:1,
        left:'5dp',
        textAlign:'center',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    pageField1e = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : 'Saturday',
        value:pageData.pageField1e || '',
        borderColor:'#fff',
        borderWidth:1,
        textAlign:'center',
        top:'5dp',
        bottom:'5dp',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    fieldDivider3 = Titanium.UI.createLabel({
         text:'-',
        left:'5dp',
        font:formFont,
    });
    pageField1f = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : 'Saturday',
        value:pageData.pageField1f || '',
        borderColor:'#fff',
        borderWidth:1,
        left:'5dp',
        textAlign:'center',
        top:'5dp',
        bottom:'5dp',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    pageField1g = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : '9:00AM',
        value:pageData.pageField1g || '',
        borderColor:'#fff',
        borderWidth:1,
        left:'25dp',
        textAlign:'center',
        top:'5dp',
        bottom:'5dp',
        borderRadius:4,
        backgroundColor:'#fff'
    });
    fieldDivider4 = Titanium.UI.createLabel({
         text:'-',
        left:'5dp',
        font:formFont,
    });
    pageField1h = Titanium.UI.createTextField({
        font:formFont,
        width : '20%',
        height : '40dp',
        hintText : '6:00PM',
        value:pageData.pageField1h || '',
        left:'5dp',
        textAlign:'center',
        top:'5dp',
        bottom:'5dp',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#fff'
    });
    hoursView.add(pageField1a);
    hoursView.add(fieldDivider1);
    hoursView.add(pageField1b);
    hoursView.add(pageField1c);
    hoursView.add(fieldDivider2);
    hoursView.add(pageField1d);
    hoursView.add(pageField1e);
    hoursView.add(fieldDivider3);
    hoursView.add(pageField1f);
    hoursView.add(pageField1g);
    hoursView.add(fieldDivider4);
    hoursView.add(pageField1h);
    
    phoneField = Titanium.UI.createView({
        layout:'horizontal',
        top:'5dp',
        height:'40dp'
    });
    
    pageFieldLabel2 = Titanium.UI.createLabel({
       text:'Phone',
       font:customFont1,
       left:'3%'
    });
    pageField2 = Titanium.UI.createTextField({
        font:formFont,
        width : '78%',
        left:'5dp',
        height : '40dp',
        hintText : '',
        value:pageData.pageField2 || '',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#fff'
    });
    
    phoneField.add(pageFieldLabel2);
    phoneField.add(pageField2);
    
    emailField = Titanium.UI.createView({
        layout:'horizontal',
        top:'5dp',
        height:'40dp'
    });
    
    
    pageFieldLabel3 = Titanium.UI.createLabel({
       text:'Email ',
       font:customFont1,
       left:'3%'
    });
    pageField3 = Titanium.UI.createTextField({
        font:formFont,
        width : '78%',
        left:'10dp',
        height : '40dp',
        hintText : '',
        value:pageData.pageField3 || '',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#fff'
    });
    
    emailField.add(pageFieldLabel3);
    emailField.add(pageField3);
    
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
            pageField1a:pageField1a.value,
            pageField1b:pageField1b.value,
            pageField1c:pageField1c.value,
            pageField1d:pageField1d.value,
            pageField1e:pageField1e.value,
            pageField1f:pageField1f.value,
            pageField1g:pageField1g.value,
            pageField2:pageField2.value,
            pageField3:pageField3.value,
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
                height:'710dp',
                width:'745dp',
                backgroundColor:'transparent',
                fullscreen:false,
                pageData:data,
                modal:true,
            });
        allIcons.open();
    }
    
    scrollView.add(pageHeader);
    scrollView.add(pageConstants);
    scrollView.add(pageFieldLabel);
    scrollView.add(pageField);
    scrollView.add(pageFieldLabel1);
    scrollView.add(hoursView);
    scrollView.add(phoneField);
    scrollView.add(emailField);
    scrollView.add(buttonBar);
