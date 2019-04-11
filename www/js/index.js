/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // this.receivedEvent('deviceready');
		// console.log(cordova.file);
		
		// deletefile();
		storage = window.localStorage;

		Init();
		try{
			WSHandler(serverip);
		} catch (e)
		{
			$("body").html("<h1>NO WSHANDLER</h1>");
		}
			FastClick.attach(document.body);
		//initFS();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }	
};

document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

var theObj;
var myId;
var storage;
var backupJsonObject;
var ws;
// var serverip="192.168.188.28";
// var serverip="192.168.1.173";
// var serverip="192.168.1.217";
var serverip="192.168.11.28";
// var serverip="192.168.1.28";
var actualMode=null;
var screens;

function WSHandler(ip) {
	console.log('init ws on : '+ip);
	ws = new WebSocket('ws://'+ip+':11000/'+myId,'chat');
	
	ws.onopen = function () {
		console.log("Connected. Prepare sending...");
		// Web Socket is connected, send data using send()
		// if (device.platform=="Android")
		if (device.platform=="Android" || device.platform=="browser")
		{
			var res = {
					message : "plang_init", 
					sender : myId
				};
			actualMode="plang";
			// actualMode="ytplayer";
		}
		/*
		if (device.platform=="browser")
		{
			var res = {
					message : "req_switch_mode", 
					sender : "ytplayer",
					settoserviceid: 4,
				};
			actualMode="ytplayer";
		}	
		*/
		if (device.platform=="iOS")
		 // if (device.platform=="iOS" || device.platform=="browser")
		{
			var res = {
					message : "plang_handler", 
					sender : myId
				};
			actualMode="client";
		}
		ws.send(JSON.stringify(res));
		
		// ws.send("Hey, this is the message :D");
		//alert("Message is sent...");
		//console.log("Message send"); 
	};
	ws.onerror = function () {
		console.log('error occurred!');
	};
	ws.onmessage = function (evt) { 
	  var received_msg = evt.data;
	  //alert("Message is received...");
	  console.log("message received...:" + received_msg);
	  var pjson=JSON.parse(received_msg);
	  switch(pjson.type)
	  {
		  case 'switch_mode' :
			console.log("switch_mode: " + pjson.response.message);
			actualMode=pjson.response.message;
			switch (pjson.response.message)
			{
				case 'ytplayer':
					document.getElementById('theContent').innerHTML='<div id="empty-container"><h1>YT Mode!</h1></div>';
					$("#theContent").css("height","100%");
					$("#theContent").css("min-height","100vh");
					$("#theContent").css("background-color","black");
					if (typeof(player) === 'undefined') 
					{ 
						includeScript("./js/youtubehandler.js", function () 
						{ initYoutube(); }); 
					} else { 
						initYoutube(); onYouTubeIframeAPIReady(); 
					}
					break;
				case 'plang':
					document.getElementById('theContent').innerHTML='<div id="empty-container"><h1>Plang Mode!</h1></div>';
						var res = { message : "plang_init", sender : myId };
						$("#theContent").css("background-color","black");
						ws.send(JSON.stringify(res));
					break;
			}
			break;
		case 'connected_screens':
			if (actualMode =="client")
			{
				screens=pjson.content.Services;
				
				console.log(screens);
			} else {
				//output current mode;
			}
			break;
		
		case 'info_screen_mode':
			if (actualMode == "client")
			{
				for (var _i = 0; _i <= screens.length-1; _i++)
				{
					if (screens[_i].name == pjson.response.sender)
					{
						screens[_i].mode=pjson.response.info;
						if (screens[_i].mode == "ytplayer") { $("#"+_i+"-scrn").html("<i class='fab fa-youtube'> (id: "+screens[_i].name+")</i>"); }
						if (screens[_i].mode == "plang") { $("#"+_i+"-scrn").html("<i class='far fa-address-book'> (id: "+screens[_i].name+")</i>"); }
					}
				}
			}
		
		case 'req_current_mode':
			if (actualMode != "client")
			{
				//output current mode;
				var res = {
						message : "info_mymode_screen", 
						sender : myId,
						info: actualMode
					};
				console.log(res);
				ws.send(JSON.stringify(res));
			}
			break;
		case 'ytplayer' :
			if (actualMode=="ytplayer")
			{
				includeScript("./js/youtubehandler.js", function () {
					$("#theContent").css("background-color","black");
					initYoutube();
				});
			}
			break;
		case 'ytplayer_play':
			if (actualMode=="ytplayer")
			{
				playTube(pjson.response.message);
			}
			break;
		  case 'Plang' : 
		  // console.log(JSON.stringify(pjson.content));
			  if (actualMode=="plang")
			  {
				$("#theContent").css("background-color","black");
				console.log(pjson.content);
				updateContent(JSON.stringify(pjson.content));
				storage.setItem('backup', JSON.stringify(pjson.content));
				$('#theContent').addClass('flex-grid');
				appendHandlerPlang(pjson.content.Date);
				 menuDuJourContainer(pjson.content.Date);
				 motdCheck(pjson.content.Date);
				 PubCheck(pjson.content.Date);
			  }
			break;
		  case 'Fullplang' :
		   if (actualMode=="client")
			  {
				includeScript("./js/ipadPlangHandler.js", function () {
					$("#theContent").css("background-color","#F2EEEB");
					storage.setItem('backup', JSON.stringify(pjson.content));
					showPlangHandler(JSON.stringify(pjson.content));
					appendEventHandlers();
					getConnectedScreens();
					$('#theContent').removeClass('flex-grid');
					includeScript("./js/youtubehandler.js", function () {});
				});
			  }
			break;
		  case 'single_update' :
			if (actualMode=="client")
			{
				//update full tree
				var res = {
					message : "plang_handler", 
					sender : myId
				};
				ws.send(JSON.stringify(res));
			}
			SingleUpdate(pjson.response.concernuserid, pjson.response.settoserviceid, pjson.response.userdata, pjson.response.info);
			
			break;
	  }
	  
   };
   ws.onclose = function() { 
	  // websocket is closed.
	  //alert("Connection is closed..."); 
	  console.log("connection closed..");
	  console.log("tyring reconnect in 1 seconds...");
	  setTimeout(function(){ GetServerIp(); WSHandler(serverip); }, 1000);
   };
}

