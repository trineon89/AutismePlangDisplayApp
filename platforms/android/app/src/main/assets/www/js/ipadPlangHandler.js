function request_fresh()
{
	var res = {
		message : "plang_handler", 
		sender : myId
	};
	ws.send(JSON.stringify(res));
}

function showPlangHandler(serviceJSON) {
	// var content = showPlangHandlerFunction(serviceJSON);
	var content = showPlangHandlerFunctionv2(serviceJSON);
	content+=getConfig();
	document.getElementById('theContent').innerHTML=content;
}

function getConfig() {
	var shtml = "";
	shtml+='<div id="reconnect-button-container"><i style="font-size:24pt;color:#0a328c;" class="fas fa-sync"></div>';
	shtml+='<div id="config-icon-container"><div id="config-icon" class="config-icon-autisme"></div></div>';
	shtml+='<div id="config-container">';
	shtml+='<div class="config-innercontainer">';
	shtml+='<i id="1-yt" class="modesel fab fa-youtube"> Plang 1 -> Youtube-Mode</i><br /><i id="1-plang" class="modesel far fa-address-book"> Plang 1 -> Plang-Mode</i>';
	shtml+='</div>';
	shtml+='</div><script src="https://apis.google.com/js/api.js"></script>';
	
	return shtml;
}

function getConnectedScreens() {
	var res = {
			message : "req_connected_screens", 
			sender : myId
		};
	console.log(res);
	ws.send(JSON.stringify(res));
}

function showPlangHandlerFunctionv2(serviceJSON) {
	console.log("showPlangHandler");
	
	if (serviceJSON==null) { serviceJSON=storage.getItem('backup'); }
	var theJson = JSON.parse(serviceJSON);
	
	var SHTML = '';
	SHTML+= "<h1 class='title' id='title'>";
	// https://stackoverflow.com/questions/2812770/add-centered-text-to-the-middle-of-a-hr-like-line (line in title)
	SHTML+= "<div style='width: 100%; height: 35px; border-bottom: 1px solid #0A328C; text-align: center;'>";
	SHTML+= "<span style='font-size: 40px; background-color: #F2EEEB; padding: 0 10px;'>Wielt äre Service</span></div></h1><div id='container'>";
	SHTML+= "<div class='screen'>";
	for (var _i=0;_i <= 6;_i++)
	{
		serviceJS=theJson.Services[_i];
		SHTML+= "<div class='service' id='"+theJson.Services[_i].name+"'><div id='"+theJson.Services[_i].name+"-a'><img class='service-img' id='"+theJson.Services[_i].name+"-img' src='img/servicesnew/"+deUmlaut(theJson.Services[_i].name)+".png' alt='"+theJson.Services[_i].name+"' /></div></div>";	
	}
	SHTML+= "</div><hr class='spacer'><div class='screen'>";
	ci=0;
	for (var _i=7;_i <= 12;_i++)
	{
		serviceJS=theJson.Services[_i];
		if (ci==3) { SHTML+='<break></break>'; }
		SHTML+= "<div class='service service2' id='"+theJson.Services[_i].name+"'><div id='"+theJson.Services[_i].name+"-a'><img class='service-img' id='"+theJson.Services[_i].name+"-img' src='img/servicesnew/"+deUmlaut(theJson.Services[_i].name)+".png' alt='"+theJson.Services[_i].name+"' /></div></div>";
		ci++;
	}	
	SHTML+= "</div><hr class='spacer'><div class='screen'>";
	ci=0;
	for (var _i=13;_i <= theJson.Services.length -1;_i++)
	{
		if (ci==3) { SHTML+='<break></break>'; }
		serviceJS=theJson.Services[_i];
		SHTML+= "<div class='service service2' id='"+theJson.Services[_i].name+"'><div id='"+theJson.Services[_i].name+"-a'><img class='service-img' id='"+theJson.Services[_i].name+"-img' src='img/servicesnew/"+deUmlaut(theJson.Services[_i].name)+".png' alt='"+theJson.Services[_i].name+"' /></div></div>";
		ci++;
	}
	SHTML+="</div></div>";
	return SHTML;
}

