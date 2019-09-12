/**
 * Purpose of this script is to load fast for old browsers
 * and get basic html manipulation features, just like jQuery
 *
 * @author Binayak Mishra
 */
'use strict';
(function(global) {
	var htmlHelper = new HtmlHelper();
	function B(selector) {
		if (typeof selector === 'object') {
			return selector;
		}

		function A() {
			this.selector = selector;
		}
		A.prototype = htmlHelper;
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
				callback.apply(_this, [e, eleList]);
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
			if (eleList[i].style.display === 'none') continue;

			_this.styleChanges = _this.styleChanges || {};
			_this.styleChanges['display'] = eleList[i].style.display;
			eleList[i].style.display = 'none';
		}

		return _this;
	};
	HtmlHelper.prototype.html = function(htmlText) {
		var eleList = this._get();
		if (eleList && eleList.length) {
			eleList[0].innerHTML = htmlText;
		}

		return this;
	};
	HtmlHelper.prototype.show = function(callback) {
		var _this = this;
		var eleList = _this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			if (eleList[i].style.display === 'none') {
				eleList[i].style.display = _this.styleChanges && _this.styleChanges['display'] || 'block';
			}
		}

		return _this;
	};
	HtmlHelper.prototype.addClass = function(className) {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			var classes = eleList[i].getAttribute('class') || '';
			if (classes.indexOf(className) === -1) {
				classes = classes.trim();
				classes = classes.length ? classes + ' ' + className : className;
				eleList[i].setAttribute('class', classes);
			}
		}

		return this;
	};
	HtmlHelper.prototype.removeClass = function(className) {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			var classes = eleList[i].getAttribute('class') || '';
			eleList[i].setAttribute('class', classes.replace(className, '').trim());
		}

		return this;
	};
	HtmlHelper.prototype.value = function(className) {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			var classes = eleList[i].getAttribute('class') || '';
			eleList[i].setAttribute('class', classes.replace(className, '').trim());
		}

		return this;
	};
	HtmlHelper.prototype.delete = function() {
		var eleList = this._get();
		for (var i = 0, l = eleList && eleList.length || 0; i < l; i++) {
			eleList[i].parentNode.removeChild(eleList[i]);
		}

		return this;
	};

	B.post = function(url, data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json" );
		xhr.send(JSON.stringify(data));
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.response) {
					console.log(xhr.response);
					var response = JSON.parse(xhr.response);
					callback({
						status: xhr.status,
						response: response
					});
				}
			}
		}
	};

	global.B = B;
})(window);
