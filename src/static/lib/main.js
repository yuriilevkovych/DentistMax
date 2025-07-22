var datepicker = {};
var timepicker = {};
var imgServer = 'http://www.navstevalekara.sk/';
var str_now = '';
var lastAjaxData = null;
var cal_selected_item = false;
var do_edit = false;
var appCheckRetryAllow = false;
var contentScrolling = false;
var gridster = null;

$(function(){
	Dropzone.autoDiscover = false;
	$.nette.init();
});

$(document).ready(function(){
/***********************
 *   GLOBAL            *
 ***********************/
 	$("#tab-files").on("click" , ".dz-remove" , function() {
 		var q = confirm( locale['conf_del'] );
 		if ( !q ) return false;
 		else return true;
 	});
	$("NAV#menu A.toggle-menu").click(function(){
		var state = $("BODY").hasClass("small-menu");
		if (!state) { // do small menu
			$("BODY").addClass("small-menu");
			$(this).find('I').removeClass('fa-arrow-circle-left').addClass('fa-arrow-circle-right');
		} else {
			$("BODY").removeClass("small-menu");
			$(this).find('I').removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-left');
		}
		OptionsSave('menu', (state ? 1 : 0));
		return false;
	});
	$("NAV#user .mdl-menu LI.user-profile A").click(function(){
		if ( $(this).hasClass('disabled') ) return false;
		var id = $(this).attr('data-profile');
//		console.log(APP_state);
		if ( APP_state.run && APP_state.card ) $.post( APPSC_URL + '/FREE_CC' );
		OptionsSave('profile', id);
		document.location.reload();
		return false;
	});
	$("#sidebox SUMMARY").click( function() {
		if ( !$("BODY").hasClass('sidebox-open') ) $("BODY").addClass('sidebox-open');
		var box = $(this).closest('ASIDE');
		if ( !box.hasClass("open") ) box.addClass('open');
		var tab = $(this).closest('DETAILS');
		$("#sidebox DETAILS[open]").attr('open' , false);
		if ( IS_presenter == 'Calendar' || IS_presenter == 'Patients' ) {
			OptionsSave('PatCalSidebar', tab.attr('id') );
		} else {
			OptionsSave(IS_presenter + 'Sidebar', tab.attr('id') );
		}
		setTimeout( function() {
			$("#content.dashboard .grid").trigger("ss-arrange");
		}, 500);
		if ( $(this).attr('data-focus') != '' ) {
			var focus = $(this).attr('data-focus').toString();
			if ( focus.substr(0,1) == '§' ) eval( focus.substr(1) + '[0].selectize.focus();' );
			else $( focus ).focus();
		}
//		tab.attr('open' , true);
	});
	$("#sidebox #sidebox-hide").click( function() {
		$("#sidebox").removeClass('open');
		$("#sidebox DETAILS[open]").attr('open' , false);
		$("BODY").removeClass('sidebox-open');
		if ( IS_presenter == 'Calendar' || IS_presenter == 'Patients' ) {
			OptionsSave('PatCalSidebar', '' );
		} else {
			OptionsSave(IS_presenter + 'Sidebar', '' );
		}
		setTimeout( function() {
			$("#content.dashboard .grid").trigger("ss-arrange");
		}, 500);
		var hash = document.location.hash.substr(1);
		if ( hash.indexOf( 'sidebar' ) != -1 ) {
			document.location.hash = '';
		}
	});
	$(document).on('click' , function (e) {
//		if ( $( e.target ).closest('ASIDE#sidebox').length === 0 )
//			$("#sidebox #sidebox-hide").click();
	});
	initTooltips();
	if ($('.scroll').length > 0) {
		initScroll();
	}
	$(".frm-reset").click(function(){
		var frm = $(this).data('form');
		if (typeof(frm) == 'undefined') return false;
		$('#'+frm)[0].reset();
		$('#'+frm).find("INPUT[type=text],TEXTAREA,SELECT").each(function() {
			$(this).val('').attr('value', '').parent().removeClass('is-upgraded is-focused is-dirty is-invalid');
		});
		$('#'+frm).find("SELECT OPTION:selected").each(function() {
			$(this).attr('selected', false).parent().removeClass('is-upgraded is-focused is-dirty is-invalid');
		});
		$('#'+frm).find("INPUT[type=radio],INPUT[type=checkbox]").each(function() {
			$(this).attr('checked', false).parent().removeClass('is-upgraded is-focused is-dirty is-invalid');
		});
		$('#'+frm).find("INPUT[type='submit']").click();
	});
	$(document).on( 'click' , '.selectize-input' , function() {
		$(this).find('INPUT').focus();
	} );
/*	$(document).on( 'click' , 'A[disabled],A.disabled' , function( e ) {
		console.log( 'DISABLE-CLICK' , $(this).attr('href') );
		e.stopPropagation();
		e.stopImediatePropagation();
		return false;
	});*/
	$(document).on( 'submit' , 'FORM' , function() {
		var $ths = $(this);
		setTimeout( function() {
			$ths.find("#frm-docForm-btnSubmit,.mdl-dialog__actions INPUT[type='submit'],.mdl-dialog__actions INPUT[type='button'],.mdl-dialog__actions BUTTON,.mdl-tabs__buttons INPUT[type='submit'],.mdl-tabs__buttons INPUT[type='button'],.mdl-tabs__buttons BUTTON").each(function(i){
				if ( !$(this).hasClass('btn-close') && !$(this).hasClass('no-disable') ) {
					$(this).prop("disabled", true).addClass("ui-state-disabled");
				}
			});
		}, 250);
	});
	$(document).on( 'click' , 'DIALOG .btn-close' , function() {
		var dlg = '';
		var dialogClass = $(this).closest('DIALOG').attr('class').split(' ');
		for ( var i in dialogClass ) {
			if ( dialogClass[ i ].substr( 0 , 6 ) == 'dialog' ) dialogName = dialogClass[ i ];
		}
		var dialogBox = document.querySelector( 'DIALOG.' + dialogName );
		if (!dialogBox.showModal) {
			dialogPolyfill.registerDialog( dialogBox );
			dialogBox.getBoundingClientRect();
		}
		dialogBox.close();
	});
	if ( $(".mdl-tabs").length > 0 ) {
		if ( location.hash != "" ) {
			var tab = location.hash.substr(1);
			$(".mdl-tabs .mdl-tabs__tab").removeClass("is-active");
			$(".mdl-tabs .mdl-tabs__panel").removeClass("is-active");
			$(".mdl-tabs .mdl-tabs__panel#"+tab).addClass("is-active");
			$("A.mdl-tabs__tab[href='#"+tab+"']").addClass("is-active");
		}
		console.log('TABinit',document.location);
		$(document).on('click' , 'A.mdl-tabs__tab' , function() {
			var hash = $(this).attr('href');
			var loc = document.location.href;
			if ( loc.indexOf('#') != -1 ) loc = loc.substr( 0 , loc.indexOf('#') );
			loc = loc + hash;
			console.log( 'TABclick' , loc );
			if ( hash != '' ) {
				window.history.replaceState({}, null, loc);
			}
		});
	}
	if ( $("A.clear-date").length > 0 ) {
		$("A.clear-date").click( function() {
			var input = $(this).attr('data-input');
			$( '#' + input ).val( '' ).attr( 'value' , '' );
		});
	}
	initTextCounter();
	jQuery.fn.extend( {
		clearSelectize: function() {
			this.each( function() {
				if ( $(this).hasClass('selectized') ) {
					var src = $(this).attr('data-source');
					if ( typeof( src ) == 'undefined' ) src = 'selectize_settings';
					if ( typeof( $(this).attr('data-oid') ) != 'undefined' && $(this).attr('data-oid') != '' ) src = 'evys_selectize';
					eval( 'var selz_src = ' + src + ';' );
					var $slz = $(this).selectize( selz_src );
					var $slzz = $slz[0].selectize;
					$slzz.clear(true);
				}
			});
		},
		setSelectizeVal: function( val ) {
			this.each( function() {
				if ( $(this).hasClass('selectized') ) {
					var src = $(this).attr('data-source');
					if ( typeof( src ) == 'undefined' ) src = 'selectize_settings';
					if ( typeof( $(this).attr('data-oid') ) != 'undefined' && $(this).attr('data-oid') != '' ) src = 'evys_selectize';
					eval( 'var selz_src = ' + src + ';' );
					var $slz = $(this).selectize( selz_src );
					var $slzz = $slz[0].selectize;
					$slzz.setValue( val );
				}
			});
		}
	} );
/***********************
 *   LIST TABLES       *
 ***********************/
	if ($("#per-page").length > 0) {
		$("#per-page").change(function(){
			var val = $(this).val();
			OptionsSave(IS_presenter+'PerPage', val);
			location.reload();
		});
	}
	$("TR[data-iditem]").each(function(){
		var id = $(this).attr('data-iditem');
		$(this).find("TD:not(.actions)").css({'cursor': 'pointer'}).click(function() {
			var detail = false;
			if ( $(this).parent().find("TD.actions A.btn-detail").length > 0 ) detail = $(this).parent().find("TD.actions A.btn-detail");
			else if ( $(this).parent().find("TD.actions A.btn-edit").length > 0 ) detail = $(this).parent().find("TD.actions A.btn-edit");
			if ( detail !== false ) $(detail)[0].click();
		});
	});
	$("DIV[data-iditem]").each(function(){
		var id = $(this).attr('data-iditem');
		$(this).click(function() {
			var detail = false;
			if ( $(this).find("A.btn-detail").length > 0 ) detail = $(this).find("A.btn-detail");
			else if ( $(this).find("A.btn-edit").length > 0 ) detail = $(this).find("A.btn-edit");
			if ( detail !== false ) $(detail)[0].click();
		});
	});

/***********************
 *   DIALOGS         *
 ***********************/
 	initDialogs();

//	$(".confirm-delete").on('click', function() {
	$(document).on('click', ".confirm-delete", function(e) {
		var q = $(this).attr('data-confirm');
		if (typeof(q) == 'undefined' || q == null || q == '') q = locale['confirm_del'];
		
		if ( $(this).hasClass( 'confirm-response' ) ) {
			var $thisBtn = $(this);
			var title = $(this).attr('title');
			var dialogDel = initDialog('OPEN', 'DIALOG.dialogPopupWindow', 400 , 300);
			$('DIALOG.dialogPopupWindow').find('.mdl-dialog__title').html( title );
			var $content = $('DIALOG.dialogPopupWindow').find('.mdl-dialog__content');
			$content.empty();
			$content.append( '<p>' + q + '</p>' );
			$content.append( '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"><input type="text" name="confirmDeleteAnswer" id="confirmDeleteAnswer" value="" class="mdl-textfield__input"><label for="confirmDeleteAnswer" class="mdl-textfield__label">' + locale['reason_del'] + '</label></div>' );

			$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').find('.btn-close').html( locale['btn_cancel'] );
			if ( $('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').find("#popupDelAllow").length > 0 ) $('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').find('#popupDelAllow').remove();
			$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').append( '<button type="button" id="popupDelAllow" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">' + locale['btn_del'] + '</button>' );

			var elm = document.getElementById('dialogPopupWindow');
			componentHandler.upgradeElement( elm.querySelector('.mdl-textfield') );
			componentHandler.upgradeElement( elm.querySelector('.mdl-button') );

			$("#popupDelAllow").click( function() {
				var a = $thisBtn.data('action');
				var ret = $('#confirmDeleteAnswer').val();
				console.log( a , ret );
				if ( typeof( a ) != 'undefined' ) {
					$.nette.ajax({
						url: $thisBtn.attr("href"),
						dataType: 'json',
						data: {
							'answer': ret
						},
						method: 'POST',
						success: function(data) {
							console.log(data);
						}
					}, this, null);
				} else if ( $thisBtn.hasClass('snippet') ) {
					$.nette.ajax({
						url: $thisBtn.attr("href"),
						dataType: 'json',
						data: {
							'answer': ret
						},
						method: 'POST',
						success: function(data) {
							console.log(data);
//							if ( typeof(data['snippets']) != 'undefined' ) {
//								for ( var s in data['snippets'] ) {
//									console.log( s , data['snippets'][ s ] );
//									$( "#"+s ).html( data['snippets'][ s ] );
//								}
//							}
						}
					}, this, null);
				}
				dialogDel.close();
			});
			return false;
		} else {
			var ret =  window.confirm(q);
			var a = $(this).data('action');
			if ( typeof( a ) != 'undefined' && ret ) {
				$.nette.ajax({
					url: $(this).attr("href"),
					dataType: 'json',
					method: 'POST',
					success: function(data) {
						console.log(data);
						if ( a == 'refreshCal' ) {
							var dialogBox = document.querySelector( 'DIALOG.dialogOrder' );
							dialogBox.close();
							refreshCalendar();
						}
					}
				}, this, null);
				return false;
			} else if ($(this).hasClass('snippet') && ret) {
				$.nette.ajax({
					url: $(this).attr("href"),
					dataType: 'json',
					method: 'POST',
					success: function(data) {
						console.log(data);
//						if (typeof(data['snippets']) != 'undefined') {
//							for (var s in data['snippets']) {
//								console.log(s, data['snippets'][ s ]);
//								$("#"+s).html( data['snippets'][ s ] );
//							}
//						}
					}
				}, this, null);
				return false;
			} else {
				return ret;
			}
		}
	});

/***********************
 *   DASHBOARD         *
 ***********************/
	if ($("#content.dashboard").length > 0) {
		gridster = $("#content.dashboard .grid").shapeshift({
			enableDrag: false,
			enableResize: true,
			enableCrossDrop: false,
			colWidth: 375,
			columns: null,
			minColumns: 1,
			gutterX: 20,
			gutterY: 20,
			paddingX: 0,
			paddingY: 20
		});
	}

/***********************
 *   PATIENTS          *
 ***********************/
	$(document).on('keyup', "#frm-patientForm-ident", function() {
		var rc = $(this).val();
		$(".ident-check .check-state").hide();
 		$(".ident-check .check-w").show();
 		if ( rc == '' || rc.length < 9 || rc.length > 10 || ( rc.length == 10 && parseInt( rc ) % 11 != 0 ) ) {
	 		$(".ident-check .check-w").hide();
	 		$(".ident-check .check-no").show();
 			return;
 		}
		$.nette.ajax({
			url: "/patients/?do=CheckIdent",
			data: "ident=" + rc,
			dataType: 'json',
			method: 'POST',
			success: function(data) {
	 			$(".ident-check .check-state").hide();
				if (data.count == 0 || (data.count > 0 && !data.is_my) ) $(".ident-check .check-ok").show();
				else if (data.is_my) $(".ident-check .check-er").show();
				else $(".ident-check .check-ch").show();
			}
		}, this, null);
 	});
	$(document).on('keyup', "#frm-patientForm-eu_ident", function() {
		if ( $("#frm-patientForm-ident").val() != '' ) return;
		$(".ident-check .check-state").hide();
 		$(".ident-check .check-w").show();
 		if ( $(this).val() == '' || $(this).val().length < 5 ) {
	 		$(".ident-check .check-w").hide();
	 		$(".ident-check .check-no").show();
 			return;
 		}
		$.nette.ajax({
			url: "/patients/?do=CheckIdent",
			data: "ident="+$(this).val(),
			dataType: 'json',
			method: 'POST',
			success: function(data) {
	 			$(".ident-check .check-state").hide();
				if (data.count == 0 || (data.count > 0 && !data.is_my) ) $(".ident-check .check-ok").show();
				else if (data.is_my) $(".ident-check .check-er").show();
				else $(".ident-check .check-ch").show();
			}
		}, this, null);
 	});
	$("#tab-documents .docForm .datetime .new").click(function(){
		$("#tab-documents .docForm FORM").toggle(500);
		$("#tab-documents .docForm .docForm--hidden").toggle(500);
	});
	$(document).on('click', "#BtnDocItemsSort" , function() {
		var sort = $(this).attr("data-sort");
		if ( parseInt( sort ) == 1 ) sort = 0;
		else sort = 1;

		OptionsSave(IS_presenter+'Order', sort);
		refreshDocs();
	});
/*
	$("#frm-docForm #frm-docForm-insurance").change(function(){
		var ins = $("#frm-docForm-insurance").val();
		for (var i = 0; i < 30; i++) {
			checkDocInputs( i );
			var $sel = $("#frm-docForm-service"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-service', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $sel = $("#frm-docForm-aid"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-aid', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $sel = $("#frm-docForm-diagnose"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-diagnose', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
		}
	});
*/
	function checkDocInputs( i ) {
		var ins = $("#frm-docForm-insurance").val();
		var vals = $("#frm-docForm-service"+i).val();
		var vala = $("#frm-docForm-aid"+i).val();
		var vald = $("#frm-docForm-diagnose"+i).val();
		var valr = $("#frm-docForm-area"+i).val();
//		console.log(i, vals, vala, vald, valr);
		if ( ins == '' || ( ins != '' && typeof(insurancePrice[ins]) != 'undefined' && parseFloat(insurancePrice[ins]) == 0 ) || ( vals == '' && vala == '' && vald == '' && valr == '' ) ) {
			$("#frm-docForm-service"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-aid"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-diagnose"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-area"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
		} else {
			if ( vald == '' ) $("#frm-docForm-diagnose"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"' + locale['dekurz_dg_req'] + '"}]').parent().addClass('is-invalid');
			if ( valr == '' ) $("#frm-docForm-area"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"' + locale['dekurz_pos_req'] + '"}]').parent().addClass('is-invalid');
			if ( vals == '' && vala == '' ) {
				$("#frm-docForm-service"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"' + locale['dekurz_srv_req'] + '"}]').parent().addClass('is-invalid');
				$("#frm-docForm-aid"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"' + locale['dekurz_srv_req'] + '"}]').parent().addClass('is-invalid');
			} else {
				$("#frm-docForm-service"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
				$("#frm-docForm-aid"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			}
		}
	}
	$(document).delegate('DIV.dialogAddDoc A.btn-diagserv-adv', 'click', function(){
		var row = $(this).attr('data-row');
		var advDialog = initDialog('OPEN', 'DIALOG.dialogPopupWindow', 600, 500 );
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__title').html( locale['dekurz_spec_data'] );
		var h = $(advDialog).height();

		var $content = $('<div></div>');
		$content.append('<input type="hidden" name="advRow" id="advRow" value="'+row+'">');

		$content.append('<strong>' + locale['dekurz_dr_supp'] + ':</strong><br>');
		var $box = $('<div class="mdl-grid nopad"></div>');
		var $cell = $('<div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"></div>');
		$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="zPZS" id="zPZS" value="" class="mdl-textfield__input"><label for="zPZS" class="mdl-textfield__label">' + locale['dr_pzs'] + '</label></div>');
		$box.append( $cell );
		var $cell = $('<div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"></div>');
		$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="zKZP" id="zKZP" value="" class="mdl-textfield__input"><label for="zKZP" class="mdl-textfield__label">' + locale['dr_kzp'] + '</label></div>');
		$box.append( $cell );
		$content.append( $box );
		$content.append('<br><br>');

		$content.append('<strong>' + locale['dekurz_dr_recm'] + ':</strong><br>');
		var $box = $('<div class="mdl-grid nopad"></div>');
		if ( IS_lang != 'cz' ) {
			var $cell = $('<div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone"></div>');
			$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="oPZS" id="oPZS" pattern="' + ( IS_lang == 'cz' ? '[0-9]{7}0' : '[A-Z][0-9]{11}' ) + '" value="" class="mdl-textfield__input"><label for="oPZS" class="mdl-textfield__label">' + locale['dr_pzs'] + '</label></div>');
			$box.append( $cell );
		}
		var $cell = $('<div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone"></div>');
		$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="oKZP" id="oKZP" pattern="' + ( IS_lang == 'cz' ? '[0-9]{8}' : '[A-Z][0-9]{8}' ) + '" value="" class="mdl-textfield__input"><label for="oKZP" class="mdl-textfield__label">' + locale['dr_kzp'] + '</label></div>');
		$box.append( $cell );
		if ( IS_lang == 'cz' ) {
			var $cell = $('<div class="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--2-col-phone"></div>');
			$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="oSPC" id="oSPC" pattern="' + ( IS_lang == 'cz' ? '[0-9]{3}' : '' ) + '" value="" class="mdl-textfield__input"><label for="oSPC" class="mdl-textfield__label">' + locale['xticket_spec'] + '</label></div>');
			$box.append( $cell );
		}
		var $cell = $('<div class="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--2-col-phone"></div>');
		$cell.append('<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input type="text" name="oLDT" id="oLDT" value="" class="mdl-textfield__input datepicker" data-popup="topleft"><label for="oLDT" class="mdl-textfield__label">' + locale['xticket_date'] + '</label></div>');
		$box.append( $cell );
		$content.append( $box );
//		$content.append('<br><br>');

		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').empty().append( $content );
		if ( !$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').hasClass('scroll') ) $('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').addClass('scroll');
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').find('#btn-set-advanced').remove();
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').append( '<button type="button" id="btn-set-advanced" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">' + locale['btn_set'] + '</button>' );

		var elm = document.getElementById('dialogPopupWindow');
		componentHandler.upgradeElement( elm.querySelector('.mdl-textfield') );
		componentHandler.upgradeElement( elm.querySelector('.mdl-button') );
		componentHandler.upgradeDom();
		initScroll();
		initInputs( 'DIALOG.dialogPopupWindow' );

		var val = $("#frm-docForm-desc" + row).attr( 'value' );
		if ( val != '' ) {
			var x = val.split(';');
			for( var z in x ) {
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'zPZS:' ) $("#zPZS").attr( 'value' , x[ z ].substr( 5 ) );
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'zKZP:' ) $("#zKZP").attr( 'value' , x[ z ].substr( 5 ) );
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'oPZS:' ) $("#oPZS").attr( 'value' , x[ z ].substr( 5 ) );
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'oKZP:' ) $("#oKZP").attr( 'value' , x[ z ].substr( 5 ) );
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'oLDT:' ) $("#oLDT").attr( 'value' , x[ z ].substr( 5 ) );
				if ( x[ z ] != '' && x[ z ].substr( 0 , 5 ) == 'oSPC:' ) $("#oSPC").attr( 'value' , x[ z ].substr( 5 ) );
			}
		}

		$("#btn-set-advanced").click(function(){
			var row = $("#advRow").val();
			var zKZP = $("#zKZP").val();
			var zPZS = $("#zPZS").val();
			var oKZP = $("#oKZP").val();
			if ( IS_lang != 'cz' ) var oPZS = $("#oPZS").val();
			else var oPZS = '';
			if ( IS_lang == 'cz' ) var oSPC = $("#oSPC").val();
			else var oSPC = '';
			var oLDT = $("#oLDT").val();

			if ( oKZP == '' || ( oPZS == '' && IS_lang == 'sk' ) || ( oSPC == '' && IS_lang == 'cz' ) || oLDT == '' ) {
				alert( locale['dekurz_recm_error'] );
				return false;
			}
			var patt_oKZP = new RegExp( $("#oKZP").attr('pattern') );
			var patt_oPZS = new RegExp( $("#oPZS").attr('pattern') );
			var patt_oSPC = new RegExp( $("#oPZS").attr('pattern') );
			if ( !patt_oKZP.test( oKZP ) || ( !patt_oPZS.test( oPZS ) && IS_lang == 'sk' ) || ( !patt_oSPC.test( oSPC ) && IS_lang == 'cz' ) ) {
				alert( locale['dekurz_recm_invalid'] );
				return false;
			}

			var str = '';
			if ( zPZS != '' ) str = str + ( str != '' ? ';' : '' ) + 'zPZS:' + zPZS;
			if ( zKZP != '' ) str = str + ( str != '' ? ';' : '' ) + 'zKZP:' + zKZP;
			if ( oPZS != '' ) str = str + ( str != '' ? ';' : '' ) + 'oPZS:' + oPZS;
			if ( oKZP != '' ) str = str + ( str != '' ? ';' : '' ) + 'oKZP:' + oKZP;
			if ( oLDT != '' ) str = str + ( str != '' ? ';' : '' ) + 'oLDT:' + oLDT;
			if ( oSPC != '' ) str = str + ( str != '' ? ';' : '' ) + 'oSPC:' + oSPC;

			$("#frm-docForm-desc" + row).attr( 'value' , str );

			advDialog.close();
		});
	});