function goBack()
{
	var result=showPlangHandler(null);
	// document.getElementById('theContent').innerHTML=result;
	appendEventHandlers();
}

function appendEventHandlers()
{
	$("div.service").bind("click", function(ev) { ShowService(ev.target.alt); });
	
	$("#reconnect-button-container").bind("click", function() {request_fresh();});
	
	$("div.phphoto").bind("taphold", tapholdHandler);
	$("#moveService").bind("click", function(ev) {document.getElementById("phmodalservseltime").style.display = "block";} );
	//$("#moveService").bind("click", function(ev) {document.getElementById("phmodalservsel").style.display = "block";} );
	
	$('#btn_moies').bind("click", function(ev) { document.getElementById("phmodalservsel").style.display = "block"; document.getElementById("phmodalservseltime").style.display = "none";$('#hiddenusermoveday').val('2');} );
	$('#btn_mettes').bind("click", function(ev) { document.getElementById("phmodalservsel").style.display = "block"; document.getElementById("phmodalservseltime").style.display = "none";$('#hiddenusermoveday').val('3');} );
	$('#btn_dag').bind("click", function(ev) { document.getElementById("phmodalservsel").style.display = "block"; document.getElementById("phmodalservseltime").style.display = "none";$('#hiddenusermoveday').val('1');} );
	
	$("div.smallservice").bind("click", function(ev) { popupSelectAtelier(ev.currentTarget.id); });
	
	$("div.flipit").click(flipThis);
	// $("div.flipit").bind("click", tapholdHandler);
	
	$("#config-icon").bind("click", function(ev) { getConnectedScreens(); popupConfig(); });
	
	$("#1-yt").bind("click", function(ev) { setModeTo("ytplayer", 1); });
	$("#1-plang").bind("click", function(ev) { setModeTo("plang", 1); });
	
}

function ModeSelector(ev)
{
	var s = ev.currentTarget;
	var n = $(s).attr("name");
	var targetarr = n.split('-');
	var sid = targetarr[0];
	console.log(sid);
	/*
	result+="</div>";
	result+="<div class='phmodal' id='phmodalservseltime'>";
	result+="<div class='modalcontent' id='selectservicecontainer'><h2>Wéi laang?</h2><div class='popupButtons' id='btn_moies'>Moies</div><div class='popupButtons' id='btn_mettes'>Mëttes</div><div class='popupButtons' id='btn_dag'>ganzen Dag</div></div>"
	result+="</div>";
	*/
	$('#phmodalModeSel').remove();
	$('<div/>',{id:"phmodalModeSel",class:"phmodal"}).appendTo('#theContent');
	$('<div/>',{id:"phmodalModeSel-content",class:"phmodal-container"}).appendTo('#phmodalModeSel');
	$("#phmodalModeSel-content").html("<i id='setpl' class='setpl iconselector far fa-address-book'></i><i id='setyt' class='setyt iconselector fab fa-youtube'></i>");
	
	document.getElementById("phmodalModeSel").style.display="block";
	
	$("i.setpl").bind("click", function() {setModeTo("plang" ,sid);} );
	$("i.setyt").bind("click", function() {setModeTo("ytplayer" ,sid);} );
}

function setModeTo(mode, screenid)
{
	console.log(mode+" -> "+screenid);
	var res = {
			message : "req_switch_mode", 
			sender : mode,
			settoserviceid: screenid,
		};
	console.log(res);
	ws.send(JSON.stringify(res));
	
	$('#phmodalModeSel').remove();
}

