    var scrollView = Titanium.UI.currentWindow;
    scrollView.width = '570dp';
    var data = scrollView.pageData;
    var pageName = data.pagePosition;
    var pageData = Ti.App.Properties.getObject(pageName, {});
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
        fontSize : '16dp',
        color : '#000'
    };
    
    pageHeader = Titanium.UI.createView({
        height : '60dp',
        width : '100%',
        backgroundColor : '#333'
    });
    pageHeaderTitle = Titanium.UI.createLabel({
        text : 'Edit Page: ' + data.pageType,
        font : customFont
    });
    pageHeader.add(pageHeaderTitle);
    var webview = Ti.UI.createWebView({
        url : 'html/filechooser.html',
        height : '0dp'
    });
    scrollView.add(webview);
    
    pageIconView = Titanium.UI.createView({
        height : '110dp',
        left : '10dp',
        right : '10dp',
        width : '60dp'
    });
    pageIconLabel = Titanium.UI.createLabel({
        text : 'Icon',
        font : customFont1,
        top : '0dp',
        left : '0dp'
    });
    pageIcon = Titanium.UI.createImageView({
        top : '35dp',
        width : '60dp',
        height : '60dp',
        image : pageData.pageIcon,
        left : '0dp'
    });
    pageIconEdit = Titanium.UI.createImageView({
        image : 'images/build/editIcon.png',
        top : '75dp',
        right : '0dp'
    });
    pageIconView.add(pageIconLabel);
    pageIconView.add(pageIcon);
    pageIconView.add(pageIconEdit);
    pageIcon.addEventListener('click', showIcons);
    pageIconEdit.addEventListener('click', showIcons);
    
    pageTitleView = Titanium.UI.createView({
        height : '110dp',
        layout : 'vertical',
        left : '20dp',
    });
    pageTitleLabel = Titanium.UI.createLabel({
        text : 'Title',
        font : customFont1,
        top : '0dp',
        left : '0dp'
    });
    pageTitle = Titanium.UI.createTextField({
        font : formFont,
        width : '95%',
        left : '0dp',
        right : '10dp',
        height : '40dp',
        hintText : ' Page Name',
        value : pageData.pageTitle || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });
    pageTitleView.add(pageTitleLabel);
    pageTitleView.add(pageTitle);
    
    pageConstants = Titanium.UI.createView({
        layout : 'horizontal',
        height : 'auto',
        width : '100%'
    });
    pageConstants.add(pageIconView);
    pageConstants.add(pageTitleView);
    
    pageImage = Titanium.UI.createImageView({
        image : 'images/build/w_placeholder.png',
        width : '535.5dp',
        top : '4dp'
    });
    
    Ti.App.addEventListener('app:fromWebView', function(e) {
        pageImage.image = e.message;
    });
    
    pageImage.addEventListener('click', function(e) {
        Ti.App.fireEvent('app:fromTitanium', {
            callback : function(imageurl) {
                pageImage.image = imageurl;
            }
        });
    });
    
    pageFieldLabel = Titanium.UI.createLabel({
        text : 'Description',
        font : customFont1,
        top : '6dp',
        left : '3%'
    });
    pageField = Titanium.UI.createTextArea({
        font : formFont,
        width : '94%',
        height : '120dp',
        hintText : 'Description',
        value : pageData.pageField || ' Enter brief description here',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });
    
    pageFieldLabel1 = Titanium.UI.createLabel({
        text : 'Hours',
        font : customFont1,
        top : '6dp',
        left : '3%'
    });
    hoursView = Titanium.UI.createView({
        width : '100%',
        height : 'auto',
        layout : 'horizontal',
        left : '3%'
    });

    
    var startDay = Ti.UI.createPicker({
        width : '45%',
        height : '120dp',
    
    });
    var openTime = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var closeTime = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    
    var column1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : openTime[i],
            font : formFont
        });
        column1.addRow(row);
    }
    
    var column2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : closeTime[i],
            font : formFont
        });
        column2.addRow(row);
    }
    
    startDay.add([column1, column2]);
    
    fieldDivider1 = Titanium.UI.createLabel({
        text : '-',
        left : '10dp',
        right : '10dp',
        font : formFont,
    });
    
    startTime = Ti.UI.createPicker({
        width : '20%',
        height : '120dp',
    
    });
    var _openTime = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'];
    var _closeTime = ['AM', 'PM'];
    
    var _column1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _openTime[i],
            font : formFont
        });
        _column1.addRow(row);
    }
    
    var _column2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _closeTime[i],
            font : formFont
        });
        _column2.addRow(row);
    }
    
    startTime.add([_column1, _column2]);
    fieldDivider2 = Titanium.UI.createLabel({
        text : '-',
        left : '10dp',
        right : '10dp',
        font : formFont,
    });
    endTimeTop = Ti.UI.createPicker({
        width : '20%',
        height : '120dp',
    
    });
    
    var $column1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _openTime[i],
            font : formFont
        });
        $column1.addRow(row);
    }
    
    var $column2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _closeTime[i],
            font : formFont
        });
        $column2.addRow(row);
    }
    
    endTimeTop.add([$column1, $column2]);
    
    endDay = Ti.UI.createPicker({
        width : '45%',
        height : '120dp',
    
    });
    var openTime = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var closeTime = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    var column_1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : openTime[i],
            font : formFont
        });
        column_1.addRow(row);
    }
    
    var column_2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : closeTime[i],
            font : formFont
        });
        column_2.addRow(row);
    }
    
    endDay.add([column_1, column_2]);
    
    fieldDivider3 = Titanium.UI.createLabel({
        text : '-',
        left : '10dp',
        right : '10dp',
        font : formFont,
    });
    
    endTime = Ti.UI.createPicker({
        width : '20%',
        height : '120dp',
    
    });
    var _openTime = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'];
    var _closeTime = ['AM', 'PM'];
    
    var _$column1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _openTime[i],
            font : formFont
        });
        _$column1.addRow(row);
    }
    
    var _$column2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _closeTime[i],
            font : formFont
        });
        _$column2.addRow(row);
    }
    
    endTime.add([_$column1, _$column2]);
    
    fieldDivider4 = Titanium.UI.createLabel({
        text : '-',
        left : '10dp',
        right : '10dp',
        font : formFont,
    });
    endTimeBottom = Ti.UI.createPicker({
        width : '20%',
        height : '120dp',
    
    });
    var _openTime = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'];
    var _closeTime = ['AM', 'PM'];
    
    var _$_column1 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _openTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _openTime[i],
            font : formFont
        });
        _$_column1.addRow(row);
    }
    
    var _$_column2 = Ti.UI.createPickerColumn();
    
    for (var i = 0; i < _closeTime.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : _closeTime[i],
            font : formFont
        });
        _$_column2.addRow(row);
    }
    var horizontalDivide = Ti.UI.createView({
        width:'80%',
        height:'5dp'
    });
    
    endTimeBottom.add([_$_column1, _$_column2]);
    hoursView.add(startDay);
    hoursView.add(fieldDivider1);
    hoursView.add(startTime);
    hoursView.add(fieldDivider2);
    hoursView.add(endTimeTop);
    hoursView.add(horizontalDivide);
    hoursView.add(endDay);
    hoursView.add(fieldDivider3);
    hoursView.add(endTime);
    hoursView.add(fieldDivider4);
    hoursView.add(endTimeBottom);
    
    phoneField = Titanium.UI.createView({
        layout : 'horizontal',
        top : '5dp',
        height : '40dp'
    });
    
    pageFieldLabel2 = Titanium.UI.createLabel({
        text : 'Phone',
        font : customFont1,
        left : '3%'
    });
    phoneNumber = Titanium.UI.createTextField({
        font : formFont,
        width : '78%',
        left : '5dp',
        height : '40dp',
        hintText : '',
        value : pageData.phoneNumber || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });
    
    phoneField.add(pageFieldLabel2);
    phoneField.add(phoneNumber);
    
    emailField = Titanium.UI.createView({
        layout : 'horizontal',
        top : '5dp',
        height : '40dp'
    });
    
    pageFieldLabel3 = Titanium.UI.createLabel({
        text : 'Email ',
        font : customFont1,
        left : '3%'
    });
    emailAdd = Titanium.UI.createTextField({
        font : formFont,
        width : '78%',
        left : '10dp',
        height : '40dp',
        hintText : '',
        value : pageData.emailAdd || '',
        borderColor : '#fff',
        borderWidth : 1,
        borderRadius : 4,
        backgroundColor : '#fff'
    });
    
    emailField.add(pageFieldLabel3);
    emailField.add(emailAdd);
    
    buttonBar = Titanium.UI.createView({
        top : '10dp',
        bottom : '0dp',
        width : '100%',
        height : '60dp',
        backgroundColor : '#333'
    });
    
    saveButton = Ti.UI.createButton({
        width : '40%',
        left : '0dp',
        height : '60dp',
        backgroundColor : 'transparent'
    });
    saveButtonLabel = Titanium.UI.createLabel({
        text : 'Save',
        font : customFont,
        color : '#97ca52',
        left : '60dp'
    });
    saveButton.add(saveButtonLabel);
    savePageIcon = Titanium.UI.createImageView({
        image : 'images/build/save.png',
        left : '17.5dp',
    });
    saveButton.add(savePageIcon);
    
    cancelButton = Ti.UI.createButton({
        width : '40%',
        height : '60dp',
        right : '0dp',
        backgroundColor : 'transparent'
    });
    cancelButtonLabel = Titanium.UI.createLabel({
        text : 'Cancel',
        font : customFont,
        color : '#e9292a',
        right : '60dp'
    });
    cancelPageIcon = Titanium.UI.createImageView({
        image : 'images/build/cancel.png',
        right : '17.5dp'
    });
    cancelButton.add(cancelButtonLabel);
    cancelButton.add(cancelPageIcon);
    
    buttonBar.add(saveButton);
    buttonBar.add(cancelButton);
    
    saveButton.addEventListener('click', function() {
        pageData = {
            pageIcon : pageIcon.image,
            pageTitle : pageTitle.value,
            pageType : data.pageType,
            pagePosition : data.pagePosition,
            pageField : pageField.value,
            startDay : startDay.value,
            startTime : startTime.value,
            endTimeTop : endTimeTop.value,
            endDay : endDay.value,
            endTime : endTime.value,
            phoneNumber : phoneNumber.value,
            emailAdd : emailAdd.value,
            pageIndex : data.pageIndex,
            pageImage : pageImage.image,
        };
        var appData = Ti.App.Properties.getObject('pageIndex', []);
        appData[pageData.pageIndex] = pageData;
        Ti.App.Properties.setObject('pageIndex', appData);
        Ti.App.Properties.setObject(pageName, pageData);
        scrollView.close();
        Ti.App.fireEvent('updatePage', pageData);
    });
    cancelButton.addEventListener('click', function() {
        scrollView.close();
    });
    Ti.App.addEventListener('changeIcon', function(data) {
        pageIcon.image = data.image;
    });
    function showIcons(e) {
        var allIcons = Ti.UI.createWindow({
            url : '/ui/tabs/buildWindow/iconSelect.js',
            height : '710dp',
            width : '745dp',
            backgroundColor : 'transparent',
            fullscreen : false,
            pageData : data,
            modal : true,
        });
        allIcons.open();
    }
    
    scrollView.add(pageHeader);
    scrollView.add(pageConstants);
    scrollView.add(pageImage);
    scrollView.add(pageFieldLabel);
    scrollView.add(pageField);
    scrollView.add(pageFieldLabel1);
    scrollView.add(hoursView);
    scrollView.add(buttonBar);
