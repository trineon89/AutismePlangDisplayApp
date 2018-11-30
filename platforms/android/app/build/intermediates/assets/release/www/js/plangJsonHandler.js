setInterval(function(){resetTooLate(); }, 60000);

function resetTooLate()
{
	$(".photo-info-append").each(function() {
		var $this = this;
		$(this).children().each(function() {
			if (toolateTimerShow($(this).text().substring(0,5)) )
			{
				// console.log("Still show");
			} else {
				// console.log("Dont show");
				$this.remove();
			}
		});
	});
}

function updateContent(ContentJSON){
	var content = pJSON(ContentJSON);
	document.getElementById('theContent').innerHTML=content;
	//document.querySelectorAll(".col:last-child").remove();
	
	$('#theContent').children().last().remove();
}

function pJSON(serviceJSON) {
	var theJson = JSON.parse(serviceJSON);
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
	var h = d.getHours();
	var m = d.getMinutes();
	var dt = t.split(":");
	var ht = dt[0];
	var hm = dt[1];
	// console.log("ht:"+ht+ " h:"+h+" hm:"+hm+" m:"+m);
	
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
		let obday = "";
		if (json.bday!=undefined) { obday=getBday(json.bday); }
		SHTML+='<div class="photo" id="'+json.id+'-'+sel+'" style="background-image:url('+fdel+json.photo+edel+')">'+obday;
		if (typeof(json.info) !== 'undefined') if (json.info.info=="toolate" && toolateTimerShow(json.info.value)) { SHTML+="<div class='photo-info-append'><div class='photo-info-append-innercontainter'>"+json.info.value+"h</div></div>"; }
		if (json.photo=="placeholder.png" || fdel=="")
		{
			SHTML+='<div class="nummplaceholder">'+json.virnumm+'</div>';
		}
		SHTML+="</div>";
	return SHTML;
}

