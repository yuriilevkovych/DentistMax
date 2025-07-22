var pcross_pe_char = '<i class="fa fa-exclamation-triangle pcross-pe" title="Purulent exudation"></i>';
var pcross_ext_char = '<i class="fa fa-plus pcross-ext" title="' + locale['ptooth_tooth_ext'] + '"></i>';
var pcross_fmbs = 0;
var pcross_fmbs_cnt = 0;
var pcross_fmps = 0;
var pcross_fmps_cnt = 0;

$(document).ready(function(){
	$("#frm-crossPForm .tooth").click(function(){
		var t = $(this).parent().attr('data-num');
		PCross_getTooth( t );
	});

	$(document).on('keydown', function(e) { 
		if ( $("#tab-pcross").hasClass( 'is-active' ) ) {
			var keyCode = e.keyCode || e.which;
			console.log('KEY',e);
			var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
			if ( keyCode == 32 /* space */ || keyCode == 33 /* PgUp */ || keyCode == 34 /* PgDown */ || keyCode == 38 /* up */ || keyCode == 40 /* down */ || keyCode == 37 /* left */ || keyCode == 39 /* right */ ) {
				if ( t === false ) {
					PCross_getTooth( 18 );
				} else {
					var tpart = t.toString().split('');
					console.log('T',tpart);
					var q = parseInt( tpart[ 0 ] );
					var n = parseInt( tpart[ 1 ] );
					if ( keyCode == 32 && ( q == 2 || q == 6 ) && n == 8 ) {
						q = q + 1;
					} else if ( keyCode == 32 && ( q == 4 || q == 8 ) && n == 8 ) {
						q = q - 3;
					} else if ( keyCode == 39 || ( keyCode == 32 && ( q == 1 || q == 2 ) ) ) { // RIGHT
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

					} else if ( keyCode == 37 || ( keyCode == 32 && ( q == 3 || q == 4 ) ) ) { // LEFT
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

//					} else if ( keyCode == 38 || keyCode == 40 ) { // UP / DOWN
					} else if ( keyCode == 33 || keyCode == 34 ) { // UP / DOWN
						if ( q == 1 || q == 5 ) q = q + 3;
						else if ( q == 2 || q == 6 ) q = q + 1;
						else if ( q == 3 || q == 7 ) q = q - 1;
						else if ( q == 4 || q == 8 ) q = q - 3;
					} 
					var tNew = parseInt( q.toString() + n.toString() );
					PCross_getTooth( ( tNew > 50 ? tNew - 40 : tNew ) );
				}
			}


			if ( t !== false ) {
				// *** PS ***
				if ( e.key == 'w' ) {
					if ( $( "#pcross_p_t" ).is( ':checked' ) ) $( "#pcross_p_t" ).attr( 'checked' , false ).change();
					else $( "#pcross_p_t" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 'a' ) {
					if ( $( "#pcross_p_l" ).is( ':checked' ) ) $( "#pcross_p_l" ).attr( 'checked' , false ).change();
					else $( "#pcross_p_l" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 'd' ) {
					if ( $( "#pcross_p_r" ).is( ':checked' ) ) $( "#pcross_p_r" ).attr( 'checked' , false ).change();
					else $( "#pcross_p_r" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 's' ) {
					if ( $( "#pcross_p_b" ).is( ':checked' ) ) $( "#pcross_p_b" ).attr( 'checked' , false ).change();
					else $( "#pcross_p_b" ).attr( 'checked' , true ).change();
				}
				// *** BoP ***
				if ( e.key == 't' ) {
					if ( $( "#pcross_bop_t" ).is( ':checked' ) ) $( "#pcross_bop_t" ).attr( 'checked' , false ).change();
					else $( "#pcross_bop_t" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 'f' ) {
					if ( $( "#pcross_bop_l" ).is( ':checked' ) ) $( "#pcross_bop_l" ).attr( 'checked' , false ).change();
					else $( "#pcross_bop_l" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 'h' ) {
					if ( $( "#pcross_bop_r" ).is( ':checked' ) ) $( "#pcross_bop_r" ).attr( 'checked' , false ).change();
					else $( "#pcross_bop_r" ).attr( 'checked' , true ).change();
				}
				if ( e.key == 'g' ) {
					if ( $( "#pcross_bop_b" ).is( ':checked' ) ) $( "#pcross_bop_b" ).attr( 'checked' , false ).change();
					else $( "#pcross_bop_b" ).attr( 'checked' , true ).change();
				}
				// *** PD ***
				if ( e.key == 'o' ) {
					$( "#pcross_pd_tl" ).focus();
				}
				// *** GR ***
				if ( e.key == 'p' ) {
					$( "#pcross_gr_tl" ).focus();
				}
				// *** Mob ***
				if ( e.key == 'm' ) {
					$( "#pcross_mob" ).focus();
				}
				// *** PE ***
				if ( e.key == 'x' ) {
					if ( $( "#pcross_pe" ).is( ':checked' ) ) $( "#pcross_pe" ).attr( 'checked' , false ).change();
					else $( "#pcross_pe" ).attr( 'checked' , true ).change();
				}
				// *** CPITN ***
				if ( e.key == 'c' ) {
					$( "#pcross_cpitn" ).focus();
				}
				// *** EXTRAKCIA ***
				if ( e.key == 'v' ) {
					if ( $( "#pcross_ext" ).is( ':checked' ) ) $( "#pcross_ext" ).attr( 'checked' , false ).change();
					else $( "#pcross_ext" ).attr( 'checked' , true ).change();
				}
			}
		}
	});

	$("#pcross_p_t,#pcross_bop_t").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var q = parseInt( t.toString().substr( 0 , 1 ) );
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
//		var tp = id.substring( 7 , id.length - 2 );
		var tp = id.substr( 7 , 1 );
		console.log(t , q , val , $(this).attr('id') , tp);
		var set = $(".tooth.t" + t + " .mdt").attr( "data-" + tp );
		var key = ( q == 1 || q == 2 ? 'p' : 'l' );
		if ( val ) {
			if ( set.indexOf( key ) == -1 ) $(".tooth.t" + t + " .mdt").attr( "data-" + tp , set + key );
		} else {
			$(".tooth.t" + t + " .mdt").attr( "data-" + tp , set.replace( key , '' ) );
		}
		PCross_setToothParam( t , tp , $(".tooth.t" + t + " .mdt").attr( "data-" + tp ) );
	});
	$("#pcross_p_b,#pcross_bop_b").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var q = parseInt( t.toString().substr( 0 , 1 ) );
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
//		var tp = id.substring( 7 , id.length - 2 );
		var tp = id.substr( 7 , 1 );
		console.log(t , q , val , $(this).attr('id') , tp);
		var set = $(".tooth.t" + t + " .mdt").attr( "data-" + tp );
		var key = 'v';
		if ( val ) {
			if ( set.indexOf( key ) == -1 ) $(".tooth.t" + t + " .mdt").attr( "data-" + tp , set + key );
		} else {
			$(".tooth.t" + t + " .mdt").attr( "data-" + tp , set.replace( key , '' ) );
		}
		PCross_setToothParam( t , tp , $(".tooth.t" + t + " .mdt").attr( "data-" + tp ) );
	});

	$("#pcross_p_l,#pcross_bop_l").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var q = parseInt( t.toString().substr( 0 , 1 ) );
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
//		var tp = id.substring( 7 , id.length - 2 );
		var tp = id.substr( 7 , 1 );
		console.log(t , q , val , $(this).attr('id') , tp);
		var set = $(".tooth.t" + t + " .mdt").attr( "data-" + tp );
		var key = ( q == 1 || q == 4 ? 'd' : 'm' );
		if ( val ) {
			if ( set.indexOf( key ) == -1 ) $(".tooth.t" + t + " .mdt").attr( "data-" + tp , set + key );
		} else {
			$(".tooth.t" + t + " .mdt").attr( "data-" + tp , set.replace( key , '' ) );
		}
		PCross_setToothParam( t , tp , $(".tooth.t" + t + " .mdt").attr( "data-" + tp ) );
	});
	$("#pcross_p_r,#pcross_bop_r").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var q = parseInt( t.toString().substr( 0 , 1 ) );
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
//		var tp = id.substring( 7 , id.length - 2 );
		var tp = id.substr( 7 , 1 );
		console.log(t , q , val , $(this).attr('id') , tp);
		var set = $(".tooth.t" + t + " .mdt").attr( "data-" + tp );
		var key = ( q == 1 || q == 4 ? 'm' : 'd' );
		if ( val ) {
			if ( set.indexOf( key ) == -1 ) $(".tooth.t" + t + " .mdt").attr( "data-" + tp , set + key );
		} else {
			$(".tooth.t" + t + " .mdt").attr( "data-" + tp , set.replace( key , '' ) );
		}
		PCross_setToothParam( t , tp , $(".tooth.t" + t + " .mdt").attr( "data-" + tp ) );
	});

	$("#pcross_pd_tl,#pcross_pd_tm,#pcross_pd_tr,#pcross_pd_bl,#pcross_pd_bm,#pcross_pd_br,#pcross_gr_tl,#pcross_gr_tm,#pcross_gr_tr,#pcross_gr_bl,#pcross_gr_bm,#pcross_gr_br").keyup( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var id = $(this).attr('id');
		var val = $(this).attr('value');


		if ( val > 1 && val <= 9 ) {
			var next = "";
//			if ( id == "pcross_pd_br" ) next = 'gr_';
//			else if ( id == "pcross_gr_br") next = 'mob';
//			else
			next = id.substr( 7 , 2 ) + '_';
			if ( next != 'mob' ) {
				if ( id.substr( 10 , 2 ) == "tr" ) next = next + 'b';
				else if ( id.substr( 10 , 2 ) == "br" ) next = next + 't';
				else next = next + id.substr( 10 , 1 );
				if ( id.substr( 11 , 1 ) == 'l' ) next = next + 'm';
				else if ( id.substr( 11 , 1 ) == 'm' ) next = next + 'r';
				else next = next + 'l';
			}

			$( "#pcross_" + next ).focus();
		}
	});
	$("#pcross_pd_tl,#pcross_pd_tm,#pcross_pd_tr,#pcross_pd_bl,#pcross_pd_bm,#pcross_pd_br,#pcross_gr_tl,#pcross_gr_tm,#pcross_gr_tr,#pcross_gr_bl,#pcross_gr_bm,#pcross_gr_br").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var id = $(this).attr('id');
		var val = $(this).attr('value');
		var tp = id.substr( 7 , 2 );	// pd / gr
		var tpv = id.substr( 10 , 1 );	// t / b
		var tph = id.substr( 11 , 1 );	// l / m / r