function popupConfig()
{
	document.getElementById("config-container").style.display = "block";
	$('.config-innercontainer').html("");
	for (var _i = 0; _i <= screens.length-1; _i++)
	{
		$('<div/>',{id: _i+"-scrn", text:_i+1,name:screens[_i].id,class:"screenclass","data-attrib":screens[_i].name}).appendTo('.config-innercontainer');
		if (screens[_i].mode == undefined) { $("#"+_i+"-scrn").html("<i class='far fa-question-circle'> (id: "+screens[_i].name+")</i>"); }
		if (screens[_i].mode == "ytplayer") { $("#"+_i+"-scrn").html("<i class='fab fa-youtube'> (id: "+screens[_i].name+")</i>"); }
		if (screens[_i].mode == "plang") { $("#"+_i+"-scrn").html("<i class='far fa-address-book'> (id: "+screens[_i].name+")</i>"); }
		
	}
	
	$('<div/>',{id:'gogoYoutube',text:"Youtube Handler"}).appendTo('.config-innercontainer');
	$('<div/>',{id:'gogoPicture',text:"Foto machen"}).appendTo('.config-innercontainer');
	$("div.screenclass").bind("click", function(ev) {ModeSelector(ev);} );
	$("#gogoYoutube").bind("click", function(ev)  {YoutubeSearchWidget();} );
	$("#gogoPicture").bind("click", function(ev)  {PhotoWidget();} );
}

function PhotoWidget()
{
	$('#phmodalPHOTOWidget').remove();
	$('<div/>',{id:"phmodalPHOTOWidget",class:"phmodal"}).appendTo('#theContent');
	$('<div/>',{id:"phmodalPHOTOWidget-content",class:"phmodal-container"}).appendTo('#phmodalPHOTOWidget');
	$("#phmodalPHOTOWidget-content").html("<h1>Neie Benotzer uleen</h1><input id='inpVirnumm' name='inpVirnumm' type='text' placeholder='Virunumm'><input id='inpNumm' name='inpNumm' type='text' placeholder='Numm'><label><input type='checkbox' id='chk-isEncadrant' name='chk-isEncadrant'> Encadrant?</label><label>Service:</label><div class='styled-select'><select name='sel-service' id='sel-service'></select></div><button type='button' class='searchbutton' id='btnPhoto'>Foto maachen</button><div id='thewidgetcontent' style='height:491px;overflow-y:scroll;'><img id='preview-image' src=''></img><button type='button' id='sendPhotoData'>Späicheren</button></div>");
	
	$.ajax({
			type:	"POST",
			url:	"http://intern.autisme.lu/remote/getServicesForOption.ajax.php",
			success: function (result) {
				if (result.result)
				{
					for (var _i =0; _i < result.options.length; _i++)
					{
						$('<option/>',{value:result.options[_i].value,text:result.options[_i].text}).appendTo('#sel-service');
					}
				}
			}
		});
	
	document.getElementById("phmodalPHOTOWidget").style.display="block";
	$('#inpVirnumm').focus();
	
	document.getElementById("btnPhoto").addEventListener("click", cameraGetPicture);
	
	$("#sendPhotoData").bind("click", function(ev) {
		var e = document.getElementById("sel-service");
		var optionId = e.options[e.selectedIndex].value;
		var isenc = true;
		//if ($('#chk-isEncadrant')[0].checked) { } else { isenc=false; }
		var res = {
			message : "req_insert_new", 
			userdata : {
				numm : document.getElementById('inpNumm').value,
				virnumm : document.getElementById('inpVirnumm').value,
				isencadrant : $('#chk-isEncadrant')[0].checked,
				id : optionId,
				photo : document.getElementById('preview-image').src
			}
		};
		console.log(res);
		ws.send(JSON.stringify(res));
	} );
}

function cameraGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, { quality: 45,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
	  encodingType: Camera.EncodingType.JPEG,
	  targetWidth: 124,
	  targetHeight: 193
   });

   function onSuccess(imageData) {
      var image = document.getElementById('preview-image');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }

}

function YoutubeSearchWidget()
{
	$('#phmodalYTWidget').remove();
	$('<div/>',{id:"phmodalYTWidget",class:"phmodal"}).appendTo('#theContent');
	$('<div/>',{class:"phmodal-container"}).appendTo('#phmodalYTWidget');
	$(".phmodal-container").html("<input id='inpText' name='inpText' type='text'><button type='button' class='searchbutton' id='btnSearch'>Sich</button><div id='thewidgetcontent' style='height:491px;overflow-y:scroll;'></div>");
	
	document.getElementById("phmodalYTWidget").style.display="block";
	$('#inpText').focus();
	
	
	$('#btnSearch').bind("click", function() { ytSearch($('#inpText').val()); } );
}

