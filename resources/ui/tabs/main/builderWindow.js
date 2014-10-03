function BuildWindow(title) {
    var appBuilder = Ti.UI.createWindow({
        title:title,
        backgroundColor:'#fff',
        tabBarHidden:true,
        height:'100%',
        width:'100%'
    });

    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'28dp',color:'#fff'};
    var leftMenuFont = {fontFamily: 'CoconOT-LightCond',fontSize:'27dp',color:'#fff'};
    var simFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'24dp',color:'#000'};
    var simFontHeader = {fontFamily: 'HelveticaNeue-Thin',fontSize:'26dp',color:'#000'};
    var simFont1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'12dp',color:'#fff'};
    var simFont2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'17dp', color:'#000'};
    var pageHeader = {fontFamily: 'CoconOT-LightCond',fontSize:'24dp',color:'#000'};
    var pageLabel = {fontFamily: 'CoconOT-LightCond',fontSize:'20dp',color:'#000'};
    var myPagesFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp'};
    var fieldsFont={fontFamily:'HelveticaNeue-Thin', fontSize:'19dp', color:'#000'};
    var headerView = require('ui/tabs/main/header');
    var footerView = require('ui/tabs/main/footer');
    Ti.include('ui/tabs/styleWindow/color_picker.js');
    var myPagesData = [];
    var simulatorType = 'list';
    
    getAppData(2);
    
    function getAppData(params){
        //var url = "http://104.131.33.138:3000/api/appdata?filter={%22where%22:{%22id%22:"+ params + "}}";
        //var url = "http://127.0.0.1:3000/api/appdata/";
        var url = "http://104.131.33.138:3000/api/appdata/1";
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 var obj = JSON.parse(this.responseText);
                 Ti.App.Properties.setObject('AppInfo',{
                 	"fbfeed":obj.fbfeed,
                 	"twfeed":obj.twfeed,
                 	"phone":obj.phone,
                 	"email":obj.email,
                 	"id":obj.id      	
				 });
                 Ti.App.Properties.setObject('pageIndex',obj.about);
                 ///////////////////////////////////////////////
                 // Redirect here to Thank you / Welcome Page //
                 ///////////////////////////////////////////////
                 reloadMyPages();
        		 loadSimulator();
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 //alert('error');
             },
             timeout : 5000  // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
    }
    init();

    function init (){
        appBuilder.add(new headerView);
        appBuilder.add(new footerView);
        createContainer();
        createBuilderMenu();
        createBuildWindow();
        createStyleWindow();
        createSubmitWindow();
        createSimulatorView();
        reloadMyPages();
        loadSimulator();
    }
    
    function createContainer(){
        appBuilder.self = Ti.UI.createView({
            top:'50dp',
            title:title,
            backgroundColor:'transparent',
            layout:'horizontal',
            tabBarHidden:true,
            bottom:'50dp',
            width:'1140dp'
        });
        appBuilder.bottomLeft = Titanium.UI.createImageView({
            image:'images/bottomLeft3.png',
            bottom:'50dp',
            left:'0dp'
        });
        appBuilder.topRight = Titanium.UI.createImageView({
            image:'images/topRightLogo2.png',
            top:'50dp',
            right:'0dp'
        });
        appBuilder.bottomRight = Titanium.UI.createImageView({
            image:'images/snapColor.png',
            bottom:'50dp',
            right:'0dp'
        });
        
        appBuilder.centerLeft = Titanium.UI.createImageView({
            image:'images/snapIcon.png',
            left:'0dp'
        });
        
        appBuilder.add(appBuilder.bottomRight);
        appBuilder.add(appBuilder.centerLeft);
        
        appBuilder.leftChild = Ti.UI.createScrollView({
         //   top:'0dp',
            width: '685dp',
            height:'100%',
            
        });
        dividerChild = Ti.UI.createScrollView({
         //   top:'0dp',
            width: '60dp',
            height:'100%',
            
        });
        appBuilder.rightChild = Ti.UI.createScrollView({
            width: '390dp',
            height:'100%',
            layout:'horizontal'
        });
        appBuilder.self.add(appBuilder.leftChild);
        appBuilder.self.add(dividerChild);
        appBuilder.self.add(appBuilder.rightChild);
    }

    function createBuilderMenu(){
        appBuilderMenu = Titanium.UI.createView({
           top:'20dp',
           width:'100%',
           height:'63dp',
           layout:'horizontal',
           left:'0dp',
        });
        buildButton = Titanium.UI.createButton({
           width: '226dp',
           backgroundColor:'#97ca52',
           height:'58dp',
           borderColor:'#97ca52',
           borderWidth:3,
           borderRadius:8,
        });
        buildButtonImage = Titanium.UI.createLabel({
            text:'Build',
            font:customFont
        });
        buildButton.add(buildButtonImage);
        styleButton = Titanium.UI.createButton({
           left:'3.5dp',
           width: '226dp',
           backgroundColor:'#333',
           borderColor:'#1fabe2',
           height:'58dp',
           borderWidth:3,
           borderRadius:8,
        });
        styleButtonImage = Titanium.UI.createLabel({
            text:'Style',
            font:customFont
        });
        styleButton.add(styleButtonImage);
        submitButton = Titanium.UI.createButton({
          left:'3.5dp',
           width: '226dp',
           backgroundColor:'#333',
           borderColor:'#ffc22d',
           height:'58dp',
           borderWidth:3,
           borderRadius:8,
        });
        
        submitButtonImage = Titanium.UI.createLabel({
            text:'Submit',
            font:customFont
        });
        submitButton.add(submitButtonImage);
        appBuilderMenu.add(buildButton);
        appBuilderMenu.add(styleButton);
        appBuilderMenu.add(submitButton);
        buildButton.addEventListener('click', function(e){
             styleView.hide();
             styleButton.backgroundColor = '#333';
             submitView.hide();
             submitButton.backgroundColor = '#333';
             myPagesView.show();    
             buildButton.backgroundColor = '#97ca52';
        });
        
        styleButton.addEventListener('click', function(e){
            myPagesView.hide();
            buildButton.backgroundColor = '#333';
            submitView.hide();
            submitButton.backgroundColor = '#333';
            styleView.show();
            styleButton.backgroundColor = '#1fabe2';
        });
        
        submitButton.addEventListener('click', function(e){
            myPagesView.hide();
            buildButton.backgroundColor = '#333';
            submitView.show();
            submitButton.backgroundColor = '#ffc22d';
            styleView.hide();
            styleButton.backgroundColor = '#333';
        });
    }

    function createBuildWindow(){
        myPagesView = Ti.UI.createView({
           top:'100dp',
           width:'100%',
           height: '670dp',
           layout:'vertical',
           backgroundColor:'#eee',
           borderColor:'#333',
           borderWidth:2,
           borderRadius:8,
        });
        myPagesLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'0dp',
            left:'0dp',
            borderColor:'#333',
            borderWidth:2,
        });     
        myPagesImage= Titanium.UI.createLabel({
           text:'My Pages',
           font:customFont
        });
        myPagesLabel.add(myPagesImage);
        myPages = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           right:'0dp',
           height: 'auto',
           layout:'horizontal',
        });
        leftMenu = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           width:'30%',
           height: '620dp',
           layout:'vertical',
        });
        myPagesView.add(myPagesLabel);
        myPagesView.add(myPages);
        appBuilder.self.addContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        addContentText= Titanium.UI.createLabel({
           text:'Add',
           font:leftMenuFont,
           color:'#1fabe2',
           right:'60dp',
        });
        addContentIcon = Titanium.UI.createImageView({
            image:'images/build/add.png',
            right:'17.5dp',
        });
        appBuilder.self.addContentLabel.add(addContentText);
        appBuilder.self.addContentLabel.add(addContentIcon);
        appBuilder.self.deleteContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        deleteContentText= Titanium.UI.createLabel({
           text:'Delete',
           font:leftMenuFont,
           color:'#e9292a',
           right:'60dp',
        });
        deleteContentIcon = Titanium.UI.createImageView({
            image:'images/build/delete.png',
            right:'17.5dp',
        });
        appBuilder.self.deleteContentLabel.add(deleteContentText);
        appBuilder.self.deleteContentLabel.add(deleteContentIcon);
        appBuilder.self.sortContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        sortContentText= Titanium.UI.createLabel({
           text:'Sort',
           font:customFont,
           color:'#ffc22d',
           right:'60dp'
        });
        sortContentIcon = Titanium.UI.createImageView({
            image:'images/build/sort.png',
            right:'17.5dp',
        });
        appBuilder.self.sortContentLabel.add(sortContentIcon);
        appBuilder.self.sortContentLabel.add(sortContentText);
        appBuilder.self.saveContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        saveContentText= Titanium.UI.createLabel({
           text:'Save',
           font:customFont,
           color:'#97ca52',
           right:'60dp'
        });
        saveContentIcon = Titanium.UI.createImageView({
            image:'images/build/save.png',
            right:'17.5dp',
        });
        appBuilder.self.saveContentLabel.add(saveContentIcon);
        appBuilder.self.saveContentLabel.add(saveContentText);
        appBuilder.self.helpLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        helpText= Titanium.UI.createLabel({
           text:'Help',
           font:customFont,
           color:'#fff',
           right:'60dp'
        });
        helpIcon = Titanium.UI.createImageView({
            image:'images/build/help.png',
            right:'17.5dp',
        });
        appBuilder.self.helpLabel.add(helpIcon);
        appBuilder.self.helpLabel.add(helpText);
        appBuilder.self.hintLabel = Ti.UI.createButton({
            width: '100%',
            height:'300dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        hintText= Titanium.UI.createLabel({
           text:'',
           font:customFont,
           color:'#fff',
        });
        appBuilder.self.hintLabel.add(hintText);
        appBuilder.myPagesTable = Titanium.UI.createTableView({
            data:myPagesData,
            separatorColor:'transparent',
            backgroundColor:'transparent',
            height:'610dp',
            top:'0dp'
        });
        leftMenu.add(appBuilder.self.addContentLabel);
        leftMenu.add(appBuilder.self.deleteContentLabel);
        leftMenu.add(appBuilder.self.sortContentLabel);
        leftMenu.add(appBuilder.self.saveContentLabel);
        leftMenu.add(appBuilder.self.helpLabel);
        leftMenu.add(appBuilder.self.hintLabel);
        myPages.add(leftMenu);
        myPages.add(appBuilder.myPagesTable);
    }
    
    function createStyleWindow(){
        styleView = Ti.UI.createView({
           top:'100dp',
           width:'100%',
           height: '670dp',
           layout:'vertical',
           backgroundColor:'#eee',
           borderColor:'#333',
           borderWidth:2,
           borderRadius:8,
        });
    
        styleLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'0dp',
            left:'0dp'
        });
        
        styleImage= Titanium.UI.createLabel({
           text:'Style & Navigation',
           font:customFont,
           top:'10dp',
           bottom:'10dp',

        });
        styleLabel.add(styleImage);
                
        styles = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           right:'0dp',
           height: 'auto',
           layout:'horizontal',

        });
        
        leftMenu = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           width:'30%',
           height: '620dp',
           layout:'vertical',
        });
        
        rightMenu = Ti.UI.createView({
           top:'1dp',
           left:'1dp',
           right:'1dp',
           width:'69.8%',
           height: '620dp',
           layout:'vertical',
        });

        saveContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        saveContentText= Titanium.UI.createLabel({
           text:'Save',
           font:customFont,
           color:'#97ca52',
           right:'60dp'
        });
        saveContentIcon = Titanium.UI.createImageView({
            image:'images/build/save.png',
            right:'17.5dp',
        });
        saveContentLabel.add(saveContentIcon);
        saveContentLabel.add(saveContentText);
        helpLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        helpText= Titanium.UI.createLabel({
           text:'Help',
           font:customFont,
           color:'#fff',
           right:'60dp'
        });
        helpIcon = Titanium.UI.createImageView({
            image:'images/build/help.png',
            right:'17.5dp',
        });
        helpLabel.add(helpText);
        helpLabel.add(helpIcon);
        
        hintLabel = Ti.UI.createButton({
            width: '100%',
            height:'490dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        hintText= Titanium.UI.createLabel({
           text:'',
           font:customFont,
           color:'#ffc22d',
           
        });
        hintLabel.add(hintText);
        leftMenu.add(saveContentLabel);
        leftMenu.add(helpLabel);
        leftMenu.add(hintLabel);
        
        navViewLabel = Titanium.UI.createLabel({
           text:'Navigation Style',
           font: pageHeader,
           width:'auto',
           height:'auto',
           left:'10dp',
           top:'10dp',
           bototm:'10dp',
        });
        
        listView = Titanium.UI.createView({
           height:'250dp',
           width:'250dp',
           layout:'vertical'
        });
        listViewImage = Titanium.UI.createImageView({
           image:'images/navigation/list.png',
           
        });
        listViewTitle = Titanium.UI.createLabel({
           text:'List View',
           font:pageLabel,
        });
        listView.add(listViewImage);
        listView.add(listViewTitle);
        
        dashView = Titanium.UI.createView({
           height:'250dp',
           width:'250dp',
           layout:'vertical'
        });
        dashViewImage = Titanium.UI.createImageView({
           image:'images/navigation/dash.png',
        });
        dashViewTitle = Titanium.UI.createLabel({
           text:'Dashboard',
           font:pageLabel
        });
        dashView.add(dashViewImage);
        dashView.add(dashViewTitle);
        
        bottomTab = Titanium.UI.createView({
           height:'250dp',
           width:'250dp',
           layout:'vertical'
        });
        bottomTabImage = Titanium.UI.createImageView({
           image:'images/navigation/bottomTab.png',
           
        });
        bottomTabTitle = Titanium.UI.createLabel({
           text:'Tabbed - Bottom',
           font:pageLabel
        });
        bottomTab.add(bottomTabImage);
        bottomTab.add(bottomTabTitle);
        
        topTabImage = Titanium.UI.createImageView({
           image:'images/navigation/topTab.png',
           
        });
        topTab = Titanium.UI.createView({
           height:'250dp',
           width:'250dp',
           layout:'vertical'
        });
        topTabTitle = Titanium.UI.createLabel({
           text:'Tabbed - Top',
           font:pageLabel
        });
        topTab.add(topTabImage);
        topTab.add(topTabTitle);

        appBuilder.navigationView = Ti.UI.createScrollableView({
            top:'10dp',
            views:[listView, dashView, bottomTab, topTab],
            showPagingControl:true,
            height:'280dp',
            width:'100%',
            pagingControlTimeout:0
        });
        
        styles.add(leftMenu);
        styleView.add(styleLabel);
        styleView.add(styles);
        rightMenu.add(navViewLabel);
        rightMenu.add(appBuilder.navigationView);
      
        colorSchemeLabel = Titanium.UI.createLabel({
           text:'Color Scheme',
           font: pageHeader,
           width:'auto',
           height:'auto',
           left:'10dp',
           top:'10dp',
           bototm:'10dp',
        });
        
        colorSchemeView = Titanium.UI.createView({
            top:'10dp',
            left:'10dp',
            width:'100%',
            height:'180dp',
            layout:'vertical'
        });
        rightMenu.add(colorSchemeLabel);
        rightMenu.add(colorSchemeView);
        styles.add(rightMenu);
        headerStyleView = Titanium.UI.createView({
            top:'10dp',
            left:'0dp',
            width:'100%',
            height:'50dp',
            bottom:'10dp',
            layout:'horizontal'
        });
        fontColor = Ti.UI.createView({
            title:'Primary Font',
            width:'50dp',
            height:'50dp',
            backgroundColor:'#000',
            borderColor:'#333',
            borderWidth:1,
            borderRadius:4,
        });
        var headerFont = Titanium.UI.createLabel({
            text:'Header Label',
            font:pageLabel,
            left:'5dp',
            right:'10dp',
            width:'30%'
        });
        font2Color = Ti.UI.createView({
            title:'Secondary Font', 
            width:'50dp',
            height:'50dp',
            backgroundColor:'#666',
            borderColor:'#333',
            borderWidth:1,
            borderRadius:4,
            left:'5dp'
        });
        
        var headerBack = Titanium.UI.createLabel({
            text:'Header Background',
            font:pageLabel,
            left:'5dp',
            right:'10dp'
        });
        
        appStyleView = Titanium.UI.createView({
            top:'10dp',
            left:'0dp',
            width:'100%',
            height:'50dp',
            bottom:'10dp',
            layout:'horizontal'
        });
        
        mainTheme = Ti.UI.createView({
            title:'Main Theme',
            width:'50dp',
            height:'50dp',
            backgroundColor:'#e342b1',
            borderColor:'#333',
            borderWidth:1,
            borderRadius:4,
        });
        
        var appfontColor = Titanium.UI.createLabel({
            text:'Main Font',
            font:pageLabel,
            left:'5dp',
            right:'10dp',
            width:'30%'
        });
        
        main2Theme = Ti.UI.createView({
            title: 'Secondary Color',
            width:'50dp',
            height:'50dp',
            backgroundColor:'#24c4a1',
            borderColor:'#333',
            borderWidth:1,
            borderRadius:4,
            left:'5dp'
        });
        
        var appBackColor = Titanium.UI.createLabel({
            text:'Main Background',
            font:pageLabel,
            left:'5dp',
            right:'10dp'
        });
        
        main3Theme = Ti.UI.createView({
            title: 'Secondary Color',
            width:'50dp',
            height:'50dp',
            backgroundColor:'#24c4a1',
            borderColor:'#333',
            borderWidth:1,
            borderRadius:4,
            left:'5dp'
        });
        
        
        
        var win1 = createColorPicker({hexColor:'#FFFFFF'});
        win1.addEventListener("colorselect", function(e){
            fontColor.color = e.hexColorWithHash;
        });

        headerStyleView.add(fontColor);
        headerStyleView.add(headerFont);
        headerStyleView.add(font2Color);
        headerStyleView.add(headerBack);
        colorSchemeView.add(headerStyleView);
        appStyleView.add(mainTheme);
        appStyleView.add(appfontColor);
        appStyleView.add(main2Theme);
        appStyleView.add(appBackColor);
        colorSchemeView.add(appStyleView);
        
        fontColor.addEventListener('click', function(e){
            var win1 = createColorPicker({hexColor:'#787878'});
            win1.addEventListener("colorselect", function(e){
                fontColor.backgroundColor = e.hexColorWithHash;
                appBuilder.simulator.headerTitle.color = e.hexColorWithHash;
            });
            win1.open();
        });
        font2Color.addEventListener('click', function(e){
            var win2 = createColorPicker({hexColor:'#787878'});
            win2.addEventListener("colorselect", function(e){
                font2Color.backgroundColor = e.hexColorWithHash;
                appBuilder.simulator.header.backgroundColor= e.hexColorWithHash;
            });
            win2.open();
        });
        mainTheme.addEventListener('click', function(e){
            var win3 = createColorPicker({hexColor:'#787878'});
            win3.addEventListener("colorselect", function(e){
                mainTheme.backgroundColor = e.hexColorWithHash;
                simFont.color=e.hexColorWithHash;
                simFont2.color=e.hexColorWithHash;
                loadSimulator();            
            });
            win3.open();
        });
        main2Theme.addEventListener('click', function(e){
            var win4 = createColorPicker({hexColor:'#787878'});
            win4.addEventListener("colorselect", function(e){
                main2Theme.backgroundColor = e.hexColorWithHash;
                appBuilder.simulator.tableViews.backgroundColor = e.hexColorWithHash;
                appBuilder.simulator.backgroundColor = e.hexColorWitHash;
            });
            win4.open();
        });
        main3Theme.addEventListener('click', function(e){
            var win5 = createColorPicker({hexColor:'#787878'});
            win5.addEventListener("colorselect", function(e){
                main3Theme.backgroundColor = e.hexColorWithHash;
               
            });
            win5.open();
        });
        
        styleView.hide();
    }
    
    function createSubmitWindow(){
        submitView = Ti.UI.createView({
           top:'100dp',
           width:'100%',
           height: '670dp',
           layout:'vertical',
           backgroundColor:'#eee',
           borderColor:'#333',
           borderWidth:2,
           borderRadius:8,
        });
    
        submitLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'0dp',
            left:'0dp'
        });
        
        submitImage= Titanium.UI.createLabel({
           text:'App Info',
           font:customFont
        });
        submitLabel.add(submitImage);
                
        submit = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           right:'0dp',
           height: 'auto',
           layout:'horizontal',