//		$(".tooth.t" + t + " .mdt ." + tp).html( val );
		PCross_setToothParam( t , tp + '_' + tpv + tph , val );
		PCross_reDrawLines();
	});

	$("#pcross_pe").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
		var tp = id.substr( 7 );
		if ( val ) {
			if ( $(".tooth.t" + t + " .mdt .psigns .pcross-pe").length == 0 ) $(".tooth.t" + t + " .mdt .psigns").append( pcross_pe_char )
		} else {
			$(".tooth.t" + t + " .mdt .psigns .pcross-pe").remove();
		}
		PCross_setToothParam( t , tp , val );
	});
	$("#pcross_mob,#pcross_cpitn").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var id = $(this).attr('id');
		var val = $(this).attr('value');
		var tp = id.substr( 7 );
		$(".tooth.t" + t + " .mdt ." + tp).html( val );
		PCross_setToothParam( t , tp , val );
	});

	$("#pcross_ext").change( function() {
		var t = ( typeof( $("#tab-pcross #tooth_sel").attr('data-num') ) == 'undefined' || $("#tab-pcross #tooth_sel").attr('data-num') == '' ? false : parseInt( $("#tab-pcross #tooth_sel").attr('data-num') ) );
		if ( t === false ) return false;
		var id = $(this).attr('id');
		var val = $(this).is(':checked');
		var tp = id.substr( 7 );
		if ( val ) {
			if ( $(".tooth.t" + t + " .mdt .psigns .pcross-ext").length == 0 ) $(".tooth.t" + t + " .mdt .psigns").append( pcross_ext_char )
			disablePCrossForm();
		} else {
			$(".tooth.t" + t + " .mdt .psigns .pcross-ext").remove();
			enablePCrossForm();
		}
		PCross_setToothParam( t , tp , val );
		PCross_reLoad();
	});

	if ( $("#tab-pcross .date-line.history").length > 0 ) {
		$("#tab-pcross").on('click', "A.pcross-history", function(){
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
					$("#tab-pcross .date-line.history LI.active").removeClass('active');
					$(lnk).parent().addClass('active');
					ptooth = data;
					ptooth_id = id;
					PCross_reLoad( ptooth );
				}
			}, this, null);
			return false;
		});
	}

	$("#frm-crossPForm-submit").click(function(){
		$("#frm-crossPForm").submit();
	});

	PCross_reLoad( ptooth );
});

