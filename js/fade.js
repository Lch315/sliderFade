(function($) {
	var fade = function(element,option) {
		this.option = $.extend({}, this.defOptions, option);
		this.init(element, this.option);
	};

	fade.prototype = {

		defOptions: {
			speed : 500,
			delay : 5000,
			dots : true,
			autoplay : true,
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
			li.css("position","absolute");
		}
	};

})(jQuery)