/*
	$(document).delegate('DIALOG.dialogAddDoc A.btn-diagserv-add', 'click', function(){
		var boxRow = $(this).closest('.mdl-grid.box-diag-service');
		var num = parseInt( $(boxRow).data('num') );
		var newNum = 0;
		for (var i = num + 1; i < 30; i++) {
			if ( $(".mdl-grid.box-diag-service[data-num='"+i+"']").hasClass('hidden') ) {
				newNum = i;
				break;
			}
		}
		$(".mdl-grid.box-diag-service[data-num='"+newNum+"']").removeClass('hidden');
		$(".mdl-grid.box-diag-service[data-num='"+newNum+"']").find(".btn-diagserv-add").removeClass('hidden');
		$(".mdl-grid.box-diag-service[data-num='"+newNum+"']").find(".btn-diagserv-del").removeClass('hidden').addClass('hidden');
		$(boxRow).find(".btn-diagserv-add").removeClass('hidden').addClass('hidden');
		$(boxRow).find(".btn-diagserv-del").removeClass('hidden');

		var ins = $("#frm-docForm-insurance").val();
		if ( ins != '' && typeof(insurancePrice[ins]) != 'undefined' && parseFloat(insurancePrice[ins]) > 0 ) {
			var i = newNum;
			var $sel = $("#frm-docForm-service"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-service', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $sel = $("#frm-docForm-aid"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-aid', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $sel = $("#frm-docForm-diagnose"+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			$selz.on('change', function(val){
				var input = this.$input[0];
				var i = parseInt($(input).attr('id').replace('frm-docForm-diagnose', ''));
				checkDocInputs( i );
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});

/*			$("#frm-docForm-service"+newNum).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaný výkon alebo protetika."}]').parent().addClass('is-invalid');
			$("#frm-docForm-aid"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaný výkon alebo protetika."}]').parent().addClass('is-invalid');
			$("#frm-docForm-diagnose"+newNum).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaná diagnóza."}]').parent().addClass('is-invalid');
			$("#frm-docForm-area"+newNum).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaná oblasť."}]').parent().addClass('is-invalid');
			var $sels = $("#frm-docForm-service"+newNum).selectize(selectize_settings);
			var $selzs = $sels[0].selectize;
			$selzs.on('change', function(){
				var val = $("#frm-docForm-service"+newNum).val();
				if ( val != '' ) $("#frm-docForm-aid"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
				else $("#frm-docForm-aid"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaný výkon alebo protetika."}]').parent().addClass('is-invalid');
				var input = this.$input[0];
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $sela = $("#frm-docForm-aid"+newNum).selectize(selectize_settings);
			var $selza = $sela[0].selectize;
			$selza.on('change', function(){
				var val = $("#frm-docForm-aid"+newNum).val();
				if ( val != '' ) $("#frm-docForm-service"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
				else $("#frm-docForm-service"+i).attr("required", true).attr('data-nette-rules', '[{"op":":filled","msg":"Aby bolo možné záznam vykázať na poisťovňu, musí byť zadaný výkon alebo protetika."}]').parent().addClass('is-invalid');
				var input = this.$input[0];
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
			var $seld = $("#frm-docForm-diagnose"+newNum).selectize(selectize_settings);
			var $selzd = $seld[0].selectize;
			$selzd.on('change', function(){
				var input = this.$input[0];
				if ( val != '' ) $(input).parent().removeClass('is-invalid').addClass('is-dirty');
			});
* /		} else {
			$("#frm-docForm-service"+newNum).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-aid"+i).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-diagnose"+newNum).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
			$("#frm-docForm-area"+newNum).attr("required", false).attr('data-nette-rules', null).parent().removeClass('is-invalid');
		}
	});
	$(document).delegate('DIALOG.dialogAddDoc A.btn-diagserv-del', 'click', function(){
		var boxRow = $(this).closest('.mdl-grid.box-diag-service');
		var num = parseInt( $(boxRow).data('num') );
		$(boxRow).remove();
	});
*/
	$(document).delegate('#snippet--doclist A.btn-edit-doc', 'click', function(){
		var lnk_edit = $(this).attr("href");
		$.nette.ajax({
			url: lnk_edit,
			dataType: 'json',
			method: 'POST',
			success: function(data) {
				fillEditFrom('dialogAddDoc', 'frm-docForm', false, data);
				console.log('docForm', data);
				if ( typeof( data.doc_services ) != 'undefined' ) {
					$("#diag-service-box").empty();
//					if ( data.doc_services.length == 0 ) addDiagServRow();
					for ( var p in data.doc_services ) {
						var dt = data.doc_services[ p ];
						console.log('docRow', dt);
						do_edit = true;
						addDiagServRow( dt );
						do_edit = false;
					}
					checkServDg();
				}
				$("DIV.dialogAddDoc").removeClass('open').addClass('open');
				dialogOpen = true;
/*				for ( var i = 1 ; i <= 30 ; i++ ) {
					if (
						(typeof(data['diagnose'+i]) != 'undefined' && data['diagnose'+i] != '')
						|| (typeof(data['service'+i]) != 'undefined' && data['service'+i] != '')
						|| (typeof(data['aid'+i]) != 'undefined' && data['aid'+i] != '')
						|| (typeof(data['area'+i]) != 'undefined' && data['area'+i] != '' && parseInt(data['area'+i]) != -1)
					) $(".box-diag-service[data-num='"+(i-1)+"'] A.btn-diagserv-add").click();

				}*/
/*				$.nette.ajax({
					url: '?do=AttachList',
					method: 'GET',
					data: 'doc_add=&docs=' + data.attachs,
					complete: function() {
						setTimeout(function(){
							var cnt = $('#attachs_cnt').val();
							$("#frm-docForm-attachs").val(cnt).attr('value', cnt);
							$('[data-toggle="tooltip"]').tooltip({html: true});
						}, 100);
					}
				}, this, null);*/
			}
		}, this, null);
		return false;
	});

	$("#frm-filterDocForm INPUT").change(function(){
		if ($('#frm-filterDocForm #frm-filterDocForm-s').val() != '' || $('#frm-filterDocForm #frm-filterDocForm-s_from').val() != '' || $('#frm-filterDocForm #frm-filterDocForm-s_to').val() != '') {
			$('#frm-filterDocForm .frm-reset').removeClass('hidden');
		} else {
			if (!$('#frm-filterDocForm .frm-reset').hasClass('hidden')) $('#frm-filterDocForm .frm-reset').addClass('hidden');
		}
	});
	$("#frm-filterDocForm INPUT").click(function(){
//		$("#frm-filterDocForm INPUT").change();
	});
	$("#frm-filterDocForm INPUT").blur(function(){
		$("#frm-filterDocForm INPUT").change();
	});

	if ($("#frm-attachForm").length > 0) {
		$("#btn-attach").click(function(){
			var attach = $("#frm-docForm-attachs").val();
			$("#frm-attachForm-docs").val(attach).attr('value', attach);
		});
		$("#frm-attachForm INPUT[type='submit']").click(function(){
			var dialogBox = document.querySelector('.dialogAttach');
			var docs = $("#frm-attachForm").serialize();
			$.nette.ajax({
				url: '?do=AttachList',
				method: 'GET',
				data: docs,
				complete: function() {
					setTimeout(function(){
						var cnt = $('#attachs_cnt').val();
						$("#frm-docForm-attachs").val(cnt).attr('value', cnt);
						$('[data-toggle="tooltip"]').tooltip({html: true});
					}, 100);
				}
			}, this, null);
			dialogBox.close();
			return false;
		});
	}

	if ( $("#patient_data-ident").length > 0 ) {
		var allow_kc = true;
		var now = new Date();
		var db = $("#patient_data-born").text();
		if ( db.trim() == '' || db.length < 10 ) {
			var rc = $("#patient_data-ident").text();
			var db = calcRC( rc );
		} else {
			var x = db.trim().split('.');
			var db = x[2].trim() + '-' + x[1].trim() + '-' + x[0].trim();
		}
		if ( db != '' ) {
			var dt = new Date( db );
			if ( dt instanceof Date && !isNaN( dt ) ) {
				var yn = now.getFullYear();
				var yb = dt.getFullYear();
				if ( parseInt( yn ) - parseInt( yb ) > 20 ) allow_kc = false;
			}
		}
//		if ( allow_kc ) {
//			$(".tooth-boxes .switch-tooth").addClass("allow-switch");
//		}
	}

	if ($(".planning").length > 0) {
		var dt = moment();
		var d = datepicker_regional[ IS_lang ].daysMin[ dt.format('d') ]+' '+dt.format('D.M.YYYY');
		$(".planning .mdl-tooltip").text( d );
		$(".planning #planning").on('input', function(){
			var val = $(this).val();
			var mx = $(this).attr('max');
			var w = $(this).width();
			var l = w * val / mx;
			$(this).parent().parent().find('.mdl-tooltip').css({left: l+'px !important'});
			var dt = moment();
			var dts = moment(dt).add(val, 'day');
			var d = datepicker_regional[ IS_lang ].daysMin[ dts.format('d') ]+' '+dts.format('D.M.YYYY');
			$(this).parent().parent().find('.mdl-tooltip').text( d );
		});
//		$(".planning #planning")
	}

	$(document).on('click', "#btnDispenzar", function(){
		initDialog('OPEN', 'DIALOG.dialogDispenzar');
	});
	$(document).on('click', '#btnAnamnesisEmpty', function(){
		patientAnamnesisForm();
	})
	$(document).on('click', '#btnAnamnesis', function(){
		patientAnamnesisForm();
	});
	$("#patient-diagnose").on('click', '.btn-diag-edit', function(){
		patientDiagForm();
	});
	$("#patient-nczi").on('click', '.btn-nczi-edit', function(){
		patientNcziForm();
	});

	if ( $("#patient-doctors").length > 0 ) {
		$("#patient-doctors").on('click', '.btn-doctors-add', function(){
			patientDoctorsForm();
		});
		$("#patient-doctors").on('click', '.btn-doctors-edit', function(){
			var id = $(this).attr('data-id');
			patientDoctorsForm( id );
		});
		$("#patient-doctors").on('click', '.btn-doctors-del', function(){
			var id = $(this).attr('data-id');
			// DEL
		});
	}
	if ( $("#patient-history").length > 0 ) {
		$("#patient-history").on('click', '.btn-history-add', function(){
			patientHistoryForm();
		});
		$("#patient-history").on('click', '.btn-history-edit', function(){
			var id = $(this).attr('data-id');
			patientHistoryForm( id );
		});
		$("#patient-history").on('click', '.btn-history-del', function(){
			var id = $(this).attr('data-id');
			// DEL
		});
	}
	if ( $("#p-tags").length > 0 ) {
		$("#p-tags").on('click', '.btn-tags', function(){
			patientTagsForm();
		});
	}

/***********************
 *   SETUP             *
 ***********************/
	if ( $("#ambulance-files").length > 0 ) {
		$("#ambulance-files A").click(function(){
			var files = [];
			var fl = $(this).parent().data("file");
			$(this).parent().remove();
			$("#ambulance-files SPAN[data-file]").each(function(){
				files.push( $(this).data("file") );
			});
			$("INPUT#frm-profileForm-ambulance_files").val( files.join(";") );
		});
	}
	if ( $("#pricelist-files").length > 0 ) {
		$("#pricelist-files A.do-delete").click(function(){
			var files = [];
			var fl = $(this).parent().data("file");
			$(this).parent().remove();
			$("#pricelist-files SPAN[data-file]").each(function(){
				files.push( $(this).data("file") );
			});
			$("INPUT#frm-profileForm-pricelist_files").val( files.join(";") );
		});
	}

/***********************
 *   END               *
 ***********************/
	initInputs();
	$(window).resize();
});

$(window).resize(function(){
	if ($("#content.dashboard").length > 0) {
		
	}
});

