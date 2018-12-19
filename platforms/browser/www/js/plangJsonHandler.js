setInterval(function(){resetTooLate(); }, 60000);

<<<<<<< HEAD
var thisdate; 
var letobj; 
=======
var thisdate;
var letobj;
>>>>>>> master

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
<<<<<<< HEAD
	document.getElementById('theContent').innerHTML="";
	letobj=JSON.parse(ContentJSON); 
	var content = pJSON(ContentJSON); 
	thisdate = letobj.Date; 
	
	$('.ateliercontainer').each(function(e){
		if (e === $('.ateliercontainer').length-1) return;
		$(this).after('<div class="col"></div>');
	})
	
=======
	letobj=JSON.parse(ContentJSON);
	thisdate = letobj.Date;
	var content = pJSON(ContentJSON);
	document.getElementById('theContent').innerHTML=content;
>>>>>>> master
	//document.querySelectorAll(".col:last-child").remove();
	
//$('#theContent').children().last().remove();
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

function buildPersonAtelier(person,selector, sel)
{
	//if (person.bday!=undefined) { obday=getBday(person.bday); }
	var fdel="\'img/personal/"; var edel="\'";
	if (person.photo.substring(0,4)=="data" || person.photo.substring(0,4)=="http")
	{
		fdel="";
		edel="";
	}
	$('<div/>',{id:person.id+'-'+sel,class:"photo",style:'background-image:url('+fdel+person.photo+edel+')'}).appendTo('#'+selector);
	if (person.bday!=undefined) {
		if (getBday(person.bday)) {$('<div/>',{class:"confetti"}).appendTo('#'+person.id+'-'+sel);$('<div/>',{class:"happybday"}).appendTo('#'+person.id+'-'+sel);}
	}
	if (typeof(person.info) !== 'undefined') if (person.info.info=="toolate" && toolateTimerShow(person.info.value)) {
		$('<div/>',{id:person.id+'-'+sel+'-photo-info-append',class:"photo-info-append"}).appendTo('#'+person.id+'-'+sel);
			$('<div/>',{class:"photo-info-append-innercontainter",text:person.info.value}).appendTo('#'+person.id+'-'+sel+'-photo-info-append');
	}
	if (person.photo=="placeholder.png" || fdel=="")
	{
			$('<div/>',{class:"nummplaceholder",text:person.virnumm}).appendTo('#'+person.id+'-'+sel);
	}
}

/*	Obsolete
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
*/
function getBday(date)
{
	rmonth= date.substring(5, 7)-1;
	rday= date.substring(8, 10);
<<<<<<< HEAD
	// let today = new Date();
		// console.log(thisdate); 
	let today = new Date(thisdate); 
	// console.log("today"+today); 
=======
	// console.log(thisdate);
	let today = new Date(thisdate);
	// console.log("today"+today);
>>>>>>> master
	if ((today.getDate() == rday) && (today.getMonth() ==rmonth))
	// if (1==1)
	{
		console.log("Bday :)");
		// return '<div class="confetti"></div><div class="happybday"></div>';
		return true;
	}
	return false;
	// return '';
}

function buildPersonKrankDoku(person, selector, sel, classsel)
{
	var fdel="\'img/personal/";
	var htmlcontent="";
	var edel="\'";
	if (person.photo.substring(0,4)=="data" || person.photo.substring(0,4)=="http")
	{
		fdel="";
		edel="";
	}
	if (classsel == 'cldag') {htmlcontent='Dag';}
	if (classsel == 'clmoies') {htmlcontent='Moies';}
	if (classsel == 'clmettes') {htmlcontent='Mëttes';}
	$('<div/>',{id:person.id+'-'+sel,class:"photo",style:'background-image:url('+fdel+person.photo+edel+')'}).appendTo('#'+selector);
		$('<div/>',{class:"numm "+classsel,text:htmlcontent}).appendTo('#'+person.id+'-'+sel);
}