function popupSelectAtelier(targetId) {
	var targetarr = targetId.split('-');
	var sid = targetarr[0];
	var humd=$('#hiddenusermoveday').val();
	var usid=$('#hiddenuserid').val();
	setToOtherService(usid ,sid, humd);
	if (humd==1 || humd==2) $('#'+usid+'-1').remove();
	if (humd==1 || humd==3) $('#'+usid+'-2').remove();
	document.getElementById("phmodal").style.display="none";
	document.getElementById("phmodalservsel").style.display="none";
	document.getElementById("phmodalservseltime").style.display="none";
}

function tapholdHandler(ev) {
	console.log(ev);
	var target=ev.currentTarget.parentElement.parentElement.id;
	var targetarr = target.split('-');
	var userdata=getUserDataById(targetarr[0]);
	$('#modalTitle').text(userdata.virnumm+" "+userdata.numm);
	$('#hiddenuserid').val(userdata.id);
	var modal = document.getElementById("phmodal");
	modal.style.display = "block";
}

function getTapHoldPopup() {
	var result="";
	result+="<div class='phmodal' id='phmodal'>";
	result+="<div class='modalcontent'>";
	result+="<h1 id='modalTitle'>_PlaceHolder_</h1>";
	result+="<span id='moveService' class='popupButtons'>An en aneren Service sätzen</span>";
	result+="<input type='hidden' id='hiddenuserid'>";
	result+="<input type='hidden' id='hiddenusermoveday'>";
	result+="</div>";
	result+="</div>";
	result+="<div class='phmodal' id='phmodalservsel'>";
	result+=getServiceSelectorForPopup();
	result+="</div>";
	result+="<div class='phmodal' id='phmodalservseltime'>";
	result+="<div class='modalcontent' id='selectservicecontainer'><h1>Wéi laang?</h1><div class='popupButtons' id='btn_moies'>Moies</div><div class='popupButtons' id='btn_mettes'>Mëttes</div><div class='popupButtons' id='btn_dag'>ganzen Dag</div></div>"
	result+="</div>";
	return result;
}

function setToOtherService(userid, serviceid, humd=1) {
	var res = {
			message : "req_update_user", 
			sender : myId,
			concernuserid : userid,
			settoserviceid: serviceid,
			info: humd
		};
		console.log(res);
		ws.send(JSON.stringify(res));
}

window.onclick = function(event) {
	var modal = document.getElementById("phmodal");
	var smodal = document.getElementById("phmodalservsel");
	var stmodal = document.getElementById("phmodalservseltime");
	var stpmodal = document.getElementById("phmodalModeSel");
	var cnfmdl = document.getElementById("config-container");
	var ytsearch = document.getElementById("phmodalYTWidget");
	var photowidh = document.getElementById("phmodalPHOTOWidget");
	
	if (event.target == modal) {modal.style.display = "none";}
	if (event.target == smodal) {smodal.style.display = "none";}
	if (event.target == stmodal) {stmodal.style.display = "none";}
	if (event.target == stpmodal) {stpmodal.style.display = "none";}
	if (event.target == cnfmdl) {cnfmdl.style.display = "none";}
	if (event.target == cnfmdl) {cnfmdl.style.display = "none";}
	if (event.target == photowidh) {photowidh.style.display = "none";}
}

function getServiceSelectorForPopup()
{
	var serviceJSON = storage.getItem('backup');
	var theJson = JSON.parse(serviceJSON);
	var singleService;
	var result="";
	result+="<div id='smallservicecontainer'><h1>A weieen Service sätzen?</h1>";
	//
	for (_i = 0;_i < theJson.Services.length;_i++)
	{
		result+= "<div class='smallservice' id='"+theJson.Services[_i].id+"-"+theJson.Services[_i].name+"'><div id='"+theJson.Services[_i].name+"-a'><img class='service-img' id='"+theJson.Services[_i].name+"-img' src='img/servicesnew/"+deUmlaut(theJson.Services[_i].name)+".png' alt='"+theJson.Services[_i].name+"' /></div></div>";
	}
	result+="</div>";
	return result;
}

