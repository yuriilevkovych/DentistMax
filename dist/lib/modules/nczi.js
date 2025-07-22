var urlNcziGetState = "/system/get-nczi-state"; /*({link System:getNcziState}).replace('\/' , '/');*/
var NCZItimer = false;
var NCZIthreads = {};

function ncziEvID( prefix , hash ) {
	var dt = moment();
	var tmID = dt.format('YYYYMMDDHHmmss');
	var evID = prefix + '/' + hash + tmID;
	return evID;
}

function ncziLog( evID , txt , state , close ) {
	var $log = $("#ncziEvLog");
	var id = "evLogID_" + sha256( evID );
	if ( typeof( close ) == 'undefined' ) close = false;

	if ( $log.find( "#" + id ).length == 0 ) $log.append( '<div id="' + id + '"></div>');
	var $logID = $log.find( "#" + id );

	switch ( state ) {
		case -1: $logID.attr( 'class' , 'text-red' ); break;
		case +1: $logID.attr( 'class' , 'text-green' ); break;
		default: $logID.attr( 'class' , 'text-blue' );
	}
	$logID.html( txt.replace( /\_/g , ' ' ) );

	if ( close ) {
		setTimeout( function() {
			$logID.remove();
		} , 5000 );
	}
}

function ncziSend( event , dID , pID , evID , patient , response , failed ) {
	if ( !APP_state.run ) return false;
	$("#is-light-epzp").attr( 'data-state' , 'read' );
	$("#eVysetrenie-nczi-state-msg").html('Spracuvávam požiadavku');
	if ( !$("#eVysetrenie-nczi-state-msg").hasClass('wait') ) $("#eVysetrenie-nczi-state-msg").addClass('wait');
	ncziLog( evID , 'Odosielam ' + event.toUpperCase() + ' . . .' , 0 );
	NCZIthreads[ evID ] = {
		'event': event,
		'evID' : evID,
		'dID'  : dID,
		'pID'  : pID,
		'pat'  : patient,
		'resp' : response,
		'fail' : failed
	}
	console.log( 'NCZI SEND' , evID , NCZIthreads[ evID ] );
	$.ajax({
		url: APPSC_URL + '/' + event.toUpperCase(),
		data: {
			'dID': dID,
			'pID': pID,
			'evID': evID,
			'patient': patient
		},
		dataType: 'text',
		method: 'POST',
		cache: false,
//		async: false,
		success: function( dt ) {
			console.log( dt );
			if ( dt == 'OK' ) {
				console.log( 'NCZI SENDED' , evID );
				$("#eVysetrenie-nczi-state-msg").html('Čakám na odpoveď z NCZI');
				ncziLog( evID , event.toUpperCase() + ' spracované a odoslané do NCZI . . .' , 1 );
			} else {
				$("#eVysetrenie-nczi-state-msg").html('Spracovanie prerušené');
				alert( "Volanie na službu " + event.toUpperCase() + " sa nepodarilo odoslať. Opakujte volanie ešte raz." );
				ncziLog( evID , event.toUpperCase() + ' sa nepodarilo odoslať. Opakujte volanie ešte raz.' , -1 );
			}
		},
		error: function( jq , status , err ) {
			console.log( 'NCZI NOT SENDED ' , evID , jq , status , err );
			if ( APP_state.card ) alert( "Volanie na službu " + event.toUpperCase() + " sa nepodarilo odoslať. Bola prerušená komunikácia s aplikáciou commMax." );
			$("#eVysetrenie-nczi-state-msg").html('Spracovanie prerušené');
			ncziLog( evID , event.toUpperCase() + ' sa nepodarilo odoslať. Bola prerušená komunikácia s aplikáciou commMax.' , -1 );
			if ( typeof( failed ) != 'undefined' ) failed( status );
		}
	});
}