/* OBSOLETE
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
*/
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
				$('<div/>',{id:"float-wrapc",class:"floatwrap"}).appendTo('#theContent');
				showFormatiounMaart(theAtelierjson, 'form')
			break;
		case 34: //Doku	
				SHTML=showDoku(theAtelierjson);
			break;
		case 35:
				showFormatiounMaart(theAtelierjson, 'maart');
				$('<div/>',{id:"rightside",class:"col",style:"flex:100;"}).appendTo('#theContent');
					$('<div/>',{id:"info_header"}).appendTo('#rightside');
					$('<div/>',{id:"special_content"}).appendTo('#rightside');
						$('<div/>',{id:"menu-jour-container"}).appendTo('#special_content');
						$('<div/>',{id:"motd_container"}).appendTo('#special_content');
						$('<div/>',{id:"publ_container"}).appendTo('#special_content');
				// SHTML+='</div><div class="col"></div>';
				// SHTML+='<div class="col" style="flex: 100;">';
				// SHTML+='<div id="info_header"></div>';
				// SHTML+='<div id="special_content"><div id="menu-jour-container"></div><div id="motd_container"></div><div id="publ_container"></div></div>';
				// SHTML+='</div>';
			break;
		default:
		$('<div/>',{id:deUmlaut(theAtelierjson.name),class:"ateliercontainer breet-"+theAtelierjson.c}).appendTo('#theContent');
			$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-atelier",class:"atelier breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
				$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-helper",class:"helper"}).appendTo('#'+deUmlaut(theAtelierjson.name)+"-atelier");
				$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-atelierimg",class:"atelierimg",src:"img/services/"+deUmlaut(theAtelierjson.name)+".jpg"}).appendTo('#'+deUmlaut(theAtelierjson.name)+"-atelier");
			$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
				$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg",class:"auerimg",src:"img/sonn.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer');
				$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan",text:"9:00"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer');
			$('<div/>',{id:theAtelierjson.id+"-e1",class:"photos atelierphotos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{class:"trenner"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{id:theAtelierjson.id+"-u1",class:"photos atelierphotos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer2",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
				$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg2",class:"auerimg",src:"img/iessen.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer2');
				$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan2",text:theAtelierjson.auerzait}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer2');
			$('<div/>',{id:theAtelierjson.id+"-e2",class:"photos atelierphotos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{class:"trenner"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{id:theAtelierjson.id+"-u2",class:"photos atelierphotos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer3",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
				$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg3",class:"auerimg",src:"img/bus.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer3');
				$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan3",text:"16:30"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer3');
		for (var _i in theAtelierjson.encadrantsMoies) { buildPersonAtelier(theAtelierjson.encadrantsMoies[_i], theAtelierjson.id+"-e1","1"); }
		for (var _i in theAtelierjson.usagersMoies) { buildPersonAtelier(theAtelierjson.usagersMoies[_i],theAtelierjson.id+"-u1","1"); }
		for (var _i in theAtelierjson.encadrantsMettes) { buildPersonAtelier(theAtelierjson.encadrantsMettes[_i],theAtelierjson.id+"-e2","2"); }
		for (var _i in theAtelierjson.usagersMettes) { SHTML+=buildPersonAtelier(theAtelierjson.usagersMettes[_i],theAtelierjson.id+"-u2","2"); }
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
				res+='<h3 class="menu-header3">Liste Allergènes</h3><p>1.&nbsp;Arachide | 2.&nbsp;Céléri | 3.&nbsp;Crustacés | 4.&nbsp;Fruits&nbsp;à coque | 5.&nbsp;Gluten | 6.&nbsp;Lait/Lactose | 7.&nbsp;Lupin | 8.&nbsp;Mollusques | 9.&nbsp;Moutarde | 10.&nbsp;Œufs | 11.&nbsp;Poisson | 12.&nbsp;Sésame | 13.&nbsp;Soja | 14.&nbsp;Anhydride&nbsp;sulfureux&nbsp;et&nbsp;sulfites</p>';
				$('#menu-jour-container').html(res);
			}
		}
	});
}

function showExtraContent(theAtelierjson)
{
	var htmlcontent='<div class="extracontainer breet-'+theAtelierjson.c+'" id="'+deUmlaut(theAtelierjson.name)+'">';
	
	htmlcontent+='</div>';
	
	return htmlcontent;
}

