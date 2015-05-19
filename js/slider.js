(function($) {
	var Slider = function(element, option) {
		this.defOptions = $.extend({}, this.defOptions, option);
		this.init($(element));
	};

	Slider.prototype = {

		defOptions: {
			type : "left", //support "left, top"
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
			type: null,
			start: 0,
			end: 0,
			step: 0,
			slen: 0,
			index: 0,
			to: true,
			complete: true,
			timer: null
		},

		init: function(element) {
			var wh, that = this,
				_o = that.defOptions,
				_s = that._status,
				ul = element.find(_o.items),
				li = ul.find(_o.item),
				elWidth = element.width(),
				elHeight = element.height(),
				type = _o.type;

			if (!(type == "left" || type == "top")) {
				alert('type: "left" or "top"');
				return false;
			};

			len = li.length;
			type == "left" ? wh = elWidth : elHeight;
			
			_s.type = type;	
			_s.step = wh * _o.step / _o.visible;
			_s.start = -wh;
			_s.end = wh * (len + _o.visible) / _o.visible;
			_s.slen = wh * (len + _o.visible * 2) / _o.visible;

			console.log(_s.start);

			ul.css({"position": "absolute",  "overflow":"hidden", type: _s.slen + "px"}).css( _o.type, _s.start + "px");
			li.css("float", type == "left" ? "left" : "none");
			ul.prepend(li.slice(len - _o.visible).clone()).append(li.slice(0, _o.visible).clone()); 

			if (_o.autoplay) {
				_s.timer = setInterval(function() {
					that.goSlide(ul);
				}, _o.delay);
			};


			//console.log(that._status.len);
		},

		goSlide: function(items) {
			var that = this,
				_o = that.defOptions,
				_s = that._status,
				type = _o.type;
			
			console.log(type);

			_s.complete = false;
			
			debugger
			if (_s.to) {
				if (_s.index == _s.slen) {
					items.css(_o.type, _s.start +"px");
					_s.index = _s.start;
				};
				_s.index += _s.step;
			} else {
				if (_s.index == 0) {
					items.css(_o.type, _s.end + "px");
					_s.index = _s.end;
				}
				s.index -= _s.step;
			}

			items.animate({type: _s.index + "px"}, _o.speed, function() {
				_s.complete = true;
			});
		}
	};


	window.Slider = Slider || {};

})(jQuery)

