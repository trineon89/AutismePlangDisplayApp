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
		for (var _i in theAtelierjson.encadrantsMoies)
		{
			var fdel="\'img/personal/";
			var edel="\'";
			if (theAtelierjson.encadrantsMoies[_i].photo.substring(0,4)=="data")
			{
				fdel="";
				edel="";
			}
			SHTML+='<div class="photo" id="'+theAtelierjson.encadrantsMoies[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.encadrantsMoies[_i].photo+edel+')">';
			if (theAtelierjson.encadrantsMoies[_i].photo=="placeholder.png" || fdel=="")
			{
				SHTML+='<div class="nummplaceholder">'+theAtelierjson.encadrantsMoies[_i].virnumm+'</div>';
			}
			SHTML+="</div>";
		}
		SHTML+= '</div>';
		SHTML+= '<div class="trenner" id="trenner"></div>';
		SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-u1">';
		for (var _i in theAtelierjson.usagersMoies)
		{
			var fdel="\'img/personal/";
			var edel="\'";
			if (theAtelierjson.usagersMoies[_i].photo.substring(0,4)=="data")
			{
				fdel="";
				edel="";
			}
			SHTML+='<div class="photo" id="'+theAtelierjson.usagersMoies[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.usagersMoies[_i].photo+edel+')">';
			if (theAtelierjson.usagersMoies[_i].photo=="placeholder.png" || fdel=="")
			{
				SHTML+='<div class="nummplaceholder">'+theAtelierjson.usagersMoies[_i].virnumm+'</div>';
			}
			SHTML+="</div>";
		}
		SHTML+= '</div>';
		SHTML+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/iessen.png" class="auerimg" id="auerimg"><span>'+theAtelierjson.auerzait+'</span></div>';
			SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-e2">';
		for (var _i in theAtelierjson.encadrantsMettes)
		{
			var fdel="\'img/personal/";
			var edel="\'";
			if (theAtelierjson.encadrantsMettes[_i].photo.substring(0,4)=="data")
			{
				fdel="";
				edel="";
			}
			SHTML+='<div class="photo" id="'+theAtelierjson.encadrantsMettes[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.encadrantsMettes[_i].photo+edel+')">';
			if (theAtelierjson.encadrantsMettes[_i].photo=="placeholder.png" || fdel=="")
			{
				SHTML+='<div class="nummplaceholder">'+theAtelierjson.encadrantsMettes[_i].virnumm+'</div>';
			}
			SHTML+="</div>";
		}
		SHTML+= '</div>';
		SHTML+= '<div class="trenner" id="trenner"></div>';
		SHTML+= '<div class="photos atelierphotos" id="'+theAtelierjson.id+'-u2">';
		for (var _i in theAtelierjson.usagersMettes)
		{
			var fdel="\'img/personal/";
			var edel="\'";
			if (theAtelierjson.usagersMettes[_i].photo.substring(0,4)=="data")
			{
				fdel="";
				edel="";
			}
			SHTML+='<div class="photo" id="'+theAtelierjson.usagersMettes[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.usagersMettes[_i].photo+edel+')">';
			if (theAtelierjson.usagersMettes[_i].photo=="placeholder.png" || fdel=="")
			{
				SHTML+='<div class="nummplaceholder">'+theAtelierjson.usagersMettes[_i].virnumm+'</div>';
			}
			SHTML+="</div>";
		}
		
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
	
	for (var _i in theAtelierjson.Dag)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Dag[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Dag[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Dag[_i].photo+edel+')">';
		if (theAtelierjson.Dag[_i].photo=="placeholder.png" || fdel=="")
		{
			htmlcontent+='<div class="nummplaceholder">'+theAtelierjson.Dag[_i].virnumm+'</div>';
		}
		htmlcontent+="</div>";
	}
	for (var _i in theAtelierjson.Moies)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Moies[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Moies[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Moies[_i].photo+edel+')">';
		if (theAtelierjson.Moies[_i].photo=="placeholder.png" || fdel=="")
		{
			htmlcontent+='<div class="nummplaceholder">'+theAtelierjson.Moies[_i].virnumm+'</div>';
		}
		htmlcontent+="</div>";
	}
	htmlcontent+= '</div>';
	var auerzait;
	if (theAtelierjson.auerzait == undefined) { auerzait="12-13h"; } else {auerzait = theAtelierjson.auerzait; }
	htmlcontent+= '<div class="auer breet-'+theAtelierjson.c+'" id="auer"><img src="img/iessen.png" class="auerimg" id="auerimg"><span>'+auerzait+'</span></div>';
	htmlcontent+= '<div class="photos atelierphotos" style="height:201px;" id="'+theAtelierjson.id+'-x2">';
	
	for (var _i in theAtelierjson.Dag)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Dag[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Dag[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.Dag[_i].photo+edel+')">';
		if (theAtelierjson.Dag[_i].photo=="placeholder.png" || fdel=="")
		{
			htmlcontent+='<div class="nummplaceholder">'+theAtelierjson.Dag[_i].virnumm+'</div>';
		}
		htmlcontent+="</div>";
	}
	for (var _i in theAtelierjson.Mettes)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Mettes[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		// SHTML+='<div class="photo" id="'+theAtelierjson.usagersMoies[_i].id+'-1" style="background-image:url(\'img/personal/'+theAtelierjson.usagersMoies[_i].id+'.jpg\')"><div class="numm">'+theAtelierjson.usagersMoies[_i].numm+'</div></div>';
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Mettes[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.Mettes[_i].photo+edel+')">';
		if (theAtelierjson.Mettes[_i].photo=="placeholder.png" || fdel=="")
		{
			htmlcontent+='<div class="nummplaceholder">'+theAtelierjson.Mettes[_i].virnumm+'</div>';
		}
		htmlcontent+="</div>";
	}

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
	for (var _i in theAtelierjson.Dag)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Dag[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Dag[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Dag[_i].photo+edel+')"><div class="numm cldag">Dag</div></div>';
	}
	for (var _i in theAtelierjson.Moies)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Moies[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Moies[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Moies[_i].photo+edel+')"><div class="numm clmoies">Moies</div></div>';
	}
	for (var _i in theAtelierjson.Mettes)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Mettes[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Mettes[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.Mettes[_i].photo+edel+')"><div class="numm clmettes">Mëttes</div></div>';
	}
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

function showFormatiounMaart(theAtelierjson, sel)
{
	var htmlcontent='<div class="'+sel+'container breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	htmlcontent+='<div class="header"><p class="KrankCongeHeader">'+theAtelierjson.name+'</p></div>';
	htmlcontent+= '<div class="photos" id="'+theAtelierjson.id+'-x0">';
	for (var _i in theAtelierjson.Dag)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Dag[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Dag[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Dag[_i].photo+edel+')"><div class="numm cldag">Dag</div></div>';
	}
	for (var _i in theAtelierjson.Moies)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Moies[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Moies[_i].id+'-1" style="background-image:url('+fdel+theAtelierjson.Moies[_i].photo+edel+')"><div class="numm clmettes">Moies</div></div>';
	}
	for (var _i in theAtelierjson.Mettes)
	{
		var fdel="\'img/personal/";
		var edel="\'";
		if (theAtelierjson.Mettes[_i].photo.substring(0,4)=="data")
		{
			fdel="";
			edel="";
		}
		htmlcontent+='<div class="photo" id="'+theAtelierjson.Mettes[_i].id+'-2" style="background-image:url('+fdel+theAtelierjson.Mettes[_i].photo+edel+')"><div class="numm clmmettes">Mëttes</div></div>';
	}
	htmlcontent+='</div>';
	htmlcontent+='</div>';
	
	return htmlcontent;
}
