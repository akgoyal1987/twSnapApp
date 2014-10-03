    var win = Titanium.UI.currentWindow;
    win.backgroundColor = '#ccc';
    var pageName = win.pageData;
    var pageData = Ti.App.Properties.getObject(pageName);
    
    var fbURL = pageData.pageField;
    //var fbURL = 'NaninkPhotoDesign';

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
    var tabledata = [];
    var displayTable = Ti.UI.createTableView({
        data:tabledata,
        width:'100%',
        top:'60dp',
        backgroundColor:'transparent',
        separatorColor:'transparent'
    });
    win.add(displayTable);
    
    //var profilePic;
	
	getProfileImage();
	//Register();
	
	function getProfileImage(){
        var url = 'https://graph.facebook.com/' + fbURL + '/photos?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 var data = JSON.parse(this.responseText).data;
                 var profilePic = data[0].picture;
                 Ti.API.info(profilePic);
                 getMainData(profilePic);
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
	
	function getMainData(profilePic){
	    var url = 'https://graph.facebook.com/' + fbURL + '?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk&fields=about,location,cover,likes,category,name';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 var data = JSON.parse(this.responseText);
                 
                 Ti.API.info(data);
                 Register(data, profilePic);
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
	

    function Register(header, profilePic){
        var url = 'https://graph.facebook.com/' + fbURL + '/feed?access_token=103458446491218|a1rId3qAjU7jiWgyFkQVsVZbLVk&fields=caption,description,type,from,full_picture,picture,created_time,message,story';
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info("Received text: " + this.responseText);
                 var data = JSON.parse(this.responseText).data;
                 createDisplayTable(data, header, profilePic);
                 LoadingLabel.text = '';
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 //alert('error');
             },
             timeout : 5000  // in milliseconds
        });
        
        
        //client.open("GET", url);
        client.open("GET", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send();
        //client.send();
    }
    
    function createDisplayTable(data, header, profilePic){
        Ti.API.info(data);
        tabledata = [];
        var headerRow = Titanium.UI.createTableViewRow({
            height:'280dp',
            backgroundColor:'#fff'
        });
        
        var coverPhoto = Titanium.UI.createImageView({
            image:header.cover.source,
            width:'110%',
            bottom:'120dp',
        });
        headerRow.add(coverPhoto);
        
        var lowerView = Ti.UI.createView({
            backgroundColor:'#fff',
            height:'120dp',
            width:'100%',
            bottom:'0dp'
        });
        headerRow.add(lowerView);
        
        var profilePicture = Ti.UI.createImageView({
            height:'80dp',
            width:'80dp',
            borderRadius:8,
            borderWidth:2,
            borderColor:'#ccc',
            bottom:'80dp',
            image:profilePic,
            backgroundColor:'#fff'
        });
        headerRow.add(profilePicture);
        
        var fbpageName = Ti.UI.createLabel({
            text:header.name,
            font:bigFont,
            top:'207dp'
        });
        headerRow.add(fbpageName);
        
        var category = Ti.UI.createLabel({
            text:header.category,
            font:smFont,
            top:'227dp'
        });
        headerRow.add(category);
        
        var lowerStrip = Ti.UI.createView({
            height:'30dp',
            width:'100%',
            layout:'horizontal',
            bottom:'0dp'
        });
        headerRow.add(lowerStrip);
        
        var likesIcon = Ti.UI.createImageView({
            image:'images/simulator/heart.png',
            height:'25dp',
            left:'5dp'
        });
        lowerStrip.add(likesIcon);
        
        var likes = Ti.UI.createLabel({
            text:header.likes,
            font:smFont
        });
        lowerStrip.add(likes);
        if(header.location){
            var locationIcon = Ti.UI.createImageView({
                image:'images/simulator/Location.png',
                height:'30dp',
                left:'25dp'
            });
            lowerStrip.add(locationIcon);
            
            var locationText = Ti.UI.createLabel({
                text:header.location.city + ', ' + header.location.state,
                font:smFont
            });
            lowerStrip.add(locationText);
        }

        tabledata.push(headerRow);
        
        for (var i=0; i < data.length; i++) {
            var newRow = Titanium.UI.createTableViewRow({
                top:'15dp',
                height:Ti.UI.SIZE,
                width:'90%',
                backgroundColor:'#fff',
                layout:'vertical'
            });
            
            var createdDate = data[i].created_time.split('T');
            var separateDate = createdDate[0].split('-');
            
            var postDate = cleanDate(separateDate);
            
            var rowLabel = Ti.UI.createLabel({
                text:postDate,
                font:smFont,
                top:'5dp',
                left:'5dp'
            });
            
            newRow.add(rowLabel);
            
            if(data[i].type=='status'){
                var statusLabel = Ti.UI.createLabel({
                    text:data[i].message ? data[i].message : data[i].story ? data[i].story : '',
                    left:'5dp',
                    right:'5dp',
                    height:Ti.UI.SIZE,
                    bottom:'5dp',
                    font:bigFont
                });
                
                newRow.add(statusLabel);
            }
            if(data[i].type=='link'){
                var statusLabel = Ti.UI.createLabel({
                    //text:data[i].caption + '\n' + data[i].description,
                    text:data[i].description ? data[i].description : data[i].caption ? data[i].caption : data[i].story ? data[i].story : '',
                    left:'5dp',
                    right:'5dp',
                    bottom:'5dp',
                    height:Ti.UI.SIZE,
                    font:bigFont
                });
                newRow.add(statusLabel);
                
                var _picture = Ti.UI.createImageView({
                    image:data[i].full_picture,
                    width:'100%',
                });
                newRow.add(_picture);
            }
            if(data[i].type=='photo'){
                var statusLabel = Ti.UI.createLabel({
                    text:data[i].description ? data[i].description : data[i].caption ? data[i].caption : data[i].story ? data[i].story : '',
                    left:'5dp',
                    right:'5dp',
                    bottom:'5dp',
                    height:Ti.UI.SIZE,
                    font:bigFont
                });
                newRow.add(statusLabel);
                
                var _picture = Ti.UI.createImageView({
                    image:data[i].full_picture,
                    width:'100%',
                });
                newRow.add(_picture);
            }
            
            //var 
            tabledata.push(newRow);
        };
        displayTable.setData(tabledata);
    }

    function cleanDate(data){
        var month;
        switch (data[1]){
            case '01':
                month = 'Jan';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '02':
                month = 'Feb';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '03':
                month = 'Mar';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '04':
                month = 'Apr';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '05':
                month = 'May';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '06':
                month = 'Jun';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '07':
                month = 'Jul';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '08':
                month = 'Aug';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '09':
                month = 'Sep';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '10':
                month = 'Oct';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '11':
                month = 'Nov';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
            case '12':
                month = 'Dec';
                return(month + ' ' +data[2] + ', ' +data[0]);
                break;
        }
    }
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

    