function showDoku(theAtelierjson)
{
	// console.log("#showDoku#"+theAtelierjson);
	$('<div/>',{id:deUmlaut(theAtelierjson.name),class:"ateliercontainer breet-"+theAtelierjson.c}).appendTo('#theContent');
		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-atelier",class:"atelier breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-helper",class:"helper"}).appendTo('#'+deUmlaut(theAtelierjson.name)+"-atelier");
			$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-atelierimg",class:"atelierimg",src:"img/services/"+deUmlaut(theAtelierjson.name)+".jpg"}).appendTo('#'+deUmlaut(theAtelierjson.name)+"-atelier");
		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg",class:"auerimg",src:"img/sonn.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer');
			$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan",text:"9:00"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer');
		$('<div/>',{id:theAtelierjson.id+"-x1",class:"photos atelierphotos",style:"height:201px;"}).appendTo('#'+deUmlaut(theAtelierjson.name));

		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer2",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg2",class:"auerimg",src:"img/iessen.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer2');
			$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan2",text:theAtelierjson.auerzait}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer2');
		$('<div/>',{id:theAtelierjson.id+"-x2",class:"photos atelierphotos",style:"height:201px;"}).appendTo('#'+deUmlaut(theAtelierjson.name));
		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"-auer3",class:"auer breet-"+theAtelierjson.c}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<img/>',{id:deUmlaut(theAtelierjson.name)+"-auerimg3",class:"auerimg",src:"img/bus.png"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer3');
			$('<span/>',{id:deUmlaut(theAtelierjson.name)+"-auerimgspan3",text:"16:30"}).appendTo('#'+deUmlaut(theAtelierjson.name)+'-auer3');
	for (var _i in theAtelierjson.Dag) { buildPersonAtelier(theAtelierjson.Dag[_i],theAtelierjson.id+'-x1',"1"); }
	
	for (var _i in theAtelierjson.Moies) { buildPersonAtelier(theAtelierjson.Moies[_i],theAtelierjson.id+'-x1',"1"); }
	if (theAtelierjson.auerzait == undefined) { } else { }

	for (var _i in theAtelierjson.Dag) { buildPersonAtelier(theAtelierjson.Dag[_i],theAtelierjson.id+'-x2',"2"); }
	for (var _i in theAtelierjson.Mettes) { buildPersonAtelier(theAtelierjson.Mettes[_i],theAtelierjson.id+'-x2',"2"); }
}

function showCongeKrank(theAtelierjson, sel)
{
	$('<div/>',{id:deUmlaut(theAtelierjson.name),class:sel+'container breet-'+theAtelierjson.c}).appendTo('#theContent');
		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"header"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<p/>',{class:"KrankCongeHeader",text:theAtelierjson.name}).appendTo('#'+deUmlaut(theAtelierjson.name)+"header");
		$('<div/>',{id:theAtelierjson.id+'-x0',class:"photos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
		$('<div/>',{id:theAtelierjson.id+'-x2',class:"photos",style:"border-top-color:#b5b5b5;border-top-width:5px;border-top-style: solid;padding-top: 1px;margin-top: 1px;"}).appendTo('#'+deUmlaut(theAtelierjson.name));
	for (var _i in theAtelierjson.Dag) { 
		if (theAtelierjson.Dag[_i].isencadrant) {
			buildPersonKrankDoku(theAtelierjson.Dag[_i],theAtelierjson.id+'-x0',"1", "cldag");
		} else {
			buildPersonKrankDoku(theAtelierjson.Dag[_i],theAtelierjson.id+'-x2',"1", "cldag");
		}
	}
	for (var _i in theAtelierjson.Moies) {
		if (theAtelierjson.Moies[_i].isencadrant) {
			buildPersonKrankDoku(theAtelierjson.Moies[_i],theAtelierjson.id+'-x0',"1", "clmoies");
		} else {
			buildPersonKrankDoku(theAtelierjson.Moies[_i],theAtelierjson.id+'-x2',"1", "clmoies");
		}
	}
	for (var _i in theAtelierjson.Mettes) { 
		if (theAtelierjson.Mettes[_i].isencadrant) {
			buildPersonKrankDoku(theAtelierjson.Mettes[_i],theAtelierjson.id+'-x0',"2", "clmettes"); 
		} else {
			buildPersonKrankDoku(theAtelierjson.Mettes[_i],theAtelierjson.id+'-x2',"2", "clmettes"); 
		}
	}
}

function showFormatiounMaart(theAtelierjson, sel)
{
	$('<div/>',{id:deUmlaut(theAtelierjson.name),class:sel+'container breet-'+theAtelierjson.c}).appendTo('#float-wrapc');
		$('<div/>',{id:deUmlaut(theAtelierjson.name)+"header"}).appendTo('#'+deUmlaut(theAtelierjson.name));
			$('<p/>',{class:"KrankCongeHeader",text:theAtelierjson.name}).appendTo('#'+deUmlaut(theAtelierjson.name)+"header");
		$('<div/>',{id:theAtelierjson.id+'-x0',class:"photos"}).appendTo('#'+deUmlaut(theAtelierjson.name));
	for (var _i in theAtelierjson.Dag) { buildPersonKrankDoku(theAtelierjson.Dag[_i],theAtelierjson.id+'-x0',"1", "cldag"); }
	for (var _i in theAtelierjson.Moies) { buildPersonKrankDoku(theAtelierjson.Moies[_i],theAtelierjson.id+'-x0',"1", "clmoies"); }
	for (var _i in theAtelierjson.Mettes) { 
		buildPersonKrankDoku(theAtelierjson.Mettes[_i],theAtelierjson.id+'-x0',"2", "clmettes"); }
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