function checkVersion( min1, min2, min3, min4 ) {
	if ( typeof(APP_version) == 'undefined' ) return false;
	if ( APP_version == '' ) return false;

	if ( typeof(min1) == 'undefined' ) min1 = 0;
	if ( typeof(min2) == 'undefined' ) min2 = 0;
	if ( typeof(min3) == 'undefined' ) min3 = 0;
	if ( typeof(min4) == 'undefined' ) min4 = 0;

	var higher = false;
	var x = APP_version.split('.');

	if      ( parseInt( min1 ) < parseInt( x[0] )                                                                                                                          ) { higher = true; }//console.log('0' , higher ); }
	else if ( parseInt( min1 ) == parseInt( x[0] ) && parseInt( min2 ) < parseInt( x[1] )                                                                                  ) { higher = true; }//console.log('1' , higher ); }
	else if ( parseInt( min1 ) == parseInt( x[0] ) && parseInt( min2 ) == parseInt( x[1] ) && parseInt( min3 ) < parseInt( x[2] )                                          ) { higher = true; }//console.log('2' , higher ); }
	else if ( parseInt( min1 ) == parseInt( x[0] ) && parseInt( min2 ) == parseInt( x[1] ) && parseInt( min3 ) == parseInt( x[2] ) && parseInt( min4 ) < parseInt( x[3] )  ) { higher = true; }//console.log('3' , higher ); }
	else if ( parseInt( min1 ) == parseInt( x[0] ) && parseInt( min2 ) == parseInt( x[1] ) && parseInt( min3 ) == parseInt( x[2] ) && parseInt( min4 ) == parseInt( x[3] ) ) { higher = true; }//console.log('9' , higher ); }

	return higher;
}

var appCheckTimer = false;
function appCheck( call_sync ) {
	if ( typeof( call_sync ) == 'undefined' ) call_sync = false;
	$.ajax({
		url: APPSC_URL + '/CHECK',
		dataType: 'json',
		method: 'POST',
		data: {
			'server': IS_url + '/system/',
			'user': IS_user,
			'dr': IS_dr
		},
		cache: false,
		async: !call_sync,
		success: function(ret) {
			APP_state.run = true;
			appCheckRetry( false );
			
			console.log('CHECK', ret);
			if ( typeof( ret.version ) != 'undefined' ) APP_version = ret.version;
			if ( typeof( ret.update ) != 'undefined' && ret.update != '' ) APP_state.updt = ret.update;

			if ( typeof( ret.version ) == 'undefined' || parseInt(ret.version.replace(/\./g,'')) < 3492 )
				$("#is-status").append('<a href="/setup/applications/" class="text-red" style="display:block;margin:10px -10px 0 -15px;padding:10px;white-space:normal;text-align:center;text-decoration:none;cursor:pointer">' + locale['cmx_update'] + '</a>');

			if ( APP_state.run ) $("#is-light-app").attr( 'data-state' , 'on' ).attr( 'data-original-title' , locale['cmx_run'] );
			if ( APP_state.updt != '' ) $("#is-light-app").attr( 'data-state' , 'load' ).attr( 'data-original-title' , locale['cmx_run_update'] );

			if ( typeof( ret.erp ) != 'undefined' ) APP_state.erp = ( ret.erp == 'true' || ret.erp === true || ret.erp == 1 ? true : false );
			if ( APP_state.erp ) $("#is-light-erp").attr( 'data-state' , 'on' ).attr( 'data-original-title' , locale['cmx_orp_on'] );
			else $("#is-light-erp").attr( 'data-state' , 'off' ).attr( 'data-original-title' , locale['cmx_orp_off'] );

			if ( typeof( ret.ePZP ) != 'undefined' ) APP_state.card = ( ret.ePZP == 'true' || ret.ePZP === true || ret.ePZP == 1 ? true : false );
			if ( APP_state.card ) $("#is-light-epzp").attr( 'data-state' , 'on' ).attr( 'data-original-title' , locale['cmx_epzp_on'] );
			else $("#is-light-epzp").attr( 'data-state' , 'off' ).attr( 'data-original-title' , locale['cmx_epzp_off'] );

//			if ( typeof( ret.vpn ) != 'undefined' ) APP_state.vpn = ( ret.vpn == 'true' || ret.vpn === true || ret.vpn == 1 ? true : false );
//			if ( APP_state.vpn ) $("#is-light-vpn").removeClass('hidden');
//			else if ( !$("#is-light-vpn").hasClass('hidden') ) $("#is-light-vpn").addClass('hidden');

			if ( typeof( ret.autologin ) != 'undefined' ) APP_state.alog = ( ret.autologin == 'true' || ret.autologin === true || ret.autologin == 1 ? true : false );

			if ( typeof( ret.rtgApps ) != 'undefined' ) APP_state.apps = ( ret.rtgApps == 'true' || ret.rtgApps === true || ret.rtgApps == 1 ? true : false );

			if ( APP_state.run && checkVersion( 5 , 10 , 10 , 2 ) ) {
				commMax_init_ws();
//				window.addEventListener( "load", commMax_init_ws, false );
			} else if ( !APP_state.run ) {
				commMax_Close();
			}
		}, error: function() {
			commMax_Close();
			$("#is-light-app").attr( 'data-state' , 'off' ).attr( 'data-original-title' , locale['cmx_off'] );
			if ( appCheckTimer == false ) appCheckRetry( true );
		}
	});
}
function appCheckRetry( state ) {
	if ( !appCheckRetryAllow ) return ;
	if ( state ) {
		if ( appCheckTimer != false ) return ;
		appCheckTimer = setInterval( function() {
			appCheck();
		} , 30000 );
	} else {
		if ( appCheckTimer != false ) {
			clearInterval( appCheckTimer );
			appCheckTimer = false;
		}
	}
}

function fillEditFrom(target, frm, btn, data) {
	console.log("fillEditFrom", data);
	console.log('DO:formClear',target,frm);
	$('.'+target+' #'+frm).trigger('formClear');
	for (var i in data) {
		var itp = $('.'+target+' #'+frm+'-'+i).attr('type');
		var ics = $('.'+target+' #'+frm+'-'+i).attr('class');
		if (typeof(itp) == 'undefined') itp = 'text';
		if (typeof(ics) == 'undefined') ics = '';
		if ( ics.indexOf('html-editor') != -1 ) {
			$('.'+target+' #'+frm+'-'+i).val(data[i]).summernote('code', data[i]);
		} else if ( itp == 'checkbox' ) {
			$('.'+target+' #'+frm+'-'+i).attr('checked', data[i] == 1 ? true : false).parent().parent().addClass('is-dirty'+(data[i] == 1 ? ' is-checked' : '')).removeClass('is-invalid');
			$('.'+target+' #'+frm+'-'+i).attr('checked', data[i] == 1 ? true : false).parent().addClass('is-dirty'+(data[i] == 1 ? ' is-checked' : '')).removeClass('is-invalid');
			if ( data[i] != 1 ) {
				$('.'+target+' #'+frm+'-'+i).parent().parent().removeClass('is-checked');
				$('.'+target+' #'+frm+'-'+i).parent().removeClass('is-checked');
			}
		} else if ( ics.indexOf('selectize') != -1 && typeof( data[i] ) != 'undefined' && data[i] !== false ) {
			var input = '.'+target+' #'+frm+'-'+i;
			var vals = '';
			if (typeof(data[i]) == 'object') {
				for(v in data[i]) {
					vals = vals+(vals != '' ? ',' : '')+data[i][v].id;
				}
			} else vals = data[i];
			$(input).val(data[i]).attr('value', vals).parent().addClass('is-dirty').removeClass('is-invalid');
			var opt = $(input).data('options');
			var $sel = $('.'+target+' #'+frm+'-'+i).selectize(selectize_settings);
			var $selz = $sel[0].selectize;
			console.log( 'selz', i , data[i] , typeof(data[i]) );
			if ( typeof(opt) != 'undefined' && ( typeof(opt.ajaxURL) != 'undefined' || ( typeof(data[i]) == 'object' && data[i].length > 0 ) ) ) {
				$(input).attr('data-sel-values', JSON.stringify(data[i]));
				for(v in data[i]) {
					$selz.addOption(data[i][v]);
				}
			}
			$selz.setValue( vals.toString().split(',') );
		} else {
			$('.'+target+' #'+frm+'-'+i).val(data[i]).attr('value', data[i]).parent().addClass('is-dirty').removeClass('is-invalid');
		}
	}
	console.log('DO:formEditing',target,frm);
	$('.'+target+' #'+frm).trigger('formEditing', [data]);
	console.log('DO:clickEdit');
	if (typeof(btn) != 'undefined' && btn != null && btn != false) {
		do_edit = true;
		$('#'+btn).click();
		do_edit = false;
	}
}

var pdiagDialog;
function patientDiagForm( id ) {
	pdiagDialog = initDialog( 'OPEN', 'DIALOG.dialogDiag', 600 , 500);
	componentHandler.upgradeAllRegistered();

	if ( typeof(id) != 'undefined' ) {
		var did = $("#patient-doctors TR[data-id='" + id + "']").attr('data-did');

		$("#dialogDoctors #frm-doctorsForm-id").val( id ).attr( 'value' , id );
	} else {
		id = 0;
		$("#dialogDoctors #frm-doctorsForm-id").val( '' ).attr( 'value' , '' );
	}

	$("#dialogDoctors .btn-save").click( function() {
		setTimeout( function(){
			pdiagDialog.close();
		} , 150);
	});
}

var pncziDialog;
function patientNcziForm( id ) {
	pncziDialog = initDialog( 'OPEN', 'DIALOG.dialogNczi', 600);
	componentHandler.upgradeAllRegistered();

	if ( typeof(id) != 'undefined' ) {
		var did = $("#patient-doctors TR[data-id='" + id + "']").attr('data-did');

		$("#dialogDoctors #frm-doctorsForm-id").val( id ).attr( 'value' , id );
	} else {
		id = 0;
		$("#dialogDoctors #frm-doctorsForm-id").val( '' ).attr( 'value' , '' );
	}

	$("#dialogDoctors .btn-save").click( function() {
		setTimeout( function(){
			pncziDialog.close();
		} , 150);
	});
}

var pAnmDialog;
function patientAnamnesisForm() {
	var id = $("#btnAnamnesis").attr('data-id');
	if ( typeof( id ) != 'undefined' && parseInt( id ) > 0 ) {
		$("#content .mdl-tabs__tab-bar A[href='#tab-card']").removeClass('is-active');
		$("#content .mdl-tabs #tab-card").removeClass('is-active');
		$("#content .mdl-tabs__tab-bar A[href='#tab-documents']").addClass('is-active');
		$("#content .mdl-tabs #tab-documents").addClass('is-active');
		$("#ticket" + id + "edit").click();
	} else {
		$("#content .mdl-tabs__tab-bar A[href='#tab-card']").removeClass('is-active');
		$("#content .mdl-tabs #tab-card").removeClass('is-active');
		$("#content .mdl-tabs__tab-bar A[href='#tab-documents']").addClass('is-active');
		$("#content .mdl-tabs #tab-documents").addClass('is-active');
		$("#btnDocument").click();
		$("#doc-selector UL .doc-sel[data-doc='anamneza_" + IS_lang + "']").click();
	}
}

var tagsDialog;
function patientTagsForm( id ) {
	tagsDialog = initDialog( 'OPEN', 'DIALOG.dialogTags', 400 , 420);
	componentHandler.upgradeAllRegistered();

	$("#dialogTags .btn-save").click( function() {
		setTimeout( function(){
			tagsDialog.close();
		} , 150);
	});
}

var pdoctorsDialog;
function patientDoctorsForm( id ) {
	pdoctorsDialog = initDialog( 'OPEN', 'DIALOG.dialogDoctors', 400 , 250);
	componentHandler.upgradeAllRegistered();

	if ( typeof(id) != 'undefined' ) {
		var did = $("#patient-doctors TR[data-id='" + id + "']").attr('data-did');

		$("#dialogDoctors #frm-doctorsForm-id").val( id ).attr( 'value' , id );
		$("#dialogDoctors #frm-doctorsForm-doctor").val( did ).find('OPTION[value="'+did+'"]').attr('selected',true).parent().change().parent().removeClass('is-invalid').addClass('is-dirty');
	} else {
		id = 0;
		$("#dialogDoctors #frm-doctorsForm-id").val( '' ).attr( 'value' , '' );
	}

	$("#dialogDoctors .btn-save").click( function() {
		setTimeout( function(){
			pdoctorsDialog.close();
		} , 150);
	});
}

var historyDialog;
function patientHistoryForm( id ) {
	historyDialog = initDialog( 'OPEN', 'DIALOG.dialogHistory', 400 , 420);
	componentHandler.upgradeAllRegistered();

	if ( typeof(id) != 'undefined' ) {
		var pid = $("#patient-history TR[data-id='" + id + "']").attr('data-pid');
		var did = $("#patient-history TR[data-id='" + id + "']").attr('data-did');
		var tid = $("#patient-history TR[data-id='" + id + "']").attr('data-tp');
		var ins = $("#patient-history TR[data-id='" + id + "']").attr('data-ins');
		var date = $("#patient-history TR[data-id='" + id + "']").attr('data-dt');

		$("#dialogHistory #frm-historyForm-id").val( id ).attr( 'value' , id );
		$("#dialogHistory #frm-historyForm-doctor").val( did ).find('OPTION[value="'+did+'"]').attr('selected',true).parent().change().parent().removeClass('is-invalid').addClass('is-dirty');
		$("#dialogHistory #frm-historyForm-type").val( tid ).find('OPTION[value="'+tid+'"]').attr('selected',true).parent().change().parent().removeClass('is-invalid').addClass('is-dirty');
		$("#dialogHistory #frm-historyForm-insurance").val( ins ).find('OPTION[value="'+ins+'"]').attr('selected',true).parent().change().parent().removeClass('is-invalid').addClass('is-dirty');
		$("#dialogHistory #frm-historyForm-date").val( date ).attr( 'value' , date ).change().parent().removeClass('is-invalid').addClass('is-dirty');
	} else {
		id = 0;
		$("#dialogHistory #frm-historyForm-id").val( '' ).attr( 'value' , '' );
		$("#dialogHistory #frm-historyForm-type").val( '' ).change();
		$("#dialogHistory #frm-historyForm-insurance").val( '' ).change();
		$("#dialogHistory #frm-historyForm-date").val( '' ).attr( 'value' , '' ).change();
	}

	$("#dialogHistory .btn-save").click( function() {
		setTimeout( function(){
			historyDialog.close();
		} , 150);
	});
}
function initTooltips( cont ) {
	if ( typeof(cont) == 'undefined' ) cont = 'body';
	$('[data-toggle="tooltip"]').tooltip({
		'container': cont,
		'boundary': window,
//		offset:'-10%',
		'html': true
	});
}
function initScroll() {
	$(".scroll").each( function() {
		if ( typeof( allowScroll ) != 'undefined' && !allowScroll ) {
			$(this).css({'overflow':'auto'});
			return;
		}
		var dt = new Date();
		var h = dt.getHours();
		var m = dt.getMinutes();
		var xh = $(this).height();
		var hscr = $(this).hasClass('allow-hscroll') || $(this).hasClass('disable-vscroll');
		var vscr = $(this).hasClass('disable-vscroll');
		var top = typeof(calendar_int) != "undefined" ? Math.round( ((60 / calendar_int) * 30) * (h - shf + (m / 60)) ) : 0;
		top = top - (xh / 2);
		$(this).mCustomScrollbar({
			axis: ( !vscr ? 'y' : '' ) + ( hscr ? 'x' : '' ),
			scrollbarPosition: 'outside',
			scrollInertia: 0,
			alwaysShowScrollbar: 2,
			autoHideScrollbar: false,
			theme: 'inset-dark',
			setTop: '-'+top+'px',
			scrollButtons: {
				enable: true,
				scrollAmount: "auto",
				scrollType: "stepless"
			},
			mouseWheel: {
//				scrollAmount: typeof(calendar_int) != "undefined" ? ((60 / calendar_int) * 30) / ( calendar_int >= 10 ? 1 : 2) : "auto"
				scrollAmount: "120px"
			},
			callbacks:{
				onScrollStart: function(){
					contentScrolling = true;
				},
				whileScrolling: function(){
					contentScrolling = true;
				},
				onScroll: function(){
					contentScrolling = false;
				}
			}
		});
	});
}

function loaderShow( target ) {
	var $spinner = $( target ).find( '#spinner-local' );
	if ( typeof( $spinner ) != 'undefined' ) $( $spinner ).remove();
	$( target ).append( '<div id="spinner-local"><div id="spinner-loader"></div></div>' );
	$("#spinner-local").css({
		display: "block",
	});
}
function loaderHide( target ) {
	var $spinner = $( target ).find( '#spinner-local' );
	if ( typeof( $spinner ) != 'undefined' ) $( $spinner ).remove();
}


function spinnerShow() {
	$("#spinner-wrap").css({
		display: "block",
	});
}
function spinnerHide() {
	$("#spinner-wrap").css({
		display: "none",
	});
}

