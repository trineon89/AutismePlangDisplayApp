/*
	Youtube Data v3 API KEY : AIzaSyAqaqEefxgPyd0I-7DZrcqniVwmLa3znEo
	KEY NAME: searchAPIkey
*/

var done = false;
var player=null;
function initYoutube()
{
	console.log("initYoutube");
	var content = "";
	content+='<div id="player"></div>';
	document.getElementById('theContent').innerHTML=content;
	
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function ytSearch(sstring)
{
	var encstring = encodeURI(sstring);
	var req="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+encstring+"&key=AIzaSyAqaqEefxgPyd0I-7DZrcqniVwmLa3znEo";
	$.get( req, function( data ) {
	  console.log(data);
	  var res="";
	  for (var _i=0;_i < data.items.length; _i++)
	  {
		  if (data.items[_i].id.videoId != undefined)
		  {
			  // console.log("videoid => "+data.items[_i].id.videoId);
			  res+="<span class='videoselector' data-attrib='"+data.items[_i].id.videoId+"'>"+data.items[_i].snippet.title+"<img src=\'"+data.items[_i].snippet.thumbnails.default.url+"'></span>";
		  }
	  }
	  
	  $("#thewidgetcontent").html(res);
	  $(".videoselector").bind("click", function () {SendSelectedYT(this);});
	});
}

function SendSelectedYT(evdata)
{
	// console.log(evdata);
	var vidid = $(evdata).attr("data-attrib");
	
	var res = {
		message : "req_ytplayer_play", 
		info: vidid,
	};
	ws.send(JSON.stringify(res));
}

function appendYtSeachHandlers()
{
	
}

function playTube(tubeid)
{
	console.log("playTube:"+tubeid);
	player.loadVideoById(tubeid);
}
/*
	https://www.youtube.com/embed/SC3jZlV8X3c
*/

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '100%',
	  width: '100%',
	  videoId: 'GKtbo2gznXo',
	  playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo' : 0 },
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
  }
function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}