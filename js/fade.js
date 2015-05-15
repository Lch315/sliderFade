(function($) {
	var Fade = function(element, options) {
		this.defOptions = $.extend({}, this.defOptions, options);
		this.init($(element));
	};

	Fade.prototype = {

		defOptions: {
			speed : 1000,
			delay : 5000,
			dots : true,
			autoplay : true,
			items : ">ul",
			item : ">li"
		},

		_defStatus: {
			index: 0,
			lastIndex: 0,
			len: 0,
			timer: null
		},

		init: function(element) {
			var that = this,
				ul = element.find(that.defOptions.items),
				li = ul.find(that.defOptions.item),
				elWidth = element.width(),
				elHeight = element.height();

			that._defStatus.len = li.length;

			element.css("position", "relative");
			li.css({"position":"absolute", "display":"none"});
			li.first().css("display", "block");
			li.width(elWidth);
			li.height(elHeight);

			that.defOptions.dots && that.createDots(element, li);

			that.defOptions.autoplay && setTimeout(function() {
					that.goFade(li);
				}, that.defOptions.delay);
		},

		fading: function(item) {
			var index = this._defStatus.index,
				len = this._defStatus.len-1,
				lastIndex = this._defStatus.lastIndex,
				speed = this.defOptions.speed;
			if (index == len) {
				index = 0;
			} else {
				index ++;
			}

			item.eq(index).css("z-index", 1).show();
			item.eq(lastIndex).css("z-index", 2).fadeOut(speed);

			this.defOptions.dots && $("#fadeDots>li").removeClass("active").eq(index).addClass("active");

			this._defStatus.index = index;
			this._defStatus.lastIndex = index;
		},

		goFade: function(item) {
			var that = this;
			that.fading(item);			

			setTimeout(function() {
				that.goFade(item);
			}, that.defOptions.delay);
		},

		createDots: function(el, item) {
			var that = this,
				index = that._defStatus.index,
				len = that._defStatus.len,
				html = "<ol id='fadeDots'>";

			for (var i = 1; i < len+1; i++) {
				if (i == index+1) {
					html += "<li class='active'>"+ i +"</li>";
				} else {
					html += "<li>"+ i +"</li>";
				}
			};
			html += "</ol>";

			el.append(html);

			var magin = (-$("#fadeDots").width()/2) + "px";
			$("#fadeDots").css("margin-left",magin);

			$("#fadeDots>li").click(function() {
				if (!$(this).hasClass("active")) {
					that._defStatus.index = $(this).index() - 1;
					that.fading(item);
				};
			});
		}
	};

	$.fn.fade = function(options) {
		new Fade(this, options);
	};

	window.Fade = Fade || {};

})(jQuery)