/*           backgroundColor:'#eee',
           borderColor:'#aaa',
           borderWidth:2.5,
           borderRadius:8,*/
        });
        submitView.add(submitLabel);
        submitView.add(submit);
        
        

        leftMenu = Ti.UI.createView({
           top:'0dp',
           left:'0dp',
           width:'30%',
           height: '620dp',
           layout:'vertical',
        });
        
        rightMenu = Ti.UI.createView({
           top:'1dp',
           left:'1dp',
           width:'64.4%',
           height: '620dp',
           layout:'vertical',
        });

        saveContentLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        saveContentText= Titanium.UI.createLabel({
           text:'Save',
           font:customFont,
           color:'#97ca52',
           right:'60dp'
        });
        saveContentIcon = Titanium.UI.createImageView({
            image:'images/build/save.png',
            right:'17.5dp',
        });
        saveContentLabel.add(saveContentIcon);
        saveContentLabel.add(saveContentText);
        
        saveContentLabel.addEventListener('click', function(e){
            appBuilder.simulator.headerTitle.text = appBuilder.appTitleField.value;
        });
        helpLabel = Ti.UI.createButton({
            width: '100%',
            height:'60dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        helpText= Titanium.UI.createLabel({
           text:'Help',
           font:customFont,
           color:'#fff',
           right:'60dp'
        });
        helpIcon = Titanium.UI.createImageView({
            image:'images/build/help.png',
            right:'17.5dp',
        });
        helpLabel.add(helpText);
        helpLabel.add(helpIcon);
        
        hintLabel = Ti.UI.createButton({
            width: '100%',
            height:'490dp',
            backgroundColor:'#333',
            top:'1dp',
            right:'0dp'
        });
        hintText= Titanium.UI.createLabel({
           text:'',
           font:customFont,
           color:'#ffc22d',
        });
        hintLabel.add(hintText);
        leftMenu.add(saveContentLabel);
        leftMenu.add(helpLabel);
        leftMenu.add(hintLabel);
        
        submit.add(leftMenu);
        
        appTitleLabel = Titanium.UI.createLabel({
           text:'App Name',
           top:'10dp',
           left:'10dp',
           font:pageLabel 
        });
        
        appBuilder.appTitleField = Titanium.UI.createTextField({
            width:'96%',
            left:'10dp',
            top:'10dp',
            bottom:'10dp',
            borderColor:'#000',
            borderWidth:1,
            value:'App Name'
        });
        
        appDescriptionLabel = Titanium.UI.createLabel({
           text:'App Description',
           top:'10dp',
           left:'10dp',
           font:pageLabel,

        });
        
        appDescriptionField = Titanium.UI.createTextArea({
            width:'96%',
            left:'10dp',
            top:'10dp',
            bottom:'10dp',
            height:'80dp',
            borderColor:'#000',
            borderWidth:1,
        });
        
        appIconLabel = Titanium.UI.createLabel({
           text:'App Icon',
           top:'10dp',
           left:'10dp',
           font:pageLabel,

        });
        
        appIconField = Titanium.UI.createTextField({
            width:'96%',
            right:'10dp',
            left:'10dp',
            top:'10dp',
            bottom:'10dp',
            borderColor:'#000',
            borderWidth:1,
        });
        
        appSplashLabel = Titanium.UI.createLabel({
           text:'App Splash Screen',
           top:'10dp',
           left:'10dp',
           font:pageLabel,

        });
        
        appSplashField = Titanium.UI.createTextField({
            width:'96%',
            left:'10dp',
            top:'10dp',
            bottom:'10dp',
            borderColor:'#000',
            borderWidth:1,
        });
        
        
        appSubmitView = Titanium.UI.createWebView({
            url:'http://myfreeapp.com/temp/appsubmit.html',
            width:'100%',
            height:'100%',
        });
        rightMenu.add(appTitleLabel);
        rightMenu.add(appBuilder.appTitleField);
        rightMenu.add(appDescriptionLabel);
        rightMenu.add(appDescriptionField);
        rightMenu.add(appIconLabel);
        rightMenu.add(appIconField);
        rightMenu.add(appSplashLabel);
        rightMenu.add(appSplashField);
        //rightMenu.add(appSubmitView);
        
        submit.add(rightMenu);
        
        submitView.hide();
    }

    function createSimulatorView(){
        appBuilder.simulatorBack = Ti.UI.createImageView({
            top:'80dp',
            image:'images/simulator/iphone.png',
            width:'333dp',
            height:'700dp',
        });
        
        appBuilder.simulator = Ti.UI.createView({
            width:'277dp',
            height:'490dp',
            borderColor:'#000',
            borderWidth:0,
            backgroundColor:'#eee',
        });
        
        appBuilder.simulator.tableViews = Ti.UI.createView({
            width:'277dp',
            height:'490dp',
            borderColor:'#000',
            borderWidth:0,
            backgroundColor:'#eee',
        });
        
        appBuilder.simulator.add(appBuilder.simulator.tableViews);
        appBuilder.simulator.header = Titanium.UI.createView({
        	width:'277dp',
        	height:'60dp',
        	backgroundColor:'#999',
        	top:'0dp'
        });
        appBuilder.simulator.headerTitle = Titanium.UI.createLabel({
        	text:appBuilder.appTitleField.value,
        	font:simFontHeader
        });

        appBuilder.simulator.tableview = Ti.UI.createTableView({
            top:'59dp',
            left:'4dp',
            right:'4dp',
            //bottom:'60dp',
            //data:tableData,
            separatorColor:'#333',
            backgroundColor:'transparent'
        });
        
        appBuilder.simulator.header.add(appBuilder.simulator.headerTitle);
        appBuilder.simulator.tableViews.add(appBuilder.simulator.tableview);
        appBuilder.simulator.add(appBuilder.simulator.header);
        
        appBuilder.simulator.tabViewTop = Titanium.UI.createView({
            top:'0dp',
            height:'60dp',
            backgroundColor:'#333',
        });
        
        appBuilder.simulator.add(appBuilder.simulator.tabViewTop);
        
        appBuilder.simulator.tabViewBot = Titanium.UI.createView({
            bottom:'0dp',
            height:'60dp',
            backgroundColor:'#333'
        });
        
        appBuilder.simulator.add(appBuilder.simulator.tabViewBot);
        
        appBuilder.simulator.tabViewTop.view1 = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            
        });
        
        appBuilder.simulator.tabViewTop.view1Image = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp',
        });
        
        appBuilder.simulator.tabViewTop.view1Text = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view1.add(appBuilder.simulator.tabViewTop.view1Image);
        appBuilder.simulator.tabViewTop.view1.add(appBuilder.simulator.tabViewTop.view1Text);
        
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view1);
        
        appBuilder.simulator.tabViewTop.view2a = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'40dp'
        });
        appBuilder.simulator.tabViewTop.view2Imagea = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        appBuilder.simulator.tabViewTop.view2Texta = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view2a.add(appBuilder.simulator.tabViewTop.view2Imagea);
        appBuilder.simulator.tabViewTop.view2a.add(appBuilder.simulator.tabViewTop.view2Texta);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view2a);
        
        appBuilder.simulator.tabViewTop.view2b = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'40dp'
        });
        appBuilder.simulator.tabViewTop.view2Imageb = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        appBuilder.simulator.tabViewTop.view2Textb = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view2b.add(appBuilder.simulator.tabViewTop.view2Imageb);
        appBuilder.simulator.tabViewTop.view2b.add(appBuilder.simulator.tabViewTop.view2Textb);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view2b);
        
        appBuilder.simulator.tabViewTop.view3a = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'20dp'
        });
        
        appBuilder.simulator.tabViewTop.view3Imagea = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view3Texta = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view3a.add(appBuilder.simulator.tabViewTop.view3Imagea);
        appBuilder.simulator.tabViewTop.view3a.add(appBuilder.simulator.tabViewTop.view3Texta);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view3a);
        
        appBuilder.simulator.tabViewTop.view3b = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'20dp'
        });
        
        appBuilder.simulator.tabViewTop.view3Imageb = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view3Textb = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view3b.add(appBuilder.simulator.tabViewTop.view3Imageb);
        appBuilder.simulator.tabViewTop.view3b.add(appBuilder.simulator.tabViewTop.view3Textb);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view3b);
        
        appBuilder.simulator.tabViewTop.view4a = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'10dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Imagea = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Texta = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4a.add(appBuilder.simulator.tabViewTop.view4Imagea);
        appBuilder.simulator.tabViewTop.view4a.add(appBuilder.simulator.tabViewTop.view4Texta);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view4a);
        
        appBuilder.simulator.tabViewTop.view4b = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'76dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Imageb = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Textb = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view4b.add(appBuilder.simulator.tabViewTop.view4Imageb);
        appBuilder.simulator.tabViewTop.view4b.add(appBuilder.simulator.tabViewTop.view4Textb);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view4b);
        
        appBuilder.simulator.tabViewTop.view4c = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'76dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Imagec = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Textc = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4c.add(appBuilder.simulator.tabViewTop.view4Imagec);
        appBuilder.simulator.tabViewTop.view4c.add(appBuilder.simulator.tabViewTop.view4Textc);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view4c);
        
        appBuilder.simulator.tabViewTop.view4d = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'10dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Imaged = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view4Textd = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view4d.add(appBuilder.simulator.tabViewTop.view4Imaged);
        appBuilder.simulator.tabViewTop.view4d.add(appBuilder.simulator.tabViewTop.view4Textd);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view4d);
        
        
        
        appBuilder.simulator.tabViewTop.view5a = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'5dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Imagea = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Texta = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5a.add(appBuilder.simulator.tabViewTop.view5Imagea);
        appBuilder.simulator.tabViewTop.view5a.add(appBuilder.simulator.tabViewTop.view5Texta);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view5a);
        
        appBuilder.simulator.tabViewTop.view5b = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            left:'57dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Imageb = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Textb = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view5b.add(appBuilder.simulator.tabViewTop.view5Imageb);
        appBuilder.simulator.tabViewTop.view5b.add(appBuilder.simulator.tabViewTop.view5Textb);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view5b);
        
        appBuilder.simulator.tabViewTop.view5c = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
        });
        
        appBuilder.simulator.tabViewTop.view5Imagec = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Textc = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5c.add(appBuilder.simulator.tabViewTop.view5Imagec);
        appBuilder.simulator.tabViewTop.view5c.add(appBuilder.simulator.tabViewTop.view5Textc);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view5c);
        
        appBuilder.simulator.tabViewTop.view5d = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'57dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Imaged = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Textd = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view5d.add(appBuilder.simulator.tabViewTop.view5Imaged);
        appBuilder.simulator.tabViewTop.view5d.add(appBuilder.simulator.tabViewTop.view5Textd);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view5d);
        appBuilder.simulator.tabViewTop.view5e = Titanium.UI.createView({
            height:'60dp',
            width:'20%',
            right:'5dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Imagee = Titanium.UI.createImageView({
            height:'40dp',
            width:'40dp',
            top:'1dp'
        });
        
        appBuilder.simulator.tabViewTop.view5Texte = Titanium.UI.createLabel({
            text:'',
            font:simFont1,
            bottom:'1dp'
        });
        appBuilder.simulator.tabViewTop.view5e.add(appBuilder.simulator.tabViewTop.view5Imagee);
        appBuilder.simulator.tabViewTop.view5e.add(appBuilder.simulator.tabViewTop.view5Texte);
        appBuilder.simulator.tabViewTop.add(appBuilder.simulator.tabViewTop.view5e);
        
        
        appBuilder.switches = Ti.UI.createView({
           height:'170dp',
           width:'40dp',
           layout:'vertical',
        });
        
        var switchiPhone = Ti.UI.createButton({
            top:'80dp',
            height:'40dp',
            width:'40dp',
            backgroundImage:'images/build/appleSwitch.png',
        });
    
        var switchAndroid = Ti.UI.createButton({
            top:'5dp',
            height:'40dp',
            width:'40dp',
            backgroundImage:'images/build/androidSwitch.png',
        });
        appBuilder.switches.add(switchiPhone);
        appBuilder.switches.add(switchAndroid);
        switchiPhone.addEventListener('click', function(e){appBuilder.simulatorBack.image = 'images/simulator/iphone.png'; appBuilder.simulatorBack.add(appBuilder.simulator);});
        switchAndroid.addEventListener('click', function(e){appBuilder.simulatorBack.image = 'images/simulator/android.png'; appBuilder.simulatorBack.add(appBuilder.simulator);});
    }

    function loadSimulator(){
        var pageData = Ti.App.Properties.getObject('pageIndex',[]);
        var tableData =[];
        
        switch (simulatorType){
            case 'list':
                appBuilder.simulator.tableview.separatorColor= '#333';
            	appBuilder.simulator.header.top='0dp';
                appBuilder.simulator.header.bottom=null;
                for (var i=0; i<pageData.length; i++)
                {	
                	Ti.API.info(JSON.stringify(pageData[i]));
                    var row = Titanium.UI.createTableViewRow({
                        height:'60dp',
                        pageType:pageData[i].pageType,
                        pagePosition:pageData[i].pagePosition,
                        pageIcon:pageData[i].pageIcon,
                        pageTitle:pageData[i].pageTitle
                    });
                    
                    var rowIcon = Titanium.UI.createImageView({
                        image:pageData[i].pageIcon,
                        pagePosition:pageData[i].pagePosition,
                        pageType:pageData[i].pageType,
                        left:'10dp',
                        height:'50dp',
                    });
                    
                    var rowTitle = Titanium.UI.createLabel({
                        text:pageData[i].pageTitle,
                        pagePosition:pageData[i].pagePosition,
                        font:simFont,
                        left:'70dp',
                        pageType:pageData[i].pageType,
                    });
                    
                    row.add(rowIcon);
                    row.add(rowTitle);
                    tableData.push(row);
                }
    
                appBuilder.simulator.tableview.setData(tableData);
                appBuilder.simulator.tabViewTop.hide();
                appBuilder.simulator.tableViews.show();
                appBuilder.simulator.tabViewBot.hide();
                break;
            case 'topTab':
                appBuilder.simulator.tableViews.hide();
                appBuilder.simulator.tabViewTop.show();
                appBuilder.simulator.tabViewBot.hide();
                appBuilder.simulator.tabViewTop.top = '0dp';
                appBuilder.simulator.tabViewTop.bottom = null;
                appBuilder.simulator.header.top=null;
                appBuilder.simulator.header.bottom='0dp';
                
                TabbedViewBar();
                break;
            case 'botTab':
                appBuilder.simulator.tableViews.hide();
                appBuilder.simulator.tabViewTop.show();
                appBuilder.simulator.tabViewTop.top = null;
                appBuilder.simulator.tabViewTop.bottom = '0dp';
                appBuilder.simulator.header.top='0dp';
                appBuilder.simulator.header.bottom=null;
                TabbedViewBar();
                break;
            case 'dash':
            	appBuilder.simulator.header.top='0dp';
                appBuilder.simulator.header.bottom=null;
                appBuilder.simulator.tableview.separatorColor= 'transparent';
                var xGrid = 3;
                var yGrid = 5;
                var cellIndex = 0;
                for (var y=0; y<yGrid; y++){
                    var thisRow = Ti.UI.createTableViewRow({
                        className: "grid",
                        layout: "horizontal",
                        height: '116dp'    
                    });
                        
                    for (var x=0; x<xGrid; x++){
                        if (!pageData[cellIndex]) {break;}
                        var thisView = Ti.UI.createView({
                            objName:"grid-view",
                            objIndex:cellIndex.toString(),
                            borderWidth:0,      
                            borderColor:'#fff',
                            borderRadius:4,
                            left: '3.5dp',
                            height: '109dp',
                            width: '85dp',
                            top:'7dp',
                            pageType:pageData[cellIndex].pageType,
                            pagePosition:pageData[cellIndex].pagePosition,
                            pageIndex:cellIndex,
                            backgroundColor:'#ddd',
        
                        });
                        
                        var itemImage = Ti.UI.createImageView({
                            top:'5dp',
                            image:pageData[cellIndex].pageIcon,
                            width:'75dp',
                            height:'75dp',
                            pageType:pageData[cellIndex].pageType,
                            pagePosition:pageData[cellIndex].pagePosition,
                            pageIndex:cellIndex,
                        });
                        thisView.add(itemImage);
                                
                        var textlabel = Ti.UI.createLabel({
                            bottom:'2dp',
                            text:pageData[cellIndex].pageTitle,
                            font: simFont2,
                            pageType:pageData[cellIndex].pageType,
                            pagePosition:pageData[cellIndex].pagePosition,
                            pageIndex:cellIndex,
                        });
                        thisView.add(textlabel);
                        thisRow.add(thisView);
                        cellIndex++;
                    }
                    tableData.push(thisRow);
                }
                appBuilder.simulator.tableview.setData(tableData);
                appBuilder.simulator.tabViewTop.hide();
                appBuilder.simulator.tableViews.show();
                appBuilder.simulator.tabViewBot.hide();
                break;
            default:
                //appBuilder.simulator.add();
                break;
        }
    }
    
    function TabbedViewBar(){
        var pageData = Ti.App.Properties.getObject('pageIndex',[]);
        switch (pageData.length){
            case 0:
                appBuilder.simulator.tabViewTop.view1.hide();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.hide();
                appBuilder.simulator.tabViewTop.view5b.hide();
                appBuilder.simulator.tabViewTop.view5c.hide();
                appBuilder.simulator.tabViewTop.view5d.hide();
                appBuilder.simulator.tabViewTop.view5e.hide();
                break;
            case 1:
                appBuilder.simulator.tabViewTop.view1Image.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view1Text.text = pageData[0].pageTitle;
                
                appBuilder.simulator.tabViewTop.view1.show();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.hide();
                appBuilder.simulator.tabViewTop.view5b.hide();
                appBuilder.simulator.tabViewTop.view5c.hide();
                appBuilder.simulator.tabViewTop.view5d.hide();
                appBuilder.simulator.tabViewTop.view5e.hide();
                break;
            case 2:
                appBuilder.simulator.tabViewTop.view2Imagea.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view2Texta.text = pageData[0].pageTitle;
                appBuilder.simulator.tabViewTop.view2Imageb.image = pageData[1].pageIcon;
                appBuilder.simulator.tabViewTop.view2Textb.text = pageData[1].pageTitle;
                
                appBuilder.simulator.tabViewTop.view1.hide();
                appBuilder.simulator.tabViewTop.view2a.show();
                appBuilder.simulator.tabViewTop.view2b.show();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.hide();
                appBuilder.simulator.tabViewTop.view5b.hide();
                appBuilder.simulator.tabViewTop.view5c.hide();
                appBuilder.simulator.tabViewTop.view5d.hide();
                appBuilder.simulator.tabViewTop.view5e.hide();
                break;
            case 3:
                appBuilder.simulator.tabViewTop.view3Imagea.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view3Texta.text = pageData[0].pageTitle;
                appBuilder.simulator.tabViewTop.view1Image.image = pageData[1].pageIcon;
                appBuilder.simulator.tabViewTop.view1Text.text = pageData[1].pageTitle;
                appBuilder.simulator.tabViewTop.view3Imageb.image = pageData[2].pageIcon;
                appBuilder.simulator.tabViewTop.view3Textb.text = pageData[2].pageTitle;
                
                appBuilder.simulator.tabViewTop.view1.show();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.show();
                appBuilder.simulator.tabViewTop.view3b.show();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.hide();
                appBuilder.simulator.tabViewTop.view5b.hide();
                appBuilder.simulator.tabViewTop.view5c.hide();
                appBuilder.simulator.tabViewTop.view5d.hide();
                appBuilder.simulator.tabViewTop.view5e.hide();
                break;
            case 4:
                appBuilder.simulator.tabViewTop.view4Imagea.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view4Texta.text = pageData[0].pageTitle;
                appBuilder.simulator.tabViewTop.view4Imageb.image = pageData[1].pageIcon;
                appBuilder.simulator.tabViewTop.view4Textb.text = pageData[1].pageTitle;
                appBuilder.simulator.tabViewTop.view4Imagec.image = pageData[2].pageIcon;
                appBuilder.simulator.tabViewTop.view4Textc.text = pageData[2].pageTitle;
                appBuilder.simulator.tabViewTop.view4Imaged.image = pageData[3].pageIcon;
                appBuilder.simulator.tabViewTop.view4Textd.text = pageData[3].pageTitle;
                
                appBuilder.simulator.tabViewTop.view1.hide();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.show();
                appBuilder.simulator.tabViewTop.view4b.show();
                appBuilder.simulator.tabViewTop.view4c.show();
                appBuilder.simulator.tabViewTop.view4d.show();
                appBuilder.simulator.tabViewTop.view5a.hide();
                appBuilder.simulator.tabViewTop.view5b.hide();
                appBuilder.simulator.tabViewTop.view5c.hide();
                appBuilder.simulator.tabViewTop.view5d.hide();
                appBuilder.simulator.tabViewTop.view5e.hide();
                break;
            case 5:
                appBuilder.simulator.tabViewTop.view5Imagea.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view5Texta.text = pageData[0].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imageb.image = pageData[1].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textb.text = pageData[1].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imagec.image = pageData[2].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textc.text = pageData[2].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imaged.image = pageData[3].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textd.text = pageData[3].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imagee.image = pageData[4].pageIcon;
                appBuilder.simulator.tabViewTop.view5Texte.text = pageData[4].pageTitle;
                
                appBuilder.simulator.tabViewTop.view1.hide();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.show();
                appBuilder.simulator.tabViewTop.view5b.show();
                appBuilder.simulator.tabViewTop.view5c.show();
                appBuilder.simulator.tabViewTop.view5d.show();
                appBuilder.simulator.tabViewTop.view5e.show();
                break;
            default:
                appBuilder.simulator.tabViewTop.view5Imagea.image = pageData[0].pageIcon;
                appBuilder.simulator.tabViewTop.view5Texta.text = pageData[0].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imageb.image = pageData[1].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textb.text = pageData[1].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imagec.image = pageData[2].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textc.text = pageData[2].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imaged.image = pageData[3].pageIcon;
                appBuilder.simulator.tabViewTop.view5Textd.text = pageData[3].pageTitle;
                appBuilder.simulator.tabViewTop.view5Imagee.image = pageData[4].pageIcon;
                appBuilder.simulator.tabViewTop.view5Texte.text = 'more...';
                
                appBuilder.simulator.tabViewTop.view1.hide();
                appBuilder.simulator.tabViewTop.view2a.hide();
                appBuilder.simulator.tabViewTop.view2b.hide();
                appBuilder.simulator.tabViewTop.view3a.hide();
                appBuilder.simulator.tabViewTop.view3b.hide();
                appBuilder.simulator.tabViewTop.view4a.hide();
                appBuilder.simulator.tabViewTop.view4b.hide();
                appBuilder.simulator.tabViewTop.view4c.hide();
                appBuilder.simulator.tabViewTop.view4d.hide();
                appBuilder.simulator.tabViewTop.view5a.show();
                appBuilder.simulator.tabViewTop.view5b.show();
                appBuilder.simulator.tabViewTop.view5c.show();
                appBuilder.simulator.tabViewTop.view5d.show();
                appBuilder.simulator.tabViewTop.view5e.show();
            break;
        }
    }
          
    function reloadMyPages(){
        var pageData = Ti.App.Properties.getObject('pageIndex',{});
        var xGrid = 5;
        var yGrid = 5;
        var tableData = [];
        var cellIndex = 0;
        for (var y=0; y<yGrid; y++){
            var thisRow = Ti.UI.createTableViewRow({
                className: "grid",
                layout: "horizontal",
                height: '116dp'    
            });
                
            for (var x=0; x<xGrid; x++){
                if (!pageData[cellIndex]) {break;}
                var thisView = Ti.UI.createView({
                    objName:"grid-view",
                    objIndex:cellIndex.toString(),
                    borderWidth:0,      
                    //borderColor:'#fff',
                    borderRadius:4,
                    left: '7dp',
                    height: '110dp',
                    width: '87.5dp',
                    top:'7dp',
                    type:pageData[cellIndex].pageType,
                    pageIndex:cellIndex,
                    backgroundColor:'#ddd',

                });
                        
                var itemImage = Ti.UI.createImageView({
                    top:'1dp',
                    image:'images/dashboard/'+pageData[cellIndex].pageType+'.png',
                    width:'80dp',
                    height:'80dp',
                    left:'3dp',
                    type:pageData[cellIndex].pageType,
                    pageIndex:cellIndex,
                });
                thisView.add(itemImage);
                        
                var textlabel = Ti.UI.createLabel({
                    bottom:'1dp',
                    text:pageData[cellIndex].pageType,
                    font: myPagesFont,
                    type:pageData[cellIndex].pageType,
                    pageIndex:cellIndex,
                });
                thisView.add(textlabel);
                thisRow.add(thisView);
                cellIndex++;
            }
            tableData.push(thisRow);
        }
        appBuilder.myPagesTable.setData(tableData);
    };
    
    appBuilder.self.addContentLabel.addEventListener('click', function(){
        var addPage = Ti.UI.createWindow({
            url:'/ui/tabs/buildWindow/addPage.js',
            height:'740dp',
            width:'745dp',
            backgroundColor:'transparent',
            layout:'vertical',
            fullscreen:false,
            modal:true,
        });
        addPage.open();
    });
    
    appBuilder.self.deleteContentLabel.addEventListener('click', function(){
        var addPage = Ti.UI.createWindow({
            url:'/ui/tabs/buildWindow/deletePage.js',
            height:'740dp',
            width:'745dp',
            backgroundColor:'transparent',
            layout:'vertical',
            fullscreen:false,
            modal:true,
        });
        addPage.open();
    });
    appBuilder.self.saveContentLabel.addEventListener('click', function(){
        var pageData = Ti.App.Properties.getObject('pageIndex',[]);
        var appinFo = Ti.App.Properties.getObject('AppInfo',{});
        appinFo.about = JSON.stringify(pageData);
        var url = "http://104.131.33.138:3000/api/appdata";
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //var obj = JSON.parse(this.responseText);
                 reloadMyPages();
        		 loadSimulator();
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
             },
             timeout : 5000  // in milliseconds
        });
        // Prepare the connection.
        client.open("PUT", url);
        // Send the request.
        client.send(appinFo);
    });
    appBuilder.self.sortContentLabel.addEventListener('click', function(){
        var addPage = Ti.UI.createWindow({
            url:'/ui/tabs/buildWindow/sortPage.js',
            height:'740dp',
            width:'745dp',
            backgroundColor:'transparent',
            layout:'vertical',
            fullscreen:false,
            modal:true,
        });
        addPage.open();
    });
    
    appBuilder.myPagesTable.addEventListener('click', function(e)
    {
        if(e.source.type){
        var pageId= e.source.pageIndex;
        var appData = Ti.App.Properties.getObject('pageIndex',[]);
        var pageData = appData[pageId];    
        var newPage = Ti.UI.createWindow({
            url:'/ui/tabs/buildWindow/pages/' +  e.source.type + '.js',
            height:'auto',
            width:'450dp',
            backgroundColor:'#ddd',
            borderColor:'#333',
            borderWidth:2,
            borderRadius:8, 
            fullscreen:false,
            modal:true,
            layout:'vertical',
            pageData:pageData
        });
        newPage.open();
        }
    });
	
    appBuilder.simulator.addEventListener('click', function (e){
       Ti.API.info(e.source.pageType);
       var newPage = Ti.UI.createWindow({
            url:'ui/tabs/simulator/' +  e.source.pageType + '.js',
            backgroundColor:'transparent',
            height:'100%',
            width:'100%',
            fullscreen:false,
            pageData:e.source.pagePosition,
            _sim:appBuilder.simulator,
            modal:true,
        });
        appBuilder.simulator.add(newPage);
    });

    appBuilder.navigationView.addEventListener('dragend', function (e){
         Ti.API.info("Image Scrolled current page: " + e.currentPage);
         navStyle = e.currentPage;
         switch (navStyle){
             case 0:
                simulatorType = 'list';
                loadSimulator();
                break;
             case 1:
                simulatorType = 'dash';
                loadSimulator();
                break;
             case 2:
                simulatorType = 'botTab';
                loadSimulator();
                break;
             case 3:
                simulatorType = 'topTab';
                loadSimulator();
                break;
             default:
                simulatorType = 'list';
                loadSimulator();
                break;
         }
    });

    Ti.App.addEventListener('updatePage', function(){
        reloadMyPages();
        loadSimulator();
    });

    appBuilder.leftChild.add(appBuilderMenu);
    appBuilder.leftChild.add(myPagesView);
    appBuilder.leftChild.add(styleView);
    appBuilder.leftChild.add(submitView);
    appBuilder.rightChild.add(appBuilder.simulatorBack);
    appBuilder.rightChild.add(appBuilder.switches);
    appBuilder.simulatorBack.add(appBuilder.simulator);
    appBuilder.add(appBuilder.self);
    
	return appBuilder;
};
module.exports = BuildWindow;