function initDialogs() {
	if ($("A[data-target].mdl-button,A[data-target].dialog-link").length > 0) {
		$("A[data-target].mdl-button,A[data-target].dialog-link").each(function(){
			var dlgRR = false;
			var btn = $(this).attr('id');
			var target = $(this).data("target");
			var dlg = $("DIALOG."+target);
			if ( typeof( dlg ) == 'undefined' || dlg.length == 0 ) {
				dlgRR = true;
				var dlg = $("DIV.mdl-dialog."+target);
			}
			var frm = $(dlg).find('FORM').attr('id');
			var w = $(dlg).attr("data-width");
			var h = $(dlg).attr("data-height");
			if (typeof(w) == 'undefined' && parseInt(w) == 0) w = 600;
			if (typeof(h) == 'undefined' && parseInt(h) == 0) h = 600;
//			console.log('initDLG',dlg,btn,target,w,h);
			if ( dlgRR ) initDialogRR("#"+btn, "DIV.mdl-dialog."+target, w, h);
			else initDialog("#"+btn, "DIALOG."+target, w, h);
			if ($(this).data('edit') == 'ajax') {
				$(document.body).on('click', "#content A.btn-edit", function(){
					$.nette.ajax({
						url: $(this).attr("href"),
						dataType: 'json',
						method: 'POST',
						success: function(data) {
							lastAjaxData = data;
							fillEditFrom(target, frm, btn, data);
						}
					}, this, null);
					return false;
				});
			}
		});
	}
}
function initDialog(btn, dlg, w, h) {
	var params = {};
	var dialogBox = document.querySelector( dlg );
	var dialogButton = document.querySelector( btn );
	if ( typeof( w ) == 'undefined' && $(dialogBox).attr('data-width') != '' && parseInt( $(dialogBox).attr('data-width') ) > 0 ) var w = parseInt( $(dialogBox).attr('data-width') );
	if ( typeof( h ) == 'undefined' && $(dialogBox).attr('data-height') != '' && parseInt( $(dialogBox).attr('data-height') ) > 0 ) var h = parseInt( $(dialogBox).attr('data-height') );
	var win_height = $(window).height();
	if ( typeof( h ) == 'undefined' ) var h = win_height - (win_height > 768 ? 40 : 40);
	else if ( parseInt(h) + 40 > win_height ) h = win_height - 40;
	if (!dialogBox.showModal) {
		dialogPolyfill.registerDialog(dialogBox);
		dialogBox.getBoundingClientRect();
	}
	if (btn == 'OPEN') {
		$(dialogBox).width(w);
		$(dialogBox).height(h);
		if ( h > ( 3 * win_height / 4 ) ) {
			$(dialogBox).css({'margin-bottom':0});
			$(dialogBox).css({'margin-right':0});
		}
		$(dialogBox).find('.scroll').height(h - 150 - 40);
		dialogBox.showModal();
		initInputs(dlg+' FORM', '');
		if ( typeof( do_edit ) != 'undefined' && do_edit == false ) {
//			console.log('DO:formClear',dlg);
			$(dlg+' FORM').trigger('formClear');
		}
	} else if (btn != '') {
		$(dialogButton).on('click', function() {
			$(dialogBox).width(w);
			$(dialogBox).height(h);
			if ( h > ( 3 * win_height / 4 ) ) {
				$(dialogBox).css({'margin-bottom':0});
				$(dialogBox).css({'margin-right':0});
			}
			$(dialogBox).find('.scroll').height(h - 150 - 40);
			dialogBox.showModal();
			initInputs(dlg+' FORM', '');
			if ( typeof( do_edit ) != 'undefined' && do_edit == false ) {
//				console.log('DO:formClear',dlg);
				$(dlg+' FORM').trigger('formClear');
			}
		});
	}
	dialogBox.querySelector('.btn-close').addEventListener('click', function() {
		if ( $(dialogBox).data("afterclose") == 'refresh' ) {
			spinnerShow();
			document.location.reload();
		}
		dialogBox.close();
	});
	if ( $(dialogBox).find('INPUT[name="_submit"].ajax').length > 0 ) {
		dialogBox.querySelector('INPUT[name="_submit"].ajax').addEventListener('click', function() {
			setTimeout( function(){
				dialogBox.close();
			} , 1000 );
		});
	}
	$(document).trigger( dlg.replace('.', ':') );
	return dialogBox;
}
var dialogOpen = false;
function initDialogRR(btn, dlg, w, h) {
	var params = {};
	var dialogBox = document.querySelector( dlg );
	var dialogButton = document.querySelector( btn );
	if ( typeof( w ) == 'undefined' && $(dialogBox).attr('data-width') != '' && parseInt( $(dialogBox).attr('data-width') ) > 0 ) var w = parseInt( $(dialogBox).attr('data-width') );
	if ( typeof( h ) == 'undefined' && $(dialogBox).attr('data-height') != '' && parseInt( $(dialogBox).attr('data-height') ) > 0 ) var h = parseInt( $(dialogBox).attr('data-height') );
	var win_height = $(window).height();
	if ( typeof( h ) == 'undefined' ) h = win_height - (win_height > 768 ? 250 : 150);
	else if ( h + 150 > win_height ) h = win_height - 150;
	var dlgTitle = $(dialogBox).find('H4').html();
	$(dialogBox).find('H4').hide();
//	console.log('initDlgRR' , w , h , dialogBox );
	var dialogSettings = {
		position: { my:"center", at:"center", of:window },
		title: dlgTitle,
		modal: false,
		resizable: true,
		draggable: true,
		autoOpen: false,
		closeOnEscape: false,
		width: w,
		height: h,
//		minWidth: 500,
//		minHeight: 450,
//		maxWidth: w,
//		maxHeight: h,
		focus:  function( e , ui ) {
			dialogOpen = true;
			var $scrl = $(this).find('.scroll');
			$( $scrl ).height( $(this).height() - 115 ).css({'margin-bottom':'80px'});
			$(this).parent().height( $(this).height() + 40 );
			$("#frm-docForm-data").summernote('focus');
//			console.log( 'focus' , $(this).height() , ui );
		},
		close:  function( e , ui ) {
			dialogOpen = false;
		},
		resize: function( e , ui ) {
			var $scrl = $(this).find('.scroll');
			$( $scrl ).height( $(this).height() - 115 ).css({'margin-bottom':'80px'});
			$(this).parent().height( $(this).height() + 40 );
//			console.log( 'resize' , ui );
		}
	};
	if (btn == 'OPEN') {
		$(dialogBox).dialog( dialogSettings );
		$(dialogBox).find('.scroll').height(h - 150 - 40);
		$(dialogBox).dialog("open");
		initInputs(dlg+' FORM', '');
		if ( typeof( do_edit ) != 'undefined' && do_edit == false ) {
//			console.log('DO:formClear',dlg);
			$(dlg+' FORM').trigger('formClear');
		}
	} else if (btn != '') {
		$(dialogBox).dialog( dialogSettings );
		$(dialogButton).on('click', function() {
			$(dialogBox).find('.scroll').height(h - 150 - 40);
			initInputs(dlg+' FORM', '');
			$(dialogBox).dialog("open");
			if ( typeof( do_edit ) != 'undefined' && do_edit == false ) {
//				console.log('DO:formClear',dlg);
				$(dlg+' FORM').trigger('formClear');
			}
		});
	}
	if ( dialogBox.querySelector('.btn-close') !== null ) dialogBox.querySelector('.btn-close').addEventListener('click', function() {
		dialogOpen = false;
		if ( $(dialogBox).data("afterclose") == 'refresh' ) {
			spinnerShow();
			document.location.reload();
		}
		$(dialogBox).dialog('close');
	});
	if ( $(dialogBox).find('INPUT[name="_submit"].ajax').length > 0 ) {
		dialogBox.querySelector('INPUT[name="_submit"].ajax').addEventListener('click', function() {
			setTimeout( function(){
				$(dialogBox).dialog('close');
			} , 1000 );
		});
	}
	$(window).on('beforeunload', function(e){
		if(dialogOpen) return locale['dialog_open'];
	});
	$(document).trigger( dlg.replace('.', ':') );
	return dialogBox;
}

