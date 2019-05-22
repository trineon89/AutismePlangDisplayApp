includeScript("js/classes/responsiveslider.js", function () {});

class LostAndFound {
    Objects;
    IntervalId;
    
    constructor()
    {
        this.IntervalId=null;
        this.Objects = {};
        $('#lostandfound').remove();
    }

    init() {
        this.start();
    }

    async lateInit() {
        while ($('#lostandfound').length==0)
        {
            await Sleep(1000);
            $("#special_content").append('<div id="lostandfound"></div>');
        }
        return true;
    }

    reset() {
        this.unset();
        let that = this;
        $('#lostandfound').children().remove();
        $('#lostandfound').append('<ul class="rslides" id="lafslides"></ul>');
        //console.log(this.Objects);
        Object.keys(this.Objects).forEach(function(key){
            $('#lafslides').append('<li><p class="caption">'+that.Objects[key].ImageText+'</p><img src="https://intern.autisme.lu/uploads/img/laf/'+that.Objects[key].ImageSrc+'"/></li>');
        });

    }

    async start() {
        console.log("start");
        await this.lateInit();
        this.checkUpdate();
        this.sync();
    }

    sync()
    {
        var that = this;
        this.IntervalId = setInterval(function(){that.checkUpdate();}, 6000);
    }

    appendSlider()
    {
        $(function() {
            $(".rslides").responsiveSlides();
        });
    }

    checkUpdate() {
        var that = this;
        //console.log(this);
        console.log("LAF: checking for update");
        $.ajax({
			type:	"POST",
			url:	"https://intern.autisme.lu/remote/getLaf.ajax.php",
			success: function (result) {
				if (result.result)
				{
                    //console.log('LAF: count => '+result.count + " "+that.IntervalId);
                    if (result.count>0)
                    {
                        //console.log(result.items);
                        
                        if (JSON.stringify(that.Objects) == JSON.stringify(result.items))
                        {
                            //console.log("no change");
                            console.log("LAF: no update");
                        } else {
                            console.log("LAF: update found");
                            that.Objects = result.items;
                            that.update();
                        }
                    } else {
                        that.Objects={};
                        that.update();
                        console.log("LAF: result 0");
                    }
				}
			}
		});
    }

    update() {
        //console.log("update");
        this.reset();
        this.appendSlider();
        this.sync();
    }

    unset() {
        clearInterval(this.IntervalId);
    }
}

console.log("Lost And Found Loaded!");


function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
 }