function getBday(date)
{
	rmonth= date.substring(5, 7)-1;
	rday= date.substring(8, 10);
	let today = new Date();
	if ((today.getDate() == rday) && (today.getMonth() ==rmonth))
	// if (1==1)
	{
		console.log("Bday :)");
		return '<div class="confetti"></div><div class="happybday"></div>';
	}
	return '';
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
		htmlcontent+='<div class="photo" id="'+json.id+'-'+sel+'" style="background-image:url('+fdel+json.photo+edel+')"><div class="numm '+classsel+'">';
		
		if (classsel == 'cldag') {htmlcontent+='Dag';}
		if (classsel == 'clmoies') {htmlcontent+='Moies';}
		if (classsel == 'clmettes') {htmlcontent+='Mëttes';}
		
		htmlcontent+='</div></div>';
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
				SHTML+='</div><div class="col"></div>';
				SHTML+='<div class="col" style="flex: 100;">';
				SHTML+='<div id="info_header"></div>';
				SHTML+='<div id="special_content"><div id="menu-jour-container"></div><div id="motd_container"></div><div id="publ_container"></div></div>';
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

function motdCheck(date)
{
	$.ajax({
		type:	"POST",
		url:	"http://intern.autisme.lu/remote/getMotdOfTheDay.ajax.php",
		data: {date: date},
		success: function (result) {
			if (result.result)
			{
				console.log(result);

				var theobj = Object.values(result.string);
				let objstring = "[";
				for (i=0;i<theobj.length;i++)
				{
					theobj[i] = theobj[i].replace(/\'/g, "’");
					objstring+="\""+theobj[i]+"\"";
					if (i<theobj.length-1) {objstring+=",";}
				}
				objstring+="]";
				
				console.log(objstring);
				
				let res="<div class='typewrite' data-period='2000' data-type='"+objstring+"'><span class=\"typewrap motd\"</div>";
				$('#motd_container').html(res);
				$('#motd_container').css("display", "block");
	
				var elements = document.getElementsByClassName('typewrite');
				for (var i=0; i<elements.length; i++) {
					var toRotate = elements[i].getAttribute('data-type');
					var period = elements[i].getAttribute('data-period');
					if (toRotate) {
					  new TxtType(elements[i], JSON.parse(toRotate), period);
					}
				}
				// INJECT CSS
				var css = document.createElement("style");
				css.type = "text/css";
				css.innerHTML = ".typewrite > .typewrap { border-right: 0.08em solid #fff}";
				document.body.appendChild(css);
			}
		}
	});

}

function PubCheck(date)
{
	$.ajax({
		type:	"POST",
		url:	"http://intern.autisme.lu/remote/getPubOfTheDay.ajax.php",
		data: {date: date},
		success: function (result) {
			if (result.result)
			{
				$('#publ_container').css("display","block");
				$('#publ_container').css("background-image","url('https://intern.autisme.lu/uploads/img/pub/"+result.string+"')");
			}
			
		}
		
	});
}


var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="typewrap motd">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };


function menuDuJourContainer(date)
{
	$.ajax({
		type:	"POST",
		url:	"http://intern.autisme.lu/remote/getMenuOfTheDay.ajax.php",
		data: {date: date},
		success: function (result) {
			if (result.result)
			{
				console.log(result);
				let res='<h1>Menu du jour</h1>';
				res+='<h3 class="menu-header3">Menu</h3>';
				res+='<p>'+result.menu+'<span class="alternative">allergènes: '+result.almenu+'</span></p>';
				res+='<h3 class="menu-header3">Alternative 1</h3>';
				res+='<p>'+result.al1+'<span class="alternative">allergènes: '+result.alal1+'</span></p>';
				res+='<h3 class="menu-header3">Alternative 2</h3>';
				res+='<p>'+result.al2+'<span class="alternative">allergènes: '+result.alal2+'</span></p>';
				res+='<h3 class="menu-header3">Liste Allergènes</h3><p>1.&nbsp;Arachide | 2.&nbsp;Céléri | 3.&nbsp;Crustacés | 4.&nbsp;Fruits&nbsp;à coque | 5.&nbsp;Gluten | 6.&nbsp;Lait/Lactose | 7.&nbsp;Lupin | 8.&nbsp;Mollusques | 9.&nbsp;Moutarde | 10.&nbsp;Oeufs | 11.&nbsp;Poisson | 12.&nbsp;Sésame | 13.&nbsp;Soja | 14.&nbsp;Anhydride&nbsp;sulfureux&nbsp;et&nbsp;sulfites</p>';
				$('#menu-jour-container').html(res);
			}
		}
	});
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
	var htmltmp ="";
	var htmlcontent='<div class="'+sel+'container breet-'+theAtelierjson.c+'" id="'+theAtelierjson.name+'">';
	htmlcontent+='<div class="header"><p class="KrankCongeHeader">'+theAtelierjson.name+'</p></div>';
	htmlcontent+= '<div class="photos" id="'+theAtelierjson.id+'-x0">';
	for (var _i in theAtelierjson.Dag) { 
		if (theAtelierjson.Dag[_i].isencadrant) {
			htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Dag[_i],"1", "cldag");
		} else {
			htmltmp+=getPersonBuilderKrankDoku(theAtelierjson.Dag[_i],"1", "cldag");
		}
	}
	
	for (var _i in theAtelierjson.Moies) {
		if (theAtelierjson.Moies[_i].isencadrant) {
			htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Moies[_i],"1", "clmoies");
		} else {
			htmltmp+=getPersonBuilderKrankDoku(theAtelierjson.Moies[_i],"1", "clmoies");
		}
	}
	
	for (var _i in theAtelierjson.Mettes) { 
		if (theAtelierjson.Mettes[_i].isencadrant) {
			htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Mettes[_i],"2", "clmettes"); 
		} else {
			htmltmp+=getPersonBuilderKrankDoku(theAtelierjson.Mettes[_i],"2", "clmettes"); 
		}
	}
	
	htmlcontent+='</div>';
	htmlcontent+='<div class="photos" id="'+theAtelierjson.id+'-x2" style="border-top-color:#b5b5b5;border-top-width:5px;border-top-style: solid;padding-top: 1px;margin-top: 1px;">';
	htmlcontent+=htmltmp;
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

	for (var _i in theAtelierjson.Mettes) { 
		htmlcontent+=getPersonBuilderKrankDoku(theAtelierjson.Mettes[_i],"2", "clmettes"); }

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