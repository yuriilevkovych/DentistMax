var tooth_num = 0;
var tooth_type = 'tooth';
var tooth_root = 'normal';
var tooth_fill = 'normal';
var tooth_fill_id = '';
var tooth_pos = '';
var tooth_kpe = {};

$(window).resize(function(){
	if ($("#tab-dcross .toothbox .tooth").length > 0) {
		DentalCross();
	}
});


$(document).ready(function(){
	// close bookmark box
	$(document).delegate('#tooth-bookmarks A#tooth-bookmarks-close', 'click', function(){
		$("#tooth-bookmarks").addClass('hidden');
	});
	// click on bookmark shortcut
	$(document).delegate('#tooth-bookmarks A.tooth-set', 'click', function(){
		var vals = [];
		var val = $("#frm-crossDForm-dtoothset").val().split(',');
		var set = $(this).attr('data-set');
		var $sel = $("#frm-crossDForm-dtoothset").selectize( selectize_settings );
		var $selz = $sel[0].selectize;
		if ( $(this).hasClass('active') ) {
			for ( var i in val ) if ( val[ i ] != set ) vals.push( val[ i ] );
			var t = ( vals[ 0 ] > 50 ? vals[ 0 ] - 40 : vals[ 0 ] );
			tval[ t ] = tval[ t ].replace( ',' + set , '' );
			$(this).removeClass('active');
		} else {
			if ( set != '' ) set = set.split(',');
			for ( var i in val ) if ( val[ i ] < 100 ) vals.push( val[ i ] );
			for( var i in set ) {
				$selz.addOption( tooth[ set[ i ] ] );
				vals.push( set[ i ] );
			}
		}
		$selz.setValue( vals );
		$selz.refreshItems();

		$("#frm-crossDForm-dtoothset").parent().find(".selectize-dropdown").hide();

		var tcat = $(this).closest('DL[data-type]').attr('data-type');
		if ( tcat == '0' ) {
			$("#tooth-bookmarks").addClass('hidden');

			var t = vals[ 0 ];
			var tpart = t.toString().split('');
			var q = parseInt( tpart[ 0 ] );
			var n = parseInt( tpart[ 1 ] );
			if ( q == 1 || q == 3 || q == 5 || q == 7 ) {
				n = n - 1;
				if ( n < 1 ) {
					q = q + 1;
					n = 1;
				}
			} else {
				n = n + 1;
				if ( n > 8 ) {
					q = ( q == 2 || q == 6 ? q + 1 : q - 3 );
					n = 8;
				}
			}
			t = parseInt( q.toString() + n.toString() );
//			getTooth( ( t > 50 ? t - 40 : t ) , tval[ t > 50 ? t - 40 : t ] );
			getTooth( t , tval[ t > 50 ? t - 40 : t ] );
		}
	});
	// set tooth from input
	$("#tab-dcross").on('keydown', '#frm-crossDForm-dtoothset-selectized', function(e) { 
		var keyCode = e.keyCode || e.which; 
		//          PgDOWN             PgUP            RIGHT             LEFT
		if ( keyCode != 34 && keyCode != 33 && keyCode != 39 && keyCode != 37 ) return;
		e.preventDefault();

		var val = $("#frm-crossDForm-dtoothset").val();
		var t = ( keyCode == 39 || keyCode == 38 ? 18 : 48 );
		if ( val == '' ) {
			getTooth( t , tval[ t ] );
			return;
		} else {
			val = val.split( ',' );
			t = val[ 0 ];
		}
		var tpart = t.toString().split('');
		console.log('T',val,tpart);
		var q = parseInt( tpart[ 0 ] );
		var n = parseInt( tpart[ 1 ] );
		
		if ( keyCode == 39 ) { // RIGHT
			if ( ( q == 1 || q == 5 ) || ( q == 4 || q == 8 ) ) {
				n = n - 1;
				if ( n < 1 ) {
					n = 1;
					q = ( q == 4 || q == 8 ? q - 1 : q + 1 );
				}
			} else {
				n = n + 1;
				if ( n > 8 ) {
					n = 8;
					q = ( q == 3 || q == 7 ? q + 1 : q - 1 );
				}
			}

		} else if ( keyCode == 37 ) { // LEFT
			if ( ( q == 2 || q == 6 ) || ( q == 3 || q == 7 ) ) {
				n = n - 1;
				if ( n < 1 ) {
					n = 1;
					q = ( q == 3 || q == 7 ? q + 1 : q - 1 );
				}
			} else {
				n = n + 1;
				if ( n > 8 ) {
					n = 8;
					q = ( q == 4 || q == 8 ? q - 1 : q + 1 );
				}
			}

		} else if ( keyCode == 33 || keyCode == 34 ) { // UP / DOWN
			if ( q == 1 || q == 5 ) q = q + 3;
			else if ( q == 2 || q == 6 ) q = q + 1;
			else if ( q == 3 || q == 7 ) q = q - 1;
			else if ( q == 4 || q == 8 ) q = q - 3;
		} 
		t = parseInt( q.toString() + n.toString() );
		getTooth( t , tval[ t > 50 ? t - 40 : t ] );
		var $sel = $('#frm-crossDForm #frm-crossDForm-dtoothset').selectize(selectize_settings);
		var $selz = $sel[0].selectize;
		$selz.close();

		return false;
	});
	// switch adult/child tooths
	$("#tooth-switch").click( function() {
		$("#dialogPopupWindow").attr('data-width', 310);
		$("#dialogPopupWindow").attr('data-height', 310);
		$("#dialogPopupWindow .mdl-dialog__title").html( locale['dtooth_switch_title'] );

		var $box = $( '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"></div>' );
		var $lbl = $( '<label for="tooth-type-sel" class="mdl-textfield__label">' + locale['dtooth_switch_label'] + '</label>' );
		var $sel = $( '<select id="tooth-type-sel" class="mdl-textfield__input"></select>' );
		$sel.append( '<option value=""></option>' );
		$sel.append( '<option value="adult">' + locale['dtooth_switch_adult'] + '</option>' );
		$sel.append( '<option value="child">' + locale['dtooth_switch_child'] + '</option>' );
		$box.append( $sel );
		$box.append( $lbl );
		$("#dialogPopupWindow .mdl-dialog__content").empty().append( '<p style="line-height:normal;">' + locale['dtooth_switch_desc'] + '</p><br>' );
		$("#dialogPopupWindow .mdl-dialog__content").append( $box );
		if ( $("#dialogPopupWindow .mdl-dialog__actions").find("#tooth-type-change").length == 0 ) $("#dialogPopupWindow .mdl-dialog__actions").append( '<button type="button" id="tooth-type-change" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">' + locale['dtooth_switch_button'] + '</button>' );

		var $dialog = initDialog( 'OPEN', 'DIALOG.dialogPopupWindow', 310 , 310);
		componentHandler.upgradeAllRegistered();
		$("#tooth-type-change").click( function() {
			var val = $("#tooth-type-sel").val();
			for ( var q = 1; q <= 4; q++ ) {
				for ( var p = 1; p <= 8; p++ ) {
					var tv = tset[ ( q * 10 ) + p ];
					var set = ( ( ( val == 'child' ? q + 4 : q ) * 10 ) + p ).toString();
//					console.log( val, tv, set, q, p);
					if ( val == 'child' ) {
						if ( p >= 6 ) set = set + ',' + val + ',291';
						else set = set + ',' + tv.replace( 'adult' , 'child' );
					} else if ( val == 'adult' ) {
						if ( p >= 6 ) set = set + ',' + val + ',200';
						else set = set + ',' + tv.replace( 'child' , 'adult' );
					}
//					console.log( val, tv, set, q, p);
/*
					if ( val == 'child' && tv.tp == 'adult' && p >= 6 ) set = set + ',291';
					else if ( val == 'adult' && tv.tp == 'child' && p >= 6 ) set = set + ',200';
					else {
						if ( tv.type != 200 && tv.type != '' ) set = set + ',' + tv.type;
						if ( tv.root != '' ) set = set + ',' + tv.root;
						if ( tv.crown != '' ) set = set + ',' + tv.crown;
						if ( tv.rec != '' ) set = set + ',' + tv.rec;
						if ( tv.state.o != '' ) set = set + ',' + tv.state.o + ',' + tooth[ 'o' ].id;
						if ( tv.state.d != '' ) set = set + ',' + tv.state.d + ',' + tooth[ 'd' ].id;
						if ( tv.state.m != '' ) set = set + ',' + tv.state.m + ',' + tooth[ 'm' ].id;
						if ( tv.state.v != '' ) set = set + ',' + tv.state.v + ',' + tooth[ 'v' ].id;
						if ( tv.state.l != '' ) set = set + ',' + tv.state.l + ',' + tooth[ 'l' ].id;
					}
*/
					setTooth( set );
				}
			}
			$dialog.close();
		});
	});

	if ($("#tab-dcross .toothbox .tooth").length > 0) {
		// click on tooth
//		$(document.body).on('click', "#tab-dcross .toothbox .t-shape", function(){
		$(document.body).on('click', "#tab-dcross .toothbox SVG", function(){
			var num = $(this).parent().parent().data('num');
			if ( parseInt( num ) > 50 ) var nm = parseInt( num ) - 40;
			else var nm = num;
			var ts = tset[nm];
			var tv = tval[nm];
			// TEST ts - tv;
/*			if (ts.type != tv.type || ts.root != tv.root || ts.crown != tv.crown || ts.state.o != tv.state.o || ts.state.v != tv.state.v || ts.state.l != tv.state.l || ts.state.d != tv.state.d || ts.state.m != tv.state.m) {
				var question = "Vybraný zub ##NUM## ste upravili a snažíte sa načítať jeho pôvodný stav.\nChcete obnoviť stav zubu?\n(Potvrdením sa načíta pôvodný stav, zrušením sa ponechá aktuálny stav)";
				var conf = confirm( question.replace('##NUM##', num) );
				if (!conf) return;
			}*/
//			if ( typeof( ts ) != 'undefined' && ts != '' && ts != tv ) {
//				var question = "Vybraný zub ##NUM## ste upravili a snažíte sa načítať jeho pôvodný stav.\nChcete obnoviť stav zubu?\n(Potvrdením sa načíta pôvodný stav, zrušením sa ponechá aktuálny stav)";
//				var conf = confirm( question.replace('##NUM##', num) );
//				if (!conf) return;
//			}
//console.log( num , nm , ts , tv );
			getTooth(num, tv);
		});
		// OLD > DEL
		$("#tab-dcross .toothbox .param.sel BUTTON").click(function(){
			var tp = $(this).attr("data-param");
			$("#tab-dcross .toothbox .param.sel BUTTON").removeClass("mdl-button--accent").removeClass("mdl-button--colored").addClass("mdl-button--colored");
			$("#tab-dcross .toothbox .param.sel BUTTON.param-"+tp).removeClass("mdl-button--colored").removeClass("mdl-button--accent").addClass("mdl-button--accent");
			$("#tab-dcross .toothbox DD BUTTON").removeClass("mdl-button--accent").removeClass("mdl-button--colored").addClass("mdl-button--colored");
			if (tp == 'cpitn') $("#tab-dcross .toothbox DD .param.cpitn").show(); else $("#tab-dcross .toothbox DD .param.cpitn").hide();
			if (tp == 'kod') $("#tab-dcross .toothbox DD .param.kod").show(); else $("#tab-dcross .toothbox DD .param.kod").hide();
			if (tp == 'pbi') $("#tab-dcross .toothbox DD .param.pbi").show(); else $("#tab-dcross .toothbox DD .param.pbi").hide();
		});
		// OLD > DEL
		$("#tab-dcross .toothbox INPUT[name^='pc_pv']").blur(function(){
			DentalCross();
		});
	}
	// Load history data
	if ($("#tab-dcross .date-line.history").length > 0) {
/*		$("#tab-dcross").on('click', "A.cross-history", function(){
			var lnk = $(this);
			var id = $(this).attr('data-id');
			$.nette.ajax({
				url: $(this).attr("href"),
				dataType: 'json',
				method: 'POST',
				data: {
					'did': id
				},
				success: function(data) {
					$(lnk).parent().parent().find('LI').removeClass('active');
					$(lnk).parent().addClass('active');
					var posx = ['l', 'm', 'r'];
					var posy = ['f', 'b'];
					for (var i in data.cpitn) { $('#frm-crossPForm-pc_cpitn'+i).val( data.cpitn[i] ); }
					for (var i in data.kod) { $('#frm-crossPForm-pc_kod'+i).val( data.kod[i] ); }
					for (var i in data.pbi) { $('#frm-crossPForm-pc_pbi'+i).val( data.pbi[i] ); }
					for (var i in data.pv) {
						for (var y = 0; y < posy.length; y++) {
							for (var x = 0; x < posx.length; x++) {
								$('#frm-crossPForm-pc_pv'+posy[y]+posx[x]+i).val( data.pv[i][ posy[y]+posx[x] ] );
							}
						}
					}
					DentalCross();
				}
			}, this, null);
			return false;
		});*/
		$("#tab-dcross").on('click', "A.dcross-history", function(){
			var lnk = $(this);
			var id = $(this).attr('data-id');
			$.nette.ajax({
				url: $(this).attr("href"),
				dataType: 'json',
				method: 'POST',
				data: {
					'did': id
				},
				success: function(data) {
					$(lnk).parent().parent().find('LI').removeClass('active');
					$(lnk).parent().addClass('active');
					for ( var t in data ) {
						if ( data[ t ] != '' ) tset[ t ] = data[ t ];
					}
					loadDTooth();
				}
			}, this, null);
			return false;
		});
	}
	// Save actual data
	$("#frm-crossDForm-submit").click(function(){
		$("#frm-crossDForm").submit();
	})
});