function ncziGet( dID , pID , evID , response ) {
/*
	if ( !$("DIALOG.dialogPopupWindow").is(":visible") ) {
		var dialog = initDialog('OPEN', 'DIALOG.dialogPopupWindow', 960);
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__title').html( "{_'NCZI response'|noescape}" );
		puH = $(dialog).height();
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').html( 'Čakám na spracovenie požiadavky na strane NCZI . . .' );
	}
*/
	$("#eVysetrenie-nczi-state-msg").html('Odpoveď z NCZI prijatá');
	ncziLog( evID , NCZIthreads[ evID ][ 'event' ].toUpperCase() + ' spracované NCZI. Spracúvavam výsledok . . .' , 0 );
	$.ajax({
		url: urlNcziGetState,
		data: {
			'dID': dID,
			'pID': pID,
			'evID': evID,
			'return': 'json'
		},
		dataType: 'text',
		method: 'POST',
//		async: false,
		success: function( dt ) {
			console.log( dt );
			if ( $("#is-light-epzp").attr( 'data-state' ) == 'read' ) $("#is-light-epzp").attr( 'data-state' , 'on' );
			if ( dt.substr(-4) != 'wait' ) {
				var dt_json = JSON.parse( dt );
				if ( typeof( dt_json.code ) != 'undefined' && typeof( dt_json.message ) != 'undefined' && dt_json.code.substr( 0 , 1 ) == 'E' && dt_json.message != '' ) {
					$("#eVysetrenie-nczi-state-msg").removeClass('wait').html('NCZI požiadavku nespracovalo');
					ncziLog( evID , 'Spracovanie ' + NCZIthreads[ evID ][ 'event' ].toUpperCase() + ' nebolo úspešné. NCZI vrátilo chybu: ' + dt_json.code + ' - ' + dt_json.message , -1 );
				} else {
					$("#eVysetrenie-nczi-state-msg").removeClass('wait').html('Pripravené');
					ncziLog( evID , 'Spracovanie ' + NCZIthreads[ evID ][ 'event' ].toUpperCase() + ' dokončené.' , 1 , true );
					if ( typeof( response ) != 'undefined' ) {
						console.log( 'response send' );
						response( dt_json , dt );
					} else {
						console.log( 'response NOT send' );
					}
				}
/*
				$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').html( '<iframe id="popupFrame" style="width:100%;height:' + ( puH - 73 - 77 - 40 ) + 'px;">' );
				var frame = document.getElementById( 'popupFrame' );
				frame = frame.contentWindow || ( frame.contentDocument.document || frame.contentDocument);
				frame.document.open();
				frame.document.write( dt );
				frame.document.close();
*/
			}
		}
	});
}




/*
function ncziJRUZ( evID ) {
	var dialog = initDialog('OPEN', 'DIALOG.dialogPopupWindow', 600, 800);
//	var evID = 'eVget_jruzid/' + {hash( 'sha256' , $id_doctor.$patient_id )} + d.getFullYear() + ( d.getMonth()+1 < 10 ? '0' : '' ) + (d.getMonth()+1) + ( d.getDate() < 10 ? '0' : '' ) + d.getDate() + ( d.getHours() < 10 ? '0' : '' ) + d.getHours() + ( d.getMinutes() < 10 ? '0' : '' ) + d.getMinutes() + ( d.getSeconds() < 10 ? '0' : '' ) + d.getSeconds();
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__title').html( "{_'Synchronizácia pacienta'|noescape}" );
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').empty();
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<p style="font-size:16px"><strong>Je pacient prítomný?</strong></p>' );
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<p style="font-size:14px">Nakoľko pacient nie je prepojený so systémom NCZI pre odosielanie vyšetrení, je potrebné ho synchornizovať a získať NCZI identifikátor pacienta.</p>' );
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<p style="font-size:14px"><em>Pre získenie NCZI identifikátora pacienta je potrebná ePZP karta lekára.</em></p>' );
//	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<pre style="font-size:12px">X{@$_COOKIE[ 'NLIS_JRUZ' . $patient_id . '_CHCK' ]|noescape}X' + escapeHtml( jruzXML ) + '</pre>' );
	$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').append( '<button type="button" id="btn-jruz-sync" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Synchronizovať</button>' );
	$('#btn-jruz-sync').click( function() {
//		setCookie( 'NLIS_JRUZ{$patient_id|noescape}_CHCK' , 1 , 2*60 );
		$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<br><p style="font-size:14px"><strong><em>Odosielam požiadavku na synchronizáciu údajov . . .</em></strong></p>' );
		$.ajax({
			url: 'http://localhost:3377/GET_JRUZID',
			data: {
				'dID': {hash( 'sha256' , $id_doctor )},
				'pID': {hash( 'sha256' , $patient_id )},
				'evID': evID,
				'patient': {$item->ident_plain|decode}
			},
			dataType: 'text',
			method: 'POST',
			async: false,
			success: function( data ) {
				if ( !$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').hasClass('scroll') ) $('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').addClass('scroll');
				$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').empty();
				$('DIALOG.dialogPopupWindow').find('.mdl-dialog__content').append( '<p style="font-size:14px">Synchronizácia pacienta bola spustená. Celý proces môže trvať niekoľko minút.</p>' );
				$('DIALOG.dialogPopupWindow').find('.mdl-dialog__actions').find('#btn-jruz-sync').remove();
				initScroll();
				setCookie( 'NLIS_JRUZ{$patient_id|noescape}_CHCK' , 2 , 0.25*60*60 );
			}
		});
	});
}
*/


