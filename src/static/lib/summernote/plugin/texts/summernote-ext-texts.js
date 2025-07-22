(function (factory) {
	/* global define */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(window.jQuery);
	}
}(function ($) {
	$.extend($.summernote.options, {
		template: {
			list: []
		}
	});
	$.extend(true, $.summernote.lang, {
		'sk-SK': {
			htexts: {
				title: 'Texty',
				label: 'Pomocné texty'
			}
		},
		'cs-CZ': {
			htexts: {
				title: 'Texty',
				label: 'Pomocní texty'
			}
		},
		'en-US': {
			htexts: {
				title: 'Texts',
				label: 'Help texts'
			}
		}
	});

	// Extends plugins for adding templates.
	//  - plugin is external module for customizing.
	$.extend($.summernote.plugins, {
		/**
		 * @param {Object} context - context object has status of editor.
		 */
		'htexts': function (context) {
			// ui has renders to build ui elements.
			//  - you can create a button with `ui.button`
			var ui      = $.summernote.ui;
			var $editor = context.layoutInfo.editor;
			var options = context.options.template;
			var lang    = context.options.langInfo;
			var defaultOptions = {
				label: lang.htexts.title,
				tooltip: lang.htexts.label
			};

			// Assign default values if not supplied
			for (var propertyName in defaultOptions) {
				if (options.hasOwnProperty(propertyName) === false) {
					options[propertyName] = defaultOptions[propertyName];
				}
			}

			// add hello button
			context.memo('button.htexts', function () {
				var sn_hTexts = [];
				if ( typeof( summernote_htexts ) != 'undefined' ) sn_hTexts = summernote_htexts;
				if ( typeof( context.options.helpTexts ) != 'undefined' ) {
					eval( 'if ( typeof(' + context.options.helpTexts + ') != "undefined" ) sn_hTexts = ' + context.options.helpTexts + ';' );
				}
				// create button
				options.list = '';
				if ( typeof(sn_hTexts) == 'undefined' ) {
					console.log( 'SUMMERNOTE HTEXTS PLUGIN ERROR: Variable "summernote_htexts" is not defined.' );
					sn_hTexts = [];
				}
				for ( var i in sn_hTexts ) {
					options.list += '<li><a href="#" data-value="' + sn_hTexts[i].value + '">' + sn_hTexts[i].caption + '</a></li>';
				}
				var button = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle',
						contents: '<span class="template"/> ' + options.label + ' <span class="caret"></span>',
						tooltip: options.tooltip,
						data: {
							toggle: 'dropdown'
						}
					}),
					ui.dropdown({
						className: 'dropdown-template',
						items: options.list,
						click: function (event) {
							event.preventDefault();

							var $button = $(event.target);
							var value   = $button.data('value');

							if ( typeof( sn_hTexts ) == 'undefined' ) {
								console.log( 'SUMMERNOTE HTEXTS PLUGIN ERROR: Variable "' + context.options.helpTexts + '" is not defined.' );
								sn_hTexts = [];
							}
							if ( typeof( sn_hTexts[ value ] ) != 'undefined' && typeof( sn_hTexts[ value ].content ) != 'undefined' && sn_hTexts[ value ].content != '' ) {
								var code = context.invoke('code');
								if ( code != '' && code.length > 11 && code.indexOf('<') == -1 && code.indexOf('</') == -1 && code.indexOf('>') == -1 ) code = '<p>' + code + '</p>';
								var text = sn_hTexts[ value ].content;
								if ( text.indexOf('<') == -1 && text.indexOf('</') == -1 && text.indexOf('>') == -1 ) text = '<p>' + text + '</p>';
								context.invoke( 'code' , code + ( code != '' && code.length > 13 ? '' /* '<p><br></p>' */ : '' ) + text );
//								var node = document.createElement('div');
//								node.innerHTML = sn_hTexts[ value ].content;
//								context.invoke('insertNode', node);
							} else console.log( 'SUMMERNOTE HTEXTS PLUGIN ERROR: Variable "' + context.options.helpTexts + '" is empty or value "' + value + '" is not defined.' );
						}
					})
				]);

				// create jQuery object from button instance.
				return button.render();
			});
		}
	});
}));