function DentalCross() {
	$("#tab-dcross .toothbox").each(function(){
		var q = $(this).attr("data-quadrant");
		var w = $(this).find(".pv-box").width();
		var h = $(this).find(".pv-box").height();
		$(this).find(".pv-box").empty();
		var cpad = 11.759; // cpad % from middle
		var ppad = 2.125;  // ppad % to next line
		var lpad = ( w / 24 / 2 );
		var fpoint = [];
		var bpoint = [];
		var fpi = 0;
		var bpi = 0;
		fpoint[0] = { x: ( w / 23 + lpad), y: ( h * ( (50 - cpad) / 100 ) ) - 1 };
		bpoint[0] = { x: ( w / 23 + lpad), y: ( h * ( (50 + cpad) / 100 ) ) - 1 };

		for (var t = 1; t <= 8; t++) {
			ti = (q == 1 || q == 4 ? 9 - t : t);
			for (var i = -1; i <= 1; i++) {
				var s = (i == -1 ? 'l' : (i == 1 ? 'r' : 'm'));
				var pv = $("#frm-crossPForm-pc_pvf"+s+q+ti).val();
				if ( ( pv != '' && parseInt(pv) > 0 ) || pv == 0 ) {
					pv = parseInt(pv);
					var col = "";
					if (pv > 4 && pv <= 8) col = '-y';
					if (pv > 8 && pv <= 12) col = '-o';
					if (pv > 12) col = '-r';
					if (pv > 18 || pv < 0) {
						alert('Povolená hodnota je celé číslo medzi 0 - 18.');
						$("#frm-crossPForm-pc_pvf"+s+q+ti).val('');
						return false;
					}
					if ( !( t == 1 && i == -1) ) fpi = fpi + 1;
//					console.log("#frm-crossPForm-pc_pvf"+s+q+ti+" = "+pv+" / "+fpi+" | "+t+'/'+i);
					fpoint[ fpi ] = { x: ( ( w * ( t * 3 + i - 2)  / 24 ) + lpad ), y: ( h * ( 50 + (q == 1 || q == 2 ? - cpad - (ppad * pv) : + cpad + (ppad * pv)) ) / 100 ) - 1 };
//					var pth = $(this).find("#tg"+q+ti+"_f"+s).attr("data-path");
//					$(this).find("#tg"+q+ti+"_f"+s).attr("src", pth+"ptooth-grid-"+(q == 1 || q == 2 ? '1' : '2')+s+col+".png");
				}
				var pv = $("#frm-crossPForm-pc_pvb"+s+q+ti).val();
				if ( ( pv != '' && parseInt(pv) > 0 ) || pv == 0 ) {
					pv = parseInt(pv);
					var col = "";
					if (pv > 4 && pv <= 8) col = '-y';
					if (pv > 8 && pv <= 12) col = '-o';
					if (pv > 12) col = '-r';
					if (pv > 18 || pv < 0) {
						alert('Povolená hodnota je celé číslo medzi 0 - 18.');
						$("#frm-crossPForm-pc_pvf"+s+q+ti).val('');
						return false;
					}
					if ( !( t == 1 && i == -1) ) bpi = bpi + 1;
//					console.log("#frm-crossPForm-pc_pvf"+s+q+ti+" = "+pv+" / "+bpi+" | "+t+'/'+i);
					bpoint[ bpi ] = { x: ( ( w * ( t * 3 + i - 2)  / 24 ) + lpad ), y: ( h * ( 50 + (q == 1 || q == 2 ? + cpad + (ppad * pv) : - cpad - (ppad * pv)) ) / 100 ) - 1 };
//					var pth = $(this).find("#tg"+q+ti+"_b"+s).attr("data-path");
//					$(this).find("#tg"+q+ti+"_b"+s).attr("src", pth+"ptooth-grid-"+(q == 1 || q == 2 ? '2' : '1')+s+col+".png");
				}
			}

		}
//		console.log('POINTS: '+fpi);
		for(var i = 1; i <= fpi; i++) {
//			console.log(point[ i - 1 ]);
//			console.log(point[ i ]);
			$(this).find(".pv-box").line(fpoint[ i - 1 ].x, fpoint[ i - 1 ].y, fpoint[ i ].x, fpoint[ i ].y, {
				color: '#c00',
				stroke: 2,
				style: 'solid',
				zindex: 10
			});
		}
//		console.log('POINTS: '+bpi);
		for(var i = 1; i <= bpi; i++) {
//			console.log(point[ i - 1 ]);
//			console.log(point[ i ]);
			$(this).find(".pv-box").line(bpoint[ i - 1 ].x, bpoint[ i - 1 ].y, bpoint[ i ].x, bpoint[ i ].y, {
				color: '#c00',
				stroke: 2,
				style: 'solid',
				zindex: 10
			});
		}
	});
}

