(function(factory) {
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
}(function($) {
	$.extend(true, $.summernote.lang, {
		'sk-SK': {
			dekurz_gyn: {
				title: 'Pridať dekurz tehotnej',
				tooltip: 'Pridať dekurz tehotnej',
				date: 'Dátum',
				week: 'Týždeň',
				days: 'Dni',
				weight: 'Hmotnosť',
				urine: 'Moč',
				bpress: 'Tlak krvy',
				find: 'Nález',
				btn_ins: 'Vložiť'
			}
		},
		'cs-CZ': {
			dekurz_gyn: {
				title: 'Přidat dekurz těhotné',
				tooltip: 'Přidat dekurz těhotné',
				date: 'Datum',
				week: 'Týden',
				days: 'Dny',
				weight: 'Hmotnost',
				urine: 'Moč',
				bpress: 'Tlak krve',
				find: 'Nález',
				btn_ins: 'Vložit'
			}
		},
		'en-US': {
			dekurz_gyn: {
				title: 'Add a pregnant decour',
				tooltip: 'Add a pregnant decour',
				date: 'Date',
				week: 'Week',
				days: 'Days',
				weight: 'Weight',
				urine: 'Urine',
				bpress: 'Blood pressure',
				find: 'Finding',
				btn_ins: 'Insert'
			}
		}
	});
	$.extend($.summernote.plugins, {
		'dekurz_gyn': function(context) {
			var self = this;
			var ui = $.summernote.ui;
			var $editor = context.layoutInfo.editor;
			var options = context.options;
			var lang = context.options.langInfo.dekurz_gyn;

			var currentColumn = 0;
			var currentRow = 0;
			var totalColumn = 0;
			var totalRow = 0;

			context.memo('button.dekurz_gyn', function() {
				return ui.button({
					contents: '<i class="fa fa-list-alt">',
					tooltip: lang.tooltip,
					click: function() {
						self.show();
					},
				}).render();
			});

			this.initialize = function() {
				var $container = options.dialogsInBody ? $(document.body) : $editor;
/*
					<div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="text" name="dkg_date" id="dkg_date" class="mdl-textfield__input datepicker" value="">\
							<label for="dkg_date" class="mdl-textfield__label">' + lang.date + '</label>\
						</div>\
					</div>\
*/
				var $row = '<div class="mdl-grid">\
					<div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="number" name="dkg_week" id="dkg_week" class="mdl-textfield__input" value="">\
							<label for="dkg_week" class="mdl-textfield__label">' + lang.week + '</label>\
						</div>\
					</div>\
					<div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="number" name="dkg_days" id="dkg_days" class="mdl-textfield__input" value="">\
							<label for="dkg_days" class="mdl-textfield__label">' + lang.days + '</label>\
						</div>\
					</div>\
					<div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="number" name="dkg_wght" id="dkg_wght" class="mdl-textfield__input" value="">\
							<label for="dkg_wght" class="mdl-textfield__label">' + lang.weight + '</label>\
						</div>\
					</div>\
					<div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="text" name="dkg_urin" id="dkg_urin" class="mdl-textfield__input" value="">\
							<label for="dkg_urin" class="mdl-textfield__label">' + lang.urine + '</label>\
						</div>\
					</div>\
					<div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="text" name="dkg_bprs" id="dkg_bprs" class="mdl-textfield__input" value="">\
							<label for="dkg_bprs" class="mdl-textfield__label">' + lang.bpress + '</label>\
						</div>\
					</div>\
					<div class="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--3-col-phone">\
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">\
							<input type="text" name="dkg_desc" id="dkg_desc" class="mdl-textfield__input" value="">\
							<label for="dkg_desc" class="mdl-textfield__label">' + lang.find + '</label>\
						</div>\
					</div>\
				</div>';

				this.$dialog = ui.dialog({
					title: lang.title,
					body: $row,
					footer: '<button type="button" class="btn btn-primary dkg-insert">' + lang.btn_ins + '</button>'
				}).render().appendTo($container);
			};

			this.show = function() {
				var $dekurzGynDialog = self.$dialog;
				var text = context.invoke('editor.getSelectedText');
				context.invoke('editor.saveRange');

				var tt = ['',''];
				var $ttpm = $("#frm-ncziForm-ttpm").text();
				if ( $ttpm != '' ) {
					tt = $ttpm.split('+');
				}
				var $ttuz = $("#nczi_data-gyn_ttuz").text();
				if ( $ttuz != '' ) {
					var tdy = moment();
					var dt = moment( $("#nczi_data-gyn_uz").text() , 'DD. MM. YYYY' );
					var df = tdy.diff( dt , 'days' );
					tt = $ttuz.split('+');
					var x = ( parseInt(tt[0]) * 7 ) + parseInt(tt[1]) + df;
					tt[0] = Math.floor( x / 7 );
					tt[1] = x % 7;
					console.log( 'X' , tdy , dt , df , x , tt );
				}
				console.log($ttpm , $ttuz , )
				$dekurzGynDialog.find('#dkg_week').val(tt[0]).parent().addClass('is-dirty is-upgraded');
				$dekurzGynDialog.find('#dkg_days').val(tt[1]).parent().addClass('is-dirty is-upgraded');
				$dekurzGynDialog.find('#dkg_wght').val('');
				$dekurzGynDialog.find('#dkg_urin').val('');
				$dekurzGynDialog.find('#dkg_bprs').val('');
				$dekurzGynDialog.find('#dkg_desc').val('');

				this.showDekurzGynDialog( text ).then( function( strData ) {
					context.invoke('editor.restoreRange');
					var $node = $('<div></div>').html( strData )[0];
					if ($node) context.invoke('editor.insertNode', $node);
				}).fail(function() {
					context.invoke('editor.restoreRange');
				});
			};

			this.showDekurzGynDialog = function(text) {
				return $.Deferred(function(deferred) {
					var $dekurzGynDialog = self.$dialog;
					var $selectedNode = null;

					$dekurzGynDialog.find('BUTTON.dkg-insert').click( function() {
						event.preventDefault();

//						var date = $dekurzGynDialog.find('#dkg_date').val();
						var week = $dekurzGynDialog.find('#dkg_week').val();
						var days = $dekurzGynDialog.find('#dkg_days').val();
						var wght = $dekurzGynDialog.find('#dkg_wght').val();
						var urin = $dekurzGynDialog.find('#dkg_urin').val();
						var bprs = $dekurzGynDialog.find('#dkg_bprs').val();
						var desc = $dekurzGynDialog.find('#dkg_desc').val();

						var html = '<table border="1" style="width:100%;border-collapse:collapse;margin-bottom:5px">\
							<tr>\
								<td style="width:13%;padding:2px 5px"><small>' + lang.week + ':</small></td><td style="width:20%;padding:2px 5px">' + week + '</td>\
								<td style="width:13%;padding:2px 5px"><small>' + lang.days + ':</small></td><td style="width:20%;padding:2px 5px">' + days + '</td>\
								<td style="width:13%;padding:2px 5px"><small>' + lang.weight + ':</small></td><td style="width:20%;padding:2px 5px">' + wght + '</td>\
							</tr>\
							<tr>\
								<td style="width:13%;padding:2px 5px"><small>' + lang.urine + ':</small></td><td style="width:20%;padding:2px 5px">' + urin + '</td>\
								<td style="width:13%;padding:2px 5px"><small>' + lang.bpress + ':</small></td><td style="width:20%;padding:2px 5px">' + bprs + '</td>\
								<td style="width:13%;padding:2px 5px" colspan="2">&nbsp;</td>\
							</tr>\
						</table><p style="line-height:normal;"><strong>' + lang.find + ':</strong><br>' + desc + '</p>';

						deferred.resolve( html );
						ui.hideDialog(self.$dialog);
					} );

					ui.onDialogShown(self.$dialog, function() {
						self.$dialog.find('button').tooltip();
					});

					ui.onDialogHidden(self.$dialog, function() {
						self.$dialog.find('button').tooltip('destroy');
//						if (deferred.state() === 'pending') deferred.reject();
					});

					ui.showDialog(self.$dialog);
				});
			};
		},
	});
}));