function revisedRandId() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

app.initialize();

function GetServerIp() {
	$.ajax({
			type:	"POST",
			url:	"http://intern.autisme.lu/remote/getServerIp.ajax.php",
			success: function (result) {
				if (result.result)
				{
					serverip=result.serverip;
					console.log('serverip => '+serverip);
				}
			}
		});
}

function SingleUpdate(usid, servid, userdata, fullday)
{
	// var usid;
	
	console.log("single_update launch");
	console.log("sul: "+usid+" | "+servid+" |  "+fullday);
	console.log(userdata);
	//find service name by id
	
	var ateliername=null;
	var bckp = JSON.parse(storage.getItem('backup'));
	
	for (var _i=0;_i <= bckp.Services.length -1;_i++)
	{
		if (bckp.Services[_i].id==servid)
		{
			ateliername=bckp.Services[_i].name;
		}
	}

	if (fullday==1 || fullday==2) $('#'+usid+'-1').remove();
	if (fullday==1 || fullday==3) $('#'+usid+'-2').remove();

	var fdel="\'img/personal/";
	var edel="\'";
	if (userdata.photo.substring(0,4)=="data" || userdata.photo.substring(0,4)=="http")
	{
		fdel="";
		edel="";
	}
	
	if (userdata.isencadrant)
	{
		if (ateliername=="Congé" || ateliername=="Krank" || ateliername=="Formatioun" || ateliername=="Maart")
		{
			
			$('<div/>',{id: usid+"-1", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-x0');
			if (fullday==1) { $('<div/>',{class:"numm cldag", text: "Dag"}).appendTo('#'+usid+"-1"); }
			if (fullday==2) { $('<div/>',{class:"numm clmoies", text: "Moies"}).appendTo('#'+usid+"-1"); }
			if (fullday==3) { $('<div/>',{class:"numm clmettes", text: "Mëttes"}).appendTo('#'+usid+"-1"); }
		} else {
			if (fullday==1 || fullday==2) $('<div/>',{id: usid+"-1", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-e1');
			if (fullday==1 || fullday==3) $('<div/>',{id: usid+"-2", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-e2');
			if (ateliername=="Doku")
			{
				if (fullday==1 || fullday==2) $('<div/>',{id: usid+"-1", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-x1');
				if (fullday==1 || fullday==3) $('<div/>',{id: usid+"-2", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-x2');
			}
			
			if (userdata.photo=="placeholder.png" || fdel=="")
			{
				$('<div/>',{class:"nummplaceholder", text: userdata.virnumm}).appendTo('#'+usid+"-1");
				$('<div/>',{class:"nummplaceholder", text: userdata.virnumm}).appendTo('#'+usid+"-2");
			}
		}
	} else {
		if (ateliername=="Congé" || ateliername=="Krank" || ateliername=="Formatioun" || ateliername=="Maart")
		{
			$('<div/>',{id: usid+"-1", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-x2');
			if (fullday==1) { $('<div/>',{class:"numm cldag", text: "Dag"}).appendTo('#'+usid+"-1"); }
			if (fullday==2) { $('<div/>',{class:"numm clmoies", text: "Moies"}).appendTo('#'+usid+"-1"); }
			if (fullday==3) { $('<div/>',{class:"numm clmettes", text: "Mëttes"}).appendTo('#'+usid+"-1"); }
		} else {
			if (fullday==1 || fullday==2) $('<div/>',{id: usid+"-1", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-u1');
			if (fullday==1 || fullday==3) $('<div/>',{id: usid+"-2", style: "background-image:url("+fdel+userdata.photo+edel+")" ,class:"photo"}).appendTo('#'+servid+'-u2');
			
			if (userdata.photo=="placeholder.png" || fdel=="")
			{
				$('<div/>',{class:"nummplaceholder", text: userdata.virnumm}).appendTo('#'+usid+"-1");
				$('<div/>',{class:"nummplaceholder", text: userdata.virnumm}).appendTo('#'+usid+"-2");
			}
		}
	}
}
	
function deUmlaut(value,space=true){
  value = value.toLowerCase();
  value = value.replace(/ä/gi, 'ae');
  value = value.replace(/ö/gi, 'oe');
  value = value.replace(/ü/gi, 'ue');
  value = value.replace(/ß/gi, 'ss');
  value = value.replace(/é/gi, 'e');
  value = value.replace(/è/gi, 'e');
  value = value.replace(/ä/gi, 'a');
  value = value.replace(/ü/gi, 'u');
  value = value.replace(/ö/gi, 'o');
  value = value.replace(/ë/gi, 'e');
  value = value.replace(/ê/gi, 'e');
  value = value.replace(/â/gi, 'a');
  if (space){value = value.replace(/ /gi, '_');}
  value = value.replace(/'/gi, '');
  
  return value;
}

function Init() {
	GetServerIp();
	var bckjsonstr="{\"Services\":[{\"name\":\"infomedia\",\"c\":3,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"c\":3,\"name\":\"backoffice\",\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"name\":\"gaart\",\"c\":4,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"name\":\"waescherei\",\"c\":1,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"}]}]}";
	var obj=JSON.parse(bckjsonstr);
	var objstring=JSON.stringify(obj);

	if (storage.getItem('backup')!=null && device.platform=="Android")
	{
		updateContent(storage.getItem('backup'));
	}
	
	if (storage.getItem('myId')==null)
	{
		storage.setItem('myId', revisedRandId());
		myId=storage.getItem('myId');
	} else {
		myId=storage.getItem('myId');
	}
	
	if (device.platform=="iOS" || device.platform=="browser")
	{
		var content='<div id="empty-container"><h1>Nët verbonn!</h1></div>';
		document.getElementById('theContent').innerHTML=content;
	}
}


function loadBackup() {
	var bckjsonstr="{\"Services\":[{\"name\":\"infomedia\",\"c\":3,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"c\":3,\"name\":\"backoffice\",\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"name\":\"gaart\",\"c\":4,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":101,\"numm\":\"Paulchen\"}]},{\"name\":\"waescherei\",\"c\":1,\"encadrantsMoies\":[{\"id\":159,\"numm\":\"Jill\"}],\"usagersMoies\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"}],\"encadrantsMettes\":[{\"id\":159,\"numm\":\"Jill\"}],\"usagersMettes\":[{\"id\":159,\"numm\":\"Jill\"},{\"id\":159,\"numm\":\"Jill\"}]}]}";
	
	if (storage.getItem('backup')==null)
	{
		storage.setItem('backup', JSON.parse(bckjsonstr));
	}
}
/*
function consoler(entry) {
	var parentElement = document.getElementById('consolas');
	var node = document.createElement('p');
	var text = document.createTextNode(entry);
	node.appendChild(text);
	parentElement.appendChild(node);
}
*/
function OnGotUpdate(id)
{
	var thesvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	thesvg.setAttributeNS (null, "width", "90");
	thesvg.setAttributeNS (null, "height", "100%");
	
	var thepath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	thepath.setAttributeNS (null, 'class', "check");
	thepath.setAttributeNS (null, 'd', "M10, 30 l30,50 l60,-70");
	
	thesvg.appendChild(thepath);
	$( "#"+id+"-1" ).append(thesvg);
	
	$( "#"+id+"-1" ).delay(2000).queue(function(next){
		document.getElementById(id+"-1").removeChild(thesvg);
		next();
	});
}

function includeScript(path, cb) {
    var node = document.createElement("script"), 
        okHandler,
        errHandler;
        
    node.src = path;

    okHandler = function () {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb();
    };
    errHandler = function (error) {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb("Error loading script: " + path);
    };

    node.addEventListener("load", okHandler);
    node.addEventListener("error", errHandler);

    document.body.appendChild(node);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

function onOffline() {
	if (!$('#theContent').hasClass('offlineoverlay')){
		$('<div/>',{id:"offlineoverlay",class:"offlineoverlay"}).appendTo('#theContent');
		$('<p/>',{class:"offlineoverlaytext",text:"net mam Reseau verbonn!"}).appendTo('#offlineoverlay');
	}
}

function onOnline() {
		$('#offlineoverlay').remove();
}