function flipThis(e)
{
	var $this;
	$this = $(this);
	var card = $this.find('.flipcard');
	var front = $this.find('.flipcard-front');
    var back = $this.find('.flipcard-back');
	var tallerHight = Math.max(front.height(), back.height()) + 'px';
	var visible = front.hasClass('ms-front-flipped') ? back : front;
    var invisible = front.hasClass('ms-front-flipped') ? front : back;
	var hasTransitioned = false;
    var onTransitionEnded = function () {
			hasTransitioned = true;
			card.css({
				'min-height': '0px'
			});
			visible.css({
				display: 'none',
			});
			// setting focus is important for keyboard users who might otherwise
			// interact with the back of the card once it is flipped.
			invisible.css({
				position: 'relative',
				display: 'inline-block',
			});
	}
	card.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", onTransitionEnded);

	// for browsers that do not support transitions, like IE9
	setTimeout(function () {
		if (!hasTransitioned) {
			onTransitionEnded.apply();
		}
	}, 2000);

	invisible.css({
		position: 'absolute',
		display: 'inline-block'
	});

	card.css('min-height', tallerHight);
	// card.css('min-height', tallerHight);
	// the IE way: flip each face of the card
	front.toggleClass('ms-front-flipped');
	back.toggleClass('ms-back-flipped');
	// the webkit/FF way: flip the card
	card.toggleClass('card-flipped');
		
}

function getPersonBuilderAtelier(json,sel)
{
	var fdel="img/personal/";
	var result='';
		var edel="";
		if (json.photo.substring(0,4)=="data" || json.photo.substring(0,4)=="http")
		{
			fdel="";
			edel="";
		}
		result+="<div class='flipit' id='"+json.id+"-"+sel+"'><div class='flipcard'>";
		// if ()
		if (typeof(json.info) !== 'undefined') { result+="<div class='info-highlight'></div>"; }
		result+="<div class='phphoto flipcard-front'><img src='"+fdel+json.photo+edel+"'></div>";
		result+="<div class='flipcard-back'><div class='back-info'>"+json.virnumm+" "+json.numm+"</div>";
		if (typeof(json.info) !== 'undefined') if (json.info.info=="toolate") { result+="<div class='back-info-append'>kënnt um "+json.info.value+"h</div>"; }
		result+="";
		result+="</div></div></div>";
	return result;
}

function getPersonBuilderOtherServ(json,sel)
{
	var fdel="img/personal/";
	var result='';
		var edel="";
		if (json.photo.substring(0,4)=="data" || json.photo.substring(0,4)=="http")
		{
			fdel="";
			edel="";
		}
		result+="<div class='flipit' id='"+json.id+"-"+sel+"'><div class='flipcard'>";
		result+="<div class='phphoto flipcard-front'><img src='"+fdel+json.photo+edel+"'></div>";
		result+="<div class='flipcard-back'><div class='back-info'>"+json.virnumm+" "+json.numm+"</div>";
		if (typeof(json.info) !== 'undefined') if (json.info.info=="toolate") { result+="<div class='back-info-append'>kënnt um "+json.info.value+"h</div>"; }
		result+="</div></div></div>";
	return result;
}