function PCross_getTooth( t ) {
	$( "#frm-crossPForm .tooth" ).removeClass('active');
	$( "#frm-crossPForm .tooth.t" + t ).addClass('active');
	$( "#frm-crossPForm #tooth_sel").html( t ).attr( 'data-num' , t );
	resetPCrossForm();

	var set = ptooth[ t ];
	var q = parseInt( t.toString().substr( 0 , 1 ) );
	for ( var p in ptooth[ t ] ) {
		var val = ptooth[ t ][ p ];

		if ( p == 'p' || p == 'b' ) {	// PS / BoP
			var k = ( p == 'b' ? 'bop' : p );
			if ( q == 1 || q == 2 ) {
				if ( val.indexOf( 'p' ) != -1 ) $("#pcross_"+k+"_t").attr( 'checked' , true );
				if ( val.indexOf( 'v' ) != -1 ) $("#pcross_"+k+"_b").attr( 'checked' , true );
			} else {
				if ( val.indexOf( 'l' ) != -1 ) $("#pcross_"+k+"_t").attr( 'checked' , true );
				if ( val.indexOf( 'v' ) != -1 ) $("#pcross_"+k+"_b").attr( 'checked' , true );
			}
			if ( q == 1 || q == 4 ) {
				if ( val.indexOf( 'd' ) != -1 ) $("#pcross_"+k+"_l").attr( 'checked' , true );
				if ( val.indexOf( 'm' ) != -1 ) $("#pcross_"+k+"_r").attr( 'checked' , true );
			} else {
				if ( val.indexOf( 'm' ) != -1 ) $("#pcross_"+k+"_l").attr( 'checked' , true );
				if ( val.indexOf( 'd' ) != -1 ) $("#pcross_"+k+"_r").attr( 'checked' , true );
			}
		}
		if ( p.substr( 0 , 3 ) == 'pd_' ) $("#pcross-inputs #pcross_" + p ).val( val );
		if ( p.substr( 0 , 3 ) == 'gr_' ) $("#pcross-inputs #pcross_" + p ).val( val );
		if ( p == 'pe' ) $("#pcross-inputs #pcross_pe").attr( 'checked' , val );
		if ( p == 'mob' ) $("#pcross-inputs #pcross_mob").val( val );
		if ( p == 'cpitn' ) $("#pcross-inputs #pcross_cpitn").val( val );
		if ( p == 'ext' ) {
			$("#pcross-inputs #pcross_ext").attr( 'checked' , val );
			if ( val ) disablePCrossForm();
			else enablePCrossForm();
		} else {
			$("#pcross-inputs #pcross_ext").attr( 'checked' , false );
			enablePCrossForm();
		}
	}
}
function PCross_setToothParam( t , p , v ) {
	if ( typeof( ptooth[ t ] ) == 'undefined' || ptooth[ t ] == null ) ptooth[ t ] = {};
	if ( typeof( ptooth[ t ][ p ] ) == 'undefined' || ptooth[ t ][ p ] == null ) ptooth[ t ][ p ] = '';
	ptooth[ t ][ p ] = v;

	var x = JSON.stringify( ptooth[ t ] );
	$( "#frm-crossPForm-pcross_tooth_" + t ).val( x ).attr( 'value' , x );
	PCross_reCalc();
}
function PCross_setTooth( t ) {
	var set = {};
	for ( var qt in ptooth ) {
		set[ qt ] = $( "#frm-crossPForm-pcross_tooth_" + qt ).val();
	}
}

