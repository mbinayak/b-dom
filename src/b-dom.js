/**
 * Purpose of this script is to load fast for old browsers
 * and get basic html manipulation features, just like jQuery
 *
 * @author Binayak Mishra
 */
'use strict';
(function(global) {
	var JQmicro = new HtmlHelper();
	function B(selector) {
		function A() {
			this.selector = selector;
		}
		A.prototype = JQmicro;
		return new A();
	}

	function HtmlHelper() {}
	HtmlHelper.prototype._get = function() {
		if (!this.ele) {
			this.ele = document.querySelectorAll(this.selector);
		}

		return this.ele;
	};
	HtmlHelper.prototype.on = function(eventType, callback) {
		var _this = this;
		var eleList = _this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++)
			eleList[i].addEventListener(eventType, function(e) {
				callback(e, eleList);
			});

		return _this;
	};
	HtmlHelper.prototype.click = function(callback) {
		this.on('click', callback);

		return this;
	};
	HtmlHelper.prototype.change = function(callback) {
		this.on('change', callback);

		return this;
	};
	HtmlHelper.prototype.focusIn = function(callback) {
		this.on('focusin', callback);

		return this;
	};
	HtmlHelper.prototype.focusOut = function(callback) {
		this.on('focusout', callback);

		return this;
	};
	HtmlHelper.prototype.hide = function(callback) {
		var _this = this;
		var eleList = _this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			_this.styleChanges = _this.styleChanges || {};
			_this.styleChanges['display'] = eleList[i].style.display;
			eleList[i].style.display = 'none';
		}

		return _this;
	};
	HtmlHelper.prototype.show = function(callback) {
		var _this = this;
		var eleList = _this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			if (eleList[i].style.display === 'none') {
				eleList[i].style.display = _this.styleChanges && _this.styleChanges['display'] || '';
			}
		}

		return _this;
	};
	HtmlHelper.prototype.addClass = function(className) {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			var classes = eleList[i].getAttribute('class') || '';
			if (classes.indexOf(className) === -1) {
				eleList[i].setAttribute('class', classes + ' ' + className);
			}
		}

		return this;
	};
	HtmlHelper.prototype.removeClass = function(className) {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			eleList[i].setAttribute('class', eleList[i].getAttribute('class').replace(className, ''));
		}

		return this;
	};

	global.B = B;
})(window);