function ShowService(servicename)
{
	// console.log(serviceJS);
	// console.log("ShowService: "+servicename);
	var serviceJSON = storage.getItem('backup');
	var theJson = JSON.parse(serviceJSON);
	var singleService;
	var result="";
	result+="<i id='backlink' class='backlink fas fa-chevron-circle-left' onclick='javascript:goBack();'>&nbsp;<h1 style='display:inline-block'>zeréck</h1></i>";
	//
	for (var _i = 0;_i < theJson.Services.length;_i++)
	{
		if (deUmlaut(servicename)==deUmlaut(theJson.Services[_i].name))
		{
			singleService=theJson.Services[_i];
			// console.log(singleService);
		}
	}
	result+="<h1 class='title'>"+singleService.name+"</h1><div id='container'>";
	let datum = theJson.Date.substring(0,10);
	result+="<div class='text'>Datum:"+datum+"</div>";
	
	if (singleService.id < 30)
	{
		// Ateliers
		result+="<div class='text'>Encadrants Moies:</div>";
		for (var _i =0;_i < singleService.encadrantsMoies.length;_i++) { result+=getPersonBuilderAtelier(singleService.encadrantsMoies[_i], "1"); }
		
		result+="<div class='text'>Usagers Moies:</div>";
		for (var _i =0;_i < singleService.usagersMoies.length;_i++) { result+=getPersonBuilderAtelier(singleService.usagersMoies[_i], "1"); }
		
		result+="<div class='text'>Encadrants Mëttes:</div>";
		for (var _i =0;_i < singleService.encadrantsMettes.length;_i++) { result+=getPersonBuilderAtelier(singleService.encadrantsMettes[_i], "2"); }
		
		result+="<div class='text'>Usagers Mëttes:</div>";
		for (var _i =0;_i < singleService.usagersMettes.length;_i++) { result+=getPersonBuilderAtelier(singleService.usagersMettes[_i], "2"); }
	}
	else
	{
		//Krank, Congé, Doku, Formatioun, Maart,...
		result+="<div class='text'>De ganzen Dag:</div>";
		for (var _i = 0; _i < singleService.Dag.length; _i++) { result+=getPersonBuilderOtherServ(singleService.Dag[_i] , "1") }
		
		result+="<div class='text'>Moies:</div>";
		for (var _i =0;_i < singleService.Moies.length;_i++) { result+=getPersonBuilderOtherServ(singleService.Moies[_i] , "1") }
		
		result+="<div class='text'>Mëttes:</div>";
		for (var _i =0;_i < singleService.Mettes.length;_i++) { result+=getPersonBuilderOtherServ(singleService.Mettes[_i] , "2") }
		
	}
	result+="</div>";
	result+=getTapHoldPopup();
	document.getElementById('theContent').innerHTML=result;
	appendEventHandlers();
}

function getUserDataById(theid)
{
	serviceJSON=storage.getItem('backup');
	var theJson = JSON.parse(serviceJSON);	
	var res = null;
	for (var _i=0;_i <= theJson.Services.length -1;_i++)
	{		
		if (theJson.Services[_i].id < 30)
		{
			for (var _j =0;_j < theJson.Services[_i].encadrantsMoies.length;_j++)
			{if(theJson.Services[_i].encadrantsMoies[_j].id == theid) {res=theJson.Services[_i].encadrantsMoies[_j];return res;}}
			for (var _j =0;_j < theJson.Services[_i].usagersMoies.length;_j++)
			{if(theJson.Services[_i].usagersMoies[_j].id == theid) {res=theJson.Services[_i].usagersMoies[_j];return res;}}
			for (var _j =0;_j < theJson.Services[_i].encadrantsMettes.length;_j++)
			{if(theJson.Services[_i].encadrantsMettes[_j].id == theid) {res=theJson.Services[_i].encadrantsMettes[_j];return res;}}
			for (var _j =0;_j < theJson.Services[_i].usagersMettes.length;_j++)
			{if(theJson.Services[_i].usagersMettes[_j].id == theid) {res=theJson.Services[_i].usagersMettes[_j];return res;}}
		} else {
			for (var _j =0;_j < theJson.Services[_i].Dag.length;_j++)
			{if(theJson.Services[_i].Dag[_j].id == theid) {res=theJson.Services[_i].Dag[_j];return res;}}
			for (var _j =0;_j < theJson.Services[_i].Moies.length;_j++)
			{if(theJson.Services[_i].Moies[_j].id == theid) {res=theJson.Services[_i].Moies[_j];return res;}}
			for (var _j =0;_j < theJson.Services[_i].Mettes.length;_j++)
			{if(theJson.Services[_i].Mettes[_j].id == theid) {res=theJson.Services[_i].Mettes[_j];return res;}}
		}
	}
	// return res;
}