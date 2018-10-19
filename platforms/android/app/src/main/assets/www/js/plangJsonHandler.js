function updateContent(ContentJSON){
	var content = pJSON(ContentJSON);
	document.getElementById('theContent').innerHTML=content;
	//document.querySelectorAll(".col:last-child").remove();
	
	$('#theContent').children().last().remove();
}

function pJSON(serviceJSON) {
	var theJson = JSON.parse(serviceJSON);
	// var theJson = serviceJSON;
	
	var SHTML = '';
	for (var _i=0;_i <= theJson.Services.length -1;_i++)
	{
		SHTML+=buildService(theJson.Services[_i]);
		//Dont put a divider between Formatioun and Maart
		if (theJson.Services[_i].id != '33')
		{
			SHTML+='<div class="col"></div>';
		}
	}
	
	return SHTML;
}

function toolateTimerShow(t)
{
	res = false;
	var d = new Date();
	// var h = plangpaddingZero(d.getHours());
	var h = d.getHours();
	// var m = plangpaddingZero(d.getMinutes());
	var m = d.getMinutes();
	
	var dt = t.split(":");
	var ht = dt[0];
	var hm = dt[1];
	
	console.log("ht:"+ht+ " h:"+h+" hm:"+hm+" m:"+m);
	
	if ( ((h>=ht) && (m>=hm)) || (h>ht))
	{
		return false;
	} else { return true; }
}

function plangpaddingZero(i)
{
	if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getPersonBuilderAtelier(json,sel)
{
	SHTML="";
	var fdel="\'img/personal/";
		var edel="\'";
		if (json.photo.substring(0,4)=="data" || json.photo.substring(0,4)=="http")
		{
			fdel="";
			edel="";
		}
		
		
		
		SHTML+='<div class="photo" id="'+json.id+'-'+sel+'" style="background-image:url('+fdel+json.photo+edel+')">';
		if (typeof(json.info) !== 'undefined') if (json.info.info=="toolate" && toolateTimerShow(json.info.value)) { SHTML+="<div class='photo-info-append'><div class='photo-info-append-innercontainter'>"+json.info.value+"h</div></div>"; }
		if (json.photo=="placeholder.png" || fdel=="")
		{
			SHTML+='<div class="nummplaceholder">'+json.virnumm+'</div>';
		}
		SHTML+="</div>";
	return SHTML;
}

function getPersonBuilderKrankDoku(json,sel,classsel)
{
	var fdel="\'img/personal/";
	var htmlcontent="";
		var edel="\'";
		if (json.photo.substring(0,4)=="data" || json.photo.substring(0,4)=="http")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+json.id+'-'+sel+'" style="background-image:url('+fdel+json.photo+edel+')"><div class="numm '+classsel+'">Dag</div></div>';
	return htmlcontent;
}

function buildService(AtelierJSON) {	
	var theAtelierjson = AtelierJSON;
	var SHTML ='';
	 // console.log(theAtelierjson);
	switch (theAtelierjson.id)
	{
		case 27:
				SHTML=showExtraContent(theAtelierjson);
			break;
		case 32:
				SHTML=showCongeKrank(theAtelierjson, 'krank');
			break;
		case 31:
				SHTML=showCongeKrank(theAtelierjson, 'conge');
			break;
		case 33:
				SHTML='<div class="floatwrap">';
				SHTML+=showFormatiounMaart(theAtelierjson, 'form')
			break;
		case 34: //Doku	
				SHTML=showDoku(theAtelierjson);
			break;
		case 35:
				SHTML=showFormatiounMaart(theAtelierjson, 'maart')
				SHTML+='</div>';
				SHTML+='<div class="col" style="flex: 100;">';
				SHTML+='<div id="info_header"></div>';
				SHTML+='<div id="special_content"></div>';
				SHTML+='</div>';
			break;
		default:

		SHTML = '<div class="ateliercontainer breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
		SHTML+= '<div class="atelier breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'"><span class="helper"></span><img src="img/services/'+deUmlaut(theAtelierjson.name)+'.jpg" class="atelierimg" id="atelierimg"></div>';
		SHTML+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/sonn.png" class="auerimg" id="auerimg"><span>9:00</span></div>';
		SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-e1">';
		
		for (var _i in theAtelierjson.encadrantsMoies) { SHTML+=getPersonBuilderAtelier(theAtelierjson.encadrantsMoies[_i],"1"); }
		
		SHTML+= '</div>';
		SHTML+= '<div class="trenner" id="trenner"></div>';
		SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-u1">';
		
		for (var _i in theAtelierjson.usagersMoies) { SHTML+=getPersonBuilderAtelier(theAtelierjson.usagersMoies[_i],"1"); }
		
		SHTML+= '</div>';
		SHTML+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/iessen.png" class="auerimg" id="auerimg"><span>'+theAtelierjson.auerzait+'</span></div>';
			SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-e2">';
		
		for (var _i in theAtelierjson.encadrantsMettes) { SHTML+=getPersonBuilderAtelier(theAtelierjson.encadrantsMettes[_i],"2"); }
		
		SHTML+= '</div>';
		SHTML+= '<div class="trenner" id="trenner"></div>';
		SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-u2">';
		
		for (var _i in theAtelierjson.usagersMettes) { SHTML+=getPersonBuilderAtelier(theAtelierjson.usagersMettes[_i],"2"); }
		
		SHTML+= '</div>';
		SHTML+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/bus.png" class="auerimg" id="auerimg"><span>16:30</span></div>';
		SHTML+= '</div>';
	}
	return SHTML;
}

function showExtraContent(theAtelierjson)
{
	var htmlcontent='<div class="extracontainer breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	
	htmlcontent+='</div>';
	
	return htmlcontent;
}

function showDoku(theAtelierjson)
{
	// console.log("#showDoku#"+theAtelierjson);
	htmlcontent = '<div class="ateliercontainer breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	htmlcontent+= '<div class="atelier breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'"><span class="helper"></span><img src="img/services/'+deUmlaut(theAtelierjson.name)+'.jpg" class="atelierimg" id="atelierimg"></div>';
	htmlcontent+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/sonn.png" class="auerimg" id="auerimg"><span>9:00</span></div>';
	htmlcontent+= '<div class="photos atelierphotos" style="height:201px;" id="'+theAtelierjson.id+'-x1">';
	
	for (var _i in theAtelierjson.Dag) { htmlcontent+=getPersonBuilderAtelier(theAtelierjson.Dag[_i],"1"); }
	
	for (var _i in theAtelierjson.Moies) { htmlcontent+=getPersonBuilderAtelier(theAtelierjson.Moies[_i],"1"); }
	
	htmlcontent+= '</div>';
	var auerzait;
	if (theAtelierjson.auerzait == undefined) { auerzait="12-13h"; } else {auerzait = theAtelierjson.auerzait; }
	htmlcontent+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/iessen.png" class="auerimg" id="auerimg"><span>'+auerzait+'</span></div>';
	htmlcontent+= '<div class="photos atelierphotos" style="height:201px;" id="'+theAtelierjson.id+'-x2">';
	
	for (var _i in theAtelierjson.Dag) { htmlcontent+=getPersonBuilderAtelier(theAtelierjson.Dag[_i],"2"); }
	
	for (var _i in theAtelierjson.Mettes) { htmlcontent+=getPersonBuilderAtelier(theAtelierjson.Mettes[_i],"2"); }

	htmlcontent+= '</div>';
	htmlcontent+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/bus.png" class="auerimg" id="auerimg"><span>16:30</span></div>';
	htmlcontent+= '</div>';
	
	return htmlcontent;
}

function showCongeKrank(theAtelierjson, sel)
{
	var htmlcontent='<div class="'+sel+'container breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	htmlcontent+='<div class="header"><p class="KrankCongeHeader">'+theAtelierjson.name+'</p></div>';
	htmlcontent+= '<div class="photos" id="'+theAtelierjson.id+'-x0">';
	for (var _i in theAtelierjson.Dag) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Dag[_i],"1", "cldag"); }
	
	for (var _i in theAtelierjson.Moies) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Moies[_i],"1", "clmoies"); }
	
	for (var _i in theAtelierjson.Mettes) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Mettes[_i],"2", "clmettes"); }
	
	htmlcontent+='</div>';
	htmlcontent+='</div>';
	
	return htmlcontent;
}

