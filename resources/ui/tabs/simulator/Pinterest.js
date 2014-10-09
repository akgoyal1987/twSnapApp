    var win = Titanium.UI.currentWindow;
    win.backgroundColor = '#ccc';
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
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
    
    var pageTitle = Titanium.UI.createLabel({
        text:pageData.pageTitle,
        font:formFont
    });
    
    header.add(pageTitle);
    
    var LoadingLabel = Ti.UI.createLabel({
        text:'Loading... Please Wait',
        font:customFont
    });
    
    win.add(LoadingLabel);
    
    saveButton = Ti.UI.createImageView({
       image:'/images/simulator/backButton.png',
       left:'5dp',
       top:'15dp',
    });
    
    saveButton.addEventListener('click', function()
    {
       win._sim.remove(win);
    });
    
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
    
    var pinterestUser = pageData.pageField;
    
    getPinterest();
    
    function getPinterest(){
    	if(pinterestUser == null || pinterestUser == ''){
    		LoadingLabel.text = 'User name is empty.';
    		return;
    	}
        var url = 'https://api.pinterest.com/v3/pidgets/users/' + pinterestUser + '/pins';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 var data = JSON.parse(this.responseText).data;
                 
                 createDisplayTable(data);
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 LoadingLabel.text = 'Error occured';
             },
             timeout : 5000 
        });
        client.open("GET", url);
        client.send();
    }
    
    function createDisplayTable(data){
    	LoadingLabel.text = '';
    	
    	tabledata = [];
    	
        var headerOutRow = Titanium.UI.createTableViewRow({
            backgroundColor:'#fff',
            width:'100%',
            height:Ti.UI.SIZE,
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
            image:data['user']['image_small_url'],
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
        
        var profileName = data['user']['full_name'];
        if( profileName == '' )
        	profileName = pinterestUser;
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
            width:'50%'
        });
        infoPanel.add(postPanel);
        
        var postCount = Ti.UI.createLabel({
            text:data['user']['pin_count'],
            font:smFont,
            left:'0dp'
        });
        postPanel.add(postCount);
        var postTitle = Ti.UI.createLabel({
            text:'Pins',
            font:smFont,
            left:'0dp'
        });
        postPanel.add(postTitle);
        
        var followerPanel = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'35dp',
            layout:'vertical',
            width:'50%'
        });
        infoPanel.add(followerPanel);
        
        var followerCount = Ti.UI.createLabel({
            text:data['user']['follower_count'],
            font:smFont,
            left:'0dp'
        });
        followerPanel.add(followerCount);
        var followerTitle = Ti.UI.createLabel({
            text:'Followers',
            font:smFont,
            left:'0dp'
        });
        followerPanel.add(followerTitle);
        
        var seperatePanel = Ti.UI.createView({
	        backgroundColor:'#fff',
            height:'10dp',
            layout:'vertical',
            width:'100%'
        });
        headerOutRow.add(seperatePanel);
        if( data['user']['about'] != '' ){
        	var aboutPanel = Ti.UI.createView({
	            backgroundColor:'#fff',
	            height:Ti.UI.SIZE,
	            layout:'vertical',
	            width:'94%',
	            left:'3%',
	        });
	        
	        var aboutTitle = Ti.UI.createLabel({
	            text:'About',
	            font:bigFont,
	            left:'10dp'
	        });
	        aboutPanel.add(aboutTitle);
	        
	        var aboutContent = Ti.UI.createLabel({
	            text:data['user']['about'],
	            font:smFont,
                left:'5dp',
                right:'5dp',
                top:'5dp',
                height:Ti.UI.SIZE
	        });
	        aboutPanel.add(aboutContent);
	        
	        headerOutRow.add(aboutPanel);
	        headerOutRow.add(seperatePanel);
        }
        if( data['user']['location'] != '' ){
        	var locationPanel = Ti.UI.createView({
	            backgroundColor:'#fff',
	            height:Ti.UI.SIZE,
	            layout:'vertical',
	            width:'94%',
	            left:'3%',
	        });
	        
	        var locationTitle = Ti.UI.createLabel({
	            text:'Location',
	            font:bigFont,
	            left:'10dp'
	        });
	        locationPanel.add(locationTitle);
	        
	        var locationContent = Ti.UI.createLabel({
	            text:data['user']['location'],
	            font:smFont,
                left:'5dp',
                right:'5dp',
                top:'5dp',
                height:Ti.UI.SIZE
	        });
	        locationPanel.add(locationContent);
	        
	        headerOutRow.add(locationPanel);
	        headerOutRow.add(seperatePanel);
        }
        
		
        
        

        tabledata.push(headerOutRow);
        
        var pins = data['pins']; 
        for (var i=0; i < pins.length; i++) {
            var newRow = Titanium.UI.createTableViewRow({
                top:'15dp',
                height:Ti.UI.SIZE,
                width:'90%',
                backgroundColor:'#fff',
                layout:'vertical'
            });
            
            if( !pins[i]['is_video'] ){
            	if ( pins[i]['description'] != null ){
	                var statusLabel = Ti.UI.createLabel({
	                    text:pins[i]['description'],
	                    left:'5dp',
	                    right:'5dp',
	                    top:'5dp',
	                    height:Ti.UI.SIZE,
	                    font:bigFont
	                });
	                newRow.add(statusLabel);
				}
                
                var _picture = Ti.UI.createImageView({
                    image:pins[i]['images']['237x']['url'],
                    width:'100%',
                });
                newRow.add(_picture);
                
                var likesLabel = Ti.UI.createLabel({
                    text:pins[i]['like_count'] + ' Likes',
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
    
