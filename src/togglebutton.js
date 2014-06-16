(function($){

	$.extend($, {

		/**
		 * Default for options:
		 * - {String} name : Class name for the activated
		 * - {String} group : data-* attribute key for group
		 * - {String} eventChange : Event name triggered when changed
		 * - {String} eventActive : Event name triggered when activated
		 * - {Boolean} radio : Enable or disable radio mode
		 */
		toggleButtonDefaults: {
			name: "active",
			group: "toggleGroup",
			eventChange: "toggle.change",
			eventActive: "toggle.active",
			radio: true 
		},

		/**
		 * Get grouped toggle button elements
		 * - $.getToggleGroup("my-group", "button", {group: "toggleGroup"});
		 *
		 * @param {String} name
		 * @param {String} nodeName
		 * @param {Object} options
		 * @returns {jQueryObject}
		 */
		getToggleGroup: function(name, nodeName, options){
			nodeName = nodeName || "button";
			options = $.extend({}, $.toggleButtonDefaults, options);
			return $(nodeName).filter(function(){
				return $(this).data(options.group) === name;
			});
		}


	});

	$.fn.extend({

		/**
		 * Get grouped toggle button elements by jQuery object
		 * - $(this).getGroup({group: "toggleGroup"});
		 * 
		 * @param {Object} options
		 * @returns {jQueryObject}
		 */
		getGroup: function(options){
			var node, group;

			options = $.extend({}, $.toggleButtonDefaults, options);
			node = this.eq(0);
			group = node.data(options.group);

			if(!! group && node.length){
				return $.getToggleGroup(group, node.get(0).nodeName);
			}

			return null;
		},

		/**
		 * Get simply serialized array data from toggle button group
		 * - $(this).serializeGroup({name: "active", group: "toggleGroup"});
		 * 
		 * @param {Object} options
		 * @returns {Array}
		 */
		serializeGroup: function(options){
			var group, data;

			options = $.extend({}, $.toggleButtonDefaults, options);
			group = this.getGroup(options);
			data = [];

			if(group){
				group.filter("." + options.name).each(function(){
					data.push(this.value);
				});
			}

			return data;
		},

		/**
		 * Initialize toggle button
		 *
		 * @param {Object} options
		 * @returns {jQueryObject}
		 */
		toggleButton: function(options){

			var my = {};

			my.options = $.extend({}, $.toggleButtonDefaults, options);

			my.toggle = function(node, active){
				var o, _active;

				o = my.options;
				_active = node.hasClass(o.name);

				if(o.radio && active === void 0 && _active){
					return;
				}

				active = ($.type(active) === "boolean") ? active : ! _active;
				node.toggleClass(o.name, active);

				if(_active !== active){
					node.trigger(o.eventChange, active);
					if(active){
						node.trigger(o.eventActive);
					}
				}
				return active;
			};

			my.handler = function(e){
				var o, el, node, group;

				o = my.options;
				el = e.currentTarget;
				node = $(el);
				group = node.data(o.group);

				if(my.toggle(node) && !! group && o.radio){
					$.getToggleGroup(group, el.nodeName).each(function(){
						if(el !== this){
							my.toggle($(this), false);
						}
					});
				}
			};

			this.each(function(){
				$(this).on("click", my.handler);
			});

			return this;
		}

	});

}(jQuery));