/***********************************************************************
 *                                                                     *
 *   ePZP SOCKET                                                       *
 *                                                                     *
 ***********************************************************************/
var ePZP_do_login = false;
var ePZP_do_logout = false;
var ePZP_card;

$(document).ready( function() {
	ePZP_card = document.getElementById('ePZP_card');
});
$(document).on("commMaxInit", function(e) {
	if ( IS_presenter == 'Dashboard' && IS_action == 'login' && APP_state.run && APP_state.alog ) ePZP_do_login = true;
	if ( !$("#eVysetrenie-nczi-state-msg").hasClass('wait') ) $("#eVysetrenie-nczi-state-msg").html('Pripravené');
});
$(document).on("commMaxClose", function(e) {
	$("#eVysetrenie-nczi-menu, #btnAddVys, #btnAddPS, #btnNcziCheck").hide();
	ePZP_card_out();
});
$(document).on("commMaxError", function(e) {
	ePZP_card_out();
});

function ePZP_VPN_on() {
}
function ePZP_VPN_off() {
}

function ePZP_card_in( id ) {
	APP_state.card = true;
	if ( $("#is-light-epzp").attr( 'data-state' ) !== 'read' ) $("#is-light-epzp").attr( 'data-state' , 'on' ).attr( 'data-original-title' , 'Karta&nbsp;<b>ePZP</b> je&nbsp;načítaná.' );

	if ( ePZP_do_login && id != '' ) {
		ePZP_do_login = false;
		$.nette.ajax({
			url: '/system/autologin',
			dataType: 'text',
			data: {
				'jruzid': sha256( id ),
			},
			method: 'POST',
			success: function( dt ) {
				if ( dt == 'ID-EMPTY' ) alert( 'Chybný pokus o príhlásenie.' );
				else if ( dt == 'ID-NO' ) alert( 'Karta nie je pridelená žiadnemu lekárovi, prihláste sa svojimi prihlasovaími údajmi.' );
				else if ( dt == 'ID-NOT_FOUND' ) alert( 'Nemáte povolený prístup alebo karta nebola korektne pridelená.' );
				else if ( dt == 'LOGIN-NO' ) alert( 'Prihlásenie zlyhalo. Overte svoje prihlasovacie údaje.' );
				else if ( dt == 'LOGIN-OK' ) document.location.href = '/';
				else  alert( 'Prihlásenie zlyhalo.' );
			}
		});
	}
	if ( IS_presenter != 'Dashboard' || ( IS_presenter == 'Dashboard' && ( IS_action == 'default' || IS_action == 'news' ) ) ) {
		$("#eVysetrenie-nczi-menu, #btnAddVys, #btnAddPS, #btnNcziCheck").show();
		if ( !$("#eVysetrenie-nczi-state-msg").hasClass('wait') ) $("#eVysetrenie-nczi-state-msg").html('Pripravené');
		
		if ( doctor_hash != sha256( id ) ) {
//			var redirect = confirm( 'Je vložená ePZP karta iného lekára, aký je aktuálne aktívny. Chcete zmeniť aktívneho lekára?' );
		}
		$(".users-list .user-profile[data-epzp='" + id + "'] A").removeClass('disabled');
		$(".users-list .user-profile[data-epzp!='" + id + "'] A:not([class*='disabled'])").addClass('disabled');
		if ( $(".user-profile.active-profile").attr('data-epzp') != id ) {
			if ( !$("#user .small").hasClass('text-red') ) {
				$("#user .small").addClass('text-red');
				$("#user .small").append(' <i class="fa fa-exclamation-triangle fa-lg" title="Je vložená ePZP karta iného lekára"></i>');
			}
		} else {
			$("#user .small").removeClass('text-red');
			$("#user .small I.fa").remove();
		}
	} else {
		$("#user .small").removeClass('text-red');
		$("#user .small I.fa").remove();
	}
}
function ePZP_card_out( request ) {
	APP_state.card = false;
	setTimeout( function() { if ( appCheckTimer == false && !APP_state.run ) appCheckRetry( true ); } , 10000 );
	$("#is-light-epzp").attr( 'data-state' , 'off' ).attr( 'data-original-title' , 'Karta&nbsp;<b>ePZP</b> NIE&nbsp;JE&nbsp;vložená.' );
	if ( !$("#eVysetrenie-nczi-state-msg").hasClass('wait') ) {
		$("#eVysetrenie-nczi-menu, #btnAddVys, #btnAddPS, #btnNcziCheck").hide();
		$("#eVysetrenie-nczi-state-msg").html('Nie je karta ePZP');
	}

	// pridat odhlasenie / zablokovanie eVysetreni
	if ( typeof( request ) == 'undefined' || request !== false ) {
	}
	if ( !ePZP_do_logout && ( IS_presenter != 'Dashboard' || ( IS_presenter == 'Dashboard' && IS_action != 'login' && IS_action != 'password' && IS_action != 'passwordConfirm' ) ) ) {
		$("#user .users-list .mCSB_container #profile-disable-change").remove();

		ePZP_do_logout = true;
		console.log( 'treba sa odhlásiť' );
	}
	if ( IS_presenter == 'Dashboard' && IS_action == 'login' && APP_state.run && APP_state.alog ) {
		spinnerHide();
		$("#spinner-text").remove();
	}
}
function ePZP_card_load() {
	APP_state.card = false;
	$("#is-light-epzp").attr( 'data-state' , 'load' ).attr( 'data-original-title' , 'Karta&nbsp;<b>ePZP</b> sa&nbsp;načítava.' );

	if ( IS_presenter == 'Dashboard' && IS_action == 'login' && APP_state.run && APP_state.alog ) {
		spinnerShow();
		$("#spinner-wrap").append('<div id="spinner-text" style="position:fixed;top:50%;left:50%;width:300px;height:50px;line-height:50px;margin:40px 0 0 -150px;background:#fff;font-size:18px;text-align:center;z-index:999999;">Načítavam kartu ePZP . . .</div>');
	}
}

