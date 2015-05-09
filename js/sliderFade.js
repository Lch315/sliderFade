(function($) {
	var SilderFade = function(element,option) {
		this.option = $.extend({}, this.defOptions, option);
		this.init(element, this.option);
	};

	SilderFade.prototype = {

		defOptions: {
			type : fade, //support "fade left top"
			display: 1,
			speed : 500,
			delay : 5000,
			dots : false,
			arrow : false,
			prev : null,
			next : null,
			autoplay : false,
			items : ">ul",
			item : ">li"
		},

		init: function(element, option) {
			var that = this,
				ul = element.find(option.items),
				li = ul.find(option.item),
				len = li.length,
				elWidth = element.width(),
				elHeight = element.height();

			element.css({"position":"relative", "overflow":"hidden"});

			switch(option.type) {
				case "left":
					li.width((elWidth/option.display) + "px");
					li.css("float","left");
					break;
				case "top":
					li.height((elHeigth/option.display) + "px");
					break;
				default:
					li.css("position","absolute");
			}
			
			option.autoplay && that.play(option.speed)
		}
	};

})(jQuery)

