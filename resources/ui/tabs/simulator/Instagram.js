    var win = Titanium.UI.currentWindow;
    win.backgroundColor = '#ccc';
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
    var instagramUser = pageData.pageField;
    
    var userID = 0;
    
    var customFont = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#fff'};
    var customFont1 = {fontFamily: 'CoconOT-LightCond',fontSize:'26dp',color:'#555'};
    var formFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'20dp',color:'#000'};
    var bigFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#000'};
    var smFont = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#000'};
    

    var header = Titanium.UI.createView({
        width:'100%',
        height:'60dp',
        backgroundColor:'#999',
        top:'0dp'
    });
    
    win.add(header);
    
    var LoadingLabel = Ti.UI.createLabel({
        text:'Loading... Please Wait',
        font:customFont
    });
    
    win.add(LoadingLabel);
    
    var pageTitle = Titanium.UI.createLabel({
        text:pageData.pageTitle,
        font:formFont
    });
    
    header.add(pageTitle);

    scrollView = Titanium.UI.createView({
        width : '100%',
        top : '60dp',
        height:'100%',
        backgroundColor:'#fff'
    });

    
    saveButton = Ti.UI.createImageView({
       image:'/images/simulator/backButton.png',
       left:'5dp',
       top:'15dp',
    });
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
    //win.add(scrollView);
    win.add(saveButton);
    
    var tabledata = [];
    var displayTable = Ti.UI.createTableView({
        data:tabledata,
        width:'100%',
        top:'60dp',
        backgroundColor:'transparent',
        separatorColor:'transparent'
    });
    win.add(displayTable);
    
    getUserList();
    
    function getUserList(){
    	if(instagramUser == null || instagramUser == ''){
    		LoadingLabel.text = 'User name is empty.';
    		return;
    	}
        var url = 'https://api.instagram.com/v1/users/search?q=' + instagramUser + '&client_id=b5dc5d1949a149968460e6fea118f6b6';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 var data = JSON.parse(this.responseText).data;
                 
                 //check if user exist
                 for( i = 0; i < data.length; i++ ) {
                 	if( data[i]['username'] ==  instagramUser ) {
                 		userID = data[i]['id'];
                 		break;
                 	}
                 }
                 
                 getUserInfo();
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 LoadingLabel.text = 'Error occured';
                 //alert('error');
             },
             timeout : 5000  // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", url);
        // Send the request.
        client.send();
    }
    
    function getUserInfo(){
        var url = 'https://api.instagram.com/v1/users/' + userID + '?client_id=b5dc5d1949a149968460e6fea118f6b6';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 var data = JSON.parse(this.responseText).data;
                 
                 getFeed(data);
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 LoadingLabel.text = 'Error occured';
             },
             timeout : 5000  // in milliseconds
        });
        client.open("GET", url);
        client.send();
    }
    
    function getFeed(profile){
        var url = 'https://api.instagram.com/v1/users/' + userID + '/media/recent?client_id=b5dc5d1949a149968460e6fea118f6b6';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 var data = JSON.parse(this.responseText).data;
                 
                 createDisplayTable(data, profile);
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 LoadingLabel.text = 'Error occured';
             },
             timeout : 5000  // in milliseconds
        });
        client.open("GET", url);
        client.send();
    }
    
    function createDisplayTable(data, profile){
    	LoadingLabel.text = '';
    	
    	tabledata = [];
    	
        var headerOutRow = Titanium.UI.createTableViewRow({
            backgroundColor:'#fff',
            width:'100%',
            height:'90dp',
            top:'0dp',
            layout:'horizontal'
        });
        
        var headerRow = Titanium.UI.createTableViewRow({
            backgroundColor:'#fff',
            width:'94%',
            height:'70dp',
            top:'10dp',
            left:'3%',
            layout:'horizontal'
        });
        headerOutRow.add(headerRow);
        
        var profilePicture = Ti.UI.createImageView({
            height:'70dp',
            width:'70dp',
            borderWidth:2,
            borderColor:'#ccc',
            image:profile['profile_picture'],
            backgroundColor:'#fff'
        });
        headerRow.add(profilePicture);
        
        var profilePanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'70dp',
            left:'10dp',
            layout:'vertical'
        });
        headerRow.add(profilePanel);
        
        var profileName = profile['full_name'];
        if( profileName == '' )
        	profileName = profile['username'];
        var pageName = Ti.UI.createLabel({
            text:profileName,
            font:bigFont,
            width:'100%'
        });
        profilePanel.add(pageName);
        
        var infoPanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'35dp',
            layout:'horizontal',
            width:'100%',
            top:'15dp',
            textAlign : 'left'
        });
        
        profilePanel.add(infoPanel);
        
        var postPanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'35dp',
            layout:'vertical',
            width:'33%'
        });
        infoPanel.add(postPanel);
        
        var postCount = Ti.UI.createLabel({
            text:profile['counts']['media'],
            font:smFont,
            left:'0dp'
        });
        postPanel.add(postCount);
        var postTitle = Ti.UI.createLabel({
            text:'photos',
            font:smFont,
            left:'0dp'
        });
        postPanel.add(postTitle);
        
        var followerPanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'35dp',
            layout:'vertical',
            width:'33%'
        });
        infoPanel.add(followerPanel);
        
        var followerCount = Ti.UI.createLabel({
            text:profile['counts']['followed_by'],
            font:smFont,
            left:'0dp'
        });
        followerPanel.add(followerCount);
        var followerTitle = Ti.UI.createLabel({
            text:'followers',
            font:smFont,
            left:'0dp'
        });
        followerPanel.add(followerTitle);
        
        
        var followingPanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'35dp',
            layout:'vertical',
            width:'33%'
        });
        infoPanel.add(followingPanel);
        
        var followingCount = Ti.UI.createLabel({
            text:profile['counts']['follows'],
            font:smFont,
            left:'0dp'
        });
        followingPanel.add(followingCount);
        var followingTitle = Ti.UI.createLabel({
            text:'following',
            font:smFont,
            left:'0dp'
        });
        followingPanel.add(followingTitle);
        
        

        tabledata.push(headerOutRow);
        
        for (var i=0; i < data.length; i++) {
            var newRow = Titanium.UI.createTableViewRow({
                top:'15dp',
                height:Ti.UI.SIZE,
                width:'90%',
                backgroundColor:'#fff',
                layout:'vertical'
            });
            
            var createdDate = data[i]['created_time'];
            var postDate = timeConverter(createdDate);
            
            var rowLabel = Ti.UI.createLabel({
                text:postDate,
                font:smFont,
                top:'5dp',
                left:'5dp'
            });
            
            newRow.add(rowLabel);
            
            if(data[i]['type'] =='video'){
            }
            if(data[i]['type'] == 'image' || data[i]['type'] =='video'){
            	if ( data[i]['caption'] != null ){
	                var statusLabel = Ti.UI.createLabel({
	                    text:data[i]['caption']['text'],
	                    left:'5dp',
	                    right:'5dp',
	                    top:'5dp',
	                    height:Ti.UI.SIZE,
	                    font:bigFont
	                });
	                newRow.add(statusLabel);
				}
                
                var _picture = Ti.UI.createImageView({
                    image:data[i]['images']['low_resolution']['url'],
                    width:'100%',
                });
                newRow.add(_picture);
                
                var likesLabel = Ti.UI.createLabel({
                    text:data[i]['likes']['count'] + ' Likes',
                    left:'5dp',
                    right:'5dp',
                    bottom:'5dp',
                    height:Ti.UI.SIZE,
                    font:smFont
                });
                var likesIcon = Ti.UI.createImageView({
		            image:'images/simulator/heart.png',
		            height:'30dp',
		            left:'5dp'
		        });
		        var likeSection = Ti.UI.createView({
		            backgroundColor:'#fff',
		            height:'30dp',
		            layout:'horizontal',
		        });
		        likeSection.add(likesIcon);
		        likeSection.add(likesLabel);
                newRow.add(likeSection);
            }
            tabledata.push(newRow);
        };
        displayTable.setData(tabledata);
    }
    
    function timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp*1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = month + ' ' + date + ', ' + year;
		return time;
	}
