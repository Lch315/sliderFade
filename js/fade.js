(function($) {
	var Fade = function(element, options) {

		this.defOptions = {
			speed : 1000,
			delay : 5000,
			dots : true,
			autoplay : true,
			items : ">ul",
			item : ">li"
		};

		this._status = {
			index: 0,
			lastIndex: 0,
			len: 0,
			timer: null,
			complete: true
		};
		
		this.defOptions = $.extend({}, this.defOptions, options);
		this.init($(element));
	};

	Fade.prototype = {

		init: function(element) {
			var that = this,
				_o = that.defOptions,
				_s = that._status,
				ul = element.find(_o.items),
				li = ul.find(_o.item),
				elWidth = element.width(),
				elHeight = element.height();

			_s.len = li.length;

			element.css("position", "relative");
			li.css({"position":"absolute", "display":"none"});
			li.first().css("display", "block");
			li.width(elWidth);
			li.height(elHeight);

			_o.dots && that.createDots(element, li);

			if (_o.autoplay) {
				_s.timer = setInterval(function() {
					that.fading(li);
				}, _o.delay);
			};
		},

		fading: function(item) {
			var that = this,
				_o = that.defOptions,
				_s = that._status;

			_s.complete = false;

			if (_s.index == _s.len - 1) {
				_s.index = 0;
			} else {
				_s.index ++;
			};

			item.eq(_s.index).css("z-index", 1).show();
			item.eq(_s.lastIndex).css("z-index", 2).fadeOut(_o.speed, function() {
				_s.complete = true;
			});

			_o.dots && $("#fadeDots>li").removeClass("active").eq(_s.index).addClass("active");

			_s.lastIndex = _s.index;

			if (_s.timer) {
				_s.timer = clearInterval(_s.timer);
				_s.timer = setInterval(function() {
					that.fading(item);
				}, _o.delay);
			};
		},

		createDots: function(el, item) {
			var that = this,
				_s = that._status,
				html = "<ol id='fadeDots'>";

			for (var i = 1; i < _s.len+1; i++) {
				if (i == _s.index+1) {
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
				if (_s.complete && !$(this).hasClass("active")) {
					_s.index = $(this).index() - 1;
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
