(function($) {
	var Slider = function(element, option) {
		this.defOptions = $.extend({}, this.defOptions, option);
		this.init($(element));
	};

	Slider.prototype = {

		defOptions: {
			type : true, // true: "left", false: "top"
			visible: 1,
			step: 1,
			speed : 500,
			delay : 5000,
			dots : false,
			prev : null,
			next : null,
			autoplay : true,
			items : ">ul",
			item : ">li"
		},

		_status: {
			len: 0,
			index: 0,
			one: 0,
			first: 0,
			last: 0,
			end: 0,
			step: 0,
			to: 0,
			auto: true,
			pos: true,
			complete: true,
			timer: null
		},

		init: function(element) {
			var wh, slen, that = this,
				_o = that.defOptions,
				_s = that._status,
				ul = element.find(_o.items),
				li = ul.find(_o.item),
				elWidth = element.width(),
				elHeight = element.height();

			wh = _o.type ? elWidth : elHeight;

			_s.len = li.length;

			_s.one = wh / _o.visible;
			_s.first = _s.to = -wh;
			_s.step = _s.one * _o.step;
			_s.last = -(_s.one * _s.len);
			_s.end = -(_s.one * (_s.len + _o.visible));

			slen = _s.one * (_s.len + _o.visible * 2);

			element.css({"position": "relative", "overflow": "hidden"});
			ul.css({"position": "absolute",  "overflow":"hidden"}).css(_o.type ? "width" : "height", slen + "px").css(_o.type ? "left" : "top", _s.first + "px");
			li.css("float", _o.type ? "left" : "none");
			ul.prepend(li.slice(_s.len - _o.visible).clone()).append(li.slice(0, _o.visible).clone());

			_o.prev && that.goPrev(ul);
			_o.next && that.goNext(ul);

			_o.dots && that.createDots(element, ul);

			if (_o.autoplay) {
				_s.timer = setInterval(function() {
					that.goSlide(ul);
				}, _o.delay);
			};
		},

		goSlide: function(items) {
			var that = this,
				_o = that.defOptions,
				_s = that._status;

			_s.complete = false;

			if (_s.auto) {
				if (_s.pos) {
					_s.to -= _s.step;

					if (_o.dots) {
						if (_s.index == _s.len - 1) {
							_s.index = 0;
						} else {
							_s.index ++;
						};
					};
				} else {
					_s.to += _s.step;

					if (_o.dots) {
						if (_s.index == 0) {
							_s.index = _s.len - 1;
						} else {
							_s.index --;
						};
					};
				};
			} else {
				_s.to = _s.first - _s.one * _s.index;
			};

			items.animate(_o.type ? {left: _s.to + "px"} : {top: _s.to + "px"}, _o.speed, function() {
				_s.complete = true;
				_s.pos = true;
				_s.auto = true;

				if (_s.to == _s.end) {
					items.css(_o.type ? "left" : "top", _s.first +"px");
					_s.to = _s.first;
				};
				
				if (_s.to == 0) {
					items.css(_o.type ? "left" : "top", _s.last + "px");
					_s.to = _s.last;
				};
			});

			_o.dots && $("#sliderDots>li").removeClass("active").eq(_s.index).addClass("active");

			if (_s.timer) {
				_s.timer = clearInterval(_s.timer);
				_s.timer = setInterval(function() {
					that.goSlide(items);
				}, _o.delay);
			};
		},

		goPrev: function(items) {
			var that = this;

			that.defOptions.prev.click(function() {
				if (that._status.complete) {
					that._status.pos = false;
					that.goSlide(items);
				};
			});
		},

		goNext: function(items) {
			var that = this;

			that.defOptions.next.click(function() {
				if (that._status.complete) {
					that.goSlide(items);
				};
			});
		},

		createDots: function(el, items) {
			var that = this,
				_s = that._status,
				html = "<ol id='sliderDots'>";

			for (var i = 1; i < _s.len+1; i++) {
				if (i == _s.index + 1) {
					html += "<li class='active'>"+ i +"</li>";
				} else {
					html += "<li>"+ i +"</li>";
				}
			};
			html += "</ol>";

			el.append(html);

			var magin = (-$("#sliderDots").width()/2) + "px";
			$("#sliderDots").css("margin-left",magin);

			$("#sliderDots>li").click(function() {
				if (_s.complete && !$(this).hasClass("active")) {
					_s.auto = false;
					_s.index = $(this).index();
					that.goSlide(items);
				};
			});
		}	
	};

	$.fn.slider = function(options) {
		new Slider(this, options);
	};

	window.Slider = Slider || {};

})(jQuery)

