(function($) {
	var Fade = function(element, options) {
		this.defOptions = $.extend({}, this.defOptions, options);
		this.init(element);
	};

	Fade.prototype = {

		defOptions: {
			speed : 500,
			delay : 5000,
			dots : true,
			autoplay : true,
			items : ">ul",
			item : ">li"
		},

		defStatus: {
			index: 0,
			lastIndex: 0,
			len: 0,
			timer: null
		},

		init: function(element) {
			var that = this,
				ul = element.find(this.defOptions.items),
				li = ul.find(this.defOptions.item),
				elWidth = element.width(),
				elHeight = element.height();

			this.defStatus.len = li.length,

			element.css("position", "relative");
			li.css({"position":"absolute", "display":"none"});
			li.first().css("display", "block");
			li.width(elWidth);
			li.height(elHeight);
			//debugger
			// dots && createDots();
			this.defOptions.autoplay && setTimeout(this.goFade(that, li),this.defOptions.delay);
		},

		goFade: function(that, item) {
			var index = that.defStatus.index,
				len = that.defStatus.len,
				lastIndex = that.defStatus.lastIndex,
				speed = that.defOptions.speed;
			if (index < len) {
				index ++;
			} else {
				index = 0;
			}

			item.eq(index).css("z-index", 2);
			item.eq(lastIndex).css("z-index", 1).fadeOut(speed, function() {
				item.eq(index).fadeIn(speed);
			});

			that.defStatus.lastIndex = index;

			setTimeout(arguments.callee(that, item), that.defOptions.delay);	
		}
	};

	window.Fade = Fade || {};

})(jQuery)
