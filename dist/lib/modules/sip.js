var sip_server = 'zona.dentmax.sk';
var sip_socket_ws;
var sip_allowed_ws = true;
var sip_window = false;
var sip_missed = 0;
var sip_missed_calls = {};
var sip_push_notify = {};

function sip_call_ws( msisdn , time ) {
	var tm = new moment( time );
	var c = document.getElementById( 'sip' + msisdn );
	var t = 'hovor: <strong>' + msisdn.replace('421', '0') + '</strong> (' + tm.format( 'HH:mm' ) + ')<br>\
		pacient: <div id="sipPatientLog">hľadám pacienta...</div>';
	if ( c != undefined ) {
		c.style.color = 'green';
		c.innerHTML = t;
	} else {
		document.getElementById( 'sip-log-msg' ).innerHTML = '<div id="sip' + msisdn + '" style="color:green;">' + t + '</div>' + document.getElementById( 'sip-log-msg' ).innerHTML;
	}
	sip_log_show();
	sip_window = initDialog( 'OPEN' , '#dialogSipCall' , 400 , 300 );
	$( "#sipContent" ).empty();
	$( "#sipContent" ).append( '<div>Prichádzajúci hovor: <strong>' + msisdn.replace('421', '0') + '</strong></div>' );
	$( "#sipContent" ).append( '<div>Pacient: <div id="sipPatient">hľadám pacienta...</div></div>' );
	$.ajax( {
		url: '/system/find-patient',
		dataType: 'json',
		data: {
			'phone': msisdn,
			'id_doctor': doctor_active,
		},
		method: 'POST',
		success: function( dt ) {
			var patient = '';
			if ( typeof( dt ) != 'undefined' && typeof( dt.count ) != 'undefined' ) {
				if ( dt.count == 0 ) {
					$( "#sipPatient" ).html( 'pacient nebol nájdený<br><a href="/calendar/" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
					$( "#sipPatientLog" ).html( 'pacient nebol nájdený<br><a href="/calendar/" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
					if ( Push.Permission.has() ) {
						Push.create('Prichádzajúci hovor', {
							body: 'Číslo: ' + dt.number + '\nPacient nebol nájdený.',
							icon: '/img/icons/call.png',
							link: '/calendar/',
							tag: dt.number,
							vibrate: [200, 100, 200, 100, 200, 100, 200],
							onClick: function () {
								window.open('/calendar/' , '_blank');
								window.focus();
								this.close();
							}
						});
					}
				} else {
					$( "#sipPatientLog,#sipPatient" ).empty();
					for ( var p in dt.patient ) {
						if ( Push.Permission.has() ) {
							Push.create('Prichádzajúci hovor', {
								body: 'Číslo: ' + dt.number + '\nPacient: ' + dt.patient[ p ][ 'name' ],
								icon: '/img/icons/profile.png',
								link: '/patients/detail/' + p,
								tag: dt.number,
								vibrate: [200, 100, 200, 100, 200, 100, 200],
								onClick: function () {
									window.open('/patients/detail/' + p , '_blank');
									window.focus();
									this.close();
								}
							});
						}
						$( "#sipPatient" ).append( '<div id="sipPatient' + p + '" class="sip-patient-row">' + dt.patient[ p ][ 'name' ] + ' (' + dt.patient[ p ][ 'year' ] + ') ' + dt.patient[ p ][ 'tags' ] + '</div>' );
						$( '#sipPatient' + p ).append( '<a href="/patients/detail/' + p + '/" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--accent"><i class="fa fa-user"></i></a>' );
						$( '#sipPatient' + p ).append( '<a href="/calendar/" onclick="sip_window.close();" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
//						$( '#sipPatient' + p ).append( '<a href="/calendar/#order_patient=' + p + '" onclick="sip_window.close();" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
						$( "#sipPatientLog" ).append( '<div id="sipPatientLog' + p + '" class="sip-patient-row">' + dt.patient[ p ][ 'name' ] + ' (' + dt.patient[ p ][ 'year' ] + ') ' + dt.patient[ p ][ 'tags' ] + '</div>' );
						$( '#sipPatientLog' + p ).append( '<a href="/patients/detail/' + p + '/" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--accent"><i class="fa fa-user"></i></a>' );
						$( '#sipPatientLog' + p ).append( '<a href="/calendar/" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
//						$( '#sipPatientLog' + p ).append( '<a href="/calendar/#order_patient=' + p + '" class="mdl-button mdl-js-button mdl-button-small mdl-button--raised mdl-button--green"><i class="fa fa-calendar"></i></a>' );
					}
				}
			}
		}
	} );
}

function sip_pick_ws( msisdn , time ){
	var c = document.getElementById( 'sip' + msisdn );
	if ( c != undefined ) {
		c.style.display = 'none';
	}

	document.getElementById( 'sip-log-msg' ).innerHTML = 'TERAZ SA ZOBRAZI KARTA/KALENDAR PACIENTA S CISLOM ' + msisdn + '<br/>' + document.getElementById( 'sip-log-msg' ).innerHTML;
}

function sip_hang_ws( msisdn , time ) {
	var c = document.getElementById( 'sip' + msisdn );
	if ( c != undefined ) {
		c.style.display = 'none';
	}
	sip_window.close();
	Push.close( msisdn );
}

function sip_missed_ws( msisdn , time ) {
	sip_missed = sip_missed + 1;
	$( "#sip-missed" ).html( '<i class="material-icons">phone_missed</i> ' + sip_missed );
	if ( typeof( sip_missed_calls[ msisdn ] ) == 'undefined' ) sip_missed_calls[ msisdn ] = 1;
	else sip_missed_calls[ msisdn ] = sip_missed_calls[ msisdn ] + 1;
	var tm = new moment( time );
	var c = document.getElementById( 'sip' + msisdn );
	if ( c != undefined ) {
		c.style.color = 'red';
		c.innerHTML = '&raquo; zmeškaný: <strong>' + msisdn.replace('421', '0') + '</strong> x' + sip_missed_calls[ msisdn ] + ' (' + tm.format( 'HH:mm' ) + ')';
	} else {
		document.getElementById( 'sip-log-msg' ).innerHTML = '<div id="sip' + msisdn + '" style="color:red;">&raquo; zmeškaný: <strong>' + msisdn.replace('421', '0') + '</strong> x' + sip_missed_calls[ msisdn ] + ' (' + tm.format( 'HH:mm' ) + ')</div>' + document.getElementById( 'sip-log-msg' ).innerHTML;
	}
	if ( sip_window !== false ) sip_window.close();
	if ( Push.Permission.has() ) {
		sip_push_notify[ dt.number ].then
		Push.close( msisdn );
	}
}

function sip_init_ws() {
	try{
		_sip_init_ws();
	} catch( E ) {
		setTimeout('sip_init_ws()', 200);
	}
}

function _sip_init_ws() {
	if ( !sip_allowed_ws ) return false;
	try {
		sip_socket_ws = new WebSocket( 'wss://' + sip_server + '/voipwsserver/' );
		if ( $("#sip-log").length == 0 ) {
			var $sipLog = $( '<div id="sip-log"></div>' );
			$sipLog.append( '<div id="sip-log-msg"></div>' );
			$sipLog.append( '<div id="sip-log-title"><a href="javascript:;" id="btn-sip-show-hide"><i class="fa fa-arrow-down"></i> Telefónne hovory</a></div>' );
			$('BODY').append( $sipLog );
			$("#sip-log-title").append( '<span id="sip-missed"></span>' );

			var $sipDlg = $( '<dialog id="dialogSipCall" class="mdl-dialog mdl-dialog--with-buttons dialogSipCall" data-width="400" data-height="300"></dialog>' );
			$sipDlg.append( '<h4 class="mdl-dialog__title">Prichádzajúci hovor</h4>' );
			var $sipContent = $( '<div class="mdl-dialog__content" id="sipContent"></div>' );
			$sipDlg.append( $sipContent );
			$sipDlg.append( '<div class="mdl-dialog__actions"><button type="button" class="mdl-button mdl-js-button mdl-button--raised btn-close">Zatvoriť</button></div>' );
			$('BODY').append( $sipDlg );

			$("#btn-sip-show-hide").click( function() {
				if ( $(this).closest('#sip-log').hasClass('showed') ) sip_log_hide();
				else sip_log_show();
			});
		}
		console.log( 'WebSocket ' + sip_phone_number + ' - status ' + sip_socket_ws.readyState , sip_socket_ws );
		sip_socket_ws.onopen = function( msg ) {
			console.log( 'Welcome - status ' + this.readyState );
		};
		sip_socket_ws.onmessage = function( msg ) {
			console.log( 'MSG:' , msg.data );
			try {
				eval( msg.data );
			} catch( E ) { }
		};
		sip_socket_ws.onclose = function( msg ) {
			console.log( 'Disconnected - status ' + this.readyState );
			_sip_reconnect_ws();
		};
	} catch( ex ) {
		console.log( ex );
	}
}

function sip_send_ws( msg ) {
	if ( !msg ) {
		return;
	}
	try{
		sip_socket_ws.send( msg );
		console.log( 'Sent: ' + msg );
	} catch( ex ) {
		console.log( ex );
	}
}

function sip_quit_ws() {
	if (sip_socket_ws != null){
		sip_socket_ws.close();
		sip_socket_ws = null;
	}
}

function sip_notallowed_ws() {
	if (sip_socket_ws != null){
		sip_socket_ws.close();
		sip_socket_ws = null;
	}
	sip_allowed_ws = false;
}

/*function sip_reconnect(){
	setTimeout('_sip_reconnect()', 1000);
}*/

function _sip_reconnect_ws() {
	sip_quit_ws();
	_sip_init_ws();
}

function sip_connected_ws() {
	if ( sip_phone_number == '' ) {
		console.log('Číslo telefónu nie je nastavené');
		sip_quit_ws();
	}
//	sip_send_ws( 'HELLO:' + sip_phone_number );
	sip_send_ws( 'HELLO:' + sip_phone_number + ':' + IS_user );
	// cislo linky
}

function sip_valid_ws() {
	console.log('sip_valid_ws()');
}

function sip_log_show() {
	if ( !$('#sip-log').hasClass('showed') ) $('#sip-log').addClass('showed');
	if ( !$('#sip-log #sip-log-title .fa').hasClass('fa-rotate-180') ) $('#sip-log #sip-log-title .fa').addClass('fa-rotate-180');
}
function sip_log_hide() {
	if ( $('#sip-log').hasClass('showed') ) $('#sip-log').removeClass('showed');
	if ( $('#sip-log #sip-log-title .fa').hasClass('fa-rotate-180') ) $('#sip-log #sip-log-title .fa').removeClass('fa-rotate-180');
}

setTimeout('sip_init_ws()', 200);
Push.Permission.request(
	function(){
		console.log('PUSH NOTIFY GRANT');
	}, function(){
		console.log('PUSH NOTIFY DENY');
	}
);