function PCross_reLoad( dt ) {
	resetPCross();
	if ( typeof( dt ) == 'undefined' ) dt = ptooth;

	for ( var t in dt ) {
		$(".tooth-boxes .tooth.t" + t + " .mdt .psings").empty();
		if ( dt[ t ] == null ) continue;

		for ( var p in dt[ t ] ) {
			var prm = dt[ t ][ p ];
			var disable = ( typeof( dt[ t ][ 'ext' ] ) != 'undefined' && dt[ t ][ 'ext' ] === true );
			if ( p == 'b' ) {
				$(".tooth-boxes .tooth.t" + t + " .mdt").attr("data-b" , ( !disable ? prm : '' ) );
			}
			if ( p == 'p' ) {
				$(".tooth-boxes .tooth.t" + t + " .mdt").attr("data-p" , ( !disable ? prm : '' ) );
			}
			if ( p == 'pe' && prm ) $(".tooth-boxes .tooth.t" + t + " .mdt .psigns").append( pcross_pe_char );
			if ( p == 'mob' ) $(".tooth-boxes .tooth.t" + t + " .mdt .mob").text( prm );
			if ( p == 'cpitn' ) $(".tooth-boxes .tooth.t" + t + " .mdt .cpitn").text( prm );
			if ( p == 'ext' && prm ) $(".tooth-boxes .tooth.t" + t + " .mdt .psigns").append( pcross_ext_char );
		}
		var x = JSON.stringify( dt[ t ] );
		$("#frm-crossPForm-pcross_tooth_" + t).val( x ).attr( 'value' , x );
	}
	PCross_reCalc( dt );
	PCross_reDrawLines();
}