function showFormatiounMaart(theAtelierjson, sel)
{
	var htmlcontent='<div class="'+sel+'container breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	htmlcontent+='<div class="header"><p class="KrankCongeHeader">'+theAtelierjson.name+'</p></div>';
	htmlcontent+= '<div class="photos" id="'+theAtelierjson.id+'-x0">';
	for (var _i in theAtelierjson.Dag) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Dag[_i],"1", "cldag"); }
	
	for (var _i in theAtelierjson.Moies) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Moies[_i],"1", "clmoies"); }

	for (var _i in theAtelierjson.Mettes) { htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Moies[_i],"2", "clmettes"); }

	htmlcontent+='</div>';
	htmlcontent+='</div>';
	
	return htmlcontent;
}

function appendHandlerPlang(date=null)
{
	console.log("Datum empfaang: "+date);
	ryear= date.substring(0, 4);
	rmonth= date.substring(5, 7) - 1;
	rday= date.substring(8, 10);
	console.log("Datum ugepasst: " + ryear + " " + rmonth + " " + rday);
	if (date==null) { var today = new Date(); } else { var today = new Date(ryear, rmonth, rday); }
	var Wochendag = "";
	switch ( today.getDay() )
	{
		case 0: Wochendag = "Sonndeg"; break;
		case 1: Wochendag = "Méindeg"; break;
		case 2: Wochendag = "Dënschdeg"; break;
		case 3: Wochendag = "Mëttwoch"; break;
		case 4: Wochendag = "Donneschdeg"; break;
		case 5: Wochendag = "Freideg"; break;
		case 6: Wochendag = "Samschdeg"; break;
	}
	switch ( today.getMonth() )
	{
		case 0: Mount = "Januar"; break;
		case 1: Mount = "Februar"; break;
		case 2: Mount = "Mäerz"; break;
		case 3: Mount = "Abrëll"; break;
		case 4: Mount = "Mee"; break;
		case 5: Mount = "Juni"; break;
		case 6: Mount = "Juli"; break;
		case 7: Mount = "August"; break;
		case 8: Mount = "September"; break;
		case 9: Mount = "Oktober"; break;
		case 10: Mount = "November"; break;
		case 11: Mount = "Dezember"; break;
	}
	var theHeaderText = Wochendag+', den '+today.getDate()+'. '+Mount+' '+today.getFullYear();
	$('#info_header').text(theHeaderText);
}