function initInputs(target, only_init, data) {
	if (typeof(target) == 'undefined') target = document;
	if (typeof(only_init) == 'undefined') only_init = '';
	if (typeof(data) == 'undefined') data = {};

	if ($(target).find('INPUT[type="range"].mdl-slider').length > 0 && (only_init == '' || only_init.indexOf('range') != -1)) {
		$(target).find('INPUT[type="range"].mdl-slider').each(function(i){
			if ($(this).parent('.mdl-slider__container').length == 0 && $(this).parent('.mdl-slider__ie-container').length == 0) {
				setTimeout( function() { initInputs(target, 'range', data); }, 500);
				return true;
			}
			var s_container = '.mdl-slider__container';
			if ($(this).parent('.mdl-slider__container').length == 0 && $(this).parent('.mdl-slider__ie-container').length != 0) s_container = '.mdl-slider__ie-container';
			var id = $(this).attr('id');
			var unit = $(this).attr('data-unit');
			var valBox = $('<span class="rangeValue" id="'+id+'-rangeValue">'+$(this).val()+' '+unit+'</span>');
			if ($(this).parent( s_container ).find('.rangeValue').length == 0) $(this).parent( s_container ).append(valBox);
			$(this).change(function(){
				var val = $(this).val();
				var unit = $(this).attr('data-unit');
				$(this).parent( s_container ).find('.rangeValue').html(val+' '+unit);
			});
			$(this).keyup(function(){
				$(this).change();
			});
			$(this).mousemove(function(){
				$(this).change();
			});
		});
	}

	// WYSIWYG EDITOR
	if ($(target).find(".html-editor").length > 0 && (only_init == '' || only_init.indexOf('editor') != -1)) {
		$(target).find(".html-editor").each(function(){
			var editor_height = ( typeof($(this).attr('data-height')) != 'undefined' && $(this).attr('data-height') != '' ? $(this).attr('data-height') : 300 );
			var editor_enable = ( typeof($(this).attr('data-enable')) != 'undefined' && $(this).attr('data-enable') != '' ? $(this).attr('data-enable') : 'no' );
			var editor_type = ( typeof($(this).attr('data-toolbar')) != 'undefined' && $(this).attr('data-toolbar') != '' ? $(this).attr('data-toolbar') : 'normal' );
			var editor_tbadd = ( typeof($(this).attr('data-toolbar-add')) != 'undefined' && $(this).attr('data-toolbar-add') != '' ? JSON.parse( $(this).attr('data-toolbar-add') ) : false );
			var editor_toolbar = [
				// [groupName, [list of button]]
				['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'color', 'clear']],
				['font', ['fontsize']],
				['para', ['ul', 'ol']],
				['action', ['undo', 'redo'/*, 'codeview'*/]]
			];
			if ( editor_type == 'full' ) {
				editor_toolbar = [
					// [groupName, [list of button]]
					['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
					['font', ['fontsize']],
					['para', ['paragraph', 'ul', 'ol']],
					['action', ['undo', 'redo'/*, 'codeview'*/]]
				];	
			}
			if ( editor_type == 'min' ) {
				editor_toolbar = [
					// [groupName, [list of button]]
					['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
					['action', ['undo', 'redo'/*, 'codeview'*/]]
				];	
			}
			if (editor_enable.indexOf('help-texts') != -1) {
				var htexts_src = 'summernote_htexts';
				editor_toolbar.push( ['misc_ht', ['htexts']] );
				if ( typeof($(this).attr('data-htexts')) != 'undefined' && $(this).attr('data-htexts') != '' ) htexts_src = $(this).attr('data-htexts');
			}
			if (editor_enable.indexOf('patient-data') != -1) {
				editor_toolbar.push( ['misc_pd', ['patientData']] );
			}
			if (editor_enable.indexOf('print') != -1) editor_toolbar.push( ['misc_prn', ['print']] );
			if ( editor_tbadd !== false ) {
				console.log('add toolbar' , editor_tbadd);
				editor_toolbar.push( editor_tbadd );
			}
			var editorSettings = {
				toolbar: editor_toolbar,
				height: editor_height,
				fontSizes: [ '12', '14', '16', '18', '20' ],
				helpTexts: htexts_src,
				print: {
					'stylesheetUrl': '/css/print.css'
				},
				lang: (IS_codepage != '' ? IS_codepage : 'en-US'),
				callbacks: {
					onPaste: function (e) {
						var bufferText = ( ( e.originalEvent || e ).clipboardData || window.clipboardData ).getData( 'text/html' );
						if ( bufferText == '' ) bufferText = '<p>' + ( ( e.originalEvent || e ).clipboardData || window.clipboardData ).getData( 'text/plain' ) + '</p>';
						e.preventDefault();
						bufferText = bufferText.replace( /<!--(?!>)[\S\s]*?-->/g , '' );
						bufferText = bufferText.replace( /<o:p>/g , '' );
						bufferText = bufferText.replace( /<\/o:p>/g , '' );
						var div = $( '<div />' );
						div.append( bufferText );
						div.find('B,STRONG').removeAttr('style');
//						div.find('*').removeAttr('class');
						div.find('*').removeAttr('dir');
						div.find('*').removeAttr('id');
						div.find('SPAN[style]').each( function() {
							var s = $(this).attr('style').replace(/ /g,'');
							if ( s.indexOf('font-weight:bold') != -1 || s.indexOf('font-weight:bolder') != -1 || s.indexOf('font-weight:600') != -1 || s.indexOf('font-weight:700') != -1 || s.indexOf('font-weight:800') != -1 ) {
								var text = $(this).html();
								$(this).replaceWith('<b>' + text + '</b>');
							}
						});
						div.find('*').removeAttr('style');
						setTimeout( function () {
							document.execCommand( 'insertHtml' , false , div.html().replace( /<!--(?!>)[\S\s]*?-->/g , '' ).trim() );
						} , 10);
					}
				}
			};
			if ( is4dm1n ) {
				editor_toolbar.push( ['admin', ['codeview']] );
				editorSettings.codemirror = {
					theme: 'monokai',
//					mode: 'htmlmixed',
					lineWrapping: true,
					lineNumbers: true
				};
			}
			if ( !$(this).hasClass('has-editor') ) {
				$(this).addClass('has-editor');
				$(this).parent().addClass('has-editor');
				$(this).summernote( editorSettings );
			}
		});
	}

	// SELECTIZE
	selectize($(target).find("INPUT.selectize"), selectize_settings);

	// MONTHPICKER
	if ($(target).find("INPUT.monthpicker").length > 0 && (only_init == '' || only_init.indexOf('monthpicker') != -1)) {
		$(target).find("INPUT.monthpicker").each(function() {
			$(this).focus(function(){
				$(this).blur();
			});
			$(this).parent().addClass('is-dirty');
			var popup_pos = (typeof($(this).data('popup')) != 'undefined' ? $(this).data('popup') : 'bottom');
			console.log('MP',this, popup_pos);
			$(this).DatePicker({
				date: ($(this).val() != '' ? $(this).val() : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) ),
				current: ($(this).val() != '' ? $(this).val() : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) ),
				view: 'months',
				minView: 'months',
				format: 'Y-m',
				position: popup_pos,
				locale: datepicker_regional[ IS_lang ],
				onBeforeShow: function(picker){
					var input = this;
					var val_date = ($(this).val() != '' ? $(this).val() : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) );
					$(this).DatePickerSetDate(val_date, true);
					$(this).parent().addClass('is-focused');
					var cont = $(picker).find('.datepickerContainer');
					if ($(picker).find('.datepickerButtons').length == 0) {
						var btns = $('<div class="datepickerButtons"></div>');
						var btn_cancel = $('<button type="button">' + datepicker_regional[ IS_lang ].btnCancel + '</button>');
						$(btns).append(btn_cancel);
						var btn_confirm = $('<button type="submit">' + datepicker_regional[ IS_lang ].btnConfirm + '</button>');
						$(btns).append(btn_confirm);
						$(cont).append(btns);
						$(btn_cancel).click(function(){
							$(input).DatePickerHide();
						});
						$(btn_confirm).click(function(){
//							var options = $(picker).data('monthpicker');
//							var tmp = new Date(options.date);
							$(input).val( $(input).DatePickerGetDate(true) ).DatePickerHide();
						});
					}
					if ($(picker).find('.datepickerHeader').length == 0) {
						var day = $(input).DatePickerGetDate(true);
						var dt = new Date(day);
						var day_formated = datepicker_regional[ IS_lang ].monthsShort[ dt.getMonth() ];
						var hdr = $('<div class="datepickerHeader"></div>');
						var hdr_year = $('<div class="activeYear">'+dt.getFullYear()+'</div>');
						$(hdr).append(hdr_year);
						var hdr_day = $('<div class="activeDay">'+day_formated+'</div>');
						$(hdr).append(hdr_day);
						$(cont).prepend(hdr);
					}
				},
				onChange: function(formated, dates, input){
					var dt = new Date(formated);
					var day_formated = datepicker_regional[ IS_lang ].monthsShort[ dt.getMonth() ];
					$(this).find('.datepickerHeader .activeYear').html(dt.getFullYear());
					$(this).find('.datepickerHeader .activeDay').html(day_formated);
					$(input).val(formated).attr('value',formated).change();
					if ( formated != '' ) {
						console.log(formated);
						var $input = $(input).parent();
						if ( $input.hasClass('is-invalid') ) $input.removeClass('is-invalid');
						if ( !$input.hasClass('is-dirty') ) $input.addClass('is-dirty');
					}
				},
				onHide: function(picker, input){
					var val = $(input).val();
					console.log(picker,input,val);
					var $input = $(input).parent();
					if ( val != '' ) {
						if ( $input.hasClass('is-invalid') ) $input.removeClass('is-invalid');
						if ( !$input.hasClass('is-dirty') ) $input.addClass('is-dirty');
					} else {
						if ( !$input.hasClass('is-invalid') ) $input.addClass('is-invalid');
						if ( $input.hasClass('is-dirty') ) $input.removeClass('is-dirty');
					}
					$(input).change();
				} /*,
				onRender: function(date) {

				}*/
			});
		});
	}

	// WEEKPICKER
	if ($(target).find(".weekpicker").length > 0 && (only_init == '' || only_init.indexOf('weekpicker') != -1)) {
		$(target).find(".weekpicker").each(function() {
			var input = $(this);
			$(this).focus(function(){
				$(this).blur();
			});
			$(this).parent().click(function(){
				$(input).toggle();
			}).addClass('is-dirty').css({'cursor': 'pointer'});
			$(this).DatePicker({
				flat: true,
				mode: 'range',
				date: ($(this).data('value') != '' ? [ $( $(this).data('value') ).data('from'), $( $(this).data('value') ).data('to') ] : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) ),
				current: ($(this).data('value') != '' ? $( $(this).data('value') ).data('to') : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) ),
				format: 'Y-m-d',
				locale: datepicker_regional[ IS_lang ],
				onBeforeShow: function(picker){
					var input = this;
					var val_date = ($(this).data('value') != '' ? $( $(this).data('value') ).data('from') : ($(this).attr('value') != '' ? $(this).attr('value') : str_today) );
					console.log(val_date);
					$(this).DatePickerSetDate(val_date, true);
					$(this).parent().addClass('is-focused');
					var cont = $(picker).find('.datepickerContainer');
					if ($(picker).find('.datepickerButtons').length == 0) {
						var btns = $('<div class="datepickerButtons"></div>');
						var btn_cancel = $('<button type="button">' + datepicker_regional[ IS_lang ].btnCancel + '</button>');
						$(btns).append(btn_cancel);
						var btn_confirm = $('<button type="submit">' + datepicker_regional[ IS_lang ].btnConfirm + '</button>');
						$(btns).append(btn_confirm);
						$(cont).append(btns);
						$(btn_cancel).click(function(){
							$(input).DatePickerHide();
						});
						$(btn_confirm).click(function(){
							var options = $(picker).data('datepicker');
							var tmp = new Date(options.date);
							$(input).val( $(input).DatePickerGetDate(true) ).DatePickerHide();
						});
					}
					if ($(picker).find('.datepickerHeader').length == 0) {
						var day = $(input).DatePickerGetDate(true);
						var dt = new Date(day);
						var day_formated = datepicker_regional[ IS_lang ].daysShort[ dt.getDay() ] + ', ' + (IS_lang != 'en' ? dt.getDate() + '.' : '') + datepicker_regional[ IS_lang ].monthsShort[ dt.getMonth() ] + (IS_lang == 'en' ? ' ' + dt.getDate() : '');
						var hdr = $('<div class="datepickerHeader"></div>');
						var hdr_year = $('<div class="activeYear">'+dt.getFullYear()+'</div>');
						$(hdr).append(hdr_year);
						var hdr_day = $('<div class="activeDay">'+day_formated+'</div>');
						$(hdr).append(hdr_day);
						$(cont).prepend(hdr);
					}
				},
				onChange: function(formated, dates, input){
					var dwf = (dates[0].getDay() > 0 ? dates[0].getDay() : 7);
					var dwt = (dates[1].getDay() > 0 ? dates[1].getDay() : 7);
					var dw = (dates[1].getDay() > 0 ? dates[1].getDay() : 7);
//					if (dwf != 1) var dtf = new Date(moment(dates[0]).add(1 - dwf, 'days').toString());
//						else var dtf = dates[0];
//					if (dwt != 7) var dtt = new Date(moment(dates[0]).add(7 - dwt, 'days').toString());
//						else var dtt = dates[1];
					if (dw != 1) var dtf = new Date( moment( dates[1] ).add( 1 - dw, 'days' ).toString() );
						else var dtf = dates[1];
					if (dw != 7) var dtt = new Date( moment( dates[1] ).add( 7 - dw, 'days' ).toString() );
						else var dtt = dates[1];
					$( $(input).data('value') ).data('from', dtf);
					$( $(input).data('value') ).data('to', dtt);

					$(input).DatePickerSetDate([dtf, dtt], false);
					var dt = new Date( dates[1] );
					var d = dt.getFullYear() + '-' + ((dt.getMonth() + 1).toString().length == 1 ? '0' : '') + ( dt.getMonth() + 1 ) + '-' + (dt.getDate().toString().length == 1 ? '0' : '') + ( dt.getDate() );
					var w = (dtt.getWeekNumber().toString().length == 1 ? '0' : '') + dtt.getWeekNumber();
					var y = dtt.getFullYear();
//					console.log(formated, dates, 'DW', dwf, dwt , 'DT',dtf,dtt,'W',w,y);
//					console.log($(input), formated, dates, 'DW', dw , 'DT',dtf,dtt,'W',w,y);

					if ( IS_action == 'day' ) {
						w = null;
						OptionsSave( IS_presenter + 'Date' , d );
					} else {
						d = null;
						OptionsSave( IS_presenter + 'Week' , y + 'W' + w );
					}

					$.nette.ajax({
						url: ( IS_action == 'day' ? '?do=Date' : '?do=Week' ),
						method: 'POST',
						data: {
							'date': d,
							'week': w,
							'year': y
						},
						complete: function(data) {
							if ( typeof( data.responseJSON ) != 'undefined' ) {
								initCalendar( data.responseJSON );
							}
//							initScroll();
							setCalTimer();
						}
					}, this, null);

					$(input).hide();
					$(input).find('.datepicker').hide();
				},
				/*onRender: function(date) {

				},*/
				onHide: function(picker, input){
					$(input).parent().removeClass('is-focused');
				}
			});
			$(this).hide();
		});
	}

	// DATEPICKER
	if ($(target).find("INPUT.datepicker,.datepicker").length > 0 && (only_init == '' || only_init.indexOf('datepicker') != -1)) {
		$(target).find("INPUT.datepicker,.datepicker").each(function() {
			var input = $(this);
			$(this).focus(function(){
				$(this).blur();
			});
//			$(this).parent().addClass('is-dirty');
			$(this).closest('.mdl-textfield').click(function(){
				$(input).toggle();
			}).addClass('is-dirty').css({'cursor': 'pointer'});
			var popup_pos = (typeof($(this).data('popup')) != 'undefined' ? $(this).data('popup') : 'bottom');
			if ( $(this).is('input') ) {
				var set_flat = false;
				var dtp_val = ( $(this).val() != '' ? $(this).val() : ( $(this).attr('value') != '' ? $(this).attr('value') : str_today ) );
				console.log('INPUT date',dtp_val);
			} else {
				var set_flat = true;
				if ( typeof( $(this).attr('data-value') ) != 'undefined' ) {
					var inp_val = $(this).attr('data-value');
					var dtp_val = ( typeof( $(inp_val).attr('data-date') ) != 'undefined' && $(inp_val).attr('data-date') != '' ? $(inp_val).attr('data-date') : ( $(inp_val).text() != '' ? $(inp_val).text() : str_today ) );
				} else {
					var dtp_val = ( typeof( $(this).attr('data-date') ) != 'undefined' && $(this).attr('data-date') != '' ? $(this).attr('data-date') : ( $(this).text() != '' ? $(this).text() : str_today ) );
				}
				$(this).hide();
				console.log('DIV date',dtp_val);
			}
			$(this).DatePicker({
				flat: set_flat,
				date: dtp_val,
				current: dtp_val,
				format: 'Y-m-d',
				position: popup_pos,
				extraWidth: 20,
				extraHeight: 117,
				locale: datepicker_regional[ IS_lang ],
				onBeforeShow: function(picker){
					var input = this;
					var val_date = dtp_val;
					$(this).DatePickerSetDate(val_date, true);
					$(this).parent().addClass('is-focused');
					var cont = $(picker).find('.datepickerContainer');
					if ($(picker).find('.datepickerButtons').length == 0) {
						var btns = $('<div class="datepickerButtons"></div>');
						var btn_cancel = $('<button type="button">' + datepicker_regional[ IS_lang ].btnCancel + '</button>');
						$(btns).append(btn_cancel);
						var btn_confirm = $('<button type="submit">' + datepicker_regional[ IS_lang ].btnConfirm + '</button>');
						$(btns).append(btn_confirm);
						$(cont).append(btns);
						$(btn_cancel).click(function(){
							$(input).DatePickerHide();
						});
						$(btn_confirm).click(function(){
							var options = $(picker).data('datepicker');
							var tmp = new Date(options.date);
							$(input).val( $(input).DatePickerGetDate(true) ).DatePickerHide();
						});
					}
					if ($(picker).find('.datepickerHeader').length == 0) {
						var day = $(input).DatePickerGetDate(true);
						var dt = new Date(day);
						var day_formated = datepicker_regional[ IS_lang ].daysShort[ dt.getDay() ] + ', ' + (IS_lang != 'en' ? dt.getDate() + '.' : '') + datepicker_regional[ IS_lang ].monthsShort[ dt.getMonth() ] + (IS_lang == 'en' ? ' ' + dt.getDate() : '');
						var hdr = $('<div class="datepickerHeader"></div>');
						var hdr_year = $('<div class="activeYear">'+dt.getFullYear()+'</div>');
						$(hdr).append(hdr_year);
						var hdr_day = $('<div class="activeDay">'+day_formated+'</div>');
						$(hdr).append(hdr_day);
						$(cont).prepend(hdr);
					}
				},
				onChange: function(formated, dates, input){
					console.log(formated);
					var dt = new Date(formated);
					var day_formated = datepicker_regional[ IS_lang ].daysShort[ dt.getDay() ] + ', ' + (IS_lang != 'en' ? dt.getDate() + '.' : '') + datepicker_regional[ IS_lang ].monthsShort[ dt.getMonth() ] + (IS_lang == 'en' ? ' ' + dt.getDate() : '');
					$(this).find('.datepickerHeader .activeYear').html(dt.getFullYear());
					$(this).find('.datepickerHeader .activeDay').html(day_formated);
					$(input).val(formated).attr('value',formated).change();
					if ( formated != '' ) {
						var $input = $(input).parent();
						if ( $input.hasClass('is-invalid') ) $input.removeClass('is-invalid');
						if ( !$input.hasClass('is-dirty') ) $input.addClass('is-dirty');

						if ( $(input).attr('data-action') == 'cal-refresh' ) {
							var d = formated;
							var y = formated.substr(0, 4);
							OptionsSave(IS_presenter+'Date', d);
							$.nette.ajax({
								url: '?do=Date',
								method: 'POST',
								data: {
									'date': d,
									'year': y
								},
								complete: function(data) {
									if ( typeof( data.responseJSON ) != 'undefined' ) {
										initCalendar( data.responseJSON );
									}
//									initScroll();
								}
							}, this, null);

							$(input).hide();
						}
					}
				},
				onHide: function(picker, input){
					var val = $(input).val();
					console.log(picker,input,val);
					var $input = $(input).parent();
					if ( val != '' ) {
						if ( $input.hasClass('is-invalid') ) $input.removeClass('is-invalid');
						if ( !$input.hasClass('is-dirty') ) $input.addClass('is-dirty');
					} else {
						if ( !$input.hasClass('is-invalid') ) $input.addClass('is-invalid');
						if ( $input.hasClass('is-dirty') ) $input.removeClass('is-dirty');
					}
					$(input).change();
				} /*,
				onRender: function(date) {

				}*/
			});
		});
/*
		$(target).find("INPUT.datepicker").datepicker({
			dateFormat: 'yy-mm-dd',
			//altFormat: "d. m. yy",
			changeMonth: false,
			changeYear: false,
			showButtonPanel: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			beforeShow: function(input, inst) {
				if ($(input).attr('data-mindate') != '') $(input).datepicker('option', 'minDate', $(input).attr('data-mindate'));
				if ($(input).attr('data-maxdate') != '') $(input).datepicker('option', 'maxDate', $(input).attr('data-maxdate'));
				if (typeof($(input).attr('data-inputmaxdate')) != 'undefined' && $(input).attr('data-inputmaxdate') != '') {
					var src = $(input).attr('data-inputmaxdate');
					var mDt = $(src).val();
					console.log(mDt);
					if (mDt != '') $(input).datepicker('option', 'maxDate', new Date(mDt));
				}
				if (typeof($(input).attr('data-inputmindate')) != 'undefined' && $(input).attr('data-inputmindate') != '') {
					var src = $(input).attr('data-inputmindate');
					var mDt = $(src).val();
					console.log(mDt);
					if (mDt != '') $(input).datepicker('option', 'minDate', new Date(mDt));
				}
				setTimeout(function() {
					var btns = $(inst.dpDiv[0]).find('.ui-datepicker-buttonpane');
					btns.find('.ui-datepicker-current').removeClass('ui-datepicker-current').text('Zrušiť').unbind("click").bind("click", function () {  
                		$.datepicker._clearDate( input );  
            		});
					var dp = $(inst.dpDiv[0]);

				}, 1);
			},
			onClose: function(dt, inst) {
				if ($(inst.input[0]).val().trim() != '' && !$(inst.input[0]).parent().hasClass('is-dirty')) $(inst.input[0]).parent().addClass('is-dirty');
				else if ($(inst.input[0]).val().trim() == '') $(inst.input[0]).parent().removeClass('is-dirty');

			},
			onSelect: function(date, inst) {
				//changePickerHeader(moment(date, 'MM/DD/YYYY'));
			}
		});
*/
	}

	// CLOCKPICKER
	if ($(target).find("INPUT.clockpicker").length > 0 && (only_init == '' || only_init.indexOf('clockpicker') != -1)) {
		$(target).find("INPUT.clockpicker").each(function() {
			var input = this;
			var popup_pos = (typeof($(this).data('popup')) != 'undefined' ? $(this).data('popup') : 'bottom');
			$(this).clockpicker({
				donetext: datepicker.regional[ IS_lang ].closeText,
				placement: ( popup_pos != 'bottom' && popup_pos != 'left' && popup_pos != 'right' ? popup_pos : ($(window).width() < 480 ? 'top' : 'bottom' )),
				align: ( popup_pos == 'left' || popup_pos == 'right' ? popup_pos : 'left'),
				autoclose: true,
				afterDone: function() {
					if ($(input).val() != '') $(input).parent().addClass('is-dirty').removeClass('is-invalid');
				}
			});
		});
	}

	// FILE UPLOAD DROPZONE
	if ($(target).find(".dropzone:not(.dz-secure)").length > 0 && (only_init == '' || only_init.indexOf('upload') != -1)) {
		$(target).find(".dropzone:not(.dz-secure)").each(function(){
			var form_id = $(this).closest('FORM').attr("id");
			if ( $(this).hasClass('dz-clickable') ) return;
			var file = $(this.element).attr('data-file');
			if (typeof(file) == 'undefined' || file == '') var file = '';
			var files = $(this).attr('data-files');
			if (typeof(files) == 'undefined' || files == '') var files = 1;
			var input = $(this).attr('data-input');
			if (typeof(input) == 'undefined' || input == '') var input = $(this).parent().find("INPUT[type='file']").attr("name");
			var accept = $(this).attr('data-accept');
			if (typeof(accept) == 'undefined' || accept == '') var accept = null;
			var id = $(this).attr('data-id');
			if (typeof(id) == 'undefined' || id == '') var id = '';
			$(this).dropzone({
				url: "/setup/file-upload/"+(id != '' ? id+'/' : ''),
				acceptedFiles: accept,
				filesizeBase: 1024,
				maxFiles: parseInt(files),
				uploadMultiple: (files != 1),
				parallelUploads: 1,
				maxFilesize: 2,
				addRemoveLinks: true,
				clickable: true,
				filePrefix: id,
				defaultValue: file,
				parentForm: form_id,
				parentInput: input,
				dictDefaultMessage:	dropzone_regional[ IS_lang ].dictDefaultMessage,
				dictFallbackMessage: dropzone_regional[ IS_lang ].dictFallbackMessage,
				dictFallbackText: dropzone_regional[ IS_lang ].dictFallbackText,
				dictInvalidFileType: dropzone_regional[ IS_lang ].dictInvalidFileType,
				dictFileTooBig: dropzone_regional[ IS_lang ].dictFileTooBig,
				dictResponseError: dropzone_regional[ IS_lang ].dictResponseError,
				dictCancelUpload: dropzone_regional[ IS_lang ].dictCancelUpload,
				dictCancelUploadConfirmation: dropzone_regional[ IS_lang ].dictCancelUploadConfirmation,
				dictRemoveFile: dropzone_regional[ IS_lang ].dictRemoveFile,
				dictMaxFilesExceeded: dropzone_regional[ IS_lang ].dictMaxFilesExceeded,
				init: function() {
					var finput = $("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+(this.options.maxFiles > 1 ? '[]' : '')+"'][type='file']");
					if ($("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").length == 0) $(finput).after('<input type="hidden" name="'+this.options.parentInput+'_files" id="'+this.options.parentForm+'-'+this.options.parentInput+'_files" value="'+this.options.defaultValue+'">');
					$(finput).remove();
				},
				renameFilename: function(name) {
					return this.filePrefix+'-'+name.toLowerCase().replace(' ', '-').replace(/[^\w.-]/gi, '');
				},
				removedfile: function(file) {
					var _ref;
					var val = $("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").val();
					val.replace(file.serverName, '').replace(';;', ';');
					$("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").val(val);
					return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
				},
				success: function(file, response) {
					var val = $("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").val();
					if (typeof(response.file) != 'undefined') {
						$("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").val((this.options.maxFiles > 1 && val != '' ? val+";" : "")+response.file);
					}
					if (typeof(response.error) != 'undefined') {
						alert(response.error);
					}					
				}
			});
		});
	}

	// FILE UPLOAD DROPZONE SECURE
	if ($(target).find(".dropzone.dz-secure").length > 0 && (only_init == '' || only_init.indexOf('upload') != -1)) {
		$(target).find(".dropzone.dz-secure").each(function(){
			var form_id = $(this).closest('FORM').attr("id");
			var file = $(this.element).attr('data-file');
			if (typeof(file) == 'undefined' || file == '') var file = '';
			var files = $(this).attr('data-files');
			if (typeof(files) == 'undefined' || files == '') var files = 1;
			var fSize = $(this).attr('data-size');
			if (typeof(fSize) == 'undefined' || fSize == '') var fSize = 5;
			var input = $(this).attr('data-input');
			if (typeof(input) == 'undefined' || input == '') var input = $(this).parent().find("INPUT[type='file']").attr("name");
			var accept = $(this).attr('data-accept');
			if (typeof(accept) == 'undefined' || accept == '') var accept = null;
			var id = $(this).attr('data-id');
			if (typeof(id) == 'undefined' || id == '') var id = '';
			var list = $(this).attr('data-list');
			if (typeof(list) == 'undefined' || list == '') var list = '';
			$(this).dropzone({
				url: "/setup/file-upload-secure/"+(id != '' ? id+'/' : ''),
//				acceptedFiles: accept,
				filesizeBase: 1024,
				maxFiles: parseInt(files),
				uploadMultiple: (files != 1),
				parallelUploads: 1,
				maxFilesize: ( fSize * 1024 * 1024 ),
				addRemoveLinks: true,
				clickable: true,
				filePrefix: id,
				defaultValue: file,
				parentForm: form_id,
				parentInput: input,
				previewsContainer: list,
				previewTemplate: '<li class="dz-preview dz-file-preview">\
					<div class="dz-details">\
						<div class="dz-filename"><span data-dz-date></span><span data-dz-name></div>\
						<img data-dz-thumbnail />\
					</div>\
					<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\
					<div class="dz-success-mark"><span>✔</span></div>\
					<div class="dz-error-mark"><span>✘</span></div>\
					<div class="dz-error-message"><span data-dz-errormessage></span></div>\
				</li>',
				dictDefaultMessage:	dropzone_regional[ IS_lang ].dictDefaultMessage,
				dictFallbackMessage: dropzone_regional[ IS_lang ].dictFallbackMessage,
				dictFallbackText: dropzone_regional[ IS_lang ].dictFallbackText,
				dictInvalidFileType: dropzone_regional[ IS_lang ].dictInvalidFileType,
				dictFileTooBig: dropzone_regional[ IS_lang ].dictFileTooBig,
				dictResponseError: dropzone_regional[ IS_lang ].dictResponseError,
				dictCancelUpload: dropzone_regional[ IS_lang ].dictCancelUpload,
				dictCancelUploadConfirmation: dropzone_regional[ IS_lang ].dictCancelUploadConfirmation,
				dictRemoveFile: dropzone_regional[ IS_lang ].dictRemoveFile,
				dictMaxFilesExceeded: dropzone_regional[ IS_lang ].dictMaxFilesExceeded,
				init: function() {
//console.log('DZS INIT');
					var finput = $("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+(this.options.maxFiles > 1 ? '[]' : '')+"'][type='file']");
					if ($("#"+this.options.parentForm+" INPUT[name='"+this.options.parentInput+"_files']").length == 0) $(finput).after('<input type="hidden" name="'+this.options.parentInput+'_files" id="'+this.options.parentForm+'-'+this.options.parentInput+'_files" value="'+this.options.defaultValue+'">');
					$(finput).remove();
				},
				removedfile: function(file) {
					var _ref;
					var fid = file.file['hash'];
					$.get( "/setup/file-delete-secure/"+(id != '' ? id+'/' : ''), { 'fid': fid } );
//console.log('DZS REMOVE',fid,file);
					return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
				},
				success: function(file, response) {
					if (typeof(response.file) != 'undefined') {
						file.file = response.file[0];
						$(file.previewElement).find('IMG[data-dz-thumbnail]').hide();
						$(file.previewElement).find('SPAN[data-dz-date]').text( typeof( file.file['date'] ) != 'undefined' ? file.file['date'] : moment().format('YYYY-MM-DD HH:mm') );
						$(file.previewElement).find('.dz-details').append('<i class="fa file-type file-'+file.file['type']+'"></i>');
						$(file.previewElement).click(function(){
							window.open('/setup/file-get-secure/'+id+'/?fid='+file.file['hash'], '_blank');
							console.log(file);
							return false;
						});
					}
//console.log('DZS SUCCESS',file,response);
					if (typeof(response.error) != 'undefined') {
						alert(response.error);
					}
				}
			});
			$(list).find('LI[data-hash] .dz-details').click(function(){
				var file_hash = $(this).parent().data('hash');
				var file_show = $(this).parent().hasClass('dz-image-preview');
//				console.log('FSHOW', file_show, id, file_hash);
				if (file_show) {
					var w = $(window).width() - 100;
					var h = $(window).height() - 100;
					var fid = $(this).parent().attr('id');
					$(".dialogImgPreview .mdl-dialog__content").empty().append('<img id="pImgPreview' + fid + '" src="/setup/file-get-secure/' + id + '/?fid=' + file_hash + '" style="width:100%;height:auto">');
					$("#pImgPreview"+fid).load(function(){
						$(this).imgViewer2({
							target: ".dialogImgPreview .mdl-dialog__content",
							width: ( w - 40 ),
							height: ( h - 73 - 40 - 77 ),
							zoomStep: 0.5,
							onZoom: function(dt, e) {
								$(".dialogImgPreview #previewZoomLvl SPAN").html( Math.round( ( this.getZoom() - 1 ) * 100 ) / 10 );
							},
							onReady: function(dt) {
//								console.log('READY', dt);
							},
							onClick: function(dt) {
//								console.log('CLICK', dt);
							}
						});
					});
					initDialog("#"+fid, "DIALOG.dialogImgPreview", w, h);
				} else {
					window.open('/setup/file-get-secure/'+id+'/?fid='+file_hash, '_blank');
				}
			});
		});
	}
}
function initTextCounter() {
	if ( $("TEXTAREA.counter,INPUT.counter").length > 0 ) {
		$("TEXTAREA.counter,INPUT.counter").each( function() {
			var id = $(this).attr( 'id' );
			var maxLen = $(this).attr( 'maxlength' );
			var shortcut = ( typeof( $(this).attr( 'data-shortcut' ) ) != 'undefined' && $(this).attr( 'data-shortcut' ) != '' ? $(this).attr( 'data-shortcut' ) : '' );
			if ( typeof(maxLen) == 'undefined' || maxLen == '' ) return;
			if ( $(this).hasClass( 'html-editor' ) ) {
				console.log( 'CNTR' , id );
				if ( $(this).parent().find("#" + id + '-counter').length == 0) {
					$(this).after( '<div id="' + id + '-counter" class="inputCounter"' + ( shortcut != '' ? ' data-shortcut="' + shortcut + '"' : '' ) + '></div>' );
					$(this).parent().addClass('has-counter');
				}
				$(this).on( 'summernote.change' , function( we, contents, $editable ) {
					var id = $(this).attr( 'id' );
					var val = $(this).val();
					var len = val.length;
					if ( typeof( maxLen ) == 'undefined' || maxLen == '' ) maxLen = ''
					$('#' + id + '-counter').html( len + ( maxLen != '' ? ' / ' + maxLen : '' ) );
				});
				$(this).on( 'summernote.keyup' , function( we, e ) {
					$(this).trigger( 'summernote.change' );
				});
				$(this).trigger( 'summernote.change' );
			} else {
				if ( $(this).parent().find("#" + id + '-counter').length == 0) {
					$(this).after( '<div id="' + id + '-counter" class="inputCounter"' + ( shortcut != '' ? ' data-shortcut="' + shortcut + '"' : '' ) + '></div>' );
					$(this).parent().addClass('has-counter');
				}
				$(this).keyup( function() {
					var id = $(this).attr( 'id' );
					var val = $(this).val();
					var len = val.length;
					var maxLen = $(this).attr( 'maxlength' );
					if ( typeof( maxLen ) == 'undefined' || maxLen == '' ) maxLen = ''
					$('#' + id + '-counter').html( len + ( maxLen != '' ? ' / ' + maxLen : '' ) );
				});
				$(this).keyup();
			}
		});
	}
	if ( $("TEXTAREA.rcounter").length > 0 ) {
		$("TEXTAREA.rcounter").each( function() {
			var id = $(this).attr( 'id' );
			var maxRows = $(this).attr( 'data-maxrows' );
			if ( typeof(maxRows) == 'undefined' || maxRows == '' ) return;
			if ( $(this).parent().find("#" + id + '-rcounter').length == 0) {
				$(this).after( '<div id="' + id + '-rcounter" class="inputCounter"></div>' );
				$(this).parent().addClass('has-counter');
			}
			$(this).keyup( function() {
				var id = $(this).attr( 'id' );
				var val = $(this).val().trim();
				var rows = val.split(/\r\n|\r|\n/).length;
				var maxRows = $(this).attr( 'data-maxrows' );
				if ( typeof( maxRows ) == 'undefined' || maxRows == '' ) maxRows = ''
				$('#' + id + '-rcounter').html( rows + ( maxRows != '' ? ' / ' + maxRows : '' ) );
			});
			$(this).keyup();
		});
	}
}

function openhours_row(id, dt) {
	var i = $("#"+id+"-box .openhours-row").length;
	if (typeof(dt) == "undefined") {
		var dt = {};
		dt.day = '';
		dt.from = '00:00';
		dt.to = '00:00';
		dt.text = '';
		dt.type = '';
		dt.order = false;
	}
	
	var row = $('<div id="'+id+'-row'+i+'" class="openhours-row"><span class="openhours-move"><i class="ui-icon ui-icon-arrowthick-2-n-s"></i></span></div>');
	
	var s_day = $('<span class="openhours-day"><select id="ohr'+i+'_day" name="ohr'+i+'_day" onchange="openhours_value(\''+id+'\')">\
		<option value="">...</option>\
		<option value="1"'+(dt.day==1?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[1]+'</option>\
		<option value="2"'+(dt.day==2?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[2]+'</option>\
		<option value="3"'+(dt.day==3?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[3]+'</option>\
		<option value="4"'+(dt.day==4?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[4]+'</option>\
		<option value="5"'+(dt.day==5?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[5]+'</option>\
		<option value="6"'+(dt.day==6?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[6]+'</option>\
		<option value="7"'+(dt.day==7?" selected":"")+'>'+datepicker.regional[IS_lang].dayNamesMin[0]+'</option>\
	</select></span>');
	$(row).append(s_day);
	
	var i_from = $('<span class="openhours-time"><input type="text" id="ohr'+i+'_from" name="ohr'+i+'_from" value="'+dt.from+'"></span>');
	$(i_from).find('INPUT').clockpicker({
		donetext: datepicker.regional[ IS_lang ].closeText,
		placement: ( $(window).width() < 480 ? 'top' : 'bottom' ),
		autoclose: true,
		afterDone: function() {
			openhours_value(id);
		}
	});
	$(row).append(i_from);
	
	var i_to = $('<span class="openhours-time"><input type="text" id="ohr'+i+'_to" name="ohr'+i+'_to" value="'+dt.to+'"></span>');
	$(i_to).find('INPUT').clockpicker({
		donetext: datepicker.regional[ IS_lang ].closeText,
		placement: ( $(window).width() < 480 ? 'top' : 'bottom' ),
		autoclose: true,
		afterDone: function() {
			openhours_value(id);
		}
	});
	$(row).append(i_to);
	
	var i_text = $('<span class="openhours-text"><input type="text" id="ohr'+i+'_text" name="ohr'+i+'_text" value="'+dt.text+'" onchange="openhours_value(\''+id+'\')"></span>');
	$(i_text).find('INPUT').change(function(){
		openhours_value(id);
	})
	$(row).append(i_text);
	
	var s_type = $('<span class="openhours-type"><select id="ohr'+i+'_type" name="ohr'+i+'_type" onchange="openhours_value(\''+id+'\')">\
		<option value="default">' + locale['default'] + '</option>\
		<option value="odbery"'				+(dt.type == 'odbery'			? ' selected' : '')+'>' + locale['oh_red'] + '</option>\
		<option value="konzultacie"'		+(dt.type == 'konzultacie'		? ' selected' : '')+'>' + locale['oh_blue'] + '</option>\
		<option value="odber_materialu"'	+(dt.type == 'odber_materialu'	? ' selected' : '')+'>' + locale['oh_odber'] + '</option>\
		<option value="prev_prehliadky"'	+(dt.type == 'prev_prehliadky'	? ' selected' : '')+'>' + locale['oh_pp'] + '</option>\
		<option value="interna_amb"'		+(dt.type == 'interna_amb'		? ' selected' : '')+'>' + locale['oh_intern'] + '</option>\
		<option value="fialova"'			+(dt.type == 'fialova'			? ' selected' : '')+'>' + locale['oh_lila'] + '</option>\
		<option value="zelena"'				+(dt.type == 'zelena'			? ' selected' : '')+'>' + locale['oh_green'] + '</option>\
		<option value="emergency"'			+(dt.type == 'emergency'		? ' selected' : '')+'>' + locale['oh_urgent'] + '</option>\
		<option value="gray"'				+(dt.type == 'gray'				? ' selected' : '')+'>' + locale['oh_silver'] + '</option>\
	</select></span>');
	$(s_type).find('INPUT').change(function(){
		openhours_value(id);
	})
	$(row).append(s_type);

//	$("#ohr"+i+"_type OPTION[value='"+dt.type+"']").attr("selected", true);

	var func = $('<span class="openhours-func"><a href="javascript:;" id="'+id+'-delrow-'+i+'" class="mdl-button mdl-button-small mdl-js-button"><i class="material-icons">cancel</i></a></span>');
	$(func).find('A').click(function(){
		$("#"+id+"-row"+i).remove();
		openhours_value(id);
	});
	$(row).append(func);

	return row;
}
function openhours_value(id) {
	var val = "";
	$("#"+id+"-box .openhours-row").each(function(i){
		if ($(this).hasClass('openhours-header')) return;
		var day = parseInt($(this).find("SELECT[name$='_day'] OPTION:selected").val());
		var tfr = $(this).find("INPUT[name$='_from']").val();
		var tto = $(this).find("INPUT[name$='_to']").val();
		var txt = $(this).find("INPUT[name$='_text']").val();
		var tp = $(this).find("SELECT[name$='_type'] OPTION:selected").val();
		var ot = true;
		if (day > 0 && tfr != "" && tto != "") {
			if (val != "") val += "\n";
			val += day + "-" + tfr + "-" + tto + "-" + txt + "-" + (typeof(tp)!="undefined" && tp!="" && tp!="default" ? tp : "");// + "-" + (ot ? "1" : "");
		}
	});
	$("#"+id).val(val);
}

function calcRC( rc ) {
	var db = '';
	if ( rc.length < 9 || rc.length > 10 || rc.substr( 0 , 1 ) == 'X' ) return '';
	var yy = rc.substr( 0 , 2 );
	var mm = rc.substr( 2 , 2 );
	if ( mm.substr( 0 , 1 ) == '5' || mm.substr( 0 , 1 ) == '6' ) {
		var m = parseInt( mm ) - 50;
		mm = ( m < 10 ? '0' : '' ) + m.toString();
	}
	if ( parseInt( mm ) < 1 || parseInt( mm ) > 12 ) return '';
	var dd = rc.substr( 4 , 2 );
	if ( parseInt( dd ) < 1 || parseInt( dd ) > 31 ) return '';

	var py = '';
	if ( rc.length == 9 ) py = '19';
	else if ( parseInt( yy ) >= 54 ) py = '19';
	else py = '20';

	db = py + yy + '-' + mm + '-' + dd;
	return db;
}
function testRC( rc ) {
	// prazdne, alebo obsahuje znaky
	if ( rc.toString() == '' || !( /^\d+$/.test( rc ) ) ) return false;
	// je kratsie ako 9 miestne cislo alebo dlhsie ako 10
	if ( rc.toString().length < 9 || rc.toString().length > 10 ) return false;
	// od roku 1954 maju rodne cisla 10 miestne cisla
	if ( rc.toString().length == 9 && parseInt( rc.toString().substr( 0 , 2 ) ) >= 54 ) return false;
	// pre 10 miestne cisla musi byt RC delitene 11
	if ( rc.toString().length == 10 && parseInt( rc ) % 11 != 0 ) return false;
	return true;
}

function OptionsSave(opt, val) {
	console.log('SAVE OPTION: '+opt+'='+val);
//	$.get("/setup/?do=option&p="+IS_presenter+"&"+opt+"="+val);

	$.ajax({
		method: 'GET',
		url: "/setup/",
		data: "do=option&p="+IS_presenter+"&"+opt+"="+val,
		async: false
	});
}

var sel_adding = false;
var sel_removing = false;
var selectize_settings = {
	customOptions: function (options) {
		options.sortField = ( typeof( this.settings.sortField ) != 'undefined' ? this.settings.sortField : [{field: 'name', direction: 'asc'}] );
		options.searchField = [ 'name', 'search', 'option' ];
		options.selectOnTab = ( typeof( this.settings.selectOnTab ) != 'undefined' ? this.settings.selectOnTab : true );
		options.openOnFocus = ( typeof( this.settings.openOnFocus ) != 'undefined' ? this.settings.openOnFocus : false );
		options.closeAfterSelect = ( typeof( this.settings.closeAfterSelect ) != 'undefined' ? this.settings.closeAfterSelect : true );
		options.onFocus = function() {
			var input = this.$input[0];
			if (!$(input).parent().hasClass('is-dirty')) $(input).parent().addClass('is-dirty');
		};
		options.onBlur = function() {
			var input = this.$input[0];
			var cnt = this.items.length;
			if (cnt == 0) $(input).parent().removeClass('is-dirty');
		};
		options.onChange = function(val) {
			var input = this.$input[0];
			var v = $(input).val();
//			console.log('CHANGE', val, '/', v);
			if (this.$input[0].id.indexOf('crossDForm') != -1) setTooth( val );
			if (this.$input[0].id.indexOf('orderForm') != -1) {
				if (typeof(this.options[val]) != 'undefined') {
					var item = this.options[val];
					$('#'+item['form']+' INPUT[name="name_first"]').val(item['name_first']).attr('value', item['name_first']).parent().addClass('is-dirty');
					$('#'+item['form']+' INPUT[name="name_last"]').val(item['name_last']).attr('value', item['name_last']).parent().addClass('is-dirty');
					$('#'+item['form']+' INPUT[name="phone"]').val(item['phone']).attr('value', item['phone']).parent().addClass('is-dirty');
					$('#'+item['form']+' INPUT[name="email"]').val(item['email']).attr('value', item['email']).parent().addClass('is-dirty');
					$("#calPatientTags").empty();
					if ( typeof( item['tags'] ) == 'object' && item['tags'].length > 0 ) {
						$("#calPatientTags").append( item['tags'] + ' ' );
					}
				}
			}
			if ( this.$input[0].id.indexOf('-docForm') != -1 && typeof( limit ) != 'undefined' && typeof( lmsgs ) != 'undefined' ) {
				var allow_msg = false;
				var alert_tp = 'orange';
				var pp_active = ( $("#pp-date").attr("data-active") == "1" );
				var pp_actual = ( $("#pp-date").attr("data-date").substr(0, 4) == (new Date()).getFullYear().toString() );
				if ( typeof( limit[val] ) != 'undefined' ) {
					if ( limit[val]['code'].substr(0,1) == 'D' ) {
						if ( limit[val]['code'].substr(0,3) == 'D02' && pp_actual ) allow_msg = true;
					} else if ( typeof( limit[val]['lim'] ) != 'undefined' && limit[val]['lim'] == 'PP' && !pp_active ) allow_msg = 'PP';
					else allow_msg = true;
					if ( typeof( limit[val]['lim'] ) != 'undefined' && limit[val]['lim'] != null && !pp_active ) alert_tp = 'red';
				}
				var ins = $("#frm-docForm-insurance").val();
				if ( ins == '' || typeof( limins[ ins ] ) == 'undefined' || ( typeof( limins[ ins ] ) != 'undefined' && !limins[ ins ]) ) allow_msg = false;
//				console.log( $("#pp-date").attr("data-date") , $("#pp-date").attr("data-active") , (new Date()).getFullYear() , pp_active , pp_actual , allow_msg , limit[val] );
				if ( typeof( lmsgs[val] ) != 'undefined' && allow_msg !== false ) {
					$box = $(this.$input[0]).parent().parent().parent();
					var msg = ( allow_msg === true ? lmsgs[val] : lmsgs[allow_msg] );
					if ( $box.find('.alert-msg').length == 0 ) $box.prepend('<div class="alert-msg mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone bg-' + alert_tp + '" style="margin-bottom:10px;padding:1px 5px"><small style="color:#fff !important">' + msg + '</small></div>');
					else $box.find('.alert-msg').html( '<small style="color:#fff !important">' + lmsgs[val] + '</small>' );
				} else {
					$box = $(this.$input[0]).parent().parent().parent();
					if ( $box.find('.alert-msg').length > 0 ) $box.find('.alert-msg').remove();
				}
			}
		};
		options.onItemAdd = function(val, item) {
			var input = this.$input[0];
			var v = $(input).val();
//			console.log('ADD', val, '/', v, '/', item,'/',tval);
			if ($('#frm-crossDForm-dtoothset').length > 0 && parseInt(val) > 10 && parseInt(val) < 100) {
				if ( parseInt( val ) > 50 ) var nm = parseInt( val ) - 40;
				else var nm = parseInt( val );
//				if ( parseInt( val ) > 50 && parseInt( val.toString().substr(1,1) ) >= 6 && typeof( tval[ nm ] ) != 'undefined' && typeof( tval[ nm ].tp ) != 'undefined' && tval[ nm ].tp == 'child' ) {
/*				if ( parseInt( val ) > 50 && parseInt( val.toString().substr(1,1) ) >= 6 && typeof( tval[ nm ] ) != 'undefined' && tval[ nm ].indexOf('child') != -1 ) {
//					console.log('DISABLE TOOTH');
					var $select = $('#frm-crossDForm-dtoothset').selectize(selectize_settings);
					var selectize = $select[0].selectize;
					sel_removing = true;
					selectize.clear(true);
					sel_removing = false;
					selectize.refreshItems();
					return false;
				}*/
				$("#tab-dcross .tooth").removeClass('active');
				$("#tab-dcross .tooth.t"+nm).addClass('active');
				var $select = $('#frm-crossDForm-dtoothset').selectize(selectize_settings);
				var selectize = $select[0].selectize;
				if (v.indexOf(',') == -1) var remv = [v];
				else var remv = v.split(',');
				sel_removing = true;
				for (var r in remv) {
					selectize.removeItem(remv[r], true);
				}
				sel_removing = false;
//				selectize.refreshItems();
//				var tv = jQuery.extend( {} , tval[ nm ] );
				var tv = tval[ nm ];
//				console.log( 'T:' , nm , tval[ nm ], tv);
//				if ( !sel_adding && tval[ nm ] != 'adult' && tval[ nm ] != 'child' && tval[ nm ] != 'adult,200' ) {
				if ( !sel_adding && tval[ nm ] != '' ) {
//					console.log('LOAD', nm, 'DATA', tv, 'ALL', tval[nm]);
					sel_adding = true;
					getTooth( val , tv );
					sel_adding = false;
				}
//				if ( parseInt( val ) < 50 && tv.tp == 'child' ) {
				if ( parseInt( val ) < 50 && tv.indexOf('child') != -1 ) {
//					console.log('SLZ SETc', val);
					setTooth( val + ',200' );
//				} else if ( parseInt( val ) > 50 && tv.tp == 'adult' ) {
				} else if ( parseInt( val ) > 50 && tv.indexOf('adult') != -1 ) {
//					console.log('SLZ SETa', val);
					setTooth( val + ',' + ( parseInt( val.toString().substr( 1 , 1 ) ) >= 6 ? '291' : '200' ) );
//				} else if ( ( v != '' || !sel_adding ) && ( ( parseInt( val ) > 50 && tv.tp == 'child' ) || ( parseInt( val ) < 50 && tv.tp == 'adult' ) ) && ( tv.type != 200 || tv.type != '' || tv.root != '' || tv.crown != '' || tv.rec != '' || tv.state.o != '' || tv.state.v != '' || tv.state.l != '' || tv.state.d != '' || tv.state.m != '' ) ) {
				} else if ( ( v != '' || !sel_adding ) && ( ( parseInt( val ) > 50 && tv.indexOf('child') != -1 ) || ( parseInt( val ) < 50 && tv.indexOf('adult') != -1 ) ) ) {
//					console.log('LOAD', val, 'DATA', tv, 'ALL', tval);
//					sel_adding = true;
//					getTooth(val, tv);
//					sel_adding = false;
				}
			}
		};
		options.onItemRemove = function(val) {
			var input = this.$input[0];
			var v = $(input).val();
			if ($('#frm-crossDForm-dtoothset').length > 0 && $(input).attr('id').indexOf('crossDForm') != -1 ) {
				if (v == '' && parseInt(val) > 0) {
					v = ( parseInt(val) < 50 ? parseInt(val) : parseInt(val)-40 );
//					console.log('REMoVE',v,tset);
//					if ( tset[ val ].tp != '' ) v = v + ',' + tset[ val ].tp;
					if ( tset[ val ].type != '' ) v = v + ',' + tset[ val ].type;
					if ( tset[ val ].root != '' ) v = v + ',' + tset[ val ].root;
					if ( tset[ val ].crown != '' ) v = v + ',' + tset[ val ].crown;
					if ( tset[ val ].rec != '' ) v = v + ',' + tset[ val ].rec;
					for (var p in tset[ val ].state) {
						if ( tset[ val ].state[ p ] != '') v = v + ',' + tset[ val ].state[ p ] + ',' + tooth[ p ].id;
					}
				}
				if (v != '' && !sel_removing) setTooth( v );
			}
		};
	},
	customRender: function (options) {
		return {
			item: function(item, escape) {
//				console.log('RENDER ITEM', item, this.$input[0]);
				if (typeof(item['form']) != 'undefined' && item['form'] == 'frm-crossDForm') {
					var val = $(this.$input[0]).attr('value');
					if (item['cat'] == 1) {
						if (val.length > 0 && parseInt(val) > 10 && parseInt(val) < 100 && val.indexOf(',') == -1) {
							var v = val;
							var n = ( parseInt( val ) < 50 ? parseInt( val ) : parseInt( val ) - 40 );
							var ts = tset[ n ];
//							if ( tset[ n ].tp    != '' ) v = v + ',' + tset[ n ].tp;
//							if ( tset[ n ].type  != '' ) v = v + ',' + tset[ n ].type;
//							if ( tset[ n ].root  != '' ) v = v + ',' + tset[ n ].root;
//							if ( tset[ n ].crown != '' ) v = v + ',' + tset[ n ].crown;
//							if ( tset[ n ].rec   != '' ) v = v + ',' + tset[ n ].rec;
//							for (var p in tset[ n ].state) {
//								if ( tset[ n ].state[ p ] != '') v = v + ',' + tset[ n ].state[ p ] + ',' + tooth[ p ].id;
//							}
//							console.log('DO SET' , n , v , ts );
//							if (v != '') setTooth( v );
							getTooth( v , ts );
						}
						tooth_num = item['id'];
						tooth_tp = ( parseInt( val ) < 50 ? 'adult' : 'child' );
						tooth_type = 'tooth';
						tooth_root = 'normal';
						tooth_crown = 'normal';
						tooth_fill = 'normal';
						tooth_fill_id = '';
						tooth_rec = '';
						tooth_pos = '';
						$("#tab-dcross .tooth").removeClass('active');
						$("#tab-dcross .tooth.t"+item['id']).addClass('active');
					}
					var val = $(this.$input[0]).attr('value');
				}
				if ( typeof(item.diagnose) != 'undefined' ) {
					var n = $(this.$input[0]).attr('name');
					var i = parseInt( n.replace('service','') );
					if ( $('#frm-docForm-diagnose' + i).length > 0 ) {
						var $select = $('#frm-docForm-diagnose' + i).selectize(selectize_settings);
						var selectize = $select[0].selectize;
						selectize.addOption( item.diagnose );
						selectize.setValue( item.diagnose.id );
						selectize.refreshItems();
						$("#frm-docForm-diagnose" + i + "-selectized").click();
					}
				}
				return '<div class="item" data-toggle="tooltip" title="' + (item['option'] !== undefined ? escape(item['option']) : '') + '" data-value="' + (item[options.valueField] !== undefined ? escape(item[options.valueField]) : '') + '"'+(typeof(item['data']) != 'undefined' && item['data'] != '' ? ' data-data="'+item['data']+'"' : '')+'>' + escape(item[options.labelField]) + '</div>';
			},
			option: function(item, escape) {
//				console.log('RENDER OPTION', item);
				var label = escape(item['name']);
				if (typeof(item['option']) != 'undefined') var label = escape(item['option']);
				if (typeof(item['form']) != 'undefined' && item['form'] == 'frm-crossDForm') {
					if (item['code'] != '') label = '<span class="item-icon">' + item['icon'] + '</span> ' + label;
				}
				return '<div class="option" data-selectable="" data-value="'+(item[options.valueField] !== undefined ? escape(item[options.valueField]) : '')+'"'+(typeof(item['data']) != 'undefined' && item['data'] != '' ? ' data-data="'+item['data']+'"' : '')+'>' + label + '</div>';
			}
		}
	}
};

if ( !Date.prototype.getWeekNumber ) {
	Date.prototype.getWeekNumber = function(){
		var d = new Date(+this);
		d.setHours(0,0,0);
		d.setDate(d.getDate()+4-(d.getDay()||7));
		return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
	};
}
if ( !Date.prototype.addDays ) {
	Date.prototype.addDays = function(days) {
	  var dat = new Date(this.valueOf());
	  dat.setDate(dat.getDate() + days);
	  return dat;
	}
}
if ( !Number.prototype.padLeft ) {
	Number.prototype.padLeft = function (n,str){
		return Array(n-String(this).length+1).join(str||'0')+this;
	}
}
if ( !String.prototype.removePrefix ) {
	String.prototype.removePrefix = function( prefix ) {
		var str = String( this );
		var regex = new RegExp( prefix + '+\\w{1,20}' , 'gi' );
		css_match = str.match( regex );
		css_remove = ( css_match ) ? css_match.join( ' ' ) : '';
//		console.log('CSS|', str, '/', prefix, '/', regex, '/', css_match, '/', css_remove, '/', str.replace(css_remove, ''));
		str = str.replace( css_remove , '' );
		var sc = 0;
		while ( str.indexOf( '  ' ) != -1 ) {
			str = str.replace( '  ' , ' ' );
			sc = sc + 1;
			if ( sc > 20 ) break;
		}
		return str;
	}
}
if ( !String.prototype.trunc ) {
	String.prototype.trunc = function( length , ending ) {
		'use strict';

		if ( this == null ) {
			throw new TypeError('can\'t convert ' + this + ' to object');
		}
		var str = '' + this;
		if ( length == null ) length = 100;
		if ( ending == null ) ending = '...';

		if ( str.length > length ) {
			return str.substring( 0 , length - ending.length ) + ending;
		} else {
			return str;
		}
	}
}

if ( !String.prototype.repeat ) {
	String.prototype.repeat = function( count ) {
		'use strict';
		
		if ( this == null ) {
			throw new TypeError( 'can\'t convert ' + this + ' to object' );
		}
		var str = '' + this;
		count = +count;
		if ( count != count ) {
			count = 0;
		}
		if ( count < 0 ) {
			throw new RangeError( 'repeat count must be non-negative' );
		}
		if ( count == Infinity ) {
			throw new RangeError( 'repeat count must be less than infinity' );
		}
		count = Math.floor( count );
		if ( str.length == 0 || count == 0 ) {
			return '';
		}
		// Ensuring count is a 31-bit integer allows us to heavily optimize the
		// main part. But anyway, most current (August 2014) browsers can't handle
		// strings 1 << 28 chars or longer, so:
		if ( str.length * count >= 1 << 28 ) {
			throw new RangeError( 'repeat count must not overflow maximum string size' );
		}
		var rpt = '';
		for ( var i = 0; i < count; i++ ) {
			rpt += str;
		}
		return rpt;
	}
}
if ( !String.prototype.nodiacritic ) {
	String.prototype.nodiacritic = function() {
		'use strict';

		var text = '' + this;
		var convertText = "";
		var ydiac = "áäčďéěíĺľňóôöŕšťúůüýřžÁÄČĎÉĚÍĹĽŇÓÔÖŔŠŤÚŮÜÝŘŽ";
		var ndiac = "aacdeeillnooorstuuuyrzAACDEEILLNOOORSTUUUYRZ";

		for ( var i = 0; i < text.length; i++ ) {
			if ( ydiac.indexOf( text.charAt( i ) ) != -1 ) convertText += ndiac.charAt( ydiac.indexOf( text.charAt( i ) ) );
			else convertText += text.charAt( i );
		}
		return convertText;
	}
}

function objToString( obj ) {
	if ( typeof( obj ) == 'object' && JSON.stringify( obj ) == '{}' ) return '';
	if ( typeof( obj ) == 'string' ) return obj;
	else return obj.join(',');
}

var base64_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encode64(input) {
	return btoa(
		encodeURIComponent(input).replace(
			/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
			}
		)
	);
/*
	input = escape(input);
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
			base64_keyStr.charAt(enc1) +
			base64_keyStr.charAt(enc2) +
			base64_keyStr.charAt(enc3) +
			base64_keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
*/
}
function decode64(input) {
	return decodeURIComponent(
		atob(str).split('').map(
			function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}
		).join('')
	);
/*
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n" +
			"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
			"Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {
		enc1 = base64_keyStr.indexOf(input.charAt(i++));
		enc2 = base64_keyStr.indexOf(input.charAt(i++));
		enc3 = base64_keyStr.indexOf(input.charAt(i++));
		enc4 = base64_keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < input.length);

	return unescape(output);
*/
}

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function setCookie(cname, cvalue, extime) {
	var d = new Date();
	d.setTime(d.getTime() + (extime*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

datepicker = {
	regional: {}
};
datepicker.regional['sk'] = {
	closeText: 'OK',
	prevText: 'navigate_before',
	nextText: 'navigate_next',
	currentText: 'Dnes',
	weekHeader: "Týž",
	monthNames: ['Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'],
	monthNamesShort: ['Jan','Feb','Mar','Apr','Máj','Jún','Júl','Aug','Sep','Okt','Nov','Dec'],
	dayNames: ['Nedeľa','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota'],
	dayNamesShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob'],
	dayNamesMin: ['Ne','Po','Ut','St','Št','Pia','So'],
	dateFormat: 'd. m. yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
datepicker.regional['cs'] = datepicker.regional['cz'] = {
	closeText: "OK",
	prevText: "navigate_before",
	nextText: "navigate_next",
	currentText: "Nyní",
	weekHeader: "Týd",
	monthNames: ["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],
	monthNamesShort: ["Led","Úno","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Proc"],
	dayNames: ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"],
	dayNamesShort: ["Ned","Pon","Úte","Stř","Čtv","Pát","Sob"],
	dayNamesMin: ["Ne","Po","Út","St","Čt","Pá","So"],
	dateFormat: "d. m. yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
datepicker.regional['en'] = {
	closeText: "OK",
	prevText: "navigate_before",
	nextText: "navigate_next",
	currentText: "Today",
	weekHeader: "Wk",
	monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
	monthNamesShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
	dayNames: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	dayNamesShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
	dateFormat: "dd.mm.yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
datepicker.regional['de'] = {
	closeText: "OK",
	prevText: "navigate_before",
	nextText: "navigate_next",
	currentText: "Heute",
	weekHeader: "KW",
	monthNames: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
	monthNamesShort: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
	dayNames: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
	dayNamesShort: ["Son","Mon","Die","Mit","Don","Fre","Sam"],
	dayNamesMin: ["So","Mo","Di","Mi","Do","Fr","Sa" ],
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
timepicker = {
	regional: {}
};
timepicker.regional['sk'] = {
	timeOnlyTitle: 'Zvoľte čas',
	timeText: 'Čas',
	hourText: 'Hodiny',
	minuteText: 'Minúty',
	secondText: 'Sekundy',
	millisecText: 'Milisekundy',
	microsecText: 'Mikrosekundy',
	timezoneText: 'Časové pásmo',
	currentText: 'Teraz',
	closeText: 'OK',
	timeFormat: 'HH:mm',
	timeSuffix: '',
	amNames: ['dop.', 'AM', 'A'],
	pmNames: ['pop.', 'PM', 'P'],
	isRTL: false
};
timepicker.regional['cs'] = timepicker.regional['cz'] = {
	timeOnlyTitle: 'Vyberte čas',
	timeText: 'Čas',
	hourText: 'Hodiny',
	minuteText: 'Minuty',
	secondText: 'Vteřiny',
	millisecText: 'Milisekundy',
	microsecText: 'Mikrosekundy',
	timezoneText: 'Časové pásmo',
	currentText: 'Nyní',
	closeText: 'OK',
	timeFormat: 'HH:mm',
	timeSuffix: '',
	amNames: ['dop.', 'AM', 'A'],
	pmNames: ['odp.', 'PM', 'P'],
	isRTL: false
};
timepicker.regional['en'] = {
	timeOnlyTitle: 'Choose Time',
	timeText: 'Time',
	hourText: 'Hour',
	minuteText: 'Minute',
	secondText: 'Second',
	millisecText: 'Millisecond',
	microsecText: 'Microsecond',
	timezoneText: 'Time Zone',
	currentText: 'Now',
	closeText: 'OK',
	timeFormat: 'HH:mm',
	timeSuffix: '',
	amNames: ['AM', 'A'],
	pmNames: ['PM', 'P'],
	isRTL: false
};
timepicker.regional['de'] = {
	timeOnlyTitle: 'Zeit wählen',
	timeText: 'Zeit',
	hourText: 'Stunde',
	minuteText: 'Minute',
	secondText: 'Sekunde',
	millisecText: 'Millisekunde',
	microsecText: 'Mikrosekunde',
	timezoneText: 'Zeitzone',
	currentText: 'Jetzt',
	closeText: 'OK',
	timeFormat: 'HH:mm',
	timeSuffix: '',
	amNames: ['vorm.', 'AM', 'A'],
	pmNames: ['nachm.', 'PM', 'P'],
	isRTL: false
};
/*jQuery(function($){
	$.datepicker.setDefaults(datepicker.regional[ IS_lang ]);
});*/

var datepicker_regional = {};
datepicker_regional['sk'] = {
	days: ['Nedeľa','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota','Nedeľa'],
	daysShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob','Ned'],
	daysMin: ['Ne','Po','Ut','St','Št','Pia','So','Ne'],
	months: ['Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'],
	monthsShort: ['Jan','Feb','Mar','Apr','Máj','Jún','Júl','Aug','Sep','Okt','Nov','Dec'],
	weekMin: 'Týž',
	btnConfirm: 'OK',
	btnCancel: 'Zrušiť'
}
datepicker_regional['cs'] = datepicker_regional['cz'] = {
	days: ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle'],
	daysShort: ['Ned','Pon','Úte','Stř','Čtv','Pát','Sob','Ned'],
	daysMin: ['Ne','Po','Út','St','Čt','Pá','So','Ne'],
	months: ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'],
	monthsShort: ['Led','Úno','Bře','Dub','Kvě','Čer','Čvc','Srp','Zář','Říj','Lis','Pro'],
	weekMin: 'Týd',
	btnConfirm: 'OK',
	btnCancel: 'Zrušit'
}
datepicker_regional['en'] = {
	days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
	daysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
	daysMin: ['Su','Mo','Tu','We','Th','Fr','Sa','Su'],
	months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
	monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	weekMin: 'Wk',
	btnConfirm: 'OK',
	btnCancel: 'Cancel'
}
datepicker_regional['de'] = {
	days: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'],
	daysShort: ['Son','Mon','Die','Mit','Don','Fre','Sam','Son'],
	daysMin: ['So','Mo','Di','Mi','Do','Fr','Sa','So'],
	months: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
	monthsShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
	weekMin: 'KW',
	btnConfirm: 'OK',
	btnCancel: 'Stornieren'
}
$.fn.datepicker.dates['sk'] = {
	days: ['Nedeľa','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota','Nedeľa'],
	daysShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob','Ned'],
	daysMin: ['Ne','Po','Ut','St','Št','Pia','So','Ne'],
	months: ['Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'],
	monthsShort: ['Jan','Feb','Mar','Apr','Máj','Jún','Júl','Aug','Sep','Okt','Nov','Dec'],
	today: "Dnes",
	clear: "Zrušiť",
	format: "yyyy-mm-dd",
	titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
	weekStart: 1
};
$.fn.datepicker.dates['cz'] = $.fn.datepicker.dates['cs'] = {
	days: ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle'],
	daysShort: ['Ned','Pon','Úte','Stř','Čtv','Pát','Sob','Ned'],
	daysMin: ['Ne','Po','Út','St','Čt','Pá','So','Ne'],
	months: ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'],
	monthsShort: ['Led','Úno','Bře','Dub','Kvě','Čer','Čvc','Srp','Zář','Říj','Lis','Pro'],
	today: "Dnes",
	clear: "Zrušit",
	format: "yyyy-mm-dd",
	titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
	weekStart: 1
};
$.fn.datepicker.dates['en'] = {
	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	today: "Today",
	clear: "Clear",
	format: "yyyy-mm-dd",
	titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
	weekStart: 0
};
$.fn.datepicker.dates['de'] = {
	days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
	daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	today: "Heute",
	clear: "Klar",
	format: "yyyy-mm-dd",
	titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
	weekStart: 1
};

var dropzone_regional = {};
dropzone_regional['sk'] = {
	dictDefaultMessage:	"Presunte súbor sem pre nahratie na server",
	dictFallbackMessage: "Prehliadač nepodporuje drag'n'drop nahrávanie súborov.",
	dictFallbackText: "Prosím, použite klasické nahrávanie súborov na server nižšie.",
	dictInvalidFileType: "Typ súboru nie je podporovaný.",
	dictFileTooBig: "Súbor je príliš veľký. Povolená maximálna veľkosť súboru {{maxFilesize}}.",
	dictResponseError: "Chybná odpoveď serveru ({{statusCode}}).",
	dictCancelUpload: '<i class="material-icons">cancel</i>',
	dictCancelUploadConfirmation: "Naozaj chcete zrušiť nahrávanie?",
	dictRemoveFile: '<i class="material-icons">delete_forever</i>',
	dictMaxFilesExceeded: "Maximálny počet súborov prekročený."
}
dropzone_regional['cs'] = dropzone_regional['cz'] = {
	dictDefaultMessage:	"Přesuňte soubor sem pro nahrání na server",
	dictFallbackMessage: "Prohlížeč nepodporuje drag'n'drop nahrávání souborů.",
	dictFallbackText: "Prosím, použijte klasické nahrávání souborů na servr níže.",
	dictInvalidFileType: "Typ souboru není podporován.",
	dictFileTooBig: "Soubor je příliš velký. Povolená maximální velikost souboru {{maxFilesize}}.",
	dictResponseError: "Chybná odpověď servru ({{statusCode}}).",
	dictCancelUpload: '<i class="material-icons">cancel</i>',
	dictCancelUploadConfirmation: "Opravdu chcete zrušit nahrávání?",
	dictRemoveFile: '<i class="material-icons">delete_forever</i>',
	dictMaxFilesExceeded: "Maximální počet souborů prekročen."
}
dropzone_regional['en'] = {
	dictDefaultMessage:	"Drop files here to upload",
	dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
	dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
	dictInvalidFileType: "File doesn't match the file type.",
	dictFileTooBig: "File is too big. Max file size supported is {{maxFilesize}}.",
	dictResponseError: "Server response was invalid ({{statusCode}}).",
	dictCancelUpload: '<i class="material-icons">cancel</i>',
	dictCancelUploadConfirmation: "Realy cancel uploading?",
	dictRemoveFile: '<i class="material-icons">delete_forever</i>',
	dictMaxFilesExceeded: "Maximum number of files exceeded."
}
dropzone_regional['de'] = {
	dictDefaultMessage:	"Zum Hochladen Dateien hier ablegen",
	dictFallbackMessage: "Ihr Browser unterstützt das Hochladen von Dateien per Drag & Drop nicht.",
	dictFallbackText: "Bitte verwenden Sie das untenstehende Fallback-Formular, um Ihre Dateien wie früher hochzuladen.",
	dictInvalidFileType: "Die Datei entspricht nicht dem Dateityp.",
	dictFileTooBig: "Die Datei ist zu groß. Die maximal unterstützte Dateigröße beträgt {{maxFilesize}}.",
	dictResponseError: "Die Serverantwort war ungültig ({{statusCode}}).",
	dictCancelUpload: '<i class="material-icons">cancel</i>',
	dictCancelUploadConfirmation: "Hochladen wirklich abbrechen?",
	dictRemoveFile: '<i class="material-icons">delete_forever</i>',
	dictMaxFilesExceeded: "Maximale Anzahl an Dateien überschritten."
}
moment.locale( IS_lang == 'cz' ? 'cs' : IS_lang );

/*-------------------------------------------------------------------------------------------------
  This plugin is based on the GAPJUMPER line example http://www.gapjumper.com/research/lines.html.
  Special thanks to its author!
  Author: Tiago do Bem 
  Date: March 2013
  URL: https://github.com/tbem/jquery.line
  The jQuery.line.js plugin is distributed under the GNU General Public License version 3 (GPLv3).
  -------------------------------------------------------------------------------------------------
*/ 
;(function($) {
	var helpers = {
		createLine: function(x1, y1, x2, y2, options){
			// Check if browser is Internet Exploder ;)
			var isIE = navigator.userAgent.indexOf("MSIE") > -1;
			if (x2 < x1){
				var temp = x1;
				x1 = x2;
				x2 = temp;
				temp = y1;
				y1 = y2;
				y2 = temp;
			}
			var line = document.createElement("div");

			// Formula for the distance between two points
			// http://www.mathopenref.com/coorddist.html
			var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

			line.style.width = length + "px";
			line.style.borderBottom = options.stroke + "px " + options.style;
			line.style.borderColor = options.color;
			line.style.position = "absolute";
			line.style.zIndex = options.zindex;

			if(isIE){
				line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
				line.style.left = x1 + "px";
				var nCos = (x2-x1)/length;
				var nSin = (y2-y1)/length;
				line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
			}else{
				var angle = Math.atan((y2-y1)/(x2-x1));
				line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
				line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
				line.style.transform = line.style.MozTransform = line.style.WebkitTransform = line.style.msTransform = line.style.OTransform= "rotate(" + angle + "rad)";
			}
			return line;
		}
	}
	$.fn.line = function( x1, y1, x2, y2, options, callbacks) {
		return $(this).each(function(){
			if($.isFunction(options)){
				callback = options;
				options = null;
			}else{
				callback = callbacks;
			}
			options = $.extend({}, $.fn.line.defaults, options);
			$(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
				if($.isFunction(callback)){
					callback.call();
				}
			});
		});
	}
	$.fn.line.defaults = {
		zindex : 10000,
		color : '#000000',
		stroke: "1",
		style: "solid"
	}
})(jQuery);

function copy2clpbrd( text ) {
	var content = '';
	if ( text.substr(0,1) == '#' ) {
		$("#copy2clpbrd").val( $(text).val() );
		$("#copy2clpbrd").attr( 'value' , $(text).val() );
		content = $(text).html;
	} else {
		$("#copy2clpbrd").val( text );
		$("#copy2clpbrd").attr( 'value' , text );
		content = text;
	}
	const copy2listener = function( e ) {
		e.preventDefault();
		e.clipboardData.setData( "text/html", content );
		e.clipboardData.setData( "text/plain", content );
	}

	if ( !navigator.clipboard ) {
		$("#copy2clpbrd").show();
		var copyText = document.getElementById( "copy2clpbrd" );
		copyText.select();							/* Select the text field */
		copyText.setSelectionRange(0, 999999);		/* For mobile devices */
		document.execCommand("copy");				/* Copy the text inside the text field */
		$("#copy2clpbrd").hide();
		return;
	}

	navigator.clipboard.writeText( $("#copy2clpbrd").val() ).then(
		function() {
			console.log('Async: Copying to clipboard was successful!');
		}, function( err ) {
			console.error('Async: Could not copy text: ', err);
		}
	);
//	return copyText.value;
}

function copy2clpbrd2( text ) {
	var content = '';
	if ( text.substr(0,1) == '#' ) {
		$("#copy2clpbrd").val( $(text).val() );
		$("#copy2clpbrd").attr( 'value' , $(text).val() );
		content = $(text).html();
	} else {
		$("#copy2clpbrd").val( text );
		$("#copy2clpbrd").attr( 'value' , text );
		content = text;
	}
	const copy2listener = function( e ) {
		e.preventDefault();
		e.clipboardData.setData( "text/html", content );
		e.clipboardData.setData( "text/plain", content );
	}

	document.addEventListener("copy", copy2listener);
	document.execCommand("copy");				/* Copy the text inside the text field */
	document.removeEventListener("copy", copy2listener);
}

/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t,i){i?(d[0]=d[16]=d[1]=d[2]=d[3]=d[4]=d[5]=d[6]=d[7]=d[8]=d[9]=d[10]=d[11]=d[12]=d[13]=d[14]=d[15]=0,this.blocks=d):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function i(i,r,s){var e,n=typeof i;if("string"===n){var o,a=[],u=i.length,c=0;for(e=0;e<u;++e)(o=i.charCodeAt(e))<128?a[c++]=o:o<2048?(a[c++]=192|o>>6,a[c++]=128|63&o):o<55296||o>=57344?(a[c++]=224|o>>12,a[c++]=128|o>>6&63,a[c++]=128|63&o):(o=65536+((1023&o)<<10|1023&i.charCodeAt(++e)),a[c++]=240|o>>18,a[c++]=128|o>>12&63,a[c++]=128|o>>6&63,a[c++]=128|63&o);i=a}else{if("object"!==n)throw new Error(h);if(null===i)throw new Error(h);if(f&&i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(!(Array.isArray(i)||f&&ArrayBuffer.isView(i)))throw new Error(h)}i.length>64&&(i=new t(r,!0).update(i).array());var y=[],p=[];for(e=0;e<64;++e){var l=i[e]||0;y[e]=92^l,p[e]=54^l}t.call(this,r,s),this.update(p),this.oKeyPad=y,this.inner=!0,this.sharedMemory=s}var h="input is invalid type",r="object"==typeof window,s=r?window:{};s.JS_SHA256_NO_WINDOW&&(r=!1);var e=!r&&"object"==typeof self,n=!s.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;n?s=global:e&&(s=self);var o=!s.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,f=!s.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,u="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],y=[24,16,8,0],p=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=["hex","array","digest","arrayBuffer"],d=[];!s.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!f||!s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var A=function(i,h){return function(r){return new t(h,!0).update(r)[i]()}},w=function(i){var h=A("hex",i);n&&(h=b(h,i)),h.create=function(){return new t(i)},h.update=function(t){return h.create().update(t)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=A(s,i)}return h},b=function(t,i){var r=eval("require('crypto')"),s=eval("require('buffer').Buffer"),e=i?"sha224":"sha256",n=function(i){if("string"==typeof i)return r.createHash(e).update(i,"utf8").digest("hex");if(null===i||void 0===i)throw new Error(h);return i.constructor===ArrayBuffer&&(i=new Uint8Array(i)),Array.isArray(i)||ArrayBuffer.isView(i)||i.constructor===s?r.createHash(e).update(new s(i)).digest("hex"):t(i)};return n},v=function(t,h){return function(r,s){return new i(r,h,!0).update(s)[t]()}},_=function(t){var h=v("hex",t);h.create=function(h){return new i(h,t)},h.update=function(t,i){return h.create(t).update(i)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=v(s,t)}return h};t.prototype.update=function(t){if(!this.finalized){var i,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(h);if(null===t)throw new Error(h);if(f&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||f&&ArrayBuffer.isView(t)))throw new Error(h);i=!0}for(var s,e,n=0,o=t.length,a=this.blocks;n<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),i)for(e=this.start;n<o&&e<64;++n)a[e>>2]|=t[n]<<y[3&e++];else for(e=this.start;n<o&&e<64;++n)(s=t.charCodeAt(n))<128?a[e>>2]|=s<<y[3&e++]:s<2048?(a[e>>2]|=(192|s>>6)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]):s<55296||s>=57344?(a[e>>2]|=(224|s>>12)<<y[3&e++],a[e>>2]|=(128|s>>6&63)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++n)),a[e>>2]|=(240|s>>18)<<y[3&e++],a[e>>2]|=(128|s>>12&63)<<y[3&e++],a[e>>2]|=(128|s>>6&63)<<y[3&e++],a[e>>2]|=(128|63&s)<<y[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>2]|=c[3&i],this.block=t[16],i>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,i,h,r,s,e,n,o,a,f=this.h0,u=this.h1,c=this.h2,y=this.h3,l=this.h4,d=this.h5,A=this.h6,w=this.h7,b=this.blocks;for(t=16;t<64;++t)i=((s=b[t-15])>>>7|s<<25)^(s>>>18|s<<14)^s>>>3,h=((s=b[t-2])>>>17|s<<15)^(s>>>19|s<<13)^s>>>10,b[t]=b[t-16]+i+b[t-7]+h<<0;for(a=u&c,t=0;t<64;t+=4)this.first?(this.is224?(e=300032,w=(s=b[0]-1413257819)-150054599<<0,y=s+24177077<<0):(e=704751109,w=(s=b[0]-210244248)-1521486534<<0,y=s+143694565<<0),this.first=!1):(i=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(e=f&u)^f&c^a,w=y+(s=w+(h=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&d^~l&A)+p[t]+b[t])<<0,y=s+(i+r)<<0),i=(y>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),r=(n=y&f)^y&u^e,A=c+(s=A+(h=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7))+(w&l^~w&d)+p[t+1]+b[t+1])<<0,i=((c=s+(i+r)<<0)>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),r=(o=c&y)^c&f^n,d=u+(s=d+(h=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))+(A&w^~A&l)+p[t+2]+b[t+2])<<0,i=((u=s+(i+r)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(a=u&c)^u&y^o,l=f+(s=l+(h=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&A^~d&w)+p[t+3]+b[t+3])<<0,f=s+(i+r)<<0;this.h0=this.h0+f<<0,this.h1=this.h1+u<<0,this.h2=this.h2+c<<0,this.h3=this.h3+y<<0,this.h4=this.h4+l<<0,this.h5=this.h5+d<<0,this.h6=this.h6+A<<0,this.h7=this.h7+w<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=u[t>>28&15]+u[t>>24&15]+u[t>>20&15]+u[t>>16&15]+u[t>>12&15]+u[t>>8&15]+u[t>>4&15]+u[15&t]+u[i>>28&15]+u[i>>24&15]+u[i>>20&15]+u[i>>16&15]+u[i>>12&15]+u[i>>8&15]+u[i>>4&15]+u[15&i]+u[h>>28&15]+u[h>>24&15]+u[h>>20&15]+u[h>>16&15]+u[h>>12&15]+u[h>>8&15]+u[h>>4&15]+u[15&h]+u[r>>28&15]+u[r>>24&15]+u[r>>20&15]+u[r>>16&15]+u[r>>12&15]+u[r>>8&15]+u[r>>4&15]+u[15&r]+u[s>>28&15]+u[s>>24&15]+u[s>>20&15]+u[s>>16&15]+u[s>>12&15]+u[s>>8&15]+u[s>>4&15]+u[15&s]+u[e>>28&15]+u[e>>24&15]+u[e>>20&15]+u[e>>16&15]+u[e>>12&15]+u[e>>8&15]+u[e>>4&15]+u[15&e]+u[n>>28&15]+u[n>>24&15]+u[n>>20&15]+u[n>>16&15]+u[n>>12&15]+u[n>>8&15]+u[n>>4&15]+u[15&n];return this.is224||(a+=u[o>>28&15]+u[o>>24&15]+u[o>>20&15]+u[o>>16&15]+u[o>>12&15]+u[o>>8&15]+u[o>>4&15]+u[15&o]),a},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=[t>>24&255,t>>16&255,t>>8&255,255&t,i>>24&255,i>>16&255,i>>8&255,255&i,h>>24&255,h>>16&255,h>>8&255,255&h,r>>24&255,r>>16&255,r>>8&255,255&r,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,n>>24&255,n>>16&255,n>>8&255,255&n];return this.is224||a.push(o>>24&255,o>>16&255,o>>8&255,255&o),a},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},i.prototype=new t,i.prototype.finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var i=this.array();t.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(i),t.prototype.finalize.call(this)}};var B=w();B.sha256=B,B.sha224=w(!0),B.sha256.hmac=_(),B.sha224.hmac=_(!0),o?module.exports=B:(s.sha256=B.sha256,s.sha224=B.sha224,a&&define(function(){return B}))}();