function PCross_reCalc( dt ) {
	if ( typeof( dt ) == 'undefined' ) dt = ptooth;
	pcross_fmbs_cnt = 0;
	pcross_fmps_cnt = 0;
	var tooth_cnt = 32;

	for ( var t in dt ) {
		if ( dt[ t ] == null ) continue;

		for ( var p in dt[ t ] ) {
			var prm = dt[ t ][ p ];
			if ( p == 'b' ) {
				pcross_fmbs_cnt = pcross_fmbs_cnt + prm.length;
			}
			if ( p == 'p' ) {
				pcross_fmps_cnt = pcross_fmps_cnt + prm.length;
			}
			if ( p == 'ext' && prm === true ) tooth_cnt = tooth_cnt - 1;
		}
	}
	pcross_fmbs = pcross_fmbs_cnt * 100 / ( tooth_cnt * 4 );
	$("#pcross_fmbs").html( ( Math.round( pcross_fmbs * 100 ) / 100 ) + '%' );
	pcross_fmps = pcross_fmps_cnt * 100 / ( tooth_cnt * 4 );
	$("#pcross_fmps").html( ( Math.round( pcross_fmps * 100 ) / 100 ) + '%' );
}

function PCross_reDrawLines() {
	var points = {};
	var qdrs = [ 1 , 2 , 4 , 3 ];
	var tps = [ 'gr' , 'pd' ];
	var posv = [ 't' , 'b' ];
	var posh = [ 'l' , 'm' , 'r' ];
	for ( var q in qdrs ) {
		for ( var t = 1 ; t <= 8 ; t++ ) {
			var qt = 't' + qdrs[ q ].toString() + ( qdrs[ q ] == 1 || qdrs[ q ] == 4 ? 9 - t : t ).toString();
			if ( typeof( points[ qt ] ) == 'undefined' ) points[ qt ] = {};
			for ( var v in posv ) {
				var pv = posv[ v ];
				if ( typeof( points[ qt ][ pv ] ) == 'undefined' ) points[ qt ][ pv ] = {};
				for ( var h in posh ) {
					var ph = posh[ h ];
					if ( typeof( points[ qt ][ pv ][ h ] ) == 'undefined' ) points[ qt ][ pv ][ h ] = {};
					for ( var tp in tps ) {
						var typ = tps[ tp ];
						points[ qt ][ pv ][ h ][ typ ] = ( typeof( ptooth[ parseInt( qt.substr(1,2) ) ] ) != 'undefined' && ptooth[ parseInt( qt.substr(1,2) ) ] != null && typeof( ptooth[ parseInt( qt.substr(1,2) ) ][ typ + '_' + pv + ph ] ) != 'undefined' ? parseInt( ptooth[ parseInt( qt.substr(1,2) ) ][ typ + '_' + pv + ph ] ) : 0 );
						// ext
						if ( typeof( ptooth[ parseInt( qt.substr(1,2) ) ] ) != 'undefined' && ptooth[ parseInt( qt.substr(1,2) ) ] != null && typeof( ptooth[ parseInt( qt.substr(1,2) ) ][ 'ext' ] ) != 'undefined' && ptooth[ parseInt( qt.substr(1,2) ) ][ 'ext' ] === true ) points[ qt ][ pv ][ h ][ typ ] = 0;
					}
				}
			}
		}
	}
	var cnvs = false;
	var canvas;
	var qtp = '';
	var qtn = '';
	var pp = -1;
	var pn = -1;
	for ( var qt in points ) {
		var q = parseInt( qt.toString().substr(1,1) );
		var t = parseInt( qt.toString().substr(2,1) );
		qtp = 't' + q.toString() + ( q == 1 || q == 4 ? t + 1 : t - 1 ).toString();
		if ( qtp == 't19' || qtp == 't49' || qtp == 't20' || qtp == 't30' ) qtp = '';
		qtn = 't' + q.toString() + ( q == 1 || q == 4 ? t - 1 : t + 1 ).toString();
		if ( qtn == 't10' || qtn == 't40' || qtn == 't29' || qtn == 't39' ) qtn = '';
		for ( var pv in points[ qt ] ) {
			canvas = document.getElementById( 'ptooth' + qt.substr(1,2) + '_l' + pv );
			var cnvs_w = canvas.width;
			var cnvs_h = canvas.height;
			var line = canvas.getContext("2d");
			line.clearRect(0, 0, cnvs_w, cnvs_h);
			line.beginPath();
			line.strokeStyle = '#0000ff';
			line.lineWidth = 5;
			for ( var h in points[ qt ][ pv ] ) {
				var y = ( cnvs_h * points[ qt ][ pv ][ h ][ 'gr' ] / 18 );
				if ( h == 0 && qtp == '' ) {
					line.moveTo( cnvs_w * 10 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				} else if ( h == 0 ) {
					var yp = ( typeof( points[ qtp ][ pv ][ 2 ][ 'gr' ] ) != 'undefined' && points[ qtp ][ pv ][ 2 ][ 'gr' ] > 0 ? cnvs_h * points[ qtp ][ pv ][ 2 ][ 'gr' ] / 18 : 0 );
					var ys = y + ( ( yp - y ) / 2 );
					line.moveTo( 0 , ( pv == 't' ? cnvs_h - ys : ys ) );
					line.lineTo( cnvs_w * 10 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 1 ) {
					line.lineTo( cnvs_w * 50 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 2 ) {
					line.lineTo( cnvs_w * 90 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 2 && qtn != '' ) {
					var yn = ( typeof( points[ qtn ][ pv ][ 0 ][ 'gr' ] ) != 'undefined' && points[ qtn ][ pv ][ 0 ][ 'gr' ] > 0 ? ( cnvs_h * points[ qtn ][ pv ][ 0 ][ 'gr' ] / 18 ) : 0 );
					var ye = y + ( ( yn - y ) / 2 );
					line.lineTo( cnvs_w-1 , ( pv == 't' ? cnvs_h - ye : ye ) );
				}
			}
			line.stroke();
			
			line.beginPath();
			line.strokeStyle = '#ff0000';
			line.lineWidth = 5;
			for ( var h in points[ qt ][ pv ] ) {
				var y = ( cnvs_h * ( points[ qt ][ pv ][ h ][ 'gr' ] + points[ qt ][ pv ][ h ][ 'pd' ] ) / 18 );
				if ( h == 0 && qtp == '' ) {
					line.moveTo( cnvs_w * 10 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				} else if ( h == 0 ) {
					var yp = ( typeof( points[ qtp ][ pv ][ 2 ][ 'pd' ] ) != 'undefined' && points[ qtp ][ pv ][ 2 ][ 'pd' ] > 0 ? cnvs_h * ( points[ qtp ][ pv ][ 2 ][ 'gr' ] + points[ qtp ][ pv ][ 2 ][ 'pd' ] ) / 18 : 0 );
					var ys = y + ( ( yp - y ) / 2 );
					line.moveTo( 0 , ( pv == 't' ? cnvs_h - ys : ys ) );
					line.lineTo( cnvs_w * 10 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 1 ) {
					line.lineTo( cnvs_w * 50 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 2 ) {
					line.lineTo( cnvs_w * 90 / 100 , ( pv == 't' ? cnvs_h - y : y ) );
				}
				if ( h == 2 && qtn != '' ) {
					var yn = ( typeof( points[ qtn ][ pv ][ 0 ][ 'pd' ] ) != 'undefined' && points[ qtn ][ pv ][ 0 ][ 'pd' ] > 0 ? ( cnvs_h * ( points[ qtn ][ pv ][ 0 ][ 'gr' ] + points[ qtn ][ pv ][ 0 ][ 'pd' ] ) / 18 ) : 0 );
					var ye = y + ( ( yn - y ) / 2 );
					line.lineTo( cnvs_w-1 , ( pv == 't' ? cnvs_h - ye : ye ) );
				}
			}
			line.stroke();
		}
	}
}

function resetPCrossForm() {
	enablePCrossForm();

	$("#pcross_p_t").attr( 'checked' , false );
	$("#pcross_p_b").attr( 'checked' , false );
	$("#pcross_p_l").attr( 'checked' , false );
	$("#pcross_p_r").attr( 'checked' , false );

	$("#pcross_bop_t").attr( 'checked' , false );
	$("#pcross_bop_b").attr( 'checked' , false );
	$("#pcross_bop_l").attr( 'checked' , false );
	$("#pcross_bop_r").attr( 'checked' , false );

	$("#pcross_pd_tl").attr( 'value' , '' );
	$("#pcross_pd_tm").attr( 'value' , '' );
	$("#pcross_pd_tr").attr( 'value' , '' );
	$("#pcross_pd_bl").attr( 'value' , '' );
	$("#pcross_pd_bm").attr( 'value' , '' );
	$("#pcross_pd_br").attr( 'value' , '' );

	$("#pcross_gr_tl").attr( 'value' , '' );
	$("#pcross_gr_tm").attr( 'value' , '' );
	$("#pcross_gr_tr").attr( 'value' , '' );
	$("#pcross_gr_bl").attr( 'value' , '' );
	$("#pcross_gr_bm").attr( 'value' , '' );
	$("#pcross_gr_br").attr( 'value' , '' );

	$("#pcross_mob").attr( 'value' , '' );
	$("#pcross_pe").attr( 'checked' , false );
	$("#pcross_cpitn").attr( 'value' , '' );
	$("#pcross_ext").attr( 'checked' , false );
}

function disablePCrossForm( all ) {
	if ( typeof( all ) == 'undefined' ) all = false;
	$("#pcross-inputs .isInputs").each( function() {
		if ( !$(this).hasClass("disableInputs") ) $(this).addClass( "disableInputs" );
	});
	if ( all ) {
		if ( !$("#pcross-inputs .isInputExt").hasClass("disableInputs") ) $("#pcross-inputs .isInputExt").addClass( "disableInputs" );
	}
}
function enablePCrossForm( all ) {
	if ( typeof( all ) == 'undefined' ) all = false;
	$("#pcross-inputs .isInputs").each( function() {
		if ( $(this).hasClass("disableInputs") ) $(this).removeClass( "disableInputs" );
	});
	if ( all ) {
		if ( $("#pcross-inputs .isInputExt").hasClass("disableInputs") ) $("#pcross-inputs .isInputExt").removeClass( "disableInputs" );
	}
}

function resetPCross() {
	for ( var q = 1 ; q <= 4 ; q++ ) {
		for ( var t = 1; t <= 8 ; t++ ) {
			var qt = parseInt( q.toString() + t.toString() );

			canvas = document.getElementById( 'ptooth' + qt + '_lt' );
			var cnvs_w = canvas.width;
			var cnvs_h = canvas.height;
			var line = canvas.getContext("2d");
			line.clearRect(0, 0, cnvs_w, cnvs_h);
			canvas = document.getElementById( 'ptooth' + qt + '_lb' );
			var cnvs_w = canvas.width;
			var cnvs_h = canvas.height;
			var line = canvas.getContext("2d");
			line.clearRect(0, 0, cnvs_w, cnvs_h);

			$("#frm-crossPForm .tooth.t" + qt + " .mdt").attr( 'data-b' , '' ).attr( 'data-p' , '' );
			$("#frm-crossPForm .tooth.t" + qt + " .mdt .mob").empty();
			$("#frm-crossPForm .tooth.t" + qt + " .mdt .cpitn").empty();
			$("#frm-crossPForm .tooth.t" + qt + " .mdt .psigns").empty();
		}
	}
}