function loadDTooth() {
//	console.log('LOAD DTOOTH',tset);
	for ( var t in tset ) {
		setTooth( t + ',' + tset[ t ] );
	}
}
function actTooth() {
	var val = $("#frm-crossDForm #frm-crossDForm-dtoothset").val();
	var set = val.split(',');
	$("#tooth-bookmarks A").removeClass('active');
	$("#tooth-bookmarks DL[data-parent]").removeClass('hidden').addClass('hidden');
	for ( var s in set ) {
		$("#tooth-bookmarks A.tooth-set[data-set='" + set[ s ] + "']").addClass('active');
		var allowed = $("#tooth-bookmarks A.tooth-set[data-set='" + set[ s ] + "']").attr('data-allowed');
		if ( allowed != '' ) {
			$("#tooth-bookmarks DL[data-type='" + allowed + "']").removeClass('hidden');
		}
	}
}
function getTooth( num , set ) {
	var vals = [];
	num = parseInt( num );
	var nm = ( num < 50 ? num : num - 40 );
	var s = set.split(',');
	var $sel = $('#frm-crossDForm #frm-crossDForm-dtoothset').selectize(selectize_settings);
	var $selz = $sel[0].selectize;
//	console.log('GET TOOTH',num,s);
	var changeDD = false;
	for ( var i in s ) {
		var opt = false;
		var p = s[ i ];
		// zmena zubu DOSPELY <-> DETSKY
		if ( p == 'child' && parseInt( num ) < 50 ) {
			changeDD = 'adult';
			p = 'adult';
		} else if ( p == 'adult' && parseInt( num ) > 50 ) {
			changeDD = 'child';
			p = 'child';
		}
		// nastavenie zubu
		if ( p == 'adult' ) {
			vals.push( num );
			opt = jQuery.extend({}, tooth[ num ] );
		} else if ( p == 'child' ) {
			vals.push( num );
			opt = jQuery.extend({}, tooth[ num ] );
		} else if ( p != 200 ) {
			if ( changeDD == 'adult' && p == 291 ) {
				p = 200;
				changeDD = false;
			} else if ( changeDD == 'child' && parseInt( num.toString().substr(1,1) ) >= 6 ) {
				p = 291;
				changeDD = false;
				vals.push( p );
				opt = jQuery.extend({}, tooth[ p ] );
			} else {
				vals.push( p );
				opt = jQuery.extend({}, tooth[ p ] );
			}
		}
//		console.log( opt );
		if ( opt !== false ) $selz.addOption( opt );
	}
	$selz.setValue( vals, true );
	$selz.refreshItems();
	$('#frm-crossDForm #frm-crossDForm-dtoothset-selectized').focus();

	if ( $("#tooth-bookmarks").length > 0 ) {
		$("#tooth-bookmarks").removeClass('hidden');
		var posTH = $("#tab-dcross .tooth-boxes .tooth.t"+nm).offset();
		var wTH = $("#tab-dcross .tooth-boxes .tooth.t"+nm).width();
		var hTH = $("#tab-dcross .tooth-boxes .tooth.t"+nm).height();
		var posBX = $("#tooth-bookmarks").parent().offset();
		var boxW = $("#tooth-bookmarks").outerWidth();
		var q = parseInt( $("#tab-dcross .tooth-boxes .tooth.t"+nm).parent().parent().attr('data-quadrant') );
		var n = ( nm - ( q * 10 ) );
		if ( q == 1 || q == 5 || q == 2 || q == 6 || q == 0 ) var posT = (posTH.top - posBX.top);
		else if ( q == 3 || q == 7 || q == 4 || q == 8 ) var posT = (posTH.top - posBX.top + 37);
		if ( q == 1 || q == 5 || q == 4 || q == 8 || q == 0 ) var posL = (posTH.left - posBX.left + wTH);
		else if ( q == 2 || q == 6 || q == 3 || q == 7 ) var posL = (posTH.left - posBX.left - boxW);

		var pos = { top:posT+'px' , left:posL+'px' };
		$("#tooth-bookmarks").css( pos ).removeClass('hidden');
		$("#tooth-bookmarks .bookmark-items").css( { 'height':(hTH - 40)+'px' } );
		// show/hide by allow
		$("#tooth-bookmarks .pos LI[data-allow!='*']").hide();
		$("#tooth-bookmarks .pos LI[data-allow*='Q"+q+"']").not( "[data-allow*='N"+n+"']" ).show();
		$("#tooth-bookmarks .pos LI[data-allow*='N"+n+"']" ).not( "[data-allow*='Q"+q+"']" ).show();
		$("#tooth-bookmarks .pos LI[data-allow*='Q"+q+"'][data-allow*='N"+n+"']" ).show();
		actTooth();
	}
}
function setTooth( set ) {
	if (typeof( set ) == 'undefined' || set == '') return;

	var tooth_set = [];
	var tooth_num = null;
	var tooth_tp = null;
	var tooth_type = [];
	var tooth_root = [];
	var tooth_crown = [];
	var tooth_fill = [];
	var last_fill = [];
	var tooth_fills = { o: null, v: null, l:null, d:null, m:null };
	var tooth_signs = [];
	var tooth_signr = null;
	var tooth_signc = null;
	var tooth_rec = null;
	var tooth_cpitn = null;
	var last_sign = '';

	var s = set.split( ',' );
//	console.log( 'TOOTH SET', set , s , tval[ s[ 0 ] ]);

	for ( var i in s ) {
		var id = s[ i ];
		if ( parseInt( id ) > 10 && parseInt( id ) < 100 ) {
			tooth_num = parseInt( id );
			tooth_tp = ( id > 50 ? 'child' : 'adult' );
			tooth_set.push( id > 50 ? 'child' : 'adult' );
		} else if ( id == 'adult' || id == 'child' ) {
			if ( id == 'child' && tooth_num < 50 ) tooth_num = tooth_num + 40;
			tooth_tp = id;
			tooth_set[ 0 ] = id;
		} else {
			id = parseInt( id );
			tooth_set.push( id );
			var t = tooth[ id ];
			if ( typeof( t ) == 'undefined' ) continue;
//			console.log('TOOTH' , tooth_num , tooth_tp , 'SET' , id , last_sign , t );

			switch( t.cat ) {
				case 2:
					var pos = t.code.split('');
					if ( tooth_fill.length == 0 && last_fill.length > 0 ) tooth_fill = last_fill;
					for ( var p in pos ) {
						tooth_fills[ pos[ p ] ] = tooth_fill;
					}
					last_fill = tooth_fill;
					tooth_fill = [];
					if ( last_sign != '' ) tooth_signs.push( last_sign );
				break;
				case 3:
				case 8:
					if ( !tooth_type.includes( t.id ) ) {
						tooth_type.push( t.id );
						if ( t.cat != 3 ) tooth_signs.push( t.sign );
					}
					if ( t.state != 1 ) tooth_fill.push( t.id );
				break;
				case 4:
					if ( !tooth_root.includes( t.id ) ) {
						tooth_root.push( t.id );
						if ( t.sign != '' ) tooth_signs.push( t.sign );
					}
				break;
				case 5:
				case 7:
					if ( !tooth_crown.includes( t.id ) ) {
						tooth_crown.push( t.id );
						if ( t.sign != '' ) tooth_signs.push( t.sign );
					}
				break;
				case 6:
					if ( !tooth_fill.includes( t.id ) ) {
						tooth_fill.push( t.id );
						if ( t.sign != '' ) tooth_signs[ tooth_signs.length-1 ] = tooth_signs[ tooth_signs.length-1 ] + t.sign;
					}
				break;
				case 9:
					if ( tooth_rec == null || tooth_rec != t.id ) {
						tooth_rec = t.id ;
						tooth_signr = '<span class="tooth-rec" title="' + t.title + '">N:' + t.sign + '</span>';
					}
				break;
				case 10:
					if ( tooth_cpitn == null || tooth_cpitn != t.id ) {
						tooth_cpitn = t.id ;
						tooth_signc = '<span class="tooth-cpitn" title="' + t.title + '">' + t.sign + '</span>';
					}
				break;
			}
			if ( t.cat != 2 ) last_sign = t.sign;
		}
	}
	if ( tooth_signr != null && tooth_signr != '' ) tooth_signs.push( tooth_signr );
	if ( tooth_signc != null && tooth_signc != '' ) tooth_signs.push( tooth_signc );
//	console.log( 'TOOTH CFG' , tooth_num, tooth_tp, 'T:' , tooth_type, 'R:', tooth_root, 'C:', tooth_crown, 'F:', tooth_fills, 'N:', tooth_rec, 'S:', tooth_signs, 'SET:', tooth_set.join( ',' ) );

	var num = ( tooth_num > 50 ? tooth_num - 40 : tooth_num );

	var css = $( '#tab-dcross .tooth.t' + num ).attr( 'class' );
	$( '#tab-dcross .tooth.t' + num ).parent().attr( 'data-num' , tooth_num );
	$( '#tab-dcross .tooth.t' + num ).attr( 'data-type' , tooth_tp );
//	$( '#tab-dcross .tooth.t' + num ).attr( 'class' , css.removePrefix( 'tx-' ).removePrefix( 'tt-' ).removePrefix( 'tr-' ).removePrefix( 'tc-' ) );
//	$( '#tab-dcross .tooth.t' + num ).addClass( 'tx-' + tooth_tp );

	var t_type = 'tooth';
	var t_root = 'normal';
	for ( var i = 0; i < tooth_root.length; i++ ) {
		var t = tooth[ tooth_root[ i ] ];
		if ( typeof( t ) != 'undefined' && t.code != '' ) t_root = t.code;
	}
	$( '#tab-dcross .tooth.t' + num ).attr( 'data-root' , t_root );
//	$( '#tab-dcross .tooth.t' + num ).addClass( 'tr-' + t_root );

	var t_crown = 'normal';
	for ( var i = 0; i < tooth_crown.length; i++ ) {
		var t = tooth[ tooth_crown[ i ] ];
		if ( typeof( t ) != 'undefined' && t.code != '' ) {
			t_crown = t.code;
			if ( t.cat == 5 ) {
				if ( t_crown != 'normal' ) t_type = 'crown';
				if ( t.code.indexOf(' ex') != -1 ) t_type = 'crown-ex';
			}
		}
	}
	$( '#tab-dcross .tooth.t' + num ).attr( 'data-crown' , t_crown );
//	$( '#tab-dcross .tooth.t' + num ).addClass( 'tc-' + t_crown );

	for ( var i = 0; i < tooth_type.length; i++ ) {
		var t = tooth[ tooth_type[ i ] ];
		if ( typeof( t ) != 'undefined' && t.cat != 3 && t.code != '' ) t_type = t.code;
	}
	$( '#tab-dcross .tooth.t' + num ).attr( 'data-tooth' , t_type );
//	$( '#tab-dcross .tooth.t' + num ).addClass( 'tt-' + t_type );

	for ( var p in tooth_fills ) {
		var t_fill = 'normal';
		var f = tooth_fills[ p ];
		if ( typeof( f ) != 'undefined' && f != null ) {
			for ( var i = 0; i < f.length; i++ ) {
				var t = tooth[ f[ i ] ];
				if ( typeof( t ) != 'undefined' && t.code != '' ) t_fill = t.code;
			}
		}
		var css = $( '#tab-dcross .tooth.t' + num + ' .t-layer.t-fill-' + p ).attr( 'class' );
		$( '#tab-dcross .tooth.t' + num ).attr( 'data-pos_' + p , t_fill );
//		$( '#tab-dcross .tooth.t' + num + ' .t-layer.t-fill-' + p ).attr( 'class' , css.removePrefix( 'tf-' ) );
//		$( '#tab-dcross .tooth.t' + num + ' .t-layer.t-fill-' + p ).addClass( t_fill );
	}

	var t_signs = '';
	for ( var i = 0; i < tooth_signs.length; i++ ) {
		if ( i > 0 ) t_signs = t_signs + ' ';
		t_signs = t_signs + tooth_signs[ i ];
	}
	$( '#tab-dcross .tooth.t' + num + ' .signs' ).html( t_signs );

	if ( ( ( typeof( tooth_type[0] ) != 'undefined' && tooth_type[0] != 200 ) || tooth_root.length > 0 || tooth_crown.length > 0 ) && t_type != 'extract' ) tooth_kpe[ tooth_num ] = 1;
	else tooth_kpe[ tooth_num ] = 0;
	var kpe = kpe_sum(tooth_kpe);
	$("#dcross_kpe").html( kpe );

	$( '#frm-crossDForm-tooth' + num ).val( tooth_set.join( ',' ) );
	tval[ num ] = tooth_set.join( ',' );
	actTooth();
}

function kpe_sum(obj) {
	return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
}