function ePZP_system_log( ePZP_data ) {
//	console.log( ePZP_json );
//	commMax_output.innerHTML = ePZP_data;
	
	var is_err = false;
	var method = '';
	var code = '';
	var dID = '';
	var pID = '';
	var evID = '';
	console.log( ePZP_data );
	try {
		ePZP_json = JSON.parse( ePZP_data );
		console.log( ePZP_json );
		method = ePZP_json.method;
		code = ePZP_json.code;
		dID = ePZP_json.dID;
		pID = ePZP_json.pID;
		evID = ePZP_json.evID;
	} catch( err ) {
		is_err = true;
	}


	if ( is_err === false && typeof( NCZIthreads[ evID ] ) != 'undefined' && NCZIthreads[ evID ][ 'dID' ] == dID && NCZIthreads[ evID ][ 'pID' ] == pID ) {
		if ( code.substr( 0 , 1 ) == 'E' && ePZP_json.message != '' ) {
			ncziLog( evID , 'Spracovanie ' + NCZIthreads[ evID ][ 'event' ].toUpperCase() + ' nebolo úspešné. NCZI vrátilo chybu: ' + ePZP_json.code + ' - ' + decodeURIComponent( ePZP_json.message ).replace(/\+/g , ' ') , -1 );
		} else {
			ncziGet( dID , pID , evID , NCZIthreads[ evID ][ 'resp' ] );
		}
	} else {
		console.log( 'THREAD NOT FOUND' , evID );
	}

}
