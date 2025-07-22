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
			patientData: {
				title: 'Pacient',
				label: 'Údaje pacienta',
				dg: 'Diagnóza',
				wh_all: 'Hmotnosť, výška',
				wh_last: 'Hmotnosť, výška - posledná',
				bpp_all: 'Tlak, pulz',
				bpp_last: 'Tlak, pulz - posledný',
				med_all: 'Medikácia',
				med_last: 'Medikácia - posledná',
				trm_next: 'Dátum ďalšej rezervácie'
			}
		},
		'cs-CZ': {
			patientData: {
				title: 'Pacient',
				label: 'Údaje pacienta',
				dg: 'Diagnóza',
				wh_all: 'Hmotnost, výška',
				wh_last: 'Hmotnost, výška - poslední',
				bpp_all: 'Tlak, puls',
				bpp_last: 'Tlak, puls - poslední',
				med_all: 'Medikace',
				med_last: 'Medikace - poslední',
				trm_next: 'Datum příští rezervace návštěvy'
			}
		},
		'en-US': {
			patientData: {
				title: 'Patient',
				label: 'Patient data',
				dg: 'Diagnoza',
				wh_all: 'Weight, height',
				wh_last: 'Weight, height - last',
				bpp_all: 'Pressure, pulse',
				bpp_last: 'Pressure, pulse - last',
				med_all: 'Medikace',
				med_last: 'Medication - last',
				trm_next: 'Date of next rezervation'
			}
		}
	});

	// Extends plugins for adding templates.
	//  - plugin is external module for customizing.
	$.extend($.summernote.plugins, {
		/**
		 * @param {Object} context - context object has status of editor.
		 */
		'patientData': function (context) {
			// ui has renders to build ui elements.
			//  - you can create a button with `ui.button`
			var ui      = $.summernote.ui;
			var $editor = context.layoutInfo.editor;
			var options = context.options.template;
			var lang    = context.options.langInfo;
			var defaultOptions = {
				label: lang.patientData.title,
				tooltip: lang.patientData.label
			};
			// Assign default values if not supplied
			for (var propertyName in defaultOptions) {
				if (options.hasOwnProperty(propertyName) === false) {
					options[propertyName] = defaultOptions[propertyName];
				}
			}

			// add hello button
			context.memo('button.patientData', function () {
				// check data
				var dg_allow  = ( $("#snippet--patientDiagnose TD.label:contains('Diagnóza')").length > 0 );
				var wh_allow  = ( $("#snippet--measureWeight .mdl-data-table TBODY TR").length > 0 );
				var bpp_allow = ( $("#snippet--measurePress .mdl-data-table TBODY TR").length > 0 );
				var med_allow = ( $("#snippet--recipesList .custom-table TBODY TR ").length > 0 );

				// create button
				options.list = '';
				if ( dg_allow ) options.list += '<li><a href="#" data-value="dg">' + lang.patientData.dg + '</a></li>';					// diagnóza pacienta
//				options.list += '<li><a href="#" data-value="dg_long">' + lang.patientData.dg_long + '</a></li>';	// dlhodobe diagnozy
				if ( wh_allow ) options.list += '<li><a href="#" data-value="wh_last">' + lang.patientData.wh_last + '</a></li>';		// váha a výška pacienta - posledná
				if ( wh_allow ) options.list += '<li><a href="#" data-value="wh_all">' + lang.patientData.wh_all + '</a></li>';			// váha a výška pacienta - všetky
				if ( bpp_allow ) options.list += '<li><a href="#" data-value="bpp_last">' + lang.patientData.bpp_last + '</a></li>';	// tlak a tep pacienta - posledný
				if ( bpp_allow ) options.list += '<li><a href="#" data-value="bpp_all">' + lang.patientData.bpp_all + '</a></li>';		// tlak a tep pacienta - všetky
				if ( med_allow ) options.list += '<li><a href="#" data-value="med_last">' + lang.patientData.med_last + '</a></li>';	// medikácia pacienta - posledná
				if ( med_allow ) options.list += '<li><a href="#" data-value="med_all">' + lang.patientData.med_all + '</a></li>';		// medikácia pacienta - všetky
				options.list += '<li><a href="#" data-value="trm_next">' + lang.patientData.trm_next + '</a></li>';
//				options.list += '<li><a href="#" data-value="date_vis">' + lang.patientData.date_vis + '</a></li>';
//				options.list += '<li><a href="#" data-value="date_vis">' + lang.patientData.date_vis + '</a></li>';
//				options.list += '<li><a href="#" data-value="date_vis">' + lang.patientData.date_vis + '</a></li>';
//				options.list += '<li><a href="#" data-value="date_vis">' + lang.patientData.date_vis + '</a></li>';
//				options.list += '<li><a href="#" data-value="date_vis">' + lang.patientData.date_vis + '</a></li>';
				var button = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle',
						contents: '<span class="template"/> ' + lang.patientData.title + ' <span class="caret"></span>',
						tooltip: lang.patientData.label,
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
							var pat_data = "xxx";

							// AJAX synchronne volanie na ziskanie pozadovanych udajov
							$.nette.ajax({
								method: "POST",
								url: "./?do=loadPatientData",
								data: { "tp": value },
								dataType: "html", 
//								async: false,
								success: function(ret){
									pat_data = ret;
									if ( typeof( pat_data ) != 'undefined' && pat_data != '' ) {
										var code = context.invoke('code');
										if ( code != '' && code.length > 11 && code.indexOf('<') == -1 && code.indexOf('</') == -1 && code.indexOf('>') == -1 ) code = '<p>' + code + '</p>';
										var text = pat_data;
										//if ( text.indexOf('<') == -1 && text.indexOf('</') == -1 && text.indexOf('>') == -1 )
										text = '<p>' + text + '</p>';
										context.invoke( 'code' , code + ( code != '' && code.length > 13 ? '<p><br></p>' : '' ) + text );
		//								var node = document.createElement('div');
		//								node.innerHTML = sn_hTexts[ value ].content;
		//								context.invoke('insertNode', node);
									} else console.log( 'SUMMERNOTE PATIENT PLUGIN ERROR: Data "' + value + '" is empty or value "' + value + '" is not defined.' );
								}
							}, this, null);

						}
					})
				]);

				// create jQuery object from button instance.
				return button.render();
			});
		}
